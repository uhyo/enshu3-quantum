// user of field.
import {
    Map,
} from 'immutable';
import Field, {
    State,
    ICoeff,
    STATE_DIR,
    STATE_POS,
} from './field';
import {
    Complex,
    cadd,
    csmul,
    czero,
    cone,
} from './complex';
import {
    positionalDistribution,
    showPositionalDistribution,
} from './util';

declare var require : (path:string)=>any;

const fs = require('fs');

// 結果を出力するところ
const OUTPATH = './data.txt';

// 次元
const MAXN = 8;

// 結果出力先ファイルをオープン
const filestream = fs.createWriteStream(OUTPATH, {
    flags: 'w',
    defaultEncoding: 'utf8',
});

// 各次元ごとに計測する
for(let N = 1; N <= MAXN; N++){
    console.log(`===== ${N} =====`);
    // サンプル数
    const iter = Math.max(4, 2*N);

    // Fieldを初期化

    // 初期状態
    const coeff = Map<State, Complex>().set(Map({
        [STATE_DIR]: 0,
        [STATE_POS]: 0,
    }), cone) as ICoeff;

    const director = (d: Map<number, Complex>)=>{
        // Grover's diffusion operator.
        const result = Map<number, Complex>().asMutable();
        // 行列×ベクトル
        for(let i=0; i<N; i++){
            // 総和
            let a = czero;
            for(let j=0; j<N; j++){
                const dd = i===j ? 2/N-1 : 2/N;
                a = cadd(a, csmul(dd, d.get(j, czero)));
            }
            result.set(i, a);
        }
        return result.asImmutable();
    }
    const transition = (a:number, v:number)=>{
        // a: 0, ..., N-1の数字, v: position
        return v ^ (1 << a);
    };
    const f = new Field(director, transition);

    let cnt = 0;
    let steps = 0;
    for(let i=0; i<iter; i++){
        console.log(i);
        // absorbing vertexはランダムにset
        const m = Math.floor(Math.random() * (2**N));

        f.init(coeff);
        // step数
        const s = f.test(m, 120);

        if(s >= 0){
            cnt++;
            steps += s;
        }
    }
    // absorbing vertexに到達する確率
    const p = cnt / iter;
    // absorbing time
    const time = steps / cnt / p;

    filestream.write(`${N} ${cnt} ${p} ${time}\n`);
    console.log(N, p, time);
}

filestream.end();
console.log('end', new Date());

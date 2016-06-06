// user of field.
import {
    Map,
} from 'immutable';
import Field, {
    State,
    ICoeff,
    makeState,
    getDir,
    getPos,
} from './field';
import {
    Complex,
    cadd,
    csub,
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
const path = require('path');
const appRootPath = require('app-root-path');

// 結果を出力するところ
const OUTPATH = path.join(appRootPath.toString(), 'data.txt');

const director = (d: Map<State, Complex>)=>{
    const result = Map<State, Complex>().asMutable();
    d.forEach((r: Complex, k: State)=>{
        const a = getDir(k);
        const v = getPos(k);

        // Hadamard operatorを適用してShift
        const s1 = makeState(0, v-1);
        const s2 = makeState(1, v+1);
        /*
        const dl = a===0 ? cone : czero;
        const dr = a===1 ? cone : czero;
        result.set(s1, cadd(cadd(dl, dr), result.get(s1, czero)));
        result.set(s2, cadd(csub(dl, dr), result.get(s2, czero)));
        */
        result.set(s1, cadd(r, result.get(s1, czero)));
        result.set(s2, cadd(a===0 ? r : csmul(-1, r), result.get(s2, czero)));
    });
    return result.asImmutable();
}
const transition = (a:number, v:number)=>{
    // vをa方向に動かす(a: 0=L, 1=R)
    return v - 1 + 2*a;
};

// 結果出力先ファイルをオープン
const filestream = fs.createWriteStream(OUTPATH, {
    flags: 'w',
    defaultEncoding: 'utf8',
});

const f = new Field(director);

// 初期状態
const coeff = Map<State, Complex>().set(makeState(1, 0), cone) as ICoeff;


// absorbing vertexが-20から20くらいまで
const ms = [-20, -16, -12, -8, -4, -3, -2, -1, 1, 2, 3, 4, 5, 8, 12, 16, 20];
for(let m of ms){
    console.log(`===== ${m} =====`);

    // 繰り返し回数
    const iter = 1000;
    // 確率を求める
    let cnt = 0;
    for(let i=0; i<iter; i++){
        if(i%50===0){
            console.log(i);
        }
        f.init(coeff);
        if(f.test(m, 80) >= 0){
            cnt++;
        }
    }
    // 確率
    const p = cnt / iter;
    filestream.write(`${m} ${p}\n`);
    console.log('%d: %d', m, p);
}
filestream.end();
console.log('end', new Date());

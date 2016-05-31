// Particleが動くところ
import {
    Map,
    Record,
} from 'immutable';
import {
    Complex,
    cabs,
    cabssq,
    cadd,
    cmul,
    csmul,
    czero,
    cone,
    cstr,
} from './complex';

// direction, position
// export type State = Map<string, number>;
export type State = number;
export type ICoeff = Map<State, Complex>;

// state
export function makeState(dir: number, pos:number): State{
    // dirが8bit, posが24bit（負の数OK）でおさまるという仮定
    return (pos << 8) | dir;
}
export function getDir(k: State): number{
    return k & 0xFF;
}
export function getPos(k: State): number{
    return k >> 8;
}

class Field {
    // Positional amplitude.
    public coeff: ICoeff;

    // 方向の確率分布の遷移
    protected director: (ac: Map<number, Complex>, v: number)=> Map<number, Complex>;
    // sで表されるtransition
    protected transition: (a:number, v:number)=>number;

    constructor(director, transition){
        this.director = director;
        this.transition = transition;
    }
    //coeffをinit
    public init(coeff: ICoeff): void{
        this.coeff = coeff;
        this.normalize(this.coeff);
    }

    // 1ステップ歩く
    public walk(): void{
        // 現在の状態
        const {
            director,
            transition,
            coeff,
        } = this;

        // 次の状態を作る
        const coeff2m : ICoeff = Map<State, Complex>().asMutable();

        coeff.forEach((r: Complex, k: State)=>{
            // k: |a, v>, r: |a, v>の係数

            const a = getDir(k);
            const v = getPos(k);

            // まずdirectorを適用
            const d = Map<number, Complex>().set(a, cone);
            const d2 = director(d, v);
            // d2のkeyの数だけ分離
            d2.forEach((ra: Complex, a: number)=>{
                // 確率を追加
                const k2 = makeState(a, transition(a, v));
                const r2 = cmul(r, ra);
                coeff2m.set(k2, cadd(r2, coeff2m.get(k2, czero)));
            });
        });

        // 正規化
        this.coeff = this.normalize(coeff2m.asImmutable());
    }

    public measure(m: number): boolean{
        // 現在位置がmかどうか観測する
        const {coeff} = this;

        // 現在位置mのやつの確率振幅合計
        const atm = coeff.filter((r: Complex, k: State)=>{
            // return k.get(STATE_POS)===m;
            return getPos(k) === m;
        });
        const p = atm.reduce<number>((acc: number, r: Complex)=> acc+cabssq(r) , 0);

        if(Math.random() < p){
            // 観測したらmだったのでmのやつだけ残す
            this.coeff = atm as ICoeff; // ← ?
            return true;
        }else{
            // mではなかったね……
            this.coeff = this.normalize(coeff.filter((r: Complex, k: State)=>{
                return getPos(k)!==m;
            }) as ICoeff);
            return false;
        }
    }

    ///// 初期状態から初めて目的の場所にたどり着くかtestする （かかったstep数を返す）
    public test(m: number, iterationNumber:number = 200): number{
        for(let i=0; i<iterationNumber; i++){
            this.walk();
            if(this.measure(m)){
                return i;
            }
        }
        return -1;
    }

    private normalize(coeff: ICoeff): ICoeff{
        // coeffの正規化
        let sum = 0;
        coeff.forEach((r: Complex, k: State)=>{
            sum += cabssq(r);
        });
        if(sum===0){
            throw new Error('sum is 0!!!!!!!');
        }
        const sinv = 1 / Math.sqrt(sum);
        if(Math.abs(sinv - 1) < 1e-10){
            // 差が微小のときは省略
            return coeff;
        }

        return coeff.map(r => csmul(sinv, r)) as ICoeff;
    }
}


export default Field;

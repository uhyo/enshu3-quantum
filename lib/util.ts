import {
    Iterable,
    Map,
} from 'immutable';
import {
    ICoeff,
    State,
    getDir,
    getPos,
} from './field';
import {
    Complex,
    cadd,
    czero,
    cstr,
} from './complex';
// coeffを位置ごとにまとめる

export function positionalDistribution(coeff: ICoeff): Map<number, Complex>{
    return coeff.groupBy((r: Complex, k: State)=> getDir(k))
    .map((v: Iterable<State, Complex>)=> v.reduce((acc: Complex, r: Complex)=> cadd(acc, r), czero))
    .toMap();
}

export function showPositionalDistribution(d: Map<number, Complex>):void {
    d.sortBy((_,k)=>k, (a, b)=>a-b).forEach((r: Complex, v: number)=>{
        console.log('%d: %s', v, cstr(r));
    });
}

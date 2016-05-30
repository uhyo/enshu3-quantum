// Complex proxy (real)
export type Complex = number;

export function cabs(a: number): number{
    return Math.abs(a);
}

export function cabssq(a: number): number{
    return a**2;
}

export function cadd(a:number, b:number): number{
    return a+b;
}

export function cmul(a: number, b:number): number{
    return a*b;
}

export function csmul(a: number, b: number): number{
    return a*b;
}

export const czero = 0;
export const cone = 1;
export function cstr(a: number): string{
    return a.toFixed(3);
}

// complex.
export interface Complex {
    re: number;
    im: number;
}

// complex length
export function cabs({re, im}: Complex): number{
    return Math.sqrt(re**2+im**2);
}
// (complex length)^ 2.
export function cabssq({re, im}: Complex): number{
    return re**2+im**2;
}

// complex addition.
export function cadd({re: are, im: aim}:Complex, {re: bre, im: bim}:Complex): Complex{
    return {
        re: are + bre,
        im: aim + bim,
    };
}

export function csub({re: are, im: aim}:Complex, {re: bre, im: bim}:Complex): Complex{
    return {
        re: are - bre,
        im: aim - bim,
    };
}

// complex multiplication.
export function cmul({re: are, im: aim}:Complex, {re: bre, im: bim}:Complex): Complex{
    return {
        re: are*bre-aim*bim,
        im: are*bim+aim*bre,
    };
}

// multiplication by scalar
export function csmul(a: number, {re, im}:Complex): Complex{
    return {
        re: a*re,
        im: a*im,
    };
}

export const czero: Complex = {
    re: 0,
    im: 0,
};
export const cone: Complex = {
    re: 1,
    im: 0,
};
export const ci: Complex = {
    re: 0,
    im: 1,
};

// string replesentation.
export function cstr({re, im}: Complex): string{
    return `${re.toFixed(3)}+${im.toFixed(3)}i`;
}

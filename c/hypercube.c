#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <complex.h>
#include "MT.h"

#define MAXN (10)

#define WALKITER (240)

void simulate(int n);
int walktest(double complex *S1, double complex *S2, double complex *op, int n, int vn, int absorb);
void matvecmul(double complex *out, double complex *A, double complex *v, int m, int n);
void normalize(double complex *v, int vn);

int main(){
	int n;
	init_genrand(100);
	for(n=1; n<=MAXN; n++){
		fprintf(stderr, "===== %d =====\n", n);
		simulate(n);
	}
	return 0;
}


void simulate(int n){
	int iter, i, j, k;
	int vn, steps, stepsum, cnt;
	double complex *S1, *S2, *op;
	double p, time;
	iter = (int)floor(1.8*(double)(n*n));

	//stateベクトルの確保(N * 2^N)
	vn = (1<<n)*n;

	S1 = (double complex*)malloc(vn *(sizeof (double complex)));
	S2 = (double complex*)malloc(vn *(sizeof (double complex)));
	//オペレーターの確保
	op = (double complex*)malloc(vn*vn *(sizeof (double complex)));

	/* オペレーターを計算 */
	memset(op, 0, vn*vn*sizeof(double complex));
	for(i=0; i<vn; i++){
		for(j=0; j<vn; j++){
			for(k=0; k<n; k++){
				op[(k*(1<<n)+i)*vn + (k*(1<<n)+j)] = i==j ? 2.0/(double)n - 1.0 : 2.0/(double)n;
			}
		}
	}

	stepsum = 0;
	cnt = 0;
	for(i=0; i<iter; i++){
		fprintf(stderr, "%d\n", i);
		/* 初期状態を作る */
		S1[0] = (double complex)1.0;
		for(j=1; j<vn; j++){
			/* 初期状態: |1, 0....0> */
			S1[j] = (double complex)0.0;
		}

		/* walk testする */
		steps = walktest(S1, S2, op, n, vn, (1<<n)-1);
		printf("%d\n", steps);
		if(steps >= 0){
			cnt++;
			stepsum += steps;
		}
	}
	/* absorbing vertexに到達する確率 */
	p = cnt / (double)iter;
	time = (double)stepsum / (double)cnt / p;
	printf("%d %d %f %f\n", n, cnt, p, time);

	free(S1);
	free(S2);
	free(op);
}

int walktest(double complex *S1, double complex *S2, double complex *op, int n, int vn, int absorb){
	/* walkしてtestする */
	int i, j;
	double complex *tmp;
	double sum, a, r;
	for(i=0; i<WALKITER; i++){
		/* 1回walkする */
		matvecmul(S2, op, S1, vn, vn);
		/* S1とS2を交代 */
		tmp = S2;
		S2 = S1;
		S1 = tmp;
		/* S1をnormalizeする */
		normalize(S1, vn);
		/* 計測してabsorbing vertexにいるか確認 */
		sum = 0.0;
		for(j=0; j<n; j++){
			/* 各方向のabsorbing vertex */
			a = cabs(S1[j*(1<<n)+absorb]);
			sum += a*a;
		}
		/* 確率 */
		r = genrand_real2();
		if(r < sum){
			// 到達！
			return i;
		}
		/* 到達しなかったから消す */
		for(j=0; j<n; j++){
			S1[j*(1<<n)+absorb] = 0.0;
		}
		normalize(S1, vn);
	}
	return -1;
}

/* m*n行列と長さnのベクトルをかける */
void matvecmul(double complex *out, double complex *A, double complex *v, int m, int n){
	int i, j;
	for(i=0; i<m; i++){
		out[i] = (double complex)0.0;
		for(j=0; j<n; j++){
			out[i] += A[i*n+j]*v[j];
		}
	}
}
/* 長さnのベクトルの長さを1に直す */
void normalize(double complex *v, int n){
	int i;
	double sum = 0, a;
	for(i=0; i<n; i++){
		a = cabs(v[i]);
		sum += a*a;
	}
	if(fabs(sum - 1.0) >= 0.000001){
		a = 1.0 / sum;
		for(i=0; i<n; i++){
			v[i] *= a;
		}
	}
}

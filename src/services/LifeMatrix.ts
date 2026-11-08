export class LifeMatrix {
    constructor(private _dwellers: number[][]) {}

    get dwellers(): number[][] {
        return this._dwellers;
    }

    nextGeneration(): number[][] {
        this._dwellers = this._dwellers.map((__, i) => this.getNewRow(i));
        return this._dwellers;
    }

    getNewRow(i: number): number[] {
        return this._dwellers[i].map((__, j) => this.getNewCell(i, j));

    }
    getNewCell(i: number, j: number): number {
        const matrixArea = this.getMatrixArea(i, j);
        const res: number = matrixArea.reduce((res, row) => res + row.reduce((sum, cell) => sum + cell ), 0);

        return this._dwellers[i][j] ? isAliveFromAlive(res) : isAliveFromDead(res);

    }

    getMatrixArea(i: number, j: number): number[][] {
        const sliceLeft: number = j == 0 ? 0 : j - 1;
        const sliceRight: number = j == this._dwellers[0].length ? j + 1 : j + 2;
        const currentDweller = this._dwellers[i][j];
        this._dwellers[i][j] = 0;
        
        const res: number[][] = [i - 1, i, i + 1].map(indexRow => this._dwellers[indexRow] ?
            this._dwellers[indexRow].slice(sliceLeft, sliceRight) : [0 as number]);

        this._dwellers[i][j] = currentDweller;    

        return res;
    }
}

    function isAliveFromAlive(n: number): number {
        return +(n == 2 || n ==3) as number;
    }

    function isAliveFromDead(n: number): number {
        return +(n == 3) as number;
    }


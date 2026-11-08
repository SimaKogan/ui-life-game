export default function getRandomMatrix(size: number): number[][] {
    let res: number[][] = [];
    for(let i = 0; i < size; i ++) {
        res[i] = [];
        for(let j = 0; j < size; j++) {
            res[i][j] = getRandomCell();
        }
    }

    function getRandomCell(): number {
        
        return Math.trunc(Math.random() * 2);
    }

    return res;

}
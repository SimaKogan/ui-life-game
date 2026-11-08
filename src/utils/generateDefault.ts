import pattern_config from "../config/pattern-config.json"

type PatternType = {
    alivesArray: number[][],
    areaSize: number,
}

export function getDefaultMatrix(name: string): number[][] {
    
    if (!(name in pattern_config)) {
        throw new Error(`Pattern "${name}" not found in pattern config.`);
      }
    
    const currentPattern: PatternType = pattern_config[name as keyof typeof pattern_config];
    const areaSize: number = currentPattern.areaSize;
    const res: number[][] = Array.from({ length: areaSize }, () => Array(areaSize).fill(0));

    const alivesArray = currentPattern.alivesArray;
    const size = alivesArray.length;
    for(let i = 0; i < size; i++) {
        const [x, y] = alivesArray[i];
        if (x < areaSize && y < areaSize) {
          res[x][y] = 1;
        }
    }

    return res;

}
import getRandomMatrix from "../utils/generateRandom";
import Matrix from "./Matrix"
import { useEffect, useRef, useState } from "react";
import { LifeMatrix } from "../services/LifeMatrix";
import { getDefaultMatrix } from "../utils/generateDefault";

type Props = {
    areaSize: number | string;
    gameTicInterval: number;
    defaultCellWith?: number;
}

export const Life: React.FC<Props> = ({ areaSize, gameTicInterval, defaultCellWith }) => {

    const [lifeArray, setLifeArray] = useState<number[][]>([]);
    const lifeMatrix = useRef<LifeMatrix>();

    function tic() {
        if (lifeMatrix.current == null) {
            getNewLifeMatrix();
        };


        if (lifeMatrix.current == null) {
            getNewLifeMatrix();
        };
        setLifeArray(lifeMatrix.current!.nextGeneration());
    }

    useEffect(() => {
        const interval = setInterval(tic, gameTicInterval);
        return () => clearInterval(interval);
    }, [gameTicInterval])

    useEffect(() => {
        getNewLifeMatrix();
    }, [areaSize]);

    function getNewLifeMatrix() {
        if (typeof areaSize === 'number') {
            lifeMatrix.current = new LifeMatrix(getRandomMatrix(areaSize));
        }
        if (typeof areaSize === 'string') {
            lifeMatrix.current = new LifeMatrix(getDefaultMatrix(areaSize));
        }
    }

    return (
        <div>
            <Matrix lifeArray={lifeArray} defaultCellWith={defaultCellWith} />
        </div>
    )

}
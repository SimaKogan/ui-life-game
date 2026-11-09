import { useEffect, useRef, useState } from 'react';
import getRandomMatrix from '../utils/generateRandom';
import { getDefaultMatrix } from '../utils/generateDefault';
import { LifeMatrix } from '../services/LifeMatrix';
import { LifeCanvas } from './LifeCanvas';

export type LifeStats = {
  generation: number;
  alives: number;
};

type Props = {
  areaSize: number | string;
  intervalMs: number;
  running?: boolean;
  resetKey?: number;
  onStats?: (stats: LifeStats) => void;
};

const countAlive = (m: number[][]): number =>
  m.reduce((sum, row) => sum + row.reduce((s, c) => s + c, 0), 0);

export const Life: React.FC<Props> = ({ areaSize, intervalMs, running = true, resetKey = 0, onStats }) => {
  const [cells, setCells] = useState<number[][]>([]);
  const lifeMatrix = useRef<LifeMatrix>();
  const generation = useRef<number>(0);
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  useEffect(() => {
    const initial = typeof areaSize === 'number' ? getRandomMatrix(areaSize) : getDefaultMatrix(areaSize);
    lifeMatrix.current = new LifeMatrix(initial);
    generation.current = 0;
    setCells(initial);
    onStatsRef.current?.({ generation: 0, alives: countAlive(initial) });
  }, [areaSize, resetKey]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (!lifeMatrix.current) return;
      const next = lifeMatrix.current.nextGeneration();
      generation.current += 1;
      setCells(next);
      onStatsRef.current?.({ generation: generation.current, alives: countAlive(next) });
    }, intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs]);

  return <LifeCanvas cells={cells} />;
};

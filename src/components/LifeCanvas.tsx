import { useEffect, useRef } from 'react';

type Props = {
  cells: number[][];
  maxPx?: number;
};

const cssVar = (name: string, fallback: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

export const LifeCanvas: React.FC<Props> = ({ cells, maxPx = 720 }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const n = cells.length;
    if (!canvas || n === 0) return;

    const cell = Math.max(1, Math.min(40, Math.floor(maxPx / n)));
    const size = n * cell;
    if (canvas.width !== size) {
      canvas.width = size;
      canvas.height = size;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dead = cssVar('--cell-dead', '#0a0e14');
    const alive = cssVar('--accent', '#34d399');
    const grid = cssVar('--border', '#263041');
    const gap = cell >= 6 ? 1 : 0;

    ctx.fillStyle = gap ? grid : dead;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < n; i++) {
      const row = cells[i];
      for (let j = 0; j < n; j++) {
        if (row[j]) {
          ctx.fillStyle = alive;
        } else if (gap) {
          ctx.fillStyle = dead;
        } else {
          continue;
        }
        ctx.fillRect(j * cell, i * cell, cell - gap, cell - gap);
      }
    }
  }, [cells, maxPx]);

  return <canvas ref={ref} className="life-canvas" role="img" aria-label="Game of Life board" />;
};

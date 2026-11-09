import { useCallback, useState } from 'react';
import { Button, Slider } from '@mui/material';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import { Life, LifeStats } from '../components/Life';
import { StatsGrid } from '../components/StatsGrid';

const MIN_SIZE = 10;
const MAX_SIZE = 100;
const nf = new Intl.NumberFormat('en-US');

export const FrontCompute: React.FC = () => {
  const [areaSize, setAreaSize] = useState<number>(40);
  const [speed, setSpeed] = useState<number>(5);
  const [running, setRunning] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState<number>(0);
  const [stats, setStats] = useState<LifeStats>({ generation: 0, alives: 0 });

  const onStats = useCallback((s: LifeStats) => setStats(s), []);
  const total = areaSize * areaSize;
  const density = total ? `${((stats.alives / total) * 100).toFixed(1)}%` : '—';

  return (
    <div className="page layout">
      <section className="board-wrap">
        <div className="board">
          <Life
            areaSize={areaSize}
            intervalMs={Math.round(1000 / speed)}
            running={running}
            resetKey={resetKey}
            onStats={onStats}
          />
        </div>
      </section>

      <aside className="panel">
        <div className="panel-head">
          <h2>Front-end calculation</h2>
          <span className="muted">The game runs in your browser.</span>
        </div>

        <StatsGrid
          items={[
            { label: 'Generation', value: nf.format(stats.generation) },
            { label: 'Alive cells', value: nf.format(stats.alives) },
            { label: 'Density', value: density },
          ]}
        />

        <div className="group">
          <div className="field-label">
            <span id="size-label">Field size</span>
            <output>{areaSize} × {areaSize}</output>
          </div>
          <Slider
            aria-labelledby="size-label"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={areaSize}
            onChange={(_, v) => setAreaSize(v as number)}
          />
        </div>

        <div className="group">
          <div className="field-label">
            <span id="speed-label">Speed</span>
            <output>{speed} gen/s</output>
          </div>
          <Slider
            aria-labelledby="speed-label"
            min={1}
            max={30}
            value={speed}
            onChange={(_, v) => setSpeed(v as number)}
          />
        </div>

        <div className="btn-row">
          <Button
            variant="contained"
            onClick={() => setRunning(r => !r)}
            startIcon={running ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          >
            {running ? 'Pause' : 'Resume'}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setResetKey(k => k + 1)}
            startIcon={<CasinoOutlinedIcon />}
          >
            New random field
          </Button>
        </div>
      </aside>
    </div>
  );
};

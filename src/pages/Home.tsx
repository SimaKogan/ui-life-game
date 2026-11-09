import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Life } from '../components/Life';

export const Home: React.FC = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="board-wrap">
          <div className="board board-sm">
            <Life areaSize="octagon" intervalMs={600} />
          </div>
        </div>
        <div>
          <h1>Conway's Game of Life</h1>
          <p className="muted">
            An interactive study of the cellular automaton devised by John Horton Conway.
            Watch a grid evolve in your browser, or let the server compute thousands of
            generations and plot how the population changes.
          </p>
          <div className="cta">
            <Button component={Link} to="/front-compute" variant="contained" size="large">
              Front-end calculation
            </Button>
            <Button component={Link} to="/back-compute" variant="outlined" size="large">
              Back-end calculation
            </Button>
          </div>
        </div>
      </section>

      <section className="features">
        <article className="card">
          <h2>Front-end calculation</h2>
          <p>
            The game grid runs right in your browser. Choose a size from 10×10 to 100×100 cells,
            set the speed, and observe the progression from a random initial state.
          </p>
        </article>
        <article className="card">
          <h2>Back-end calculation</h2>
          <p>
            The grid can be anywhere from 10×10 to 1'000×1'000 cells (up to 1'000'000 cells).
            Each generation is computed on the server, and the chart shows alive versus dead cells over time.
          </p>
        </article>
      </section>

      <p className="note muted">
        In both sections the number of cells is limited due to performance constraints.
      </p>
    </div>
  );
};

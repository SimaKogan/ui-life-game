import { LifeMatrix } from './LifeMatrix';

test('blinker oscillates with period 2', () => {
  const m = new LifeMatrix([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
  expect(m.nextGeneration()).toEqual([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ]);
  expect(m.nextGeneration()).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
});

test('block is a still life', () => {
  const block = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];
  expect(new LifeMatrix(block.map(r => [...r])).nextGeneration()).toEqual(block);
});

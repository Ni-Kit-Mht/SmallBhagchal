// src/captureMoves.ts

import { Position } from './shapes'; // Adjust the path as needed

export const captureMoves: { [key: string]: { over: Position; to: Position }[] } = {
  '0-2': [
    { over: { row: 1, col: 1 }, to: { row: 2, col: 0 } },
    { over: { row: 1, col: 3 }, to: { row: 2, col: 4 } },
  ],
  '2-0': [
    { over: { row: 1, col: 1 }, to: { row: 0, col: 2 } },
    { over: { row: 2, col: 2 }, to: { row: 2, col: 4 } },
  ],
  '2-4': [
    { over: { row: 1, col: 3 }, to: { row: 0, col: 2 } },
    { over: { row: 2, col: 2 }, to: { row: 2, col: 0 } },
  ],
  '1-1': [
    { over: { row: 1, col: 2 }, to: { row: 1, col: 3 } },
  ],
  '1-3': [
    { over: { row: 1, col: 2 }, to: { row: 1, col: 1 } },
  ],
};

// src/shapes.ts

// Define Position type
export type Position = { row: number; col: number };

// Define captureMoves
const captureMoves: { [key: string]: { over: Position; to: Position }[] } = {
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

// Define validPositions
const validPositions: Position[] = [
  { row: 0, col: 2 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 2, col: 2 },
  { row: 2, col: 4 },
  { row: 2, col: 0 },
  { row: 3, col: 0 },
  { row: 3, col: 2 },
  { row: 3, col: 4 },
];

// Define Shape class
export class Shape {
  color: string;
  position: Position;
  type: string;
  selected: boolean;

  constructor(color: string, position: Position, type: string) {
    this.color = color;
    this.position = position;
    this.type = type;
    this.selected = false;
  }

  move(newPosition: Position) {
    this.position = newPosition;
  }

  toggleSelect() {
    this.selected = !this.selected;
  }

  validMove(newPosition: Position, shapes: Shape[]): boolean {
    shapes;
    return validPositions.some(
      (pos) => pos.row === newPosition.row && pos.col === newPosition.col
    );
  }

  takeMove(newPosition: Position, shapes: Shape[]): Shape[] {
    let updatedShapes = [...shapes];

    if (this.validMove(newPosition, shapes)) {
      const posKey = `${this.position.row}-${this.position.col}`;
      if (captureMoves[posKey]) {
        for (const move of captureMoves[posKey]) {
          if (move.to.row === newPosition.row && move.to.col === newPosition.col) {
            // Remove captured yellow circle
            updatedShapes = updatedShapes.filter(
              shape => !(shape.position.row === move.over.row && shape.position.col === move.over.col && shape.color === 'yellow')
            );
            break;
          }
        }
      }

      // Move the shape to the new position
      this.move(newPosition);
      this.selected = false;
    } else {
      console.warn('Move not valid');
    }

    return updatedShapes;
  }
}

type ValidMoves = {
  [key: string]: Position[];
};

export class Square extends Shape {
  constructor(color: string, position: Position) {
    super(color, position, 'square');
  }

  validMove(newPosition: Position, shapes: Shape[]): boolean {
    const { row, col } = this.position;
    const key = `${row}-${col}`;

    const validMoves: ValidMoves = {
      '0-2': [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
      ],
      '2-2': [
        { row: 2, col: 0 },
        { row: 2, col: 4 },
      ],
      '2-0': [
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ],
      '2-4': [
        { row: 1, col: 3 },
        { row: 2, col: 2 },
      ],
      '1-1': [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 0 },
      ],
      '1-3': [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 4 },
      ],
      '1-2': [
        { row: 1, col: 3 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
      ],
    };

    const moves = validMoves[key] || [];

    const isOccupied = (pos: Position) =>
      shapes.some(
        (shape) => shape.position.row === pos.row && shape.position.col === pos.col
      );

    if (captureMoves[key]) {
      for (const move of captureMoves[key]) {
        const overShape = shapes.find(
          (shape) => shape.position.row === move.over.row &&
                     shape.position.col === move.over.col &&
                     shape.color === 'yellow'
        );
        const toShape = shapes.find(
          (shape) => shape.position.row === move.to.row &&
                     shape.position.col === move.to.col
        );

        if (overShape && !toShape && move.to.row === newPosition.row && move.to.col === newPosition.col) {
          return true; // Valid capture move
        }
      }
    }

    return moves.some(
      (pos) => pos.row === newPosition.row && pos.col === newPosition.col
    ) && !isOccupied(newPosition);
  }
}

export class Circle extends Shape {
  constructor(color: string, position: Position) {
    super(color, position, 'circle');
  }

  validMove(newPosition: Position, shapes: Shape[]): boolean {
    shapes;
    const { row, col } = this.position;
    const key = `${row}-${col}`;

    const validMoves: ValidMoves = {
      '3-2': [
        { row: 2, col: 2 },
        { row: 3, col: 0 },
        { row: 3, col: 4 },
      ],
      '3-0': [{ row: 3, col: 2 }],
      '3-4': [{ row: 3, col: 2 }],
      '2-2': [
        { row: 2, col: 0 },
        { row: 2, col: 4 },
        { row: 3, col: 2 },
      ],
      '2-0': [
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ],
      '2-4': [
        { row: 1, col: 3 },
        { row: 2, col: 2 },
      ],
      '1-1': [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 0 },
      ],
      '1-3': [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 4 },
      ],
      '1-2': [
        { row: 1, col: 3 },
        { row: 1, col: 1 },
        { row: 0, col: 2 },
      ],
      '0-2': [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
      ],
    };

    const moves = validMoves[key] || [];

    return moves.some(
      (pos) => pos.row === newPosition.row && pos.col === newPosition.col
    );
  }
}

// Handle Cell Click
export function handleCellClick(row: number, col: number, shapes: Shape[]) {
  const selectedShape = shapes.find((shape) => shape.selected);
  if (selectedShape) {
    selectedShape.takeMove({ row, col }, shapes);
  }
}

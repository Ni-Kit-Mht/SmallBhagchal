import React, { useState } from 'react';
import { Square, Circle } from './shapes';
import './Map.css';

const initialRedSquare = new Square('red', { row: 0, col: 2 });
const yellowCircles = [
  new Circle('yellow', { row: 3, col: 0 }),
  new Circle('yellow', { row: 3, col: 2 }),
  new Circle('yellow', { row: 3, col: 4 })
];

const initialShapes = [initialRedSquare, ...yellowCircles];

const validPositions = [
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

const Map: React.FC = () => {
  const [shapes, setShapes] = useState(initialShapes);
  const [selectedShape, setSelectedShape] = useState<Square | Circle | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (selectedShape) {
      const updatedShapes = selectedShape.takeMove({ row, col }, shapes);
      setShapes(updatedShapes);
      setSelectedShape(null);
    }
  };

  const handleShapeClick = (shape: Square | Circle) => {
    shape.toggleSelect();
    setSelectedShape(shape.selected ? shape : null);
    setShapes([...shapes]);
  };

  const renderCell = (row: number, col: number) => {
    const shape = shapes.find(
      (shape) => shape.position.row === row && shape.position.col === col
    );

    if (shape) {
      return (
        <div
          className={`shape ${shape.type} ${shape.selected ? 'selected' : ''}`}
          style={{ backgroundColor: shape.color }}
          onClick={() => handleShapeClick(shape)}
        ></div>
      );
    }

    if (validPositions.some(pos => pos.row === row && pos.col === col)) {
      return <div className="cell" onClick={() => handleCellClick(row, col)}></div>;
    }

    return <div className="cell disabled"></div>;
  };

  const renderGrid = () => {
    const cells = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        cells.push(
          <div key={`${row}-${col}`} className="cell-wrapper">
            {renderCell(row, col)}
          </div>
        );
      }
    }

    return cells;
  };

  return <div className="map">{renderGrid()}</div>;
};

export default Map;

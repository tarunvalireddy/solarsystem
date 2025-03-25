import React from 'react';
import { Position } from '../types';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  gameOver: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize, gameOver }) => {
  const cells = Array(gridSize).fill(null).map((_, row) =>
    Array(gridSize).fill(null).map((_, col) => {
      const isSnake = snake.some(segment => segment.x === col && segment.y === row);
      const isFood = food.x === col && food.y === row;
      
      return (
        <div
          key={`${row}-${col}`}
          className={`
            w-5 h-5 border border-gray-800
            ${isSnake ? 'bg-green-500' : ''}
            ${isFood ? 'bg-red-500' : ''}
            ${!isSnake && !isFood ? 'bg-gray-900' : ''}
            ${gameOver ? 'opacity-50' : ''}
          `}
        />
      );
    })
  );

  return (
    <div className="grid gap-0" style={{ 
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` 
    }}>
      {cells}
    </div>
  );
};

export default GameBoard;
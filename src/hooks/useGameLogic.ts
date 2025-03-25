import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const GAME_SPEED = 150;

const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    highScore: 0
  });

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };

    // Ensure food doesn't spawn on snake
    if (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    return newFood;
  }, [gameState.snake]);

  const moveSnake = useCallback(() => {
    if (gameState.gameOver) return;

    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };

    switch (gameState.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        highScore: Math.max(prev.score, prev.highScore)
      }));
      return;
    }

    newSnake.unshift(head);

    // Check if snake ate food
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      setGameState(prev => ({
        ...prev,
        food: generateFood(),
        score: prev.score + 1
      }));
    } else {
      newSnake.pop();
    }

    setGameState(prev => ({
      ...prev,
      snake: newSnake
    }));
  }, [gameState, generateFood]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    
    setGameState(prev => {
      const newDirection: Direction = 
        key === 'arrowup' || key === 'w' ? 'UP' :
        key === 'arrowdown' || key === 's' ? 'DOWN' :
        key === 'arrowleft' || key === 'a' ? 'LEFT' :
        key === 'arrowright' || key === 'd' ? 'RIGHT' :
        prev.direction;

      // Prevent 180-degree turns
      const invalidMove = 
        (prev.direction === 'UP' && newDirection === 'DOWN') ||
        (prev.direction === 'DOWN' && newDirection === 'UP') ||
        (prev.direction === 'LEFT' && newDirection === 'RIGHT') ||
        (prev.direction === 'RIGHT' && newDirection === 'LEFT');

      return {
        ...prev,
        direction: invalidMove ? prev.direction : newDirection
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      snake: INITIAL_SNAKE,
      food: generateFood(),
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
      highScore: prev.highScore
    }));
  }, [generateFood]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [moveSnake, handleKeyPress]);

  return {
    gameState,
    resetGame,
    GRID_SIZE
  };
}

export default useGameLogic;
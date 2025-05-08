import React, { useState, useRef, useEffect } from 'react';
import DirectionalKeys from './DirectionalKeys.jsx';
import { NORTH, EAST, WEST, SOUTH } from './directions.js';
import { SNAKE, FOOD } from './entities.js';
import { randInt, range, choice } from './utilities.js';


function spawnFood(grid) {
    //We really don't want to spawn the food on the snake!
    const emptySlots = [];
   
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] !== SNAKE) {
            emptySlots.push(i);
        }
    }
    
    grid[choice(emptySlots)] = FOOD;
}

function createGrid(rows, columns) {
    //Not a real grid though.
    const grid = new Array(rows * columns).fill('');
    grid[0] = SNAKE;
    grid[1] = SNAKE;
    grid[2] = SNAKE;
    
    spawnFood(grid);
    
    return grid;
}

export default function SnakeGame({rows, columns}) {
    const grid = useRef(createGrid(rows, columns));
    const [headIndex, setHeadIndex] = useState(2);
    const [isPlaying, setPlayingState] = useState(true); //Snake moves when game is launched
    const headIndexRef = useRef(headIndex);
    const snake = useRef([0, 1, 2]);
    const direction = useRef(EAST);
    const score = useRef(0);
  
    useEffect(() => {
    
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
      
            const currentHeadIndex = headIndexRef.current;
            let nextHeadIndex;
            
            if (direction.current == EAST) {
                nextHeadIndex = ((currentHeadIndex + 1) % rows === 0) ? (currentHeadIndex + 1) - rows : currentHeadIndex + 1;
            } else if (direction.current === WEST) {
                nextHeadIndex = (currentHeadIndex % rows === 0) ? currentHeadIndex + (rows - 1) : currentHeadIndex - 1;
            } else if (direction.current === SOUTH) {
                nextHeadIndex = ((currentHeadIndex >= ((rows * columns) - rows)) && (currentHeadIndex < (rows * columns))) ? currentHeadIndex - ((rows * columns) - rows) : currentHeadIndex + rows;
            } else if (direction.current === NORTH) {
                nextHeadIndex = (currentHeadIndex >= 0 && currentHeadIndex < rows) ? currentHeadIndex + ((rows * columns) - rows) : currentHeadIndex - rows;
            }

            const nextEntity = grid.current[nextHeadIndex];
            
            if (nextEntity === SNAKE) {
                setPlayingState(false);
            } else {
                snake.current.push(nextHeadIndex);
                grid.current[nextHeadIndex] = grid.current[currentHeadIndex];
                
                if (nextEntity === FOOD) {
                    score.current++;
                    new Audio('/game-ball-tap-sound.wav').play();
                    spawnFood(grid.current);
                } else {
                    grid.current[snake.current.shift()] = '';
                }
                headIndexRef.current = nextHeadIndex;
                setHeadIndex(index => nextHeadIndex);
            }
            
            
        }, 150);
       
        return () => clearInterval(interval);
    }, [isPlaying])
    
    const floor = grid.current.map((item, index) => {
        if (item === SNAKE) {
            return <div key={index} className={`snake ${(index === headIndex) ? 'head' : 'body'}`} />; //but no tail!
        } else if (item === FOOD) {
            return <div key={index} className="food" />;
        } else {
            return <div key={index} className="tile" />;
        }
    });
    
    const gameOverScreen = <div className="game-over-screen">
        <p>GAME OVER!</p>
        <button onClick={() => {
            grid.current = createGrid(rows, columns);
            score.current = 0;
            snake.current = [0, 1, 2];
            direction.current = EAST;
            headIndexRef.current = 2;
            setPlayingState(true);
        }}>restart</button>
    </div>;
    
    return (
            <div className="snake-game-container">
                <div className="score-board">
                    <p>score: {score.current}</p>
                </div>
                { (!isPlaying) ? gameOverScreen : <div className="floor">{ floor }</div> }
                <DirectionalKeys
                    upEvent={() => {
                        if (direction.current !== SOUTH) {
                            direction.current = NORTH
                        }
                            
                    }}
                    leftEvent={() => {
                        if (direction.current !== EAST) {
                            direction.current = WEST
                        }
                    }}
                    rightEvent={() => {
                        if (direction.current !== WEST) {
                            direction.current = EAST
                        }
                    }}
                    downEvent={() => {
                        if (direction.current !== NORTH) {
                            direction.current = SOUTH
                        }
                    }}
                    />
            </div>
    );

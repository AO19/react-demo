import { useContext, useState } from 'react';
import { Board } from '.';
import { LogContext } from '../App';

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const { addLog } = useContext(LogContext);

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    addLog(`${xIsNext ? 'X' : 'O'} Played move #${currentMove + 1}`);
  }

  function jumpTo(nextMove: number) {
    return function () {
      setCurrentMove(nextMove);
      addLog(`Jumped to move #${nextMove}`);
    };
  }

  const moves = history.map((_squares, index) => {
    const description = index ? 'Go to move #' + index : 'Go to game start';

    return (
      <li key={index}>
        <button onClick={jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

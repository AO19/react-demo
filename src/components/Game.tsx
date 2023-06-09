import { useCallback, useContext, useMemo, useState } from 'react';
import { Board } from '.';
import { LogContext } from '../App';

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const { addLog } = useContext(LogContext);

  const currentSquares = useMemo(
    () => history[currentMove],
    [history, currentMove]
  );

  const handlePlay = useCallback(
    (nextSquares: string[]) => {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      addLog(`${xIsNext ? 'X' : 'O'} Played move #${currentMove + 1}`);
    },
    [history, currentMove, xIsNext, addLog]
  );

  const jumpTo = useCallback(
    (nextMove: number) => () => {
      setCurrentMove(nextMove);
      addLog(`Jumped to move #${nextMove}`);
    },
    [addLog]
  );

  const moves = useMemo(
    () =>
      history.map((_squares, index) => {
        const description = index ? 'Go to move #' + index : 'Go to game start';

        return (
          <li key={index}>
            <button onClick={jumpTo(index)}>{description}</button>
          </li>
        );
      }),
    [history, jumpTo]
  );

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

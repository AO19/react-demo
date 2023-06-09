import { Fragment, useCallback, useMemo } from 'react';
import { Square } from '.';
import { calculateWinner } from '../utils';

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
};

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const handleClick = useCallback(
    (i: number) => {
      return function () {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
          nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
      };
    },
    [squares, xIsNext, onPlay]
  );

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const status = useMemo(
    () =>
      winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O'),
    [winner, xIsNext]
  );

  return (
    <Fragment>
      <div className='status'>{status}</div>
      {[...Array(3)].map((_, row) => (
        <div className='board-row' key={row}>
          {[...Array(3)].map((_, col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </Fragment>
  );
}

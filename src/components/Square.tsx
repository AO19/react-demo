type SquareProps = {
  value: string;
  onSquareClick: () => void;
};

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

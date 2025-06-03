/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, it, expect } from 'vitest';
import { Game } from '../../model/game';
import { Players, Square } from '../../types';

const getSquares = () => {
  const s: Square[] = [];
  for (let i = 0; i < 9; i++) {
    s.push({
      id: i,
      isSelected: false,
      isWinner: false,
      player: 'none',
    });
  }
  return s;
};

describe('Test the game logic', () => {
  it('npc next move', () => {
    const squares: Square[] = [
      { id: 0, isSelected: false, isWinner: false, player: 'none' },
      { id: 1, isSelected: false, isWinner: false, player: 'none' },
      { id: 2, isSelected: false, isWinner: false, player: 'none' },
      { id: 3, isSelected: false, isWinner: false, player: 'none' },
      { id: 4, isSelected: false, isWinner: false, player: 'none' },
      { id: 5, isSelected: false, isWinner: false, player: 'none' },
      { id: 6, isSelected: false, isWinner: false, player: 'none' },
      { id: 7, isSelected: false, isWinner: false, player: 'none' },
      { id: 8, isSelected: false, isWinner: false, player: 'none' },
    ];
    const matrix = new Game(squares);

    for (let i = 0; i < 1000; i++) {
      const t = matrix.GetNextNpcMove();
      if (t === -99) {
        throw 'invalid move detected';
      }
    }
  }),
    it('winning scenarios - by rows', () => {
      //in our 3x3 matrix check for a win
      //for each of the 3 rows (having 3 squares)

      for (let i = 0; i < 9; ) {
        const matrix = new Game(getSquares());
        matrix.SetPlayer('o', i);
        matrix.SetPlayer('o', i + 1);
        matrix.SetPlayer('o', i + 2);
        check(matrix, [i + 2, i + 1, i], 'o');
        i += 3;
      }
    }),
    it('winning scenarios - by columns', () => {
      //in 3x3 matrix check for a win
      //for each of the 3 columns (having 3 squares)

      for (let i = 0; i < 3; i++) {
        const matrix = new Game(getSquares());
        matrix.SetPlayer('x', i);
        matrix.SetPlayer('x', i + 3);
        matrix.SetPlayer('x', i + 6);
        check(matrix, [i, i + 3, i + 6], 'x');
      }
    }),
    it('winning scenarios - by diagonal', () => {
      //in 3.3 matrix check for a win for the diagonals
      //top left-> bottom right and top right -> bottom left

      for (let i = 0; i < 2; i++) {
        const matrix = new Game(getSquares());
        matrix.SetPlayer('o', i === 0 ? i : 2);
        matrix.SetPlayer('o', i === 0 ? i + 4 : i + 3);
        matrix.SetPlayer('o', i === 0 ? i + 8 : i + 5);
        check(
          matrix,
          [i === 0 ? i : 2, i === 0 ? i + 4 : i + 3, i === 0 ? i + 8 : i + 5],
          'o'
        );
      }
    });
  it('winning scenarios - by diagonal2', () => {
    //in 3.3 matrix check for a win for the diagonals
    //top left-> bottom right and top right -> bottom left

    const matrix = new Game(getSquares());
    matrix.SetPlayer('x', 1);
    matrix.SetPlayer('o', 2);
    console.log('----> ' + JSON.stringify(matrix.GetWinner()));
  });
});

const check = (matrix: Game, ex: number[], player: Players) => {
  const win = matrix.GetWinner();
  expect(win.winner, 'Incorrect player found').toBe(player);
  expect(win.ids, 'Incorrect coordinates found').toStrictEqual(ex);
};

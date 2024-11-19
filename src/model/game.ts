import { Players, Square, WinResponse } from '../types';

export class Game {
  #squares: Square[] = [];

  constructor(squares: Square[]) {
    this.#squares = squares;
  }
  GetSquare(id: number): Square | undefined {
    return this.#squares.find((s) => s.id === id);
  }
  GetSquares(): Square[] {
    return this.#squares;
  }
  GetNextNpcMove(): number {
    let avail: number[] = [];
    let res = -99;
    this.#squares.forEach((s) => {
      if (!s.isSelected) avail.push(s.id);
    });
    if (avail.length < 1) return res;
    let rando = -1;
    let failsafe = 0;
    while (failsafe < 30) {
      failsafe++;
      rando = Math.floor(Math.random() * 9);
      if (avail.includes(rando)) {
        res = rando;
        break;
      }
    }
    return res;
  }

  SetPlayer(player: Players, id: number) {
    let match = this.#squares.find((s) => s.id === id);
    if (match) {
      match.player = player;
      match.isSelected = true;
    }
  }
  GetWinner(): WinResponse {
    let res: WinResponse = { hasWinner: false, winner: 'none' };
    let x = null;
    (x = this.#GetWinRows()).hasWinner
      ? (res = x)
      : (x = this.#GetWinColumns()).hasWinner
      ? (res = x)
      : (res = this.#GetDiagonalWin());
    return res;
  }
  #GetWinRows(): WinResponse {
    let res: WinResponse = { hasWinner: false, winner: 'none' };
    let t: number[] = [];

    this.#squares.forEach((s) => {
      //abort when we have a winner
      if (res.hasWinner) return;
      //push player value into the array to be added
      if (s.player === 'x') t.push(3);
      if (s.player === 'o') t.push(4);
      //if reached end of row add and chech for win
      if ((s.id + 1) % 3 === 0) {
        let tot = 0;
        t.forEach((i) => (tot += i));
        if (tot === 9) {
          res.hasWinner = true;
          res.winner = 'x';
          res.ids = [s.id, s.id - 1, s.id - 2];
        } else if (tot === 12) {
          res.hasWinner = true;
          res.ids = [s.id, s.id - 1, s.id - 2];
          res.winner = 'o';
        }
        //reset t for next iteration
        t = [];
      }
    });
    return res;
  }
  #GetWinColumns(): WinResponse {
    let res: WinResponse = { hasWinner: false, winner: 'none' };
    let t = 0;
    for (let i = 0; i < 3; i++) {
      if (res.hasWinner) break;
      let cols = this.#GetColumn(i);
      if (cols) {
        cols.forEach(
          (c) => (t += c.player === 'none' ? 0 : c.player === 'x' ? 3 : 4)
        );
        let ids = (res.ids = cols.map((n) => n.id));
        if (t === 9) {
          res.hasWinner = true;
          res.winner = 'x';
          res.ids = ids;
        } else if (t === 12) {
          res.hasWinner = true;
          res.winner = 'o';
          res.ids = ids;
        }
        t = 0;
      }
    }
    //console.log('Cols: ', res.hasWinner, res.winner);
    return res;
  }

  #GetColumn(col: number): Square[] | undefined {
    if (!this.#squares || this.#squares.length < 1) return undefined;
    let s = this.#squares.length / 3;
    if (col > s) return undefined;
    return [this.#squares[col], this.#squares[col + 3], this.#squares[col + 6]];
  }

  #GetDiagonal(): Square[][] {
    return [
      [this.#squares[0], this.#squares[4], this.#squares[8]],
      [this.#squares[2], this.#squares[4], this.#squares[6]],
    ];
  }
  #GetDiagonalWin(): WinResponse {
    let res: WinResponse = { hasWinner: false, winner: 'none' };

    let diagonals = this.#GetDiagonal();

    diagonals.forEach((d) => {
      if (res.hasWinner) return;
      let t = 0;
      d.forEach(
        (item) =>
          (t += item.player === 'none' ? 0 : item.player === 'x' ? 3 : 4)
      );
      let ids = (res.ids = d.map((n) => n.id));
      if (t === 9) {
        res.hasWinner = true;
        res.winner = 'x';
        res.ids = ids;
      } else if (t === 12) {
        res.hasWinner = true;
        res.winner = 'o';
        res.ids = ids;
      }
    });
    return res;
  }
}

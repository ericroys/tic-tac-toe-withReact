export type PlayerX = 'x';
export type PlayerO = 'o';
export type PlayerNone = 'none';
export type Players = PlayerNone | PlayerX | PlayerO;
export type SelectablePlayers = PlayerO | PlayerX;

export type Square = {
  player: Players;
  isSelected: boolean;
  id: number;
  isWinner: boolean;
};

export type Move = {
  player: SelectablePlayers;
  id: number;
};

export type GameState = {
  status: string;
  nextTurn: SelectablePlayers;
  winner: Players;
  squares: Square[];
  playingAs: SelectablePlayers;
};

export type WinResponse = {
  ids?: number[];
  winner: Players;
  hasWinner: boolean;
};

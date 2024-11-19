import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  GameState,
  Move,
  SelectablePlayers,
  Square,
  WinResponse,
} from '../types';
import { RootState } from '../store';
import { Game } from './game';

const getSquares = () => {
  let s: Square[] = [];
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

const initialState: GameState = {
  status: 'ready',
  nextTurn: 'x',
  squares: getSquares(),
  winner: 'none',
  playingAs: 'o',
};

export const gameReducer = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    move: (state, action: PayloadAction<Move>) => {
      let { player, id } = action.payload;
      state.nextTurn = player === 'o' ? 'x' : 'o';
      state.squares.map((s) => {
        if (s.id === id) {
          s.isSelected = true;
          s.player = player;
        }
        return s;
      });
      return state;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calcWinner.pending, (state) => {
        state.status = 'calcwin_pending';
      })
      .addCase(calcWinner.fulfilled, (state, action) => {
        if (action.payload) {
          let { hasWinner, ids, winner } = action.payload;
          state.status = 'calcwin_complete';
          if (hasWinner) {
            state.winner = winner;
            state.squares = [
              ...state.squares.map((s) => {
                ids?.includes(s.id)
                  ? (s.isWinner = true)
                  : (s.isWinner = false);
                return s;
              }),
            ];
          }
        }
      })
      .addCase(NpcNextMove.pending, (state) => {
        state.status = 'npcmove_pending';
      })
      .addCase(NpcNextMove.fulfilled, (state) => {
        state.status = 'npcmove_complete';
      });
  },
});

export const { move, reset } = gameReducer.actions;
export const SelectStatus = (state: RootState) => state.reducer.game.status;
export const SelectAllSquares = (state: RootState) =>
  state.reducer.game.squares;
export const SelectPlayingAs = (state: RootState) =>
  state.reducer.game.playingAs;
export const SelectNextMove = (state: RootState) => state.reducer.game.nextTurn;

export const SelectAvailableSquares = createSelector(
  [(state: RootState) => state.reducer.game.squares],
  (avSquares) => {
    return avSquares.filter((square) => square.isSelected === false);
  }
);

const selectBySquareId = (_state: RootState, id: number) => id;

export const SelectSquareById = createSelector(
  [SelectAllSquares, selectBySquareId],
  (squares, id) => {
    let res = squares.filter((i) => {
      return i.id === id;
    });
    return res && res.length > 0 ? res[0] : undefined;
  }
);

export const GameOver = createSelector(
  [(state: RootState) => state.reducer.game.winner],
  (winner) => {
    return winner === 'none' ? false : true;
  }
);

export const calcWinner = createAsyncThunk<
  WinResponse,
  void,
  { state: RootState }
>('game/calculatewin', async (_, { getState }) => {
  const { squares } = getState().reducer.game;
  let winner = new Game(squares).GetWinner();
  return winner;
});

export const NpcNextMove = createAsyncThunk<number, void, { state: RootState }>(
  'game/npcnextmove',
  async (_, { getState }) => {
    const { squares } = getState().reducer.game;
    let m = new Game(squares).GetNextNpcMove();
    return m;
  }
);

export const MovePlayer = createAsyncThunk<void, Move, { state: RootState }>(
  'game/moveplayer',
  async (playerMove: Move, { dispatch }) => {
    dispatch(move(playerMove));
    dispatch(calcWinner());
  }
);

export const MoveNpc = createAsyncThunk<void, void, { state: RootState }>(
  'game/movenpc',
  async (_, { dispatch, getState }) => {
    let moveid = await dispatch(NpcNextMove());
    let player: SelectablePlayers =
      getState().reducer.game.playingAs === 'o' ? 'x' : 'o';
    dispatch(move({ id: moveid.payload as number, player: player }));
    await dispatch(calcWinner());
  }
);

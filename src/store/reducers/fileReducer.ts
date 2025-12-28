import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { FileInput, FileMeta, FileMetaState } from "../../types";
import { dbSaveFile } from "../../controller/fileController";
import { RootState } from "../game";

//initial state for the store
const initialState: FileMetaState = [];

/**
 * Define a file reducer that handles add/update of files
 * where update is set in store for handling events to 
 * components and actual files are stored in indexdb
 */
export const fileReducer = createSlice({
    name: 'files',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //when saveFile thunk completes, store updated state of the
            //file metadata
            .addCase(saveFile.fulfilled, (state, action: PayloadAction<FileMeta>) => {
                const input = action.payload;
                if (!input) return state;
                let idx = state.findIndex(f => f.id === input.id);
                if (idx > -1) {
                    state[idx] = input;
                } else {
                    state.push(input);
                }
            })
    }
})

/**
 * Asynchronously save a file to the db and update the state
 */
export const saveFile = createAsyncThunk<
    FileMeta,
    FileInput,
    { state: RootState }>
    ('files/saveFile',
        async (input: FileInput) => {
            try {
                //save to db
                await dbSaveFile(input);
                return {
                    id: input.id,
                    updated: Date.now()
                }
            } catch (e) {
                console.error(e);
            }
            return {
                id: input.id,
                updated: Date.now()
            }
        }
    );

const selectByKey = (_state: RootState, key: string) => key;
const selectAll = (state: RootState) => state.reducer.files;

/**
 * Select File Updated returns the updated timestamp for
 * a given key
 */
export const SelectFileUpdated = createSelector(
    [selectAll, selectByKey],
    (files, key) => {
        const res = files.find(f => f.id === key);
        return res ? res.updated : undefined
    }
);
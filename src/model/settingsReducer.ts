import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Setting, Settings } from '../types';

const initialState: Settings = [];

export const settingsReducer = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<Setting>) => {
      const setting = action.payload;
      if (!setting) return;
      const idx = state.findIndex((i) => i.key === setting.key );
      if(idx > -1) state[idx] = setting;
      else state.push(setting);
    },
  },
});

const selectSettingByKey = (_state:RootState, key: string) => key;

export const { setSetting } = settingsReducer.actions;
export const SelectAllSettings = (state: RootState) => state.reducer.settings;
export const SelectSettingByKey = createSelector(
  [SelectAllSettings, selectSettingByKey],
  (settings, key) => {
    const res = settings.filter((s) => {
      return s.key === key;
    });
    return res && res.length > 0 ? res[0].value : undefined
  }
)

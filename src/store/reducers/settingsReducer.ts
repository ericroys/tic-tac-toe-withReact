import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../game';
import { Setting, Settings } from '../../types';
import { DefaultSettings } from '../../data/default_settings';

const initialState: Settings = [...DefaultSettings];

export const settingsReducer = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<Setting>) => {
      const setting = action.payload;
      if (!setting) return;
      const idx = state.findIndex((i) => i.key === setting.key);
      if (idx > -1) state[idx] = setting;
      else state.push(setting);
    },
  },
});

export const { setSetting } = settingsReducer.actions;

/*** Selectors ***/
const selectSettingByKey = (_state: RootState, key: string) => key;

/** Get all settings */
export const SelectAllSettings = (state: RootState) => state.reducer.settings;

/**
 * Get a value for one of the settings using the key
 */
export const SelectSettingByKey = createSelector(
  [SelectAllSettings, selectSettingByKey],
  (settings, key) => {
    const res = settings.filter((s) => {
      return s.key === key;
    });
    return res && res.length > 0 ? res[0].value : undefined
  }
)

/**
 * Returns true if there is a value defined for the setting (key)
 * otherwise false. 
 */
export const SelectSettingHasValue = createSelector(
  [SelectAllSettings, selectSettingByKey],
  (settings, key) => {
    const res = settings.filter((s) => {
      return s.key === key && s.value;
    });
    return res && res.length > 0 && res[0] ? true : false
  }
)
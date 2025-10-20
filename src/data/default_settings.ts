import { Setting, SettingsMeta } from "../types";

export const BORDERCOLOR = 'borderColor';
export const BOARDCOLOR = 'boardColor';
export const CELLCOLOR = 'cellColor';
export const PLAYEROCOLOR = 'playerOColor';
export const PLAYERXCOLOR = 'playerXColor';
export const WINCOLOR = 'winColor';

export const DefaultSettings : Setting[] = 
[
    {key: BORDERCOLOR, value: '#ffffff'},
    {key: BOARDCOLOR, value: '#ffffff'},
    {key: CELLCOLOR, value: '#ffffff'}, 
    {key: PLAYEROCOLOR, value: '#000000'},
    {key: PLAYERXCOLOR, value: '#000000'},
    {key: WINCOLOR, value: '#ff0000'}
]

export const SettingsFields : SettingsMeta = [
    {id: BORDERCOLOR, inputType: 'color', label: 'Border Color'}, 
    {id: BOARDCOLOR, inputType: 'color', label: 'Board Color'},
    {id: CELLCOLOR, inputType: 'color', label: 'Cell Color'},
    {id: PLAYEROCOLOR, inputType: 'color', label: 'Player O Color'},
    {id: PLAYERXCOLOR, inputType: 'color', label: 'Player X Color'},
    {id: WINCOLOR, inputType: 'color', label: 'Color for the Win'}
]
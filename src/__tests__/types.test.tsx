import { describe, it, expect } from 'vitest';
import { Settings } from '../types';

describe('Test setting types', () => {
  it('setting array', () => {
    const settings: Settings = [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
      ];

    const res = settings.filter((i) => i.key === 'key1');
    expect(res[0].value).toBe('value1');
  });
});

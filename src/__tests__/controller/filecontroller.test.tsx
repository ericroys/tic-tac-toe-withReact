import { describe, it, expect, afterEach } from 'vitest';
import {
  dbClean,
  dbDeleteFile,
  dbSaveFile,
  dbGetFile,
} from '../../controller/fileController';

import type { FileInput } from '../../types';

describe('IndexedDB file-store', () => {
  const createFile = (name = 'test.txt') =>
    new File(['hello'], name, { type: 'text/plain' });

  const mockFileInput = (id: string): FileInput => ({
    id,
    file: createFile(),
  });

  afterEach(async () => {
    await dbClean();
  });

  it('saves and retrieves a file', async () => {
    const input = mockFileInput('1');

    const savedId = await dbSaveFile(input);
    expect(savedId).toBe('1');

    const file = await dbGetFile('1');
    expect(file).toBeInstanceOf(File);
    expect(file?.name).toBe('test.txt');
  });

  it('returns undefined for missing file', async () => {
    const file = await dbGetFile('missing');
    expect(file).toBeUndefined();
  });

  it('deletes a file by id', async () => {
    await dbSaveFile(mockFileInput('2'));

    const removedId = await dbDeleteFile('2');
    expect(removedId).toBe('2');

    const file = await dbGetFile('2');
    expect(file).toBeUndefined();
  });

  it('cleans all files', async () => {
    await dbSaveFile(mockFileInput('a'));
    await dbSaveFile(mockFileInput('b'));

    await dbClean();

    expect(await dbGetFile('a')).toBeUndefined();
    expect(await dbGetFile('b')).toBeUndefined();
  });

  it('returns undefined when id is empty', async () => {
    const file = await dbGetFile('');
    expect(file).toBeUndefined();
  });

  it('delete does nothing when id is empty', async () => {
    const result = await dbDeleteFile('');
    expect(result).toBeUndefined();
  });
});

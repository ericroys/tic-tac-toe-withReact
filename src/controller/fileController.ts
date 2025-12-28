// import { set, del, clear, get } from 'idb-keyval'
import {openDB} from 'idb';
import { FileInput } from '../types';

// our store name
const STORE_NAME = 'files';

//initialization
export const dbPromise = openDB('file-store', 1, {
    upgrade(db){
        db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: false
        })
    }
});


/** wrapper functions for crud of db items */

/**
 * Clears all items from the db
 */
const cleanAll = async () => {
    const db = await dbPromise;
    await db.clear(STORE_NAME);
}

/**
 * Remove an item from the file store
 * @param {string} id 
 * @returns {string} the id of the object removed
 */
const removeFile = async (id: string) => {
    if (!id) return;
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
    return id;
}

/**
 * Saves a file to the filestore as FileInput object
 * @param {FileInput} file input object
 * @returns {string} id of the object saved
 */
const saveFile = async (file: FileInput) => {
    const db = await dbPromise;
    await db.put(STORE_NAME, file);
    return file.id;
}


/**
 * Get a file from the filestore using its id/key
 * @param {string} id the identifier of the file to retrieve 
 * @returns {File | undefined}
 */
const getFile = async (id: string) => {

    if (!id) return undefined;
    const db = await dbPromise;
    const x =  await db.get(STORE_NAME, id) as FileInput | undefined;
    //just want the actual file or undefined
    return x ? x.file : undefined
}

export {
    cleanAll as dbClean,
    removeFile as dbDeleteFile,
    saveFile as dbSaveFile,
    getFile as dbGetFile,
}
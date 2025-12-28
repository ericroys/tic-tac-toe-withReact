
/**
 * Convert File to Base64 encoded string
 * @param {File} file a file object to transform
 * @returns {Promise<string | undefined>}
 */
export const fileToBase64 = (file: File):Promise<string|undefined> => {
    return new Promise((resolve, reject) => {
        if(!file) resolve(undefined);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}
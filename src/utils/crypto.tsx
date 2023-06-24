export function encrypt(text: string, key: number): string {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const encryptedCharCode = charCode + key; // Add key to charCode
        encrypted += String.fromCharCode(encryptedCharCode);
    }
    return encrypted;
}

export function decrypt(encryptedText: string, key: number): string {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        const decryptedCharCode = charCode - key; // Subtract key from charCode
        decrypted += String.fromCharCode(decryptedCharCode);
    }
    return decrypted;
}
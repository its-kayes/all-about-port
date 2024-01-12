// Function to encrypt a message using Caesar Cipher
export function encrypt(message: string, key: number): string {
  let encryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i);

    encryptedMessage += String.fromCharCode(charCode + key);
  }

  return encryptedMessage;
}

// Function to decrypt a message using Caesar Cipher
export function decrypt(encryptedMessage: string, key: number): string {
  let decryptedMessage = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    let charCode = encryptedMessage.charCodeAt(i);

    decryptedMessage += String.fromCharCode(charCode - key);
  }

  return decryptedMessage;
}

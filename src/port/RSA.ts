import * as crypto from "crypto";

// Function to generate RSA key pair
function generateKeyPair() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
}

// Function to encrypt using RSA public key
function encryptWithPublicKey(publicKey: string, message: string): string {
  const bufferMessage = Buffer.from(message, "utf-8");
  const encrypted = crypto.publicEncrypt(publicKey, bufferMessage);
  return encrypted.toString("base64");
}

// Function to decrypt using RSA private key
function decryptWithPrivateKey(
  privateKey: string,
  encryptedMessage: string
): string {
  const bufferEncrypted = Buffer.from(encryptedMessage, "base64");
  const decrypted = crypto.privateDecrypt(privateKey, bufferEncrypted);
  return decrypted.toString("utf-8");
}

// Example usage
const { publicKey, privateKey } = generateKeyPair();

console.log(privateKey, publicKey);

const originalMessage = "Hello, RSA!";
export const encryptedMessage = encryptWithPublicKey(
  publicKey,
  originalMessage
);
console.log("Encrypted:", encryptedMessage);

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);
console.log("Decrypted:", decryptedMessage);

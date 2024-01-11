import * as crypto from "crypto";

// Function to generate a random 12-byte IV (Initialization Vector)
function generateIV(): Buffer {
  return crypto.randomBytes(12);
}

// Function to generate a random 16-byte key
function generateKey(): Buffer {
  return crypto.randomBytes(16);
}

// Function to encrypt a message using AES-GCM
export function encrypt(
  message: string,
  key: Buffer,
  iv: Buffer
): { encrypted: Buffer; tag: Buffer } {
  const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
  const encryptedBuffer = Buffer.concat([
    cipher.update(message, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return { encrypted: encryptedBuffer, tag };
}

export function encryptWithString(
  message: string,
  key: string,
  iv: string
): { encrypted: Buffer; tag: Buffer } {
  const binaryKey = Buffer.from(key, "base64");
  const binaryIv = Buffer.from(iv, "base64");
  const cipher = crypto.createCipheriv("aes-128-gcm", binaryKey, binaryIv);
  const encryptedBuffer = Buffer.concat([
    cipher.update(message, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return { encrypted: encryptedBuffer, tag };
}

// Function to decrypt a message using AES-GCM
function decrypt(
  encrypted: Buffer,
  key: Buffer,
  iv: Buffer,
  tag: Buffer
): string {
  const decipher = crypto.createDecipheriv("aes-128-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decryptedBuffer = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decryptedBuffer.toString("utf8");
}

// Example usage
// const originalMessage: string = "Hello, AES-GCM!";
// const key: Buffer = generateKey();
// const iv: Buffer = generateIV();

// export const { encrypted, tag } = encrypt(originalMessage, key, iv);
// console.log("Encrypted:", encrypted.toString("hex"));

// const decryptedMessage: string = decrypt(encrypted, key, iv, tag);
// console.log("Decrypted:", decryptedMessage);

// function generateIV(): Buffer {
//   return crypto.randomBytes(12);
// }

// function generateKey(): Buffer {
//   console.log(crypto.randomBytes(16).toString("hex"));
//   return crypto.randomBytes(16);
// }

function stringToBuffer(inputString: string, type: "key" | "iv"): string {
  let buffer: Buffer;

  if (type === "key") {
    buffer = Buffer.from(inputString, "utf8").subarray(0, 16);
  } else {
    buffer = Buffer.from(inputString, "utf8").subarray(0, 12);
  }

  return buffer.toString("base64");
}

const obj = {
  kayes: "kayes",
};
// encrypted.toString("hex");
const { encrypted, tag } = encryptWithString(
  JSON.stringify(obj),
  stringToBuffer("e4b684f8e68088510cad", "key"),
  stringToBuffer("e4b684f8e68088510", "iv")
);

console.log(encrypted.toString("hex"), tag.toString("hex"));

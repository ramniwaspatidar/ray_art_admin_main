import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key"; 

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
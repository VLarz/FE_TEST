import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoJSService {

  constructor() { }

  // The set method is use for encrypt the value or object.
  encrypt(value): any {
    return CryptoJS.AES.encrypt(JSON.stringify(value), 'pass').toString();
  }

  // The get method is use for decrypt the value or object.
  decrypt(value): any {
    const decrypted = CryptoJS.AES.decrypt(value, 'pass');
    value = CryptoJS.enc.Utf8.stringify(decrypted);
    return JSON.parse(value);
  }
}

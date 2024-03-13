/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private iv!: BufferSource;
  private key!: CryptoKey;
  private bufferAlgo: string = 'AES-CBC';
  private hashAlgo: string = 'SHA-512';

  async init(key: string, iv: string) {
    if (typeof window === 'undefined') return '';
    this.key = await this.keyBuffer(key);
    this.iv = await this.ivBuffer(iv);
    return this;
  }

  async encryptData(data: string): Promise<string> {
    if (typeof window === 'undefined') return '';
    const encodedData = this.arrayBuffer(data);

    const aesEncryptParams: AesCbcParams = {
      name: this.bufferAlgo,
      iv: this.iv,
    };

    const encryptedData: ArrayBuffer = await window.crypto.subtle.encrypt(
      aesEncryptParams,
      this.key,
      encodedData
    );

    const encryptedBytes = Array.from(new Uint8Array(encryptedData));
    const b64Data = btoa(String.fromCharCode.apply(null, encryptedBytes));
    return b64Data;
  }

  private arrayBuffer(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  private async keyBuffer(secret: string): Promise<CryptoKey> {
    const name = this.bufferAlgo;
    const key = (await this.generateHash(secret)).slice(0, 32);
    return window.crypto.subtle.importKey('raw', key, { name }, false, [
      'encrypt',
    ]);
  }

  private async ivBuffer(iv: string): Promise<BufferSource> {
    const _iv = await this.generateHash(iv);
    return _iv.slice(0, 16);
  }

  private async generateHash(data: string): Promise<Uint8Array> {
    const hashBuffer = await window.crypto.subtle.digest(
      this.hashAlgo,
      this.arrayBuffer(data)
    );
    return new Uint8Array(hashBuffer);
  }
}

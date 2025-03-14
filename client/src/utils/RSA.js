import React, { useState } from "react";
import JSEncrypt from "jsencrypt";

  const genKeys = () => {
    const crypt = new JSEncrypt({ default_key_size: 2048 });
    const publicw = crypt.getPublicKey();
    const privatw = crypt.getPrivateKey();
     return {publicKey: publicw, privateKey: privatw}
  };

  const encryptMessage = (publicKey , message) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    return encryptor.encrypt(message);
  };


  const decryptMessage = (privateKey,encryptedMessage) => {

    const decryptor = new JSEncrypt();


    return decryptor.decrypt(encryptedMessage);
  };




export { genKeys, encryptMessage, decryptMessage };

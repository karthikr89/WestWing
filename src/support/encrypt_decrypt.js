const encrypt = require('encryptjs');

const password = '';
const secretKey = 'westwing';

console.log(encrypt.encrypt(password, secretKey, 256)) // use this for encryption
console.log(encrypt.decrypt(password, secretKey, 256)) // use this for decryption
const CryptoJS = require('crypto-js');

let dropbox = CryptoJS.AES.encrypt('mqrefQpql8UAAAAAAAAAARNk4QVVtXiItUMHK4kDT9fLbk5S-eVqZ7Ua4ugtknun', 'super555SecretPass=-msd,')
console.log(dropbox.toString())
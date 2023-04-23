const Web3 = require('web3');

const web3 = new Web3('HTTP://127.0.0.1:7545');

// id 1
const privateKey = '0xad8d644856522cd737fb2361a5cdadaf516dd3dc99338b229461893514ce638f'
const myAccount = web3.eth.accounts.wallet.add(privateKey);
console.log(myAccount)
module.exports = {
    web3: web3,
    myAccount: myAccount
}
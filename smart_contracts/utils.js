const Web3 = require('web3');

const web3 = new Web3('http://localhost:7545');

const privateKey = ''
const myAccount = web3.eth.accounts.wallet.add(privateKey);
console.log(myAccount)
module.exports = {
    web3: web3,
    myAccount: myAccount
}
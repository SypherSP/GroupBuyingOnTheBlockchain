const Web3 = require('web3');

const web3 = new Web3('http://localhost:7545');

const privateKey = '0xcdf239f52e4acfb1f448ab4c77421e6595e03f38d544509a0a39273405e56dcf'
const myAccount = web3.eth.accounts.wallet.add(privateKey);

module.exports = {
    web3: web3,
    myAccount: myAccount
}
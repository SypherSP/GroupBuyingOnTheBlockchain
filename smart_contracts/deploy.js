const {web3, myAccount} = require('./utils')
const { abi } = require('./contractArtifacts')

async function deploy(){
    await web3.eth.sendTransaction({
        from: myAccount,
        gas: 5000000,
        data: abi.bytecode
    })
    .on('receipt', console.log)
}

deploy()


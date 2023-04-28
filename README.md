#Group Buying On Blockchain

This project is a prototype to demonstrate group buying on the blockchain.

---
## Quick Start

Contract is deployed on sepolia faucet so it's owner and manufacturer key is not provided but you can deploy your own.
first changing directory
`cd smart_contracts`
and then compiling and updating artifacts.
```
solc contracts/mainContract.sol --bin > contracts_mainContract_sol_mainContract.bin
solc contracts/mainContract.col --abi > contracts_mainContract_sol_mainContract.abi
```

after compiling update artifacts.js with bytecode and contractArtifacts.js with abi and deploy on ganache using deploy.js script
```
npm install
node deploy.js
```
copy the contract address and paste it into contractArtifacts.js

For running frontend move back to directory and start dev server
```
cd ../client
npm install
npm run dev
```

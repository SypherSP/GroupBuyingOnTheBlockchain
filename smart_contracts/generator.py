import os
# run from smart_contracts directory
os.system(f"solcjs ./contracts/mainContract.sol --abi")
os.system(f"solcjs ./contracts/mainContract.sol --bin")
# solcjs x.sol --bin/--abi
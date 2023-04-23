# run from smart_contracts directory

import os
os.system(f"solcjs ./contracts/mainContract.sol --abi")
os.system(f"solcjs ./contracts/mainContract.sol --bin")
# solcjs x.sol --bin/--abi
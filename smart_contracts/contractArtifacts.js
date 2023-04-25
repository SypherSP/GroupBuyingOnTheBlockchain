export const abi = 
{
    contractAddress: "0x5c5062C833B5D5b9BB4FB75117F5a5265BD473D0",
    contractAbi: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "func",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "gas",
                    "type": "uint256"
                }
            ],
            "name": "Log",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "fundTransfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "OldOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "Owner",
                    "type": "address"
                }
            ],
            "name": "setOwner",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "pID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "maxSubscription",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "unitValue",
                    "type": "uint256"
                }
            ],
            "name": "addGroup",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "manufacturerAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "phoneNo",
                    "type": "string"
                }
            ],
            "name": "addManufacturer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "retailPrice",
                    "type": "uint256"
                }
            ],
            "name": "addProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "groupID",
                    "type": "string"
                }
            ],
            "name": "claimEscrowedFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "groupID",
                    "type": "string"
                }
            ],
            "name": "closeGroup",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "groupID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "units",
                    "type": "uint256"
                }
            ],
            "name": "joinGroupAndPay",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "phoneNo",
                    "type": "string"
                }
            ],
            "name": "registerCustomer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getAllGroups",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "groupID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pID",
                            "type": "string"
                        },
                        {
                            "internalType": "address[]",
                            "name": "listOfSubscribers",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxSubscription",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "currentSubscription",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "unitValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "accumulatedPayment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isOpen",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.group[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllManufacturers",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "manufacturerID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "phoneNo",
                            "type": "string"
                        },
                        {
                            "internalType": "string[]",
                            "name": "productIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "groupIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalRevenue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.manufacturer[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "pID",
                    "type": "string"
                }
            ],
            "name": "getAllProductFromProductID",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "manufacturerID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "retailPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.product",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "customerAddress",
                    "type": "address"
                }
            ],
            "name": "getCustomerGroups",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "groupID",
                    "type": "string"
                }
            ],
            "name": "getCustomerInfoByGroup",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string[]",
                            "name": "groupIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string",
                            "name": "phoneNo",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.customer[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "manufacturerAddress",
                    "type": "address"
                }
            ],
            "name": "getGroupsByManufacturer",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "groupID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pID",
                            "type": "string"
                        },
                        {
                            "internalType": "address[]",
                            "name": "listOfSubscribers",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxSubscription",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "currentSubscription",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "unitValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "accumulatedPayment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isOpen",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.group[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "manufacturerID",
                    "type": "string"
                }
            ],
            "name": "getManufacturerFromID",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "manufacturerID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "phoneNo",
                            "type": "string"
                        },
                        {
                            "internalType": "string[]",
                            "name": "productIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "groupIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalRevenue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.manufacturer",
                    "name": "m",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "manufacturerAddress",
                    "type": "address"
                }
            ],
            "name": "getProductsByManufacturer",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "pID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "manufacturerID",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "retailPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isValue",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct mainContract.product[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getUseCategory",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "groupList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "groupID",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "pID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "maxSubscription",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentSubscription",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "unitValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "accumulatedPayment",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isOpen",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "isValue",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}

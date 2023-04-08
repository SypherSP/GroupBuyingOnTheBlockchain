// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract mainContract {
    address private owner;
    uint256 lastGroupID = 0;
    uint256 lastManufacturerID = 0;
    uint256 lastProductID = 0;
    uint256 lastCustomerID = 0;

    struct group {
        string pID;
        address[] listOfSubscribers;
        int maxSubscription;
        int currentSubscription;
        int unitValue;
        uint256 accumulatedPayment;
        bool isOpen;
        bool isValue;
    }

    struct manufacturer {
        string manufacturerID;
        string name;
        string[] productIDs;
        string[] groupIDS;
        // mapping(string => int) unitPrices;
        bool isValue;
    }

    struct product {
        string name;
        string pID;
        string manufacturerID;
        string description;
        bool isValue;
    }

    struct customer {
        string[] groupIDs;
        bool isValue;
    }

    mapping(string => product) productList;
    mapping(address => manufacturer) manufacturerList;
    mapping(string => group) groupList;
    mapping(address => customer) customerList;

    event setOwner(address OldOwner, address Owner);

    constructor() {
        owner = msg.sender;
        emit setOwner(address(0), owner);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier isManufacturer() {
        require(manufacturerList[msg.sender].isValue, "Not a manufacturer");
        _;
    }

    modifier isCustomer() {
        require(customerList[msg.sender].isValue, "Not an existing customer");
        _;
    }

    function addManufacturer(
        address payable manufacturerAddress,
        string memory name
    ) public isOwner {
        lastManufacturerID = lastManufacturerID + 1;
        string memory manufacturerID = uintToString(lastManufacturerID);
        manufacturer memory newManufacturer = manufacturer({
            manufacturerID: manufacturerID,
            name: name,
            productIDs: new string[](0),
            groupIDS: new string[](0),
            isValue: true
        });
        manufacturerList[manufacturerAddress] = newManufacturer;
    }

    function addGroup(
        string memory pID,
        int maxSubscription,
        int unitValue
    ) public isManufacturer {
        require(productList[pID].isValue, "Product does not exist");
        require(
            keccak256(
                abi.encodePacked(manufacturerList[msg.sender].manufacturerID)
            ) == keccak256(abi.encodePacked(productList[pID].manufacturerID)),
            "You are not the manufacturer of the product"
        );

        lastGroupID = lastGroupID + 1;
        string memory groupID = uintToString(lastGroupID);
        group memory newGroup = group({
            pID: pID,
            listOfSubscribers: new address[](0),
            maxSubscription: maxSubscription,
            currentSubscription: 0,
            unitValue: unitValue,
            accumulatedPayment: 0,
            isOpen: true,
            isValue: true
        });
        groupList[groupID] = newGroup;
        manufacturerList[msg.sender].groupIDS.push(groupID);
    }

    function addProduct(
        string memory name,
        string memory description
    ) public isManufacturer {
        lastProductID = lastProductID + 1;
        string memory pID = uintToString(lastProductID);
        product memory newProduct = product({
            name: name,
            pID: pID,
            manufacturerID: manufacturerList[msg.sender].manufacturerID,
            description: description,
            isValue: true
        });
        productList[pID] = newProduct;
        manufacturerList[msg.sender].productIDs.push(pID);
    }

    function uintToString(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function getProductsByManufacturer(
        address manufacturerAddress
    ) public view returns (product[] memory) {
        require(
            manufacturerList[manufacturerAddress].isValue,
            "Manufacturer does not exist"
        );

        uint256 productCount = manufacturerList[manufacturerAddress]
            .productIDs
            .length;
        product[] memory products = new product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            string memory pID = manufacturerList[manufacturerAddress]
                .productIDs[i];
            products[i] = productList[pID];
        }

        return products;
    }

    function getProductsByCustomer(
        address customerAddress
    ) public view isCustomer returns (product[] memory) {
        require(
            customerList[customerAddress].isValue,
            "Customer does not exist"
        );

        uint256 productCount = customerList[customerAddress].groupIDs.length;
        product[] memory products = new product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            string memory groupID = customerList[customerAddress].groupIDs[i];
            string memory pID = groupList[groupID].pID;
            products[i] = productList[pID];
        }

        return products;
    }

    function registerCustomer() public {
        require(!customerList[msg.sender].isValue, "Customer already registered");

        customer memory newCustomer = customer({
            groupIDs: new string[](0),
            isValue: true
        });

        customerList[msg.sender] = newCustomer;
    }

    function joinGroup(string memory groupID) public isCustomer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(groupList[groupID].currentSubscription < groupList[groupID].maxSubscription, "Group is full");

        groupList[groupID].listOfSubscribers.push(msg.sender);
        groupList[groupID].currentSubscription++;
        customerList[msg.sender].groupIDs.push(groupID);
    }

    function getCustomerGroups(address customerAddress) public view returns (string[] memory) {
        require(customerList[customerAddress].isValue, "Customer does not exist");

        return customerList[customerAddress].groupIDs;
    }

    function closeGroup(string memory groupID) public isManufacturer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(groupList[groupID].isOpen, "Group is already closed");

        groupList[groupID].isOpen = false;
    }

    function joinGroupAndPay(string memory groupID) public payable isCustomer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(groupList[groupID].isOpen, "Group is closed");
        require(groupList[groupID].currentSubscription < groupList[groupID].maxSubscription, "Group is full");
        require(msg.value == uint256(groupList[groupID].unitValue), "Incorrect payment amount");

        groupList[groupID].listOfSubscribers.push(msg.sender);
        groupList[groupID].currentSubscription++;
        customerList[msg.sender].groupIDs.push(groupID);

        groupList[groupID].accumulatedPayment += msg.value;
    }

    function claimEscrowedFunds(string memory groupID) public isManufacturer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(!groupList[groupID].isOpen, "Group is not closed yet");
require(
    keccak256(abi.encodePacked(manufacturerList[msg.sender].manufacturerID)) ==
    keccak256(abi.encodePacked(productList[groupList[groupID].pID].manufacturerID)),
    "You are not the owner of the product in this group"
);
        uint256 escrowedFunds = groupList[groupID].accumulatedPayment;
        groupList[groupID].accumulatedPayment = 0;

        (bool success, ) = msg.sender.call{value: escrowedFunds}("");
        require(success, "Withdrawal failed");
    }


}

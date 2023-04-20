// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract mainContract {
    address private owner;
    uint256 lastGroupID = 0;
    uint256 lastManufacturerID = 0;
    uint256 lastProductID = 0;
    uint256 lastCustomerID = 0;

    struct group {
        string pID; //product ID
        address[] listOfSubscribers; //list of customers subscribed to the group
        uint maxSubscription; //max subscription possible
        uint currentSubscription;
        uint unitValue; //value of one unit of the substance
        uint256 accumulatedPayment; //total payment in the group
        bool isOpen;
        bool isValue;
    }

    struct manufacturer {
        string manufacturerID;
        string name;
        string[] productIDs;
        string[] groupIDs;
        uint256 totalRevenue; //total revenue generated for a manufacturer across all closed groups
        bool isValue;
    }

    struct product {
        string name;
        string pID;
        string manufacturerID;
        string description;
        uint retailPrice;
        bool isValue;
    }

    struct customer {
        string[] groupIDs;
        bool isValue;
    }

    mapping(string => product) productList; //list of all
    mapping(address => manufacturer) manufacturerList; //list of all manufacturers
    address[] manufacturerAddresses;
    mapping(string => group) groupList; //list of all groups
    mapping(address => customer) customerList; //list of all customers
    mapping(string => mapping(address => uint256)) paymentRecords; //mapping (groupID, customer address) to number of uints subscribed in that group

    event setOwner(address OldOwner, address Owner);
    event fundTransfer(address from, address to, uint amount);
    event Log(string func, uint gas);

    constructor() {
        owner = msg.sender;
        emit setOwner(address(0), owner);
    }

    fallback() external payable {
        emit Log("fallback", gasleft());
    }

    receive() external payable {
        emit Log("receive", gasleft());
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

    //utility function to convert int to string
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

    function getUseCategory(address user) public view returns (string memory) {
        if (user == owner) return "owner";
        else if (manufacturerList[user].isValue) return "manufacturer";
        else if (customerList[user].isValue) return "customer";
        else return "not registered";
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
            groupIDs: new string[](0),
            totalRevenue: 0,
            isValue: true
        });
        manufacturerList[manufacturerAddress] = newManufacturer;
        manufacturerAddresses.push(manufacturerAddress);
    }

    function addGroup(
        string memory pID,
        uint maxSubscription,
        uint unitValue
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
        manufacturerList[msg.sender].groupIDs.push(groupID);
    }

    function addProduct(
        string memory name,
        string memory description,
        uint retailPrice
    ) public isManufacturer {
        lastProductID = lastProductID + 1;
        string memory pID = uintToString(lastProductID);
        product memory newProduct = product({
            name: name,
            pID: pID,
            manufacturerID: manufacturerList[msg.sender].manufacturerID,
            description: description,
            retailPrice: retailPrice,
            isValue: true
        });
        productList[pID] = newProduct;
        manufacturerList[msg.sender].productIDs.push(pID);
    }

    function getAllManufacturers()
        public
        view
        isOwner
        returns (manufacturer[] memory)
    {
        manufacturer[] memory listOfManufacturers = new manufacturer[](
            manufacturerAddresses.length
        );
        for (uint256 i = 0; i < manufacturerAddresses.length; i++) {
            listOfManufacturers[i] = manufacturerList[manufacturerAddresses[i]];
        }
        return listOfManufacturers;
    }

    //returns all products registered by a manufacturer
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

    function getGroupsByManufacturer(
        address manufacturerAddress
    ) public view returns (group[] memory) {
        uint length = manufacturerList[manufacturerAddress].groupIDs.length;
        group[] memory groups = new group[](length);
        for (uint i = 0; i < length; i++) {
            groups[i] = groupList[
                manufacturerList[manufacturerAddress].groupIDs[i]
            ];
        }
        return groups;
    }

    //returns all the products a customer has subscribed to
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
        require(
            !customerList[msg.sender].isValue,
            "Customer already registered"
        );

        customer memory newCustomer = customer({
            groupIDs: new string[](0),
            isValue: true
        });

        customerList[msg.sender] = newCustomer;
    }

    //returns list of groupIDs a customer is in
    function getCustomerGroups(
        address customerAddress
    ) public view returns (string[] memory) {
        require(
            customerList[customerAddress].isValue,
            "Customer does not exist"
        );

        return customerList[customerAddress].groupIDs;
    }

    //customer joins group and pays for the number of uints they want to subscribe to
    function joinGroupAndPay(
        string memory groupID,
        uint256 units
    ) public payable isCustomer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(groupList[groupID].isOpen, "Group is closed");
        require(
            groupList[groupID].currentSubscription <
                groupList[groupID].maxSubscription,
            "Group is full"
        );
        uint256 requiredVal = (groupList[groupID].unitValue) * units;
        require(msg.value == requiredVal, "Incorrect payment amount");

        emit fundTransfer(msg.sender, address(this), msg.value);

        groupList[groupID].listOfSubscribers.push(msg.sender);
        groupList[groupID].currentSubscription++;
        customerList[msg.sender].groupIDs.push(groupID);
        paymentRecords[groupID][msg.sender] = units;
        groupList[groupID].accumulatedPayment += msg.value;
    }

    function closeGroup(string memory groupID) public isManufacturer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(groupList[groupID].isOpen, "Group is already closed");

        groupList[groupID].isOpen = false;
    }

    function claimEscrowedFunds(string memory groupID) public isManufacturer {
        require(groupList[groupID].isValue, "Group does not exist");
        require(!groupList[groupID].isOpen, "Group is not closed yet");
        require(
            keccak256(
                abi.encodePacked(manufacturerList[msg.sender].manufacturerID)
            ) ==
                keccak256(
                    abi.encodePacked(
                        productList[groupList[groupID].pID].manufacturerID
                    )
                ),
            "You are not the manufacturer of the product in this group"
        );
        uint256 escrowedFunds = groupList[groupID].accumulatedPayment;
        groupList[groupID].accumulatedPayment = 0;

        //reseting the payment record for each customer in the group
        // uint size= groupList[groupID].listOfSubscribers.length;
        // for(uint i=0; i<size;i++){
        //     paymentRecords[groupID][groupList[groupID].listOfSubscribers[i]]=0;
        // }

        (bool success, ) = msg.sender.call{value: escrowedFunds}("");
        require(success, "Withdrawal failed");
        emit fundTransfer(address(this), msg.sender, escrowedFunds);
    }

    function leaveGroup(string memory groupID) public isCustomer {}
}

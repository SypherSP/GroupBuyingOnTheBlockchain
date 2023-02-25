pragma solidity ^0.8.0;

import './productContract.sol';

contract Product {
    // Product information
    uint public productId;
    string public name;
    uint public price;
    address payable public seller;
    address public groupAddress;
    bool public isSold;

    // Events
    event ProductCreated(uint productId, string name, uint price, address seller, address groupAddress);
    event ProductSold(uint productId, address buyer, uint price);

    // Create a new product
    constructor(uint _productId, string memory _name, uint _price, address payable _seller, address _groupAddress) {
        productId = _productId;
        name = _name;
        price = _price;
        seller = _seller;
        groupAddress = _groupAddress;
        isSold = false;
        emit ProductCreated(productId, name, price, seller, groupAddress);
    }

    // Buy the product
    function buy() public payable {
        require(msg.sender != seller, "Seller cannot buy their own product.");
        require(msg.value == price, "Incorrect payment amount.");
        require(!isSold, "Product has already been sold.");
        require(Group(groupAddress).isMember(msg.sender), "Buyer is not a member of the group.");
        seller.transfer(msg.value);
        isSold = true;
        emit ProductSold(productId, msg.sender, price);
    }
}

contract Group {
    // Group information
    address public owner;
    address[] public members;

    // Events
    event GroupCreated(address owner);
    event MemberAdded(address member);
    event MemberRemoved(address member);

    // Create a new group
    constructor() {
        owner = msg.sender;
        members.push(owner);
        emit GroupCreated(owner);
    }

    // Add a new member to the group
    function addMember(address member) public {
        require(msg.sender == owner, "Only the group owner can add members.");
        require(member != address(0), "Invalid member address.");
        members.push(member);
        emit MemberAdded(member);
    }

    // Remove a member from the group
    function removeMember(address member) public {
        require(msg.sender == owner, "Only the group owner can remove members.");
        require(member != address(0), "Invalid member address.");
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == member) {
                members[i] = members[members.length - 1];
                members.pop();
                emit MemberRemoved(member);
                break;
            }
        }
    }

    // Check if an address is a member of the group
    function isMember(address member) public view returns (bool) {
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == member) {
                return true;
            }
        }
        return false;
    }
}

pragma solidity ^0.8.0;

import './productContract.sol';

contract Purchase {
    // Purchase information
    address public group;
    address public seller;
    address public escrow;
    address public product;
    uint public quantity;
    uint public totalPrice;
    bool public isCompleted;

    // Events
    event PurchaseInitiated(address group, address seller, address product);
    event PurchaseCompleted();
    event PurchaseCancelled();

    // Initiate a purchase
    function initiate(address _group, address _seller, address _escrow, address _product, uint _quantity) public {
        group = _group;
        seller = _seller;
        escrow = _escrow;
        product = _product;
        quantity = _quantity;
        totalPrice = _quantity * Product(product).price();
        isCompleted = false;
        emit PurchaseInitiated(_group, _seller, _product);
    }

    // Complete a purchase
    function complete() public {
        require(msg.sender == escrow, "Only the escrow can complete the purchase.");
        require(!isCompleted, "Purchase has already been completed.");
        require(group.transfer(totalPrice), "Transfer of funds to the seller failed.");
        isCompleted = true;
        emit PurchaseCompleted();
    }

    // Cancel a purchase
    function cancel() public {
        require(msg.sender == seller || msg.sender == group, "Only the seller or the group can cancel the purchase.");
        require(!isCompleted, "Purchase has already been completed.");
        require(escrow.transfer(group.balance), "Refund of funds to the group failed.");
        isCompleted = true;
        emit PurchaseCancelled();
    }
}

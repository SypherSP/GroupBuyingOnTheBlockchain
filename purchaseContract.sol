pragma solidity ^0.8.0;

import './Escrow.sol';

contract Purchase {
    address public buyer;
    address public seller;
    address public escrow;
    uint public amount;
    bool public released;
    bool public refunded;
    
    event PurchaseConfirmed();
    event PurchaseReleased();
    event PurchaseRefunded();

    constructor(address _buyer, address _seller, address _escrow, uint _amount) {
        buyer = _buyer;
        seller = _seller;
        escrow = _escrow;
        amount = _amount;
    }
    
    function confirmPurchase() public payable {
        require(msg.sender == buyer);
        require(msg.value == amount);
        emit PurchaseConfirmed();
    }
    
    function release() public {
        require(msg.sender == buyer);
        require(!released);
        Escrow(escrow).release(address(this));
        released = true;
        emit PurchaseReleased();
    }
    
    function refund() public {
        require(msg.sender == seller);
        require(!refunded);
        Escrow(escrow).refund(address(this));
        refunded = true;
        emit PurchaseRefunded();
    }
}

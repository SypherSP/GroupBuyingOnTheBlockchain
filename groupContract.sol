pragma solidity ^0.8.0;

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
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract GreeterWithParameter {
    string public greeting;

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    constructor(string memory _defaultGreeting) {
        greeting = _defaultGreeting;
    }
}

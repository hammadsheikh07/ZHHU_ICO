// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.4;

    interface IZHHU {
        function tokenOwners(address) external view returns (bool);
    }
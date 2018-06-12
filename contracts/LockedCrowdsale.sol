pragma solidity ^0.4.23;

import "./LockedToken.sol";
import "zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract LockedCrowdsale is Crowdsale, Ownable {

  function unlockTransfer() public onlyOwner returns (bool) {
    require(LockedToken(token).unlockTransfer());
  }
}
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract LockedTransfer is Crowdsale, Ownable {
  
  bool public isLocked;
  uint256 public unlockTime;
  event unlocked(bool);

  function LockedTransfer(uint256 _unlockTime) public {
    isLocked = true;
    unlockTime = _unlockTime;
  }
   /**
    Function called by the owner to unlock token transfer for contributors.
    */
  function unlockTransfer() public onlyOwner returns (bool) {
    require(block.timestamp >= unlockTime);
    isLocked = false;
    emit unlocked(true);
    return true;
  } 


}
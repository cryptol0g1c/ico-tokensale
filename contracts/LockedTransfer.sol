pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract LockedTransfer is Crowdsale, Ownable {
  
  bool public isLocked;
  event unlocked(bool);

  function LockedTransfer() public {
    isLocked = true;
  }
   /**
    Function called by the owner to unlock token transfer for contributors.
    */
  function manualUnlock() public onlyOwner returns (bool) {
    isLocked = false;
    emit unlocked(true);
  } 

  function timeUnlock() public onlyOwner {
     
  }

}
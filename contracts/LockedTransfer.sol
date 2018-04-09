pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract LockedTransfer is StandardToken, Ownable {
  ERC20 public token;
  bool public isLocked;
  uint256 public unlockTime;

  event Unlocked(bool _isLocked);
  
  modifier isUnlocked() {
    require(isLocked == false);
    _;
  }

  function LockedTransfer(uint256 _unlockTime, ERC20 _token) public {
    isLocked = true;
    unlockTime = _unlockTime;
    token = _token;
  }

  /**
  Function called by the owner to unlock token transfer for contributors.
  */
  function unlockTransfer() public onlyOwner returns (bool) {
    require(isLocked && block.timestamp >= unlockTime);
    isLocked = false;
    Unlocked(true);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public isUnlocked returns (bool) {
    token.transferFrom(_from, _to, _value);
  }
}
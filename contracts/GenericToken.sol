pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract GenericToken is MintableToken {
  string public constant NAME = 'GenericToken';
  string public constant SYMBOL = 'gt';
  uint256 public constant DECIMALS = 18;
  bool public isLocked = true;
  uint256 public unlockTime;

  event Unlocked(bool _isLocked);
  
  modifier isUnlocked() {
    require(isLocked == false);
    _;
  }

  function GenericToken(uint256 _unlockTime) public {
    unlockTime = _unlockTime;
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
    super.transferFrom(_from, _to, _value);
    return true;
  }
}
pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract LockedToken is StandardToken, Ownable {

  bool public isLocked = true;
  uint256 public unlockTime;

  event Unlocked(bool _isLocked);

  modifier isUnlocked() {
      require(!isLocked);
      _;
  }

  /**
  * @dev Function constructor
  */
  function LockedToken(uint256 _unlockTime) public {
    unlockTime = _unlockTime;
  }
  
  /**
  Function called by the owner to unlock token transfer for contributors.
  */
  function unlockTransfer() public onlyOwner returns (bool) {
    require(isLocked && block.timestamp >= unlockTime);
    isLocked = false;
    emit Unlocked(true);
    return true;
  }

  function approve(address _spender, uint256 _value) public isUnlocked returns (bool) {
    super.approve(_spender, _value);
    return true;
  }

  function transfer(address _to, uint256 _value) public isUnlocked returns (bool) {
    super.transfer(_to, _value);
    return true;
  }
}
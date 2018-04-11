pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract LockedToken {

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
  function LockedContract(uint256 _unlockTime) public {
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
}
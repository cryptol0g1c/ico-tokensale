pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract LockedCrowdsale is Crowdsale, Ownable {
  
  bool public isLocked;

  event IsLocked(bool);

  modifier isUnlocked {
    require(!isLocked);
    _;
  }

  function LockedCrowdsale(bool _isLocked) public {
    isLocked = _isLocked;
  }

  function toggleLocked(bool _isLocked) public onlyOwner {
    isLocked = _isLocked;
    IsLocked(_isLocked);
  }

  function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal isUnlocked {
    super._preValidatePurchase(_beneficiary, _weiAmount);
  }
}
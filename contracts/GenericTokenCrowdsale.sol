pragma solidity ^0.4.18;

import './GenericToken.sol';
import './LockedTransfer.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';

contract GenericTokenCrowdsale is Crowdsale, MintedCrowdsale, WhitelistedCrowdsale, CappedCrowdsale, TimedCrowdsale, LockedTransfer {

  ERC20 public _token = new GenericToken();
  uint256 public openingTime;
  uint256 public closingTime;

  function GenericTokenCrowdsale(uint256 _rate, address _wallet, uint256 _cap, uint256 _openingTime, uint256 _closingTime, uint256 _unlockTime) public
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    LockedTransfer(_unlockTime, _token)
    {
      openingTime = _openingTime;
      closingTime = _closingTime;
    }

  function balanceOf(address _beneficiary) public view returns (uint256 balance) {
    return _token.balanceOf(_beneficiary);
  }

  function isOpen() public view returns (bool) {
    return now >= openingTime && now <= closingTime;
  }
}
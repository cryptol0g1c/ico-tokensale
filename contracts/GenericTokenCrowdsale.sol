pragma solidity ^0.4.23;

import "./GenericToken.sol";
import "./LockedCrowdsale.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract GenericTokenCrowdsale is Crowdsale, MintedCrowdsale, WhitelistedCrowdsale, CappedCrowdsale, TimedCrowdsale, LockedCrowdsale {
  
  GenericToken token;

  function GenericTokenCrowdsale(
    uint256 _rate,
    address _wallet,
    uint256 _cap,
    uint256 _openingTime,
    uint256 _closingTime,
    GenericToken _token
  ) public
  Crowdsale(_rate, _wallet, _token)
  CappedCrowdsale(_cap)
  TimedCrowdsale(_openingTime, _closingTime)
  {
    token = _token;
  }
}
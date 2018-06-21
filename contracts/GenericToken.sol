pragma solidity ^0.4.23;

import "./LockedToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract GenericToken is MintableToken, LockedToken {
  string public NAME;
  string public SYMBOL;
  uint256 public DECIMALS;

  constructor(uint256 _unlockTime, string _name, string _symbol, uint256 _decimals) public LockedToken(_unlockTime) {
    NAME = _name;
    SYMBOL = _symbol;
    DECIMALS = _decimals;
  }
}

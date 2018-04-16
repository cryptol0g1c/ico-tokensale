pragma solidity ^0.4.18;

import "./LockedToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract GenericToken is MintableToken, LockedToken {
  string public constant NAME = 'GenericToken';
  string public constant SYMBOL = 'gt';
  uint256 public constant DECIMALS = 18;

  function GenericToken(uint256 _unlockTime) public LockedToken(_unlockTime) {}
}
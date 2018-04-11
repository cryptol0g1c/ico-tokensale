pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "./LockedToken.sol";

contract GenericToken is MintableToken, LockedToken {
  string public constant NAME = 'GenericToken';
  string public constant SYMBOL = 'gt';
  uint256 public constant DECIMALS = 18;

  function GenericToken(uint256 _unlockTime) public 
    LockedContract(_unlockTime) {
  }
}
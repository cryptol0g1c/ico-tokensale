pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract GenericToken is MintableToken {
  string public constant NAME = 'GenericToken';
  string public constant SYMBOL = 'gt';
  uint256 public constant DECIMALS = 18;
}

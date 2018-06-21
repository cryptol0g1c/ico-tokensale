let GenericToken = artifacts.require('./GenericToken.sol');
let GenericTokenCrowdsale = artifacts.require('./GenericTokenCrowdsale.sol');

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};

module.exports = (deployer, network, accounts) => {
  const _rate = new web3.BigNumber(2);
  const _wallet = '0x8e5095532979FfDa5e9Dc692628A3Fa032d3b47C';
  const _cap = new web3.BigNumber(web3.toWei(20, 'ether'));
  const now = web3.eth.getBlock('latest').timestamp;
  const _openingTime = now + duration.weeks(1);
  const _closingTime = _openingTime + duration.weeks(1);
  const _unlockTime = _closingTime + duration.weeks(1);

  deployer.deploy(GenericToken, _unlockTime, 'testcoin', 'test', 18).then(async (tx) => {
    let _tokenAddress = GenericToken.address;
    await deployer.deploy(GenericTokenCrowdsale, _rate, _wallet, _cap, _openingTime, _closingTime, _tokenAddress);
  });
};

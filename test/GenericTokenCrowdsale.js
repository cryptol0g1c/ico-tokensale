const GenericTokenCrowdsale = artifacts.require('GenericTokenCrowdsale');

const utils = require('./utils/index');
const { BigNumber } = web3;
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';

contract('GenericTokenCrowdsale', addresses => {
  let crowdsale;
  let token;

  // initial parameters
  const _rate = new BigNumber(2);
  const _wallet = addresses[0];
  const _cap = utils.toEther(20);
  let _openingTime;
  let _closingTime;
  let _unlockTime;
  
  // accounts
  const _buyer = addresses[1];
  const _nonWhitelistedBuyer = addresses[2];
  const _to = addresses[3];
  const _too = addresses[4];

  beforeEach(async() => {
    _openingTime = await latestTime(web3) + duration.weeks(1);
    _closingTime = _openingTime + duration.weeks(1);
    _unlockTime = _closingTime + duration.weeks(1);

    crowdsale = await GenericTokenCrowdsale.new(
      _rate,
      _wallet,
      _cap,
      _openingTime,
      _closingTime,
      _unlockTime
    );
  });

  describe('Crowdsale', () => {
    
    it('should initialize with 0 tokens', async() => {
      (await crowdsale.weiRaised()).should.bignumber.equal(0);
    });
  
    it('should add address to whitelist', async() => {
      await crowdsale.addToWhitelist(_buyer);
      (await crowdsale.whitelist(_buyer)).should.equal(true);    
    });
  });

  describe('for whiteliste\'d address and with correct startTime', () => {
    beforeEach(async() => {
      await increaseTimeTo(_openingTime);
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should allow user to buy', async() => {
      let value = utils.toEther(10);
  
      await crowdsale.buyTokens(_buyer, {value, from: _buyer});
      (await crowdsale.balanceOf(_buyer)).should.bignumber.equal(value.times(_rate));
    });

    it('should allow user to buy if capped is not reached', async() => {
      let value = utils.toEther(10);

      await crowdsale.buyTokens(_buyer, {value, from: _buyer});
      await crowdsale.buyTokens(_buyer, {value, from: _buyer});
      (await crowdsale.capReached()).should.equal(true);
    });

    it('should fail when cap reached', async() => {
      let value = utils.toEther(21);
      try {
        await crowdsale.buyTokens(_buyer, {value, from: _buyer});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });

  describe('for non whiteliste\'d address', () => {
    beforeEach(async() => {
      await increaseTimeTo(_openingTime);
    });
    
    it('should revert transaction', async() => {
      let value = utils.toEther(10);

      try {
        await crowdsale.buyTokens(_nonWhitelistedBuyer, {value, from: _buyer});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });

  describe('Locked', () => {
    beforeEach(async() => {
      await increaseTimeTo(_openingTime);
      await crowdsale.addToWhitelist(_buyer);
    });      

    it('should not allow user to transfer if transfer is locked', async() => {
      await crowdsale.buyTokens(_buyer, {value: utils.toEther(10), from: _buyer});
      
      await increaseTimeTo(_unlockTime + duration.minutes(1));
      await crowdsale.unlockTransfer();

      

      await crowdsale.approve(_to, 10, {from: _buyer});

      console.log('--- ', await crowdsale.allowance(_buyer, _to));
      
      let asd = await crowdsale.transferFrom(_buyer, _too, 1, {from: _to});
      console.log(asd);
      
    });

    it('should allow user to transfer', () => {

    });
  });

  describe('if startTime < now', () => {

    beforeEach(async() => {
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should revert transaction', async() => {
      let value = utils.toEther(10);

      try {
        await crowdsale.buyTokens(_nonWhitelistedBuyer, {value, from: _buyer});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });
  
  describe('if closingTime < now', () => {

    beforeEach(async() => {
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should revert transaction', async() => {
      await increaseTimeTo(_closingTime + duration.minutes(1));
  
      let value = utils.toEther(10);
  
      try {
        await crowdsale.buyTokens(_nonWhitelistedBuyer, {value, from: _buyer});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });

  describe('isOpen', () => {
    
    it('should return false if crowdsale is not open', async() => {
      (await crowdsale.isOpen()).should.equal(false);
    });

    it('should return true if crowdsale is open', async() => {
      await increaseTimeTo(_openingTime + duration.minutes(1));

      (await crowdsale.isOpen()).should.equal(true);
    });
  });
});
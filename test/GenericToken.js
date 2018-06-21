const GenericToken = artifacts.require('GenericToken');

const { BigNumber } = web3;
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
const utils = require('./utils/index');

import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';

contract('GenericToken', addresses => {
  let genericToken;

  // initial parameters
  let _openingTime;
  let notOwnerAddress = addresses[1];
  const _name = 'testcoin';
  const _symbol = 'test';
  const _decimals = 18;

  beforeEach(async() => {
    _openingTime = await latestTime(web3) + duration.weeks(1);
    genericToken = await GenericToken.new(_openingTime, _name, _symbol, _decimals);
  });

  describe('GenericToken', () => {

    it('should initialize parameters correctly', async() => {
      (await genericToken.NAME()).should.equal(_name);
      (await genericToken.SYMBOL()).should.equal(_symbol);
      (await genericToken.DECIMALS()).should.bignumber.equal(_decimals);
    });

    it('should be locked by default', async() => {
      (await genericToken.isLocked()).should.equal(true);
    });

    it('should not unlock if the current timestamp is before openingTime', async() => {
      try {
        await genericToken.unlockTransfer();
      } catch (error) {
        utils.assertRevert(error);
      }
    });

    it('should not unlock if the sender is not the owner', async() => {
      await increaseTimeTo(_openingTime);

      try {
        await genericToken.unlockTransfer({sender: notOwnerAddress});
      } catch (error) {
        utils.assertRevert(error);
      }
    });

    it('should unlock if the sender is the owner and timestamp is after openingTime', async() => {
      await increaseTimeTo(_openingTime);
      await genericToken.unlockTransfer();

      (await genericToken.isLocked()).should.equal(false);
      utils.assertEvent(GenericToken, {
        event: 'Unlocked',
        logIndex: 0,
        args: {
          _isLocked: true
        }
      });
    });
  });
});

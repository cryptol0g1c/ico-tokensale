const LockedTransfer = artifacts.require('LockedTransfer');
const GenericToken = artifacts.require('GenericToken');
const should = require('chai')
  .use(require('chai-as-promised'))
  .should();
const utils = require('./utils/index');

import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';

contract('LockedTransfer', addresses => {
  let lockedTransfer;
  
  // initial parameters
  let _openingTime;
  let _token;

  let notOwnerAddress = addresses[1];

  beforeEach(async() => {
    _openingTime = await latestTime(web3) + duration.weeks(1);
    _token = await GenericToken.new();
    
    lockedTransfer = await LockedTransfer.new(_openingTime, _token.address);
  });

  describe('LockedTransfer', () => {
    
    it('should be locked by default', async() => {
      (await lockedTransfer.isLocked()).should.equal(true);
    });

    it('should not unlock if the current timestamp is before openingTime', async() => {
      try {
        await lockedTransfer.unlockTransfer();
      } catch (error) {
        utils.assertRevert(error);
      }
    });

    it('should not unlock if the sender is not the owner', async() => {
      await increaseTimeTo(_openingTime);

      try {
        await lockedTransfer.unlockTransfer({sender: notOwnerAddress});
      } catch (error) {
        utils.assertRevert(error);
      }
    });

    it('should unlock if the sender is the owner and timestamp is after openingTime', async() => {
      await increaseTimeTo(_openingTime);
      await lockedTransfer.unlockTransfer();

      (await lockedTransfer.isLocked()).should.equal(false);
      utils.assertEvent(lockedTransfer, {
        event: 'Unlocked',
        logIndex: 0,
        args: {
          _isLocked: true
        }
      });
    });    
  });
});
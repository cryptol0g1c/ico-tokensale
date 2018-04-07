const LockedCrowdsale = artifacts.require('LockedCrowdsale');

contract('LockedCrowdsale', addresses => {
  let lockedCrowdsale;

  let notOwnerAddress = addresses[1];

  beforeEach(async() => {
    lockedCrowdsale = await LockedCrowdsale.new(false);
  });

  describe('LockedCrowdsale', async() => {
    
    it('should toogle isLocked if the sender is the owner', async() => {
      // (await lockedCrowdsale.toggleLocked(true));
      
      // expect(lockedCrowdsale.isLocked()).should.equal(true);
    });

    it('should toogle isLocked if the sender is the owner', async() => {
      // (await lockedCrowdsale.toggleLocked(true, {sender: notOwnerAddress}));
      
      // expect(lockedCrowdsale.isLocked()).should.equal(true);
    });
  });
});
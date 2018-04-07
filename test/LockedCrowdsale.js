const LockedCrowdsale = artifacts.require('LockedCrowdsale');

contract('LockedCrowdsale', addresses => {

  beforeEach(async() => {
    crowdsale = await LockedCrowdsale.new();
  });

  describe('LockedCrowdsale', () => {
    
  });
});
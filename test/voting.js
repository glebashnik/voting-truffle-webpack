var Voting = artifacts.require("./Voting.sol");

contract("Voting", function(accounts) {
  it("Nick should have one vote", function() {
    var voting;

    return Voting.deployed().then(function(instance) {
        voting = instance;
        return voting.vote("Nick");
    }).then(function() {
        return voting.getVotes.call("Nick");
    }).then(function(value) {
        assert.equal(value.toNumber(), 1, "No votes for Nick");
    });
  });
});
pragma solidity ^0.4.11;

contract Voting {
  mapping (bytes32 => uint8) votesByCandidate;
  bytes32[] candidates;

  function Voting(bytes32[] _candidates) {
    candidates = _candidates;
  }

  function getVotes(bytes32 candidate) returns (uint8) {
    require(isValidCandidate(candidate));
    return votesByCandidate[candidate];
  }

  function vote(bytes32 candidate) {
    require(isValidCandidate(candidate));
    votesByCandidate[candidate] += 1;
  }

  function isValidCandidate(bytes32 candidate) returns (bool) {
    for (uint i = 0; i < candidates.length; i++) {
      if (candidates[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}

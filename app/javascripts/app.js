import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);
var candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

window.vote = function(candidate) {
  var candidateName = $("#candidate").val();
  try {
    Voting.deployed().then(function(contractInstance) {
      contractInstance.vote(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        let div_id = candidates[candidateName];

        return contractInstance.getVotes.call(candidateName).then(function(v) {
          $("#" + div_id).html(v.toString());
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.getVotes.call(name).then(function(v) {
        $("#" + candidates[name]).html(v.toString());
      });
    })
  }
});
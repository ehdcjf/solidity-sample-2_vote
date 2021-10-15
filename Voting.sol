pragma solidity ^0.8.0;

contract Voting{
  string[] public candidateList; 
  mapping(string =>uint) public voteReceived;

  constructor(string[] memory _candidateNames) public{
    candidateList = _candidateNames; 
  }

  function voteForCandidate(string memory _candidate) public {
    voteReceived[_candidate] += 1;
  }

  function totalVotesFor(string memory _candidate) view public returns(uint){
    return voteReceived[_candidate]; 
  }

  //string 비교
  function vaildCandidate(string memory _candidate) view public returns(bool){
    //string to byte
    // keccak256() 안에  byte값 넣기. 
    for(uint i=0; i<candidateList.length; i++){
      if(keccak256(bytes(candidateList[i])) == keccak256(bytes(_candidate))){
        return true;
      }
    }
    return false;
  }
  

}
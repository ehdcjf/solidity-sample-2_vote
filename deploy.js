const Web3 = require('web3');
const fs = require('fs');
const ABI = JSON.parse(fs.readFileSync('./Voting_sol_Voting.abi').toString());
const BYTECODE  =fs.readFileSync('./Voting_sol_Voting.bin').toString();

const web3 = new Web3('http://localhost:8545');

/*
const deployContract = new web3.eth.Contract(ABI);
deployContract.deploy({
  data:BYTECODE,
  arguments:[['Moon','Hong','Ahn'].map(name=>web3.utils.asciiToHex(name))]
})
.send({
  from:'0xCe5331A89579F8105b1CD1755E9711F3E27eC30F',
  gas:6721975, 
})
.then(nowContract =>{
  console.log(nowContract.options.address)

})
*/
//ganache 의 Contract created 콘트랙트 주소 
const contract = new web3.eth.Contract(ABI,'0xb18bfa944e0927b438a8f6e8ea6cf5eb5047082f')

contract.methods.voteForCandidata('Hong').send({from:'0xCe5331A89579F8105b1CD1755E9711F3E27eC30F'})
contract.methods.totalVotesFor('Hong').call().then(data=>{
  console.log(data);
})




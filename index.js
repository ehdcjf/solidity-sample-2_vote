
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const ABI = JSON.parse(`[{"inputs":[{"internalType":"string[]","name":"_candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"vaildCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"voteForCandidata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"voteReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`);
const deployAddress = '0xb18bfa944e0927b438a8f6e8ea6cf5eb5047082f'; 
let VotingContract = new web3.eth.Contract(ABI,deployAddress);
let candidates = {"Moon":"candidate1","Hong":"candidate2","Ahn":"candidate3"}

window.addEventListener('DOMContentLoaded',init)

async function init(){

  let candidateNames = Object.keys(candidates);
  candidateNames.forEach(async(name,i) => {
    const nameElement = document.querySelector(`#${candidates[name]}`)
    nameElement.innerHTML = name;
    
    const countElement = document.querySelector(`#candidateCount${i+1}`); 
    countElement.innerHTML = await VotingContract.methods.totalVotesFor(name).call()
  
  });

  const btn  = document.querySelector('#btn');
  btn.addEventListener('click',btnEvent);

  async function btnEvent(){
    const candidateName = document.querySelector('#candidateName').value;
    await VotingContract.methods.voteForCandidata(candidateName).send({from:'0xCe5331A89579F8105b1CD1755E9711F3E27eC30F'})

    let candidateCount = await VotingContract.methods.totalVotesFor(name).call()
    let number = candidateName.charAt(candidateName.length-1);
    let countElement = document.querySelector(`#candidateCount${number}`)
    countElement.innerHTML = candidateCount; 
  }

  

//   await VotingContract.methods.voteForCandidata('Hong').send({from:'0xCe5331A89579F8105b1CD1755E9711F3E27eC30F'})
//   VotingContract.methods.totalVotesFor('Hong').call().then(data=>{
//   console.log(data);
// })

}
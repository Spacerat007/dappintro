var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0xB0DFBac4a7929070aF4B0b37f699506c393fCf3c", {from: accounts[0]});
      console.log(contractInstance);

    });
    $("#add_data_button").click(inputData)
});

function inputData(){
  var name = $("#name_input").val();
  var age = $("#age_input").val();
  var height = $("#height_input").val();

  var config = {
    value: web3.utils.toWei("1", 'ether')
  }

  contractInstance.methods.createPerson(name, age, height).send(config)
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
  })
}

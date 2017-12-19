import { web3 } from './uportSetup'

function myContractSetup() {
    let myContractABI = web3.eth.contract([
        {
          "constant": false,
          "inputs": [],
          "name": "getAdopters",
          "outputs": [
            {
              "name": "",
              "type": "address[16]"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "adopters",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "petId",
              "type": "uint256"
            }
          ],
          "name": "adopt",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]);

      let myContractObj = myContractABI.at("0x4769fa338baf56593b981414687a92635ea58672");
      return myContractObj;
}

export { myContractSetup }
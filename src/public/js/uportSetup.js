import { Connect, SimpleSigner } from 'uport-connect'

console.log('Starting application');
console.log('#######################################');

// const uport = new Connect('attest id card', {
//   clientId: '2otJXJs5E4ANhnJMDyN9VCLL6skrqYxZEGd', // public address of your app
//   network: 'rinkeby',
//   signer: SimpleSigner('6ae922642562eb41ee7798545587a97a19762afeb111cbf8b098da3ad401f49c'), // signing key of your app that will help you to create the JWT
// })

const uport = new Connect('Requestor app', {
  clientId: '2oqW268q5A81uF1GiG23ehgUEwhcXUd2rH7',
  network: 'rinkeby',
  signer: SimpleSigner('cb357710b7bf7dcc7a56c68da354c04c15aced0a2ff57bee05aaad484d1777d1')
})

const web3 = uport.getWeb3();

console.log('#######################################');

document.getElementById('attestationBtn').style.display = 'none';
document.getElementById('transactBtn').style.display = 'none';

export { web3, uport }
import { Connect, SimpleSigner } from 'uport-connect'
import kjua from 'kjua'

console.log('Starting application');
console.log('#######################################');

const uport = new Connect('Etienne', {
  clientId: '2otJXJs5E4ANhnJMDyN9VCLL6skrqYxZEGd', // public address of your app
  network: 'rinkeby',
  signer: SimpleSigner('6ae922642562eb41ee7798545587a97a19762afeb111cbf8b098da3ad401f49c'), // signing key of your app that will help you to create the JWT
})

const web3 = uport.getWeb3();
export { web3, uport }

console.log('#######################################');


window.loginBtn = () => {
  console.log('login');
  console.log('#######################################');

  document.getElementById('loginBtn').disabled = true;

  // Request credentials to login
  uport.requestCredentials({
    requested: ['name', 'phone', 'country', 'avatar'],
    notifications: true, // We want this if we want to recieve credentials
  },
  (uri) => {
    const qr = kjua({
      text: uri,
      fill: 'pink',
      size: 300,
      back: 'red',
    })
    // create wrapping link for mobile touch
    let aTag = document.createElement('a');
    aTag.href = uri;

    // nest qr code in a and inject
    aTag.appendChild(qr);
    document.getElementById('qr').appendChild(aTag);
  })
    .then((credentials) => {
      // Do something
      console.log(credentials);
    })
}


// // Attest specific credentials
// uport.attestCredentials({
//   sub: THE_RECEIVING_UPORT_ADDRESS,
//   claim: {
//     CREDENTIAL_NAME: CREDENTIAL_VALUE,
//   },
//   exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
// })

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

document.getElementById('attestationBtn').style.display = 'none';
document.getElementById('transactBtn').style.display = 'none';
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

      window.address = credentials.address; // MNID

      document.getElementById('attestationBtn').style.display = 'block';
      document.getElementById('transactBtn').style.display = 'block';
      document.getElementById('loginBtn').style.display = 'none';
      document.getElementById('qr').style.display = 'none';
    })
}

window.attestationBtn = () => {

  console.log('attest');
  console.log('#######################################');

  document.getElementById('attestationBtn').disabled = true;
  // Attest specific credentials
  uport.attestCredentials({
    sub: window.address, // MNID
    claim: {
      carte_id: 12345,
      country: 'FR',
      first_name: 'Etienne',
      last_name: 'Fichot',
      birthdate: '08/08/1990',
      birthplace: 'Caen',
      sex: 'M',
      address: '20 rue Touzet Gaillard Saint Ouen',
    },
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
  })
}

window.transactBtn = () => {

  console.log('transact');
  console.log('#######################################');
  console.log(MNID);

  document.getElementById('transactBtn').disabled = true;
  
}


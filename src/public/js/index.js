import { uport } from './uportSetup'
import kjua from 'kjua'
import { setUser } from './setUser'
import { myContractSetup } from './contractSetup'
import { waitForMined } from './contractHandeling'

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

      setUser(credentials);

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
    sub: window.loggedInUser.address, // Master uport id
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

  document.getElementById('transactBtn').disabled = true;
  let myContract = myContractSetup();
  myContract.adopt(3, (error, txHash) => {
    if (error) { throw error }
    waitForMined(txHash, { blockNumber: null }, 
      function pendingCB () {
        // Signal to the user you're still waiting
        // for a block confirmation
      },
      function successCB (data) {
        // Great Success!
        // Likely you'll call some eventPublisherMethod(txHash, data)
        console.log(data);
      }
    )
  })
}

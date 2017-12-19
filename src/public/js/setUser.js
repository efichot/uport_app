import { Connect, SimpleSigner, MNID } from 'uport-connect'

function setUser(credentials) {
    window.loggedInUser = credentials;

    // uport address are a hash of all it's different network identity

    const decodeId = MNID.decode(window.loggedInUser.address);
    window.loggedInUser.rinkebyId = decodeId.address;

    console.log(window.loggedInUser);
    
    console.log(`uPort master address: ${window.loggedInUser.address}`);
    console.log(`uPort rinkeby address: ${window.loggedInUser.rinkebyId}`);
}

export { setUser }
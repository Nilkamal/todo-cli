const { authenticate } = require('./auth/auth');

start();

async function start() {
    const isAuthenticate = await authenticate();
    if(isAuthenticate) {
        // Ask for todos repeatedly until user is satisfied 
    } else {
        console.log('Please provide valid credentials')
    }
}


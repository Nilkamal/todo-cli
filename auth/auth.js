const { firebase } = require('../config/firebase');

function authenticate() {
    let authenticated = false;
    const email = process.env.email || 'nilkamalsha75@gmail.com';
    const password = process.env.password || 'test123';
    const promise = new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(data => {
                if (data) {
                    authenticated = true;
                    resolve(authenticated)
                }
            })
            .catch(error => {
                reject(error);
            })
    })
    return promise;

}

module.exports = { 
    authenticate
}
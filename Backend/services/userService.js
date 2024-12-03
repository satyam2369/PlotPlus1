const jwt = require('jsonwebtoken');
const key = 'hello';

function createToken(data){
    return jwt.sign(data, key, {expiresIn: '1h'});
}

function getDataFromToken(token){
    try {
        console.log("this is token"+token);
        return jwt.verify(token, key);
    } catch (err) {
        return null; // If token is invalid or expired, return null
    }
}

module.exports = {createToken, getDataFromToken};
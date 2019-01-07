const { getDB } = require('./dbconnect');
const { dbURI } = require('../config');

const collectionName = 'users';

async function registerFunction(userDatas)
 {
     await getDB.collection(collectionName).insertOne(userDatas)
     return userDatas;
 }

 async function findByEmail(email)
 {
     return getDB.collection(collectionName).findOne({ email });
 }

 module.exports = {
    registerFunction,
    findByEmail,
  };
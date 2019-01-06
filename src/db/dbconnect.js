const { MongoClient } = require('mongodb');
const { dbURI } = require('../config');

let mongoClient;

async function connect()
{
    mongoClient = await MongoClient.connect(
        dbURI,
        { useNewUrlParser: true }   /* current URL string parser is deprecated, and will be removed in a future version. To use the new parser,
         pass option { useNewUrlParser: true } to MongoClient.connect error javítása */
    )
}

function disconnect()
{
    return mongoClient.close();
}

function getDB()
{
    return mongoClient.db(mongoClient.s.options.db);
}

module.exports = {
    connect, 
    disconnect, 
    getDB
}
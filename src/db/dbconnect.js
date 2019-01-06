const { MongoClient } = require('mongodb');
const { dbURI } = require('../config');

let mongoClient;

async function connect()
{
    mongoClient = await MongoClient.connect(
        dbURI
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
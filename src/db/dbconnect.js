const { mongoClient } = require('mongodb');
const { dbURI } = require('../config');

let mongoclient;

async function connect()
{
    mongoClient = await mongoClient.connect(
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
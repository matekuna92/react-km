const { ObjectId } = require('mongodb');
const { getDB } = require('./dbconnect');

const collectionName = 'devices';

async function get(id)
{
    const result = await getDB().collection(collectionName).findOne({ _id: ObjectId(id) });
    return result;
}

async function list()
{
    const result = await getDB().collection(collectionName).find().toArray();
    return result;
}

async function insert(data)
{
   const result = await getDB().collection(collectionName).insertOne(data);
   return data;         // insert, update esetén nincs szükség a teljes result-ra, csak a konkrét data-ra
}

async function update(id, data)
{
    const result = await getDB().collection(collectionName).updateOne({ _id: ObjectId(id), data }); 
    return data;                                                    // melyik id-val rendelkező device-t updateljem, és mivel
}

async function remove()
{
    const result = await getDB().collection(collectionName).deleteOne({ _id: ObjectId(id), data });
    // remove esetén nem szeretnénk data-t visszakapni
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove,
  };
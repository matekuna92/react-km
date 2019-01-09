// list, insert, update, remove --> router-ben hívjuk meg, device.js-ben deklaráljuk a konkrét függvényeket

const joi = require('joi');
const devices = require('../db/device');
const logger = require('../logger');

const deviceSchema = joi.object({
    displaySizeInInches: joi.number().required(),
    displayType: joi.string().required(),
    resolution: joi.number().required(),
    outputs: joi.array().items(joi.string()).required(),
    name: joi.string().required(),
    itemNo: joi.string().required()
})

async function get(req, res)
{
    const deviceID = req.params.id;

    const result = await devices.get(deviceID);

    if(!result)
    {
        res.status(404);
        res.end();
    }

    res.send(result);
}

async function list(req, res)
{
    const result = await devices.list();

    res.send(result);
}

async function insert(req, res)     // csak akkor insert-elünk, ha a kérésben szereplő adat egyáltalán megfelel a sémának
{
    logger.info(JSON.stringify(req.body));
    try 
    {
        joi.attempt(req.body, deviceSchema);    // összevetjük a body-ban kapott JSON adatot a sémával, csak 
    }                                           // csak ennek megfelelő adatot insertálunk
    catch(err)
    {
        res.status(400);
        res.send(err.details[0].message);
    }

    const result = await devices.insert(req.body);

    res.status(201);
    res.send(result);
}

async function update(req, res)     // update esetén is séma validálás
{
    try
    {
        joi.attempt(req.body, deviceSchema);
    }
    catch(err)
    {
        res.status(400);
        res.send(err.details[0].message);
    }

    const deviceID = req.params.id;
    const result = await devices.update(deviceID, req.body);    // melyik id-val rendelkező device-t updatelem, és mivel

    res.send(result);
}

async function remove(req, res)
{
    const deviceID = req.params.id;
    
    await devices.remove(deviceID);
    
    res.status(204);                        // no-content error - https://restfulapi.net/http-status-204-no-content/
    res.end();
}

module.exports = {
    get,
    list,
    insert,
    update,
    remove
}





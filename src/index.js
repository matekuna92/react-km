// az alkalmazás kiindulópontja, meghívjuk a server-ben megírt init és shutdown function-öket
// a connect, disconnect-et a db/index.js-ben definiáljuk, db-hez való kommunikációért felelősek

const { init, shutdown } = require('./web/server');
const logger = require('./logger');
const { connect, disconnect } = require('./db/dbconnect');

async function startup()
{
    try
    {
        await init();
        logger.info('Server is ready...');
        await connect();
   
        process.once('SIGINT', () => {
            shutdown( async () => {
                try 
                {
                    await disconnect();
                    logger.info('DB disconnected...');
                    process.exit(1);
                }
                catch(err)
                {
                    console.log('Failed to disconnect from DB!');
                    process.exit(1);
                }
            })
        })
    
        logger.info('DB is ready...');
    }
    catch(err)
    {
        console.log('Couldn\'t connect to DB!');
        console.log(err);
        process.exit(1);
    }
}

startup();



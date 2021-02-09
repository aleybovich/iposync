import { getData } from './nyse-source';
import { init as dbInit, getDealModel, insertDeal, updateDeal } from './db';

const {log, debug} = console;

(async () => {
    log("Starting sync");

    log("Getting deals");
    const data = await getData();
    log(`Got ${data.length} deals`);

    log("Initializing database");
    await dbInit();
    log("Database initialized");

    data.forEach(async deal => {
        const symbol = deal.Symbol;
        debug(`Processing ${symbol}`);

        const model = await getDealModel(symbol);
        
        if (!model) {
            debug(`${symbol} not found in db, inserting`);
            await insertDeal(deal);
        } else {
            debug(`${symbol} found in db, updating`);
            const changed = await updateDeal(deal, model);
            if (changed.length) {
                log(`${symbol} updated`);
                changed.forEach(ch => {
                    console.log(`${symbol}:  ${ch.field} value changed from ${ch.oldValue} to ${deal[ch.field]}`);
                });
            } else {
                log(`${symbol} not updated (no changes found)`);
            }
        }
    });
}) ();
const dbFile = "deals.sqlite";

import { Sequelize, Identifier, Options } from 'sequelize';

import { initModels, DealModel} from './models';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbFile,
    logging: false,
    dialectOptions: {
        useUTC: true
    }
});

export async function init () {
    await initModels(sequelize);
    await sequelize.sync();
}

export async function getDealModel (symbol: Identifier): Promise<DealModel> {
    return await DealModel.findByPk(symbol);
}

export async function insertDeal (deal: Deal) {
    await DealModel.create({
        Symbol: deal.Symbol,
        Company: deal.Company,
        Exchange: deal.Exchange,
        Industry: deal.Industry,
        Shares: deal.Shares,
        PriceLow: deal.PriceLow,
        PriceHigh: deal.PriceHigh,
        PriceDate: deal.PriceDate,
        Status: deal.Status,
        WithdrawnPostponedDate: deal.WithdrawnPostponedDate,
        WithdrawnPostponedText: deal.WithdrawnPostponedText
    });
}

export async function updateDeal (deal:Deal, dealModel: DealModel): Promise<Array<{ field: string, oldValue: any }>> {
    // Collect changed properies
    const changedFields = Object
        .getOwnPropertyNames(deal)
        .filter(field => deal[field] != dealModel[field])
        .map(field => ({ field, oldValue: dealModel[field] }));

    if (changedFields.length) {
        dealModel.Company = deal.Company,
        dealModel.Exchange = deal.Exchange,
        dealModel.Industry = deal.Industry,
        dealModel.Shares = deal.Shares,
        dealModel.PriceLow = deal.PriceLow,
        dealModel.PriceHigh = deal.PriceHigh,
        dealModel.PriceDate = deal.PriceDate,
        dealModel.Status = deal.Status,
        dealModel.WithdrawnPostponedDate = deal.WithdrawnPostponedDate,
        dealModel.WithdrawnPostponedText = deal.WithdrawnPostponedText
        await dealModel.save();
    }

    return changedFields;
}

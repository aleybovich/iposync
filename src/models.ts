// Database models
import { DataTypes, Model, Sequelize } from 'sequelize';

export class DealModel extends Model implements Deal {
    Symbol: string;
    Company: string;
    Exchange: string;
    Industry: string;
    Status: string;
    Shares: number;
    PriceLow: number | null;
    PriceHigh: number | null;
    PriceDate?: Date;
    WithdrawnPostponedDate?: Date;
    WithdrawnPostponedText: string;
}

export async function initModels(sequelize: Sequelize) {
    DealModel.init({
        Symbol: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        Company: { type: DataTypes.STRING, allowNull: false },
        Exchange: { type: DataTypes.STRING, allowNull: false },
        Industry: { type: DataTypes.STRING, allowNull: false },
        Shares: { type: DataTypes.INTEGER, allowNull: false },
        PriceLow: { type: DataTypes.INTEGER, allowNull: true },
        PriceHigh: { type: DataTypes.INTEGER, allowNull: true },
        PriceDate: { type: DataTypes.STRING, allowNull: true },
        Status: { type: DataTypes.STRING, allowNull: false },
        WithdrawnPostponedDate: { type: DataTypes.STRING, allowNull: true },
        WithdrawnPostponedText: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize,
        modelName: "Deal"
    });

    await DealModel.sync();
};
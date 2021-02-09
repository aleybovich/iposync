import fetch from 'node-fetch';
import PriceRange from './price-range';

export async function getData(): Promise<Array<Deal>> {
    const data = await fetch("https://www.nyse.com/api/ipo-center/calendar").then(r => r.json());

    return data.calendarList.map(entry => ({
        Symbol: entry.symbol,
        Company: entry.issuer_nm,
        Exchange: entry.custom_group_exchange_nm,
        Industry: entry.custom_group_industry_nm,
        Status: entry.deal_status_desc,
        Shares: entry.current_shares_filed,
        PriceLow: PriceRange.fromRange(entry.current_file_price_range_usd).low,
        PriceHigh: PriceRange.fromRange(entry.current_file_price_range_usd).high,
        PriceDate: timestampToString(entry.price_dt),
        WithdrawnPostponedDate: timestampToString(entry.withdrawn_postponed_dt),
        WithdrawnPostponedText: entry.withdrawn_postponed_txt
    }));
};


function timestampToString(ts: number) {
    if (ts) return new Date(ts).toISOString();
    return null;
}
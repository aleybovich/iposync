interface Deal {
    Symbol: string,
    Company: string,
    Exchange: string,
    Industry: string,
    Status: string,
    Shares: number,
    PriceLow: number | null,
    PriceHigh: number | null,
    PriceDate?: Date,
    WithdrawnPostponedDate?: Date,
    WithdrawnPostponedText: string
}
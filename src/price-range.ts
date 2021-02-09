export default class PriceRange {
    low?: number;
    high?: number;

    constructor(range: [number, number] | number| null) {
        if (!range) {
            this.low = null;
            this.high = null;
        } else if (Array.isArray(range)) {
            this.low = range[0];
            this.high = range[1];
        } else {
            this.low = this.high = range;
        }        
    }

    static fromRange(range: string): PriceRange {
        const result = PriceRange.parseRange(range);

        return new PriceRange(result);
    }

    private static parseRange(range: string): [number, number] | number | null {
        if (!range) return null;

        const result = range.split(' - ').map(i => parseFloat(i)).filter(n => !isNaN(n));
        
        if (!result.length) return null;

        if (result.length == 1){
            const r =  NaNtoNull(result[0]);
            return r;
        }

        return [ result[0], result[1] ];
    }
}

function NaNtoNull(n : number) {
    if (isNaN(n)) return null;
    return n;
}
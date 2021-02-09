import { expect } from 'chai';
import PriceRange from '../src/price-range';

describe("PriceRange", () => {
    it("Range is empty string", () => {
        expect(PriceRange.fromRange("")).to.eql({ low:null, high:null });
    });

    it("Range is null", () => {
        expect(PriceRange.fromRange(null)).to.eql({ low:null, high: null});
    });

    it("Range is not numeric", () => {
        expect(PriceRange.fromRange("blah")).to.eql({ low: null, high: null});
    });

    it("Range is one number", () => {
        expect(PriceRange.fromRange("15.02")).to.eql({ low: 15.02, high: 15.02});
    });

    it("Range is a range of numbers", () => {
        expect(PriceRange.fromRange("10.03 - 20.00")).to.eql({ low: 10.03, high: 20});
    });
});
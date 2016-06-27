"use strict";
const chai_1 = require('chai');
const chain_1 = require('./chain');
function isEmpty(x) {
    return 'undefined' == typeof x || x == null;
}
function notEmpty(x) {
    return !isEmpty(x);
}
describe('Chain', () => {
    it('sequence', () => {
        let from = 0;
        let next = x => x < 3 ? x + 1 : null;
        for (var x of chain_1.Chain.sequence(from, next, /*completed*/ isEmpty).where(notEmpty).select(x => x + 1).values) {
            console.log(x);
        }
    });
    it('from Array', () => {
        for (var x of chain_1.Chain.from(["x"]).values) {
            chai_1.assert.equal(x, 'x');
        }
    });
    it('first', () => {
        let x = chain_1.Chain.from(["x", "y"]).select(x => x.toUpperCase()).first();
        chai_1.assert.equal(x, 'X');
    });
    it('first:conditional', () => {
        let x = chain_1.Chain.from(["x", "y"]).select(x => x.toUpperCase()).first(x => x == 'Y');
        chai_1.assert.equal(x, 'Y');
    });
    it('take', () => {
        let x = chain_1.Chain.from(["x", "y"]).take(1).first();
        chai_1.assert.equal(x, 'x', 'take?');
    });
    it('skip', () => {
        chai_1.assert.equal(chain_1.Chain.from(["x", "y"]).skip(1).first(), 'y');
        chai_1.assert.equal(chain_1.Chain.from(["x", "y", "z"]).skip(2).first(), 'z');
    });
    it('toArray', () => {
        let a = chain_1.Chain.from(['1', '2']).toArray();
        chai_1.assert.isTrue(Array.isArray(a)
            && a.length == 2
            && a[0] == '1'
            && a[1] == '2');
    });
});
//# sourceMappingURL=chain_test.js.map
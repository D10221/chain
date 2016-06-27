"use strict";
function isFunction(x) {
    return 'function' == typeof x;
}
function* sequence(_from, next, completed) {
    let value = isFunction(_from) ? _from() : _from;
    while (!completed(value)) {
        value = yield next(value);
    }
}
function* where(iter, filter) {
    for (let value of iter) {
        if (filter(value)) {
            yield value;
        }
    }
}
function* select(iter, f) {
    for (let x of iter) {
        yield f(x);
    }
}
function* take(iter, n) {
    let count = 0;
    for (var x of iter) {
        if (count > n) {
            return;
        }
        count++;
        yield x;
    }
}
function* skip(iter, n) {
    let count = 0;
    for (var x of iter) {
        if (count >= n) {
            yield x;
        }
        count++;
    }
}
function first(iter, predicate) {
    predicate = predicate || ((x) => true);
    for (var x of iter) {
        if (predicate(x)) {
            return x;
        }
    }
    return null;
}
class Chain {
    constructor(iterable) {
        this.iterable = iterable;
    }
    static sequence(_from, next, completed) {
        return new Chain(sequence(_from, next, completed));
    }
    static from(ts) {
        return new Chain(ts[Symbol.iterator]());
    }
    get values() {
        return this.iterable;
    }
    where(filter) {
        return new Chain(where(this.iterable, filter));
    }
    select(f) {
        return new Chain(select(this.values, f));
    }
    take(n) {
        return new Chain(take(this.values, n));
    }
    skip(n) {
        return new Chain(skip(this.values, n));
    }
    first(predicate) {
        return first(this.values, predicate);
    }
    toArray() {
        return Array.from(this.iterable);
    }
}
exports.Chain = Chain;
//# sourceMappingURL=chain.js.map
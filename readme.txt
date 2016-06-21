export declare class Chain<T> {
    private iterable;
    static sequence<T>(_from: T | (() => T), next: (x: T) => T, completed: (x: T) => boolean): Chain<T>;
    static from<T>(ts: T[]): Chain<T>;
    constructor(iterable: IterableIterator<T>);
    values: IterableIterator<T>;
    where(filter: (x: T) => boolean): Chain<T>;
    select<TR>(f: (x: T) => TR): Chain<TR>;
    take(n: number): Chain<T>;
    skip(n: number): Chain<T>;
    first(predicate?: (x: T) => boolean): T;
}

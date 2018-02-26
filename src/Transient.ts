import { IResolve } from "./IResolve";
import { IProvideResolve } from "./IProvideResolve";

/** 
 * A class that provides a resolver which always delivers the same instance.
*/
export class Transient<T> implements IProvideResolve<T> {
    constructor(private create: () => T) {
    }

    public resolve(): T {
        return this.create();
    }

    public toResolver(): IResolve<T> {
        return () => this.resolve();
    }

    public reset(): void {
        
    }
}
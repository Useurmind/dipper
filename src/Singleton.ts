import { IResolve } from "./IResolve";
import { IProvideResolve } from "./IProvideResolve";

/** 
 * A class that provides a resolver which always delivers the same instance.
*/
export class Singleton<T> implements IProvideResolve<T> {
    private instance?: T;

    constructor(private create: () => T) {
    }

    public resolve(): T {
        if (!this.instance) {
            this.instance = this.create();
        }

        return this.instance;
    }

    public toResolver(): IResolve<T> {
        return () => this.resolve();
    }

    public reset(): void {
        this.instance = undefined;
    }
}
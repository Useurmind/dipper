import { IResolver } from "./IResolver";
import { IResolverProvider } from "./IResolverProvider";

/** 
 * A class that provides a resolver which always delivers the same instance.
*/
export class Singleton<T> implements IResolverProvider<T> {
    private instance?: T;

    constructor(private create: () => T) {
    }

    public resolve(): T {
        if (!this.instance) {
            this.instance = this.create();
        }

        return this.instance;
    }

    public toResolver(): IResolver<T> {
        return () => this.resolve();
    }
}
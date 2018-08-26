import { IResolve, ResolverType } from "./IResolve";
import { IProvideResolve } from "./IProvideResolve";

/** 
 * A class that provides a resolver which always delivers a new instance.
 * Does not track disposables.
*/
export class Transient<T> implements IProvideResolve<T> {
    constructor(private create: () => T) {
    }

    public resolve(): T {
        return this.create();
    }

    public toResolver(): IResolve<T> {
        return Object.assign(() => this.resolve(), {
            toOrigin: () => this,
            resolverType: ResolverType.Transient
        });
    }

    public reset(): void {
        
    }
    
    public dispose(): void {
    }
}
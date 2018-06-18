import { IResolve, ResolverType } from "./IResolve";
import { IProvideResolve } from "./IProvideResolve";
import { isDisposable } from "./IDisposable";

export interface ISingleton {    
    /**
     * Create a new singleton with the same behaviour for a new scope.
     */
    createScope(): ISingleton;
}

/** 
 * A class that provides a resolver which always delivers the same instance.
*/
export class Singleton<T> implements IProvideResolve<T>, ISingleton {
    private instance?: T;

    constructor(private create: () => T) {
    }

    public (): T {
        return this.resolve();
    }

    public resolve(): T {
        if (!this.instance) {
            this.instance = this.create();
        }

        return this.instance;
    }

    public toResolver(): IResolve<T> {
        return Object.assign(() => this.resolve(), {
            toOrigin: () => this,
            resolverType: ResolverType.Singleton
        });
    }

    public reset(): void {
        this.instance = undefined;
    }

    public createScope(): ISingleton {
        return new Singleton<T>(this.create);
    }
    
    public dispose(): void {
        if(this.instance && isDisposable(this.instance)){
            this.instance.dispose();
        }
    }
}
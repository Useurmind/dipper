import { IContainerCreationContext } from "./IContainerCreationContext";
import { Singleton, Transient, IProvideResolve, IResolve, ISingleton } from ".";
import { IContainer, IScopeProvider } from "./IContainer";
import { IReset } from "./IReset";
import { IDisposable } from "./IDisposable";
import { IContainerFactory } from "./ContainerFactory";

export interface IScopedSingleton {
    scopeKey: string;
    singleton: ISingleton;
}

export interface ISingletonByScopes {
    [scopeKey: string]: IScopedSingleton[];
}

/** 
 * This is the base class for a container.
 * It contains functions to define different resolution strategies.
 */
export class ContainerBase<TContainer extends IContainer> implements IContainerCreationContext, IContainer {
    private resolveProviders: (IReset & IDisposable)[];
    private globalProviders: any[];
    private scopedSingletons: IScopedSingleton[];

    constructor(private containerFactory: IContainerFactory<TContainer>){
        this.resolveProviders = [];
        this.globalProviders = [];
        this.scopedSingletons = [];
    }

    public scoped<T>(create: () => T, scopeKey: string): IResolve<T> {        
        let singleton = new Singleton(create);

        this.resolveProviders = [...this.resolveProviders, singleton];        

        this.scopedSingletons.push({
            scopeKey,
            singleton
        })

        return singleton.toResolver();
    }

    public single<T>(create: () => T): IResolve<T> {
        let singleton = new Singleton(create);

        this.resolveProviders = [...this.resolveProviders, singleton];
        this.globalProviders = [...this.globalProviders, singleton];

        return singleton.toResolver();
    }

    public transient<T>(create: () => T): IResolve<T> {
        let transient = new Transient(create);

        this.resolveProviders = [...this.resolveProviders, transient];
        this.globalProviders = [...this.globalProviders, transient];

        return transient.toResolver();
    }

    public reset(): void {
        this.resolveProviders.forEach(provideResolve => {
            provideResolve.reset();
        });
    }

    public resolve(key: string): any {
        let anyThis = this as any;
        // get the IResolve for the given key and get the instance.
        return anyThis[key]();
    }

    public startLifetimeScope(scopeKey?: string): IScopeProvider<TContainer> & TContainer {
        if(!scopeKey) {
            scopeKey = "defaultScope";
        }

        return this.containerFactory.createScope(this, scopeKey, this.scopedSingletons);
    }

    /**
     * When creating a scope a new singleton is created by default.
     * We replace it with the old singleton.
     * @param scopedSingleton The old singleton.
     */
    public unscopeSingleton(newSingleton: ISingleton, oldSingleton: ISingleton) {
        const singletonIndex = this.scopedSingletons.findIndex(x => x.singleton === newSingleton);
        if(singletonIndex !== -1) {
            this.scopedSingletons[singletonIndex] = {
                scopeKey: this.scopedSingletons[singletonIndex].scopeKey,
                singleton: oldSingleton
            };
        }
    }

    public dispose(): void {
        this.resolveProviders.forEach(resolveProvider => {
            resolveProvider.dispose();
        });
    }
}

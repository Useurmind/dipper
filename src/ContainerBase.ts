import { IContainerCreationContext } from "./IContainerCreationContext";
import { Singleton, Transient, IProvideResolve } from ".";
import { IContainer, IScopeProvider } from "./IContainer";
import { IReset } from "./IReset";
import { IDisposable } from "./IDisposable";
import { IContainerFactory } from "./ContainerFactory";

/** 
 * This is the base class for a container.
 * It contains functions to define different resolution strategies.
 */
export class ContainerBase<TContainer extends IContainer> implements IContainerCreationContext, IContainer {
    private resolveProviders: (IReset & IDisposable)[];

    constructor(private containerFactory: IContainerFactory<TContainer>){
        this.resolveProviders = [];
    }

    public single<T>(create: () => T): () => T {
        let singleton = new Singleton(create);

        this.resolveProviders = [...this.resolveProviders, singleton];

        return singleton.toResolver();
    }

    public transient<T>(create: () => T): () => T {
        let transient = new Transient(create);

        this.resolveProviders = [...this.resolveProviders, transient];

        return transient.toResolver();
    }

    public reset(): void {
        this.resolveProviders.forEach(provideResolve => {
            provideResolve.reset();
        });
    }

    public startLifetimeScope(tag?: string): IScopeProvider<TContainer> & TContainer {
        return this.containerFactory.create();
    }

    public dispose(): void {
        this.resolveProviders.forEach(resolveProvider => {
            resolveProvider.dispose();
        });
    }
}

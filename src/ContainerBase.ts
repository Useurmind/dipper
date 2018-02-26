import { IContainerCreationContext } from "./IContainerCreationContext";
import { Singleton, Transient, IProvideResolve } from ".";
import { IContainer } from "./IContainer";
import { IReset } from "./IReset";

/** 
 * This is the base class for a container.
 * It contains functions to define different resolution strategies.
 */
export class ContainerBase implements IContainerCreationContext, IContainer {
    private resolveProviders: IReset[];

    constructor(){
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
}

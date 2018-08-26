import { IContainer, IScopeProvider } from "./IContainer";
import { ContainerBase, IScopedSingleton, isResolverWithOrigin, ResolverType, ISingletonByScopes } from ".";
import { IContainerSpecification } from "./ContainerSpecification";

/**
 * Interface for a factory that creates a container.
 */
export interface IContainerFactory<TContainer extends IContainer> {
    /**
     * Create the container.
     */
    create(): IScopeProvider<TContainer> & TContainer;

    /**
     * Create a new scope from an existing container.
     * @param scopeKey The key of the scope that is created.
     * @param scopedSingletons The singletons that were created as scoped in this container.
     */
    createScope(oldContainer: ContainerBase<TContainer>, scopeKey: string, scopedSingletons: IScopedSingleton[]): IScopeProvider<TContainer> & TContainer;
}

/** 
 * This factory creates a container from a set of container specs.
 */
export class ContainerSpecContainerFactory<TContainer extends IContainer> implements IContainerFactory<TContainer> {
    constructor(private containerSpecs: IContainerSpecification[]) {

    }

    public create(): IScopeProvider<TContainer> & TContainer {
        let container = this.createBase();

        return <IScopeProvider<TContainer> & TContainer><any>container;
    }

    public createScope(oldContainer: ContainerBase<TContainer>, scopeKey: string, scopedSingletons: IScopedSingleton[]): IScopeProvider<TContainer> & TContainer {
        let container = this.createBase();
        let anyContainer = container as any;
        let oldAnyContainer = oldContainer as any;

        for (let prop in container) {

            let value = anyContainer[prop]
            let oldValue = oldAnyContainer[prop]

            // if the property is a resolver
            // and a singleton at the same time
            if (isResolverWithOrigin(value) &&
                value.resolverType === ResolverType.Singleton) {

                // find the matching scope singleton if present and scope it in the new container
                const origin = value.toOrigin();
                const oldOrigin = oldValue.toOrigin();
                const scopedSingleton = scopedSingletons.find(x => x.singleton === oldOrigin);

                if (scopedSingleton && scopedSingleton.scopeKey !== scopeKey) {
                    container.unscopeSingleton(origin, oldOrigin);
                    anyContainer[prop] = (scopedSingleton.singleton as any).toResolver();
                }
            }
        }

        return <IScopeProvider<TContainer> & TContainer>anyContainer;
    }

    private createBase(): ContainerBase<TContainer> {
        let container = new ContainerBase<TContainer>(this);

        this.containerSpecs.forEach(containerSpec => {
            let containerExtension = containerSpec(container);

            container = Object.assign(container, containerExtension);
        });

        return container;
    }
}
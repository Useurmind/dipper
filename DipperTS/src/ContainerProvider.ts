import { IContainer, IScopeProvider } from "./IContainer";
import { IReset } from "./IReset";
import { ResolvingContainer } from "./ResolvingContainer";
import { ScopedContainer } from "./ScopedContainer";

/**
 * The currrently active container provider instance.
 */
let currentInstance: IContainerProvider = null;

/**
 * Interface for a cotainer provider.
 * A container providers is the globally responsible instance for giving you 
 * the correct container for the current context.
 * It decides how to create new lifetime scopes for the container.
 */
export interface IContainerProvider extends IReset {
    /**
     * Get the container for the current context.
     */
    getContainer<TContainer>(): ScopedContainer<TContainer>;

    /**
     * Take care of correctly resetting all container scopes.
     */
    reset(): void;
}

/**
 * A very simple container provider that just returns the given prebuild container instance.
 */
export class ContainerInstanceProvider implements IContainerProvider {
    constructor(private container: IContainer) {

    }
    
    /**
     * Get the container for the current context.
     */
    getContainer<TContainer>(): ScopedContainer<TContainer> {
        return this.container as any as ScopedContainer<TContainer>;
    }

    /**
     * Take care of correctly resetting all container scopes.
     */
    reset(): void {
        this.container.reset();
    }
}

/**
 * Provide the same container across your whole application.
 * @param container The container to provide.
 */
export function provideContainerInstance(container: IContainer) {
    currentInstance = new ContainerInstanceProvider(container);
}

/**
 * Set the container provider to an instance of your choice
 * @param containerProvider 
 */
export function setContainerProvider(containerProvider: IContainerProvider) {
    currentInstance = containerProvider;
}

/**
 * Get the current container provider.
 */
export function getContainerProvider(): IContainerProvider {
    if(currentInstance === null) {
        throw "Dipper container provider was not set when retrieving it."
    }

    return currentInstance;
}
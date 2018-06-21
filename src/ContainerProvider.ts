import { IContainer } from "./IContainer";

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
export interface IContainerProvider {
    /**
     * Get the container for the current context.
     */
    getContainer(): IContainer;
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
    getContainer(): IContainer {
        return this.container;
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
import { IContainerCreationContext } from "./IContainerCreationContext";
import { ContainerBase } from "./ContainerBase";
import { ResolvingContainer } from "./ResolvingContainer";
import { IContainer } from "./IContainer";

/** 
 * This class is used to create a container.
*/
export class ContainerBuilder {
    /**
     * This method is used to add the given interface to a container.
     * @param defineContainer A function that defines the registrations in this specific container interface using the context handed to it.
     * @returns Class to continue building the container.
     */
    public add<TContainer>(defineContainer: (context: IContainerCreationContext & ResolvingContainer<TContainer>) => ResolvingContainer<TContainer>): ContainerBuilder2<IContainer & ResolvingContainer<TContainer>> {
        let container = new ContainerBase();

        let containerDefinitions = defineContainer(<any>container);

        let extendedContainer = Object.assign(container, containerDefinitions);

        return new ContainerBuilder2<IContainer & ResolvingContainer<TContainer>>(extendedContainer);
    }
}

/**
 * Class to fluently continue to build a container.
 */
export class ContainerBuilder2<TCurrentContainer> {
    constructor(private currentContainer: TCurrentContainer) {

    }

    /**
     * This method is used to add the given interface to a container.
     * @param defineContainer A function that defines the registrations in this specific container interface using the context handed to it.
     * @returns Class to continue building the container.
     */
    public add<TContainer>(defineContainer: (context: IContainerCreationContext & TCurrentContainer & ResolvingContainer<TContainer>) => ResolvingContainer<TContainer>): ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>> {
        let containerDefinitions = defineContainer(<any>this.currentContainer);

        let extendedContainer = Object.assign(this.currentContainer, containerDefinitions);

        return new ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>>(extendedContainer);
    }

    /** 
     * Finish and return the container that is currently created.
     * @returns The finished container.
     */
    public create(): TCurrentContainer {
        return this.currentContainer;
    }
}
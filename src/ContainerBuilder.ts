import { IContainerCreationContext } from "./IContainerCreationContext";
import { ContainerBase } from "./ContainerBase";
import { ProducingContainer } from "./ProducingContainer";

/** 
 * This class is used to create a container.
*/
export class ContainerBuilder {
    /**
     * This method is used to create the container.
     * @param defineContainer A function that defines the registrations in the container using the context handed to it.
     * @returns The ready container.
     */
    public add<TContainer>(defineContainer: (context: IContainerCreationContext & ProducingContainer<TContainer>) => ProducingContainer<TContainer>): ContainerBuilder2<ProducingContainer<TContainer>> {
        let container = new ContainerBase();

        let containerDefinitions = defineContainer(<any>container);

        let extendedContainer = Object.assign(container, containerDefinitions);

        return new ContainerBuilder2<ProducingContainer<TContainer>>(extendedContainer);
    }
}

export class ContainerBuilder2<TCurrentContainer> {
    constructor(private currentContainer: TCurrentContainer) {

    }

    /**
     * This method is used to create the container.
     * @param defineContainer A function that defines the registrations in the container using the context handed to it.
     * @returns The ready container.
     */
    public add<TContainer>(defineContainer: (context: IContainerCreationContext & TCurrentContainer & ProducingContainer<TContainer>) => ProducingContainer<TContainer>): ContainerBuilder2<TCurrentContainer & ProducingContainer<TContainer>> {
        let containerDefinitions = defineContainer(<any>this.currentContainer);

        let extendedContainer = Object.assign(this.currentContainer, containerDefinitions);

        return new ContainerBuilder2<TCurrentContainer & ProducingContainer<TContainer>>(extendedContainer);
    }

    public create(): TCurrentContainer {
        return this.currentContainer;
    }
}
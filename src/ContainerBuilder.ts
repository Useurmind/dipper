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
    public create<TContainer>(defineContainer: (context: IContainerCreationContext & ProducingContainer<TContainer>) => ProducingContainer<TContainer>): ProducingContainer<TContainer> {
        let container = new ContainerBase();

        let containerDefinitions = defineContainer(<any>container);

        return Object.assign(container, containerDefinitions);
    }
}
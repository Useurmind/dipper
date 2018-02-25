import { IContainerCreationContext } from "./IContainerCreationContext";
import { ContainerBase } from "./ContainerBase";
import { ProducingContainer } from "./ProducingContainer";

export class ContainerBuilder {
    public create<TContainer>(defineContainer: (context: IContainerCreationContext & ProducingContainer<TContainer>) => ProducingContainer<TContainer>): ProducingContainer<TContainer> {
        let container = new ContainerBase();
        
        let containerDefinitions = defineContainer(<any>container);

        return Object.assign(container, containerDefinitions);
    }
}
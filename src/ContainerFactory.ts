import { IContainer, IScopeProvider } from "./IContainer";
import { ContainerBase } from ".";
import { IContainerSpecification } from "./ContainerSpecification";

/**
 * Interface for a factory that creates a container.
 */
export interface IContainerFactory<TContainer extends IContainer> {
    /**
     * Create the container.
     */
    create(): IScopeProvider<TContainer> & TContainer;
}

/** 
 * This factory creates a container from a set of container specs.
 */
export class ContainerSpecContainerFactory<TContainer extends IContainer> implements IContainerFactory<TContainer> {
    constructor(private containerSpecs: IContainerSpecification[]){

    }

    public create(): IScopeProvider<TContainer> & TContainer {
        let container = new ContainerBase<TContainer>(this);

        this.containerSpecs.forEach(containerSpec => {
            let containerExtension = containerSpec(container);

            container = Object.assign(container, containerExtension);
        });

        return <IScopeProvider<TContainer> & TContainer><any>container;
    }
}
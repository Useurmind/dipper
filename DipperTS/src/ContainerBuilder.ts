import { IContainerCreationContext } from "./IContainerCreationContext";
import { ContainerBase } from "./ContainerBase";
import { ResolvingContainer } from "./ResolvingContainer";
import { IContainer, IScopeProvider } from "./IContainer";
import { IIndependentContainerSpecification, IDependentContainerSpecification, IContainerSpecification } from "./ContainerSpecification";
import { ContainerSpecContainerFactory } from "./ContainerFactory";

/** 
 * This class is used to create a container.
*/
export class ContainerBuilder {
    /**
     * This method is used to add the given interface to a container.
     * @param defineContainer A function that defines the registrations in this specific container interface using the context handed to it.
     * @returns Class to continue building the container.
     */
    public addIndependent<TContainer>(defineContainer: IIndependentContainerSpecification<TContainer>): ContainerBuilder2<IContainer & ResolvingContainer<TContainer>> {
        return new ContainerBuilder2<IContainer & ResolvingContainer<TContainer>>([<IContainerSpecification><any>defineContainer]);
    }
}

/**
 * Class to fluently continue to build a container.
 */
export class ContainerBuilder2<TCurrentContainer> {
    private containerSpecs: IContainerSpecification[]

    constructor(containerSpecs: IContainerSpecification[]) {
        this.containerSpecs = containerSpecs;
    }

    /**
     * This method is used to add the given interface to a container.
     * @param defineContainer A function that defines the registrations in this specific container interface using the context handed to it.
     * @returns Class to continue building the container.
     */
    public addIndependent<TContainer>(defineContainer: IIndependentContainerSpecification<TContainer>): ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>> {
        this.containerSpecs = [...this.containerSpecs, <IContainerSpecification><any>defineContainer];

        return new ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>>(this.containerSpecs);
    }

    /**
     * This method is used to add the given interface to a container.
     * @param defineContainer A function that defines the registrations in this specific container interface using the context handed to it.
     * @returns Class to continue building the container.
     */
    public addDependent<TContainer>(defineContainer: IDependentContainerSpecification<TCurrentContainer, TContainer>): ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>> {
        this.containerSpecs = [...this.containerSpecs, <IContainerSpecification><any>defineContainer];

        return new ContainerBuilder2<TCurrentContainer & ResolvingContainer<TContainer>>(this.containerSpecs);
    }

    /** 
     * Finish and return the container that is currently created.
     * @returns The finished container.
     */
    public create(): IScopeProvider<TCurrentContainer> & TCurrentContainer {
        let container = new ContainerSpecContainerFactory(this.containerSpecs).create();

        return <IScopeProvider<TCurrentContainer> & TCurrentContainer><any>container;
    }
}
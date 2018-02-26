import { IContainerCreationContext, ResolvingContainer } from ".";

/**
 * This interface provides a signature for handlers that specify the setup
 * of a specific container interface.
 */
export interface IIndependentContainerSpecification<TContainer> {
    /**
     * @param context This context provides the functions to setup a container
     * with component registrations.
     * @returns An object that fullfills the container interface and has all registrations added.
     */
    (context: IContainerCreationContext & ResolvingContainer<TContainer>): ResolvingContainer<TContainer>;
}


/**
 * This interface provides a signature for generic handlers that specify the setup
 * of a specific container interface.
 * @param TContainerSource The interface of the container that are available to the specified container interface.
 * @param TContainerTarget The interface of the container that is specified in this handler.
 */
export interface IDependentContainerSpecification<TContainerSource, TContainerTarget> {
    /**
     * @param context This context provides the functions to setup a container
     * with component registrations.
     * @returns An object that fullfills the container interface and has all registrations added.
     */
    (context: IContainerCreationContext & TContainerSource & ResolvingContainer<TContainerTarget>): ResolvingContainer<TContainerTarget>;
}
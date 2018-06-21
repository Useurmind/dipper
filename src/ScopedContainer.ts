import { IScopeProvider, ResolvingContainer } from ".";

/**
 * Type that can be applied to a container with a given specification.
 */
export type ScopedContainer<TContainer> = IScopeProvider<ResolvingContainer<TContainer>> & ResolvingContainer<TContainer>;
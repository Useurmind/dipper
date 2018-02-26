import { IResolve } from "./IResolve";

/** 
 * This mapped type is used to simplify container interface definition.
 * It maps the container interface of properties with pure registration types to
 * an interface with properties that are functions to create the instances of the registrations.
 */
export type ResolvingContainer<TContainer> = {
    [P in keyof TContainer]: IResolve<TContainer[P]>;
}

import { IResolver } from "./IResolver";

/** 
 * This mapped type is used to simplify container interface definition.
 * It maps the container interface of properties with pure registration types to
 * an interface with properties that are functions to create the instances of the registrations.
 */
export type ProducingContainer<TContainer> = {
    [P in keyof TContainer]: IResolver<TContainer[P]>;
}

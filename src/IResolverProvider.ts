import { IResolver } from "./IResolver";

/**
 * This interface allows classes to return resolvers.
 */
export interface IResolverProvider<T> {
    toResolver(): IResolver<T>;
}
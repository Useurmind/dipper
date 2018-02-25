import { IResolver } from "./IResolver";

export interface IResolverProvider<T> {
    toResolver(): IResolver<T>;
}
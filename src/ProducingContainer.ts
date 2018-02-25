import { IResolver } from "./IResolver";

export type ProducingContainer<TContainer> = {
    [P in keyof TContainer]: IResolver<TContainer[P]>;
}

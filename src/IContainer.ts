import { IReset } from "./IReset";

export interface IContainer extends IReset {
    /**
     * Reset the state of the container to start resolving fresh instances afterwards.
     */
    reset(): void;
}
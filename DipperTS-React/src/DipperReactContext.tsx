import * as React from "react";
import * as Dipper from "dipperts";

export interface IDipperReactContext {
    containerProvider: Dipper.IContainerProvider;
}

export let DipperContext: React.Context<IDipperReactContext> = null;

export function initDipperContext(containerProvider: Dipper.IContainerProvider) {
    if(DipperContext !== null) {
        console.error("Tried to init dipper react context twice.")
        return;
    }

    DipperContext = React.createContext<IDipperReactContext>({
        containerProvider
    });
}
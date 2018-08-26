import * as React from "react";
import * as ReactDom from "react-dom";
import { Page } from "./Page";
import { CounterStore } from "./CounterStore";
import { MyContainer } from "./MyContainer";
import * as dipper from "dipperts";
import * as dipperReact from "../src";


// use these variables to insert the corresponding shims through webpack
declare var es5;
declare var es6;
es5.nothing;
es6.nothing;

let root = document.getElementById("root");
ReactDom.render(<Page />, root); 

// create a container 
var containerBuilder = new dipper.ContainerBuilder();
var container = containerBuilder.addIndependent<MyContainer>(c => ({
    globalCounterStore: c.single(() => new CounterStore()),
    perPageCounterStore: c.scoped(() => new CounterStore(), "PerPage"),
    transientCounterStore: c.transient(() => new CounterStore())
})).create();

var containerProvider = new dipper.ContainerInstanceProvider(container);

dipperReact.initDipperContext(containerProvider);

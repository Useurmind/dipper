import * as React from "react";

export interface IPageState {
}

export interface IPageProps {
    
}

export class Page extends React.Component<{}, IPageState> {
    constructor(props: any){
        super(props);

        this.state = {
        }    
    }

    componentDidMount() {
     
    }

    componentWillUnmount() {
        
    }

    public render(): any {
        return <div>
            <div>Hello page</div>
            <div>Global Counter</div>
        </div>;
    }
}
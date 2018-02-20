import { ComponentInstance } from './component.instance';

export class Component {

    componentName: string;
    config: any;
    constructor(_componentName, config){
        this.componentName = _componentName;
        this.config = config;
    }

    createNewInstance(elm){
        return new ComponentInstance(elm, this.config);
    }

}
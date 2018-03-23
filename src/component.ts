import { ComponentInstance } from './component.instance';

export class Component {

    public componentName: string;
    public config: any;

    constructor(_componentName, config) {
        this.componentName = _componentName;
        this.config = config;
    }

    public createNewInstance(elm) {
        return new ComponentInstance(elm, this.config);
    }

}
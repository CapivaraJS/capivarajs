import { ComponentInstance } from './component.instance';

export class Component {

    public componentName: string;
    public config: any;

    constructor(_componentName, config) {
        this.componentName = _componentName;
        this.config = config;
        this.customElementsVue();
    }

    private customElementsVue() {
        if (window['Vue']) {
            window['Vue'].config.ignoredElements = window['Vue'].config.ignoredElements || [];
            if (window['Vue'].config.ignoredElements.filter((value) => value === this.componentName).length === 0) {
                window['Vue'].config.ignoredElements.push(this.componentName);
            }
        }
    }

    public createNewInstance(elm) {
        return new ComponentInstance(elm, this.config);
    }

}

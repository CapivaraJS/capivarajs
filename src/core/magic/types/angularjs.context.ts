import { Context } from "../context";

export class AngularJSContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'angular';
    }

    public process(element) {
        return window[this.name].element(element).scope();
    }

}
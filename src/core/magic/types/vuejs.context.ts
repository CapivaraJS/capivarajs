import { Context } from "../context";

export class VueJSContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'Vue';
    }

    public process(element) {
        if (element.parentElement && element.parentElement.__vue__) {
            return element.parentElement.__vue__;
        } else if (element.parentElement) {
            return this.process(element.parentElement);
        } else {
            return;
        }
    }
}

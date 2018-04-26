import { Context } from "../context";

export class AngularContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'ng';
    }

    public process(element) {
        return window[this.name].probe(element)._debugContext.context;
    }

}

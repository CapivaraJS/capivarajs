import { Context } from "../context";

export class AngularContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'ng';
    }

    public process(element) {
        const probe = window[this.name].probe(element);
        if (probe && probe._debugContext && probe._debugContext.context) {
            return probe._debugContext.context;
        }
    }

}

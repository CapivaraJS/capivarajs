export abstract class Context {
    public successor: Context;
    protected name: string;

    constructor(context?: Context) {
        if (context) {
            this.successor = context;
        }
    }

    public getContext(element) {
        if (window[this.name]) {
            return this.process(element);
        } else if (this.successor) {
            return this.successor.getContext(element);
        }
    }

    public abstract process(element);
}

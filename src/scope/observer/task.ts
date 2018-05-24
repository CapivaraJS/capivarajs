export class Task {
    public handler;
    private args;

    constructor(handler, args) {
        this.handler = handler;
        this.args = args;
    }

    public run() {
        // See steps in section 5 of the spec.
        if (typeof this.handler === "function") {
            // Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
            this.handler.apply(undefined, this.args);
        } else {
            const scriptSource = "" + this.handler;
            /*jshint evil: true */
            eval(scriptSource);
        }
    }

}

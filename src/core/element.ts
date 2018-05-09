export class CapivaraElement {

    private events = {};
    private onEvent;

    constructor(private element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
    }

    public on(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName].push(callback);
        } else {
            this.events[eventName] = [callback];
            if (!this.onEvent) {
                this.onEvent = (evt) => {
                    (this.events[evt.type] || []).forEach((cb) => cb(evt));
                };
            }
            this.element.addEventListener(eventName, this.onEvent);
        }
    }

    public destroy() {
        Object.keys(this.events).forEach((eventName) => {
            this.element.removeEventListener(eventName, this.onEvent);
        });
    }

}

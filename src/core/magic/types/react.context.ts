import { Context } from "../context";

export class ReactContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'React';
    }

    private constainsAttr(attr, element) {
        let keyValue;
        for (const key in element) {
            if (key.startsWith('__reactInternalInstance$')) {
                keyValue = key;
                break;
            }
        }
        return keyValue;
    }

    public process(element) {
        const key = this.constainsAttr('__reactInternalInstance$', element);
        if (key) {
            const fiberNode = element[key];
            if (fiberNode && fiberNode._debugOwner) {
                return fiberNode._debugOwner.stateNode;
            }
        } else if (element.parentElement) {
            return this.process(element.parentElement);
        }
    }

    public teste(element) {
        if (element.parentElement && element.parentElement.startsWith('__reactInternalInstance$')) {
            return element.parentElement.startsWith('__reactInternalInstance$');
        } else if (element.parentElement) {
            return this.teste(element.parentElement);
        } else {
            return;
        }
    }
}
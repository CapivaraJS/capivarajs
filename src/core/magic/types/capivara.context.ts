import { Common } from "../../../common";
import { Constants } from "../../../constants";
import { Context } from "../context";

export class CapivaraJSContext extends Context {

    constructor(context?: Context) {
        super(context);
        this.name = 'capivara';
    }

    public process(element) {
        if (Common.isComponent(element) && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME]) {
            return element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME].scope;
        }
        if (element && element[Constants.SCOPE_ATTRIBUTE_NAME]) {
            return element[Constants.SCOPE_ATTRIBUTE_NAME].scope;
        }
    }

}

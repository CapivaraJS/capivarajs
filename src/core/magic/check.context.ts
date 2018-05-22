import { Common } from "../../common";
import { AngularContext } from "./types/angular.context";
import { AngularJSContext } from "./types/angularjs.context";
import { CapivaraJSContext} from './types/capivara.context';
import { ReactContext } from "./types/react.context";
import { VueJSContext } from "./types/vuejs.context";

export namespace CheckContext {

    /**
     * @pattern https://pt.wikipedia.org/wiki/Chain_of_Responsibility
     * @param element
     */
    export function getContext(element) {
        if (Common.insideComponent(element)) {
            return new CapivaraJSContext().getContext(element);
        }
        const context = new AngularJSContext(new AngularContext(new VueJSContext(new ReactContext(new CapivaraJSContext()))));
        return context.getContext(element);
    }
}

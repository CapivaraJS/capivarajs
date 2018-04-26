import { AngularJSContext } from "./types/angularjs.context";
import { VueJSContext } from "./types/vuejs.context";
import { ReactContext } from "./types/react.context";
import { AngularContext } from "./types/angular.context";

export namespace CheckContext {

    /**
     * @pattern https://pt.wikipedia.org/wiki/Chain_of_Responsibility
     * @param element 
     */
    export function getContext(element) {
        const context = new AngularJSContext(new AngularContext(new VueJSContext(new ReactContext())));
        return context.getContext(element);
    }
}
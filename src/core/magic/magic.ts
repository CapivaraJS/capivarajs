import { CheckContext } from './check.context';

export namespace Magic {
    export function getContext(element) {
        return CheckContext.getContext(element);
    }
}
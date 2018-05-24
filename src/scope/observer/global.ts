import tasks from './tasks';

const globalFun = (global, undefined?) => {

    const canUseNextTick = () => {
        return typeof process === "object" &&
            Object.prototype.toString.call(process) === "[object process]";
    };

    const canUseMessageChannel = () => {
        return !!global.MessageChannel;
    };

    const canUsePostMessage = () => {
        if (!global.postMessage || global.importScripts) {
            return false;
        }
        let postMessageIsAsynchronous = true;
        const oldOnMessage = global.onmessage;
        global.onmessage = () => {
            postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;
        return postMessageIsAsynchronous;
    };

    const canUseReadyStateChange = () => {
        return "document" in global && "onreadystatechange" in global.document.createElement("script");
    };

    const installNextTickImplementation = (attachTo) => {
        attachTo.setImmediate = function anonymousFunc() {
            const handle = tasks.addFromSetImmediateArguments(arguments);
            process.nextTick(() => tasks.runIfPresent(handle));
            return handle;
        };
    };

    const installMessageChannelImplementation = (attachTo) => {
        const channel = new global.MessageChannel();
        channel.port1.onmessage = (event) => {
            const handle = event.data;
            tasks.runIfPresent(handle);
        };
        attachTo.setImmediate = function anonymousFunc() {
            const handle = tasks.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    };

    const installPostMessageImplementation = (attachTo) => {
        const MESSAGE_PREFIX = "com.bn.NobleJS.setImmediate" + Math.random();

        const isStringAndStartsWith = (string, putativeStart) => {
            return typeof string === "string" && string.substring(0, putativeStart.length) === putativeStart;
        };

        const onGlobalMessage = (event) => {
            if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
                const handle = event.data.substring(MESSAGE_PREFIX.length);
                tasks.runIfPresent(handle);
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        attachTo.setImmediate = function anonymousFunc() {
            const handle = tasks.addFromSetImmediateArguments(arguments);
            global.postMessage(MESSAGE_PREFIX + handle, "*");
            return handle;
        };
    };

    const installReadyStateChangeImplementation = (attachTo) => {
        attachTo.setImmediate = function anonymousFunc() {
            const handle = tasks.addFromSetImmediateArguments(arguments);
            let scriptEl = global.document.createElement("script");
            scriptEl.onreadystatechange = () => {
                tasks.runIfPresent(handle);

                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
            };
            global.document.documentElement.appendChild(scriptEl);
            return handle;
        };
    };

    const installSetTimeoutImplementation = (attachTo) => {
        attachTo.setImmediate = function anonymousFunc() {
            const handle = tasks.addFromSetImmediateArguments(arguments);
            global.setTimeout(() => tasks.runIfPresent(handle), 0);
            return handle;
        };
    };

    if (!global.setImmediate) {
        const attachTo = typeof Object.getPrototypeOf === "function" && "setTimeout" in Object.getPrototypeOf(global) ?
            Object.getPrototypeOf(global)
            : global;

        if (canUseNextTick()) {
            // For Node.js before 0.9
            installNextTickImplementation(attachTo);
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation(attachTo);
        } else if (canUseMessageChannel()) {
            document.getElementById('debug').innerHTML += 'message channel';
            // For web workers, where supported
            installMessageChannelImplementation(attachTo);
        } else if (canUseReadyStateChange()) {
            // For IE 6–8
            installReadyStateChangeImplementation(attachTo);
        } else {
            // For older browsers
            installSetTimeoutImplementation(attachTo);
        }

        attachTo.clearImmediate = tasks.remove;
    }

};

export default globalFun;

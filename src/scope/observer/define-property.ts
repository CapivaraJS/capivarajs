const observeDefineProperty = () => {
    if (Object.prototype['__defineGetter__'] && !Object.defineProperty) {
        Object.defineProperty = function anonymousFunc(obj, prop, desc) {
            if ("get" in desc) {
                obj.__defineGetter__(prop, desc.get);
            }
            if ("set" in desc) {
                obj.__defineSetter__(prop, desc.set);
            }
        };
    } else {
        const doesDefinePropertyWorkOn = (obj) => {
            try {
                Object.defineProperty(obj, "x", {});
                return "x" in obj;
            } catch (e) {
                // returns falsy
            }
        };
        const definePropertyWorksOnObject = doesDefinePropertyWorkOn({}),
            definePropertyWorksOnDom = typeof document === "undefined" || doesDefinePropertyWorkOn(document.createElement("div"));
        if (!definePropertyWorksOnObject && window['VBArray']) {
            // use VBscript class
            // document.write('ie6 ie7 ie8');
            // getOwnPropertyDescriptor needed
            // building...
        } else if (!definePropertyWorksOnDom) {// webkit dom defineProperty polyfill
            // getOwnPropertyDescriptor
            // building...
        }/*else{
            //document.write('modern');
            console.log('mordern')
        }*/
    }
};

export default observeDefineProperty;

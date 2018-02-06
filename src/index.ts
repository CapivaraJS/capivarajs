import { Controller } from './controller';

const packageJson = require('../package.json');

(function(capivara){

    if(!capivara){
        window['capivara'] = {
            controller: function(){ 
                Controller.apply(this, arguments)
            },
            version: packageJson.version
        }
    }

})(window['capivara']);
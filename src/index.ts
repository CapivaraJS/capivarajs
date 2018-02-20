import { Controller } from './controller';
import { Constants } from './constants';
const packageJson = require('../package.json');

(function(capivara){

    if(!capivara){
        
        window['capivara'] = {
            controller: function(){ 
                Controller.apply(this, arguments)
            },
            constants: function(obj){
                Object.keys(obj).forEach(key => {
                    if(Constants[key]) Constants[key] = obj[key];
                });
            },
            version: packageJson.version
        }
        
    }else{
        console.warn('CapivaraJS tried to load more than once.');
    }

})(window['capivara']);
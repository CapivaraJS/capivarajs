import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of double click', () => {
    const template = `
    <button cp-dbClick="$ctrl.foo()"></button> 
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, () => {
        const $ctrl = this;
        var flag = false;

        $ctrl.foo = function () {
            flag = true;
        }

        $ctrl.$onViewInit = function(){
            
        }
         

    })
})

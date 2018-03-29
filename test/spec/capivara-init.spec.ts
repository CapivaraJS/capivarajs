import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of init with fixed object', () => {
  const template = `
    <h1 cp-init="$ctrl.initialize('This is the init function')">String de teste</h1>
  `;
  const element = document.createElement('div');
  element.innerHTML = template;
  capivara.controller(element, function() {
    const $ctrl = this;
    $ctrl.value;

    $ctrl.initialize = (value) => {
      $ctrl.value = value;
    };

    $ctrl.$onInit = () => {
      it("Expected to not find the element", function(done) {
        setTimeout(function() {
          expect($ctrl.value).toEqual('Thisistheinitfunction');
          done();
        });
      }, 5000);
    };
  });
});

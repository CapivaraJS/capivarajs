import {} from 'jasmine';
import capivara from '../../src/index';

describe('Directive cp-attr.placeholder', () => {
  it("", () => {
    const template = `
        <input cp-attr.placeholder="$ctrl.name"/>
        <button cp-click="$ctrl.test()">Testing</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
      this.name = 'Test';

      this.test = () => {
        this.name = 'Testing';
      };

      this.$onViewInit = () => {
        const event = new Event('click');
        element.querySelector('button').dispatchEvent(event);
        setTimeout(() => {
          expect(element.querySelector('input').getAttribute('placeholder')).toEqual('Testing');
        });
      };
    });
  });
});

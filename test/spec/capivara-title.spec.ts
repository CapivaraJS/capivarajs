import { } from 'jasmine';
import capivara from '../../src/index';

describe('Directive cp-attr.tittle', () => {
  const template = `
        <h1 cp-attr.title="$ctrl.var">test</h1>
    `;
  const element = document.createElement('div');
  element.innerHTML = template;
  capivara.controller(element, function() {
    this.var = 'test1';

    this.$onViewInit = () => {
      console.log('oi');
      it('expect the element title = test1 be found', (done) => {
        expect(element.querySelector('h1').getAttribute("title")).toEqual('test1');
        done();
      });
    };

  });
});

import { } from 'jasmine';
import capivara from '../../src/index';

describe('test create component', () => {
    const template = `
        <my-component id="demo"></my-component>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    document.body.appendChild(element);
    const config = {
        template: '<h1 id="componentBuilder">Hello World</h1>',
    };
    capivara.component('my-component', config);
    it("Expected config equal", function() {
        expect(capivara.components['MY-COMPONENT'].config.template).toEqual(config.template);
    });
});

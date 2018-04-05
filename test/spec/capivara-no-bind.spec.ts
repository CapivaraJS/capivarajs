import { } from 'jasmine';
import capivara from '../../src/index';

describe('test no bind', () => {
    const template = `

    <div cp-non-bindable>
        <h1>[[4+4]]</h1>
    </div>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {

        it("Expected ignore interpolation", function(done) {
            setTimeout(function() {
                expect(element.querySelector('div h1').innerHTML).toEqual('[[4+4]]');
                done();
            });
        });

    });
});

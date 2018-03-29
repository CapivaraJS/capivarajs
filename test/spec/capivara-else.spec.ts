import { } from 'jasmine';
import capivara from '../../src/index';

describe('test cpElse hide element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <h2 cp-else>Not show this</h2>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = true;

        $ctrl.$onInit = () => {
            it("Expected h2 not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(true);
                    done();
                });
            });
        };
    });
});

// describe('test cpElse show element', () => {
//     const template = `
//         <h1 cp-if="$ctrl.isActive">Show this</h1>
//         <h2 cp-else>Not show this</h2>
//     `;
//     const element = document.createElement('div');
//     element.innerHTML = template;
//     capivara.controller(element, function() {
//         const $ctrl = this;
//         $ctrl.isActive = false;

//         $ctrl.$onInit = () => {
//             it("Expected h2 not found", function(done) {
//                 setTimeout(function() {
//                     expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(false);
//                     done();
//                 });
//             });
//         };
//     });
// });

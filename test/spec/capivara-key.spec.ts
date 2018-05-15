// import { } from 'jasmine';
// import capivara from '../../src/index';

// describe('test of key', () => {
//     const template = `
//         <button cp-keypress.enter="$ctrl.toggleClicked()"></button>
//     `;
//     const element = document.createElement('div');
//     element.innerHTML = template;
//     capivara.controller(element, function() {
//         const $ctrl = this;

//         $ctrl.$onInit = () => {
//             $ctrl.clicked = false;
//         };

//         $ctrl.toggleClicked = () => {
//             $ctrl.clicked = !$ctrl.clicked;
//         };

//     });
//     it('The value of the variable must be true', () => {
//         expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(true);
//     });
// });

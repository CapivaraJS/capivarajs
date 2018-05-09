// import {} from 'jasmine';
// import capivara from '../../src/index';
// import {CPClick} from '../../src/map/directive/cp-click';

// function triggerDoubeClick(element) {
//     const doubleClickEvent = document.createEvent('MouseEvents');
//     doubleClickEvent.initEvent('dblclick', true, true);
//     element.querySelector('button').dispatchEvent(doubleClickEvent);
// }

// describe('Directive cp-dblclick', () => {

//     it('The value of the variable must be true', () => {
//         const template = `
//         <button cp-dblclick="$ctrl.toggleClicked()"></button>
//     `;
//         const element = document.createElement('div');
//         element.innerHTML = template;
//         capivara.controller(element, function() {
//             const $ctrl = this;

//             $ctrl.$onInit = () => {
//                 $ctrl.clicked = false;
//             };

//             $ctrl.toggleClicked = () => {
//                 $ctrl.clicked = !$ctrl.clicked;
//             };
//         });
//         triggerDoubeClick(element);
//         expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(true);
//     });

//     it('Must be the sum of the two numbers', () => {
//         const template = `
//         <input cp-model="$ctrl.numberOne" type="number"/>
//         <input cp-model="$ctrl.numberTwo" type="number"/>
//         <button cp-dblclick="$ctrl.sum($ctrl.numberOne + $ctrl.numberTwo)"></button>
//     `;
//         const element = document.createElement('div');
//         element.innerHTML = template;

//         capivara.controller(element, function() {
//             const $ctrl = this;

//             $ctrl.$onInit = () => {
//                 $ctrl.numberOne = 90;
//                 $ctrl.numberTwo = 10;
//             };

//             $ctrl.sum = (value) => {
//                 $ctrl.result = value;
//             };
//         });
//         triggerDoubeClick(element);
//         expect(element['$instance'].componentScope.$ctrl.result).toEqual(100);
//     });
//     it('Must be the subtraction of the two numbers', () => {
//         const template = `
//         <input cp-model="$ctrl.numberOne" type="number"/>
//         <input cp-model="$ctrl.numberTwo" type="number"/>
//         <button cp-dblclick="$ctrl.subtract($ctrl.numberOne - $ctrl.numberTwo)"></button>
//     `;
//         const element = document.createElement('div');
//         element.innerHTML = template;

//         capivara.controller(element, function() {
//             const $ctrl = this;

//             $ctrl.$onInit = () => {
//                 $ctrl.numberOne = 90;
//                 $ctrl.numberTwo = 10;
//             };

//             $ctrl.subtract = (value) => {
//                 $ctrl.result = value;
//             };
//         });
//         triggerDoubeClick(element);
//         expect(element['$instance'].componentScope.$ctrl.result).toEqual(80);
//     });

//     it('Must be the same object', () => {
//         const template = `
//         <button cp-dblclick="$ctrl.save($ctrl.person)"></button>
//     `;
//         const element = document.createElement('div');
//         element.innerHTML = template;

//         capivara.controller(element, function() {
//             const $ctrl = this;

//             $ctrl.$onInit = () => {
//                 $ctrl.person = {
//                     name: 'Mateus',
//                 };
//             };

//             $ctrl.save = (person) => {
//                 $ctrl.result = person;
//             };
//         });
//         triggerDoubeClick(element);
//         expect(element['$instance'].componentScope.$ctrl.result).toEqual(element['$instance'].componentScope.$ctrl.person);
//     });

//     it('Should create the click event', (done) => {
//         const template = `
//         <button cp-dblclick="$ctrl.save()"></button>
//     `;
//         const element = document.createElement('div');
//         element.innerHTML = template;
//         capivara.controller(element, function() {
//             const $ctrl = this;

//             $ctrl.save = function() {
//                 $ctrl.clicked = true;
//             };
//         });
//         const cpClick = new CPClick(element.querySelector('button'), null);
//         cpClick.create();
//         triggerDoubeClick(element);
//         setTimeout(() => {
//             expect(element.querySelector('button')['$scope'].scope.$ctrl.clicked).toEqual(true);
//             done();
//         }, 1000);
//     });

// });

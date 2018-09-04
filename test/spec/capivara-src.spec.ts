// import {} from 'jasmine';
// import capivara from '../../src/index';

// describe('Directive cp-attr.src', () => {

//   it("Should set the src dynamically", function(done) {

//     const template = `
//          <img src="" cp-attr.src="$ctrl.src">
//     `;
//     const element = document.createElement('div');
//     element.innerHTML = template;
//     capivara.controller(element, function() {
//       const $ctrl = this;
//       $ctrl.src = 'https://avatars1.githubusercontent.com/u/33517395?s=200&v=4';

//       $ctrl.$onInit = () => {
//         setTimeout(function() {
//           expect(element.querySelector('img').src).toEqual($ctrl.src);
//           done();
//         }, 2000);
//       };
//     });
//   });

//   it("Should set the src dynamically", function(done) {

//     const template = `
//          <img src="" cp-attr.src="$ctrl.src">
//         <button id="click-btn" class="btn btn-primary" cp-click="$ctrl.click()">Click me!</button>
//     `;
//     const element = document.createElement('div');
//     element.innerHTML = template;
//     capivara.controller(element, function() {
//       const $ctrl = this;
//       $ctrl.src = 'https://avatars1.githubusercontent.com/u/33517395?s=200&v=4';

//       $ctrl.click = () => {
//         $ctrl.src = 'https://bit.ly/2pTjZnU';
//       };

//       $ctrl.$onInit = () => {
//         setTimeout(function() {
//           element.querySelector('button').click();
//         }, 1000);
//         setTimeout(function() {
//           expect(element.querySelector('img').src).toEqual('https://bit.ly/2pTjZnU');
//           done();
//         }, 2000);
//       };
//     });
//   });
// });

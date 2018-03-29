capivara.component('my-component', {
	template: `
	<h1 cp-if="$ctrl.isActive">Show this</h1>
	<h1 cp-else > Not Show this</h1>
	<button cp-click="$ctrl.click()">Click me!</button>
    `
});
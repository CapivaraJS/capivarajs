capivara.component('my-component', {
	template: `
		<h1 cp-if="$ctrl.isActive">Show this</h1>
		<ul cp-repeat="item in $ctrl.items">
			[[item]]
		</ul>
		
		<button cp-click="$ctrl.click()">Click me!</button>
	`, 
	controller: function(){
		const $ctrl = this;

		$ctrl.items = [
			'João',
			'Caio'
		]

		$ctrl.click = function(){
			$ctrl.isActive = !$ctrl.isActive;	
		}
	}
});
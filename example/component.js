capivara.component('my-component', {
	template: `        
		<p cp-style="{background-color: $ctrl.red}">Sample text</p>
		<button id="button" class="btn btn-primary" cp-click="$ctrl.click()">Click me</button>
    `,
	controller: function () {
		let $ctrl = this;

		$ctrl.red = 'blue';

		$ctrl.click = () => {
			$ctrl.red = 'red';
		};
	
		setTimeout(function(){ document.getElementById('button').click(); }, 3000);

		// button.form.submit();
		// $ctrl.getStyle = () => {
		// 	return 	{
		// 		['backgroundColor'] : $ctrl.red,
		// 	};
		// };
	}
});
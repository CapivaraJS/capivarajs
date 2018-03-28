capivara.component('my-component', {
	template: `        
        <p cp-style="{$ctrl.getStyle()}">Sample text</p>
    `,
	controller: function () {
		let $ctrl = this;

		$ctrl.red = 'blue';

		$ctrl.getStyle = () => {
			return 	{
				['backgroundColor'] : $ctrl.red,
			};
		};
	}
});
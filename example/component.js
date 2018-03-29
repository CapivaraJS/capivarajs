
capivara.component('my-component', {
	template: `
        <h1 cp-style="$ctrl.getStyle()" cp-click="$ctrl.teste()">String de teste</h1>
    `,
	controller: function () {
		const $ctrl = this;
		$ctrl.color = 'red';

		$ctrl.getStyle = () => {
			return {
				['background-color'] : $ctrl.color,
			};
		};

		$ctrl.teste = () => {
			$ctrl.color = 'blue';
		};

	}
});
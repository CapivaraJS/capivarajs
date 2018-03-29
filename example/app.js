capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;

	$ctrl.$onViewInit = () => {
		const h2 =  document.body.querySelector('h2');
		const teste = h2['$$cpDestroyed'];
		console.log(teste);
		console.log([document.body.querySelector('h2')['$$cpDestroyed']]);
	};

	$ctrl.teste = () => {
		$ctrl.isActive = !$ctrl.isActive;
	}

});
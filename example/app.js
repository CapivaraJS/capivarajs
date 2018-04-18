capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.numero1 = 20;
	$ctrl.numero2 = 20;

	$ctrl.teste = () => {
		$ctrl.numero2 = 30;
	}

});

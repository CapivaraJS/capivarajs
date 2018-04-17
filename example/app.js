capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.ativado = false;

	$ctrl.ativou = function() {
		console.log('Oie');
		$ctrl.ativado = true;
	};

});
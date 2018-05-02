capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.numero1 = 20;
	$ctrl.numero2 = 20;

	$ctrl.attribute = true;



	$ctrl.mouseenter = function() {
		$ctrl.texto = 'Entrou';
	};

	$ctrl.mouseout = function(){
		$ctrl.texto = 'Saiu';
	};
	

});

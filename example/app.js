capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;

	$ctrl.teste = () => {
		// $ctrl.isActive = !$ctrl.isActive;
		$ctrl.pessoas[1].idade = 30;
	}

	$ctrl.pessoas = [
		{
			nome: "Mateus Miranda",
			idade: 21
		}
	];

});
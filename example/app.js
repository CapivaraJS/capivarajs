capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;

	$ctrl.teste = () => {
		$ctrl.isActive = !$ctrl.isActive;
	}

	$ctrl.pessoas = [
		{
			nome: "Mateus Miranda",
			idade: 21
		}
	];

	$ctrl.nome = 'Mateus'
	$ctrl.nome2 = 'Miranda'
	$ctrl.nome3 = 'de Almeida'

	$ctrl.teste = function(scope){
		console.log(scope);
	}

});
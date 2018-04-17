capivara.controller(document.body, function () {
	const $ctrl = this;

	let pessoa = {};

	capivara.componentBuilder('teste')
		.context(pessoa)
		.bindings({
			cpModel: 'nome'
		})
		.build();

	$ctrl.oi = () => {
		pessoa.nome = "Mateus"
	};

});
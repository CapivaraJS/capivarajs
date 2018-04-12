capivara.component('my-component', {
	template: `
		<input cp-model="$ctrl.$bindings.pessoa.nome"/>
		<button cp-click="$ctrl.teste()">Teste</button>
	`, 
	bindings: ['pessoa'],
	controller: function(){
		const $ctrl = this;

		$ctrl.teste = () => {
			$ctrl.$bindings.pessoa.nome = 'João';
		};

		$ctrl.$onChanges = () => {
			// console.log(changes);
		};

	}
});
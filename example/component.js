capivara.component('my-component', {
	template: `
		<input type="date" cp-model="$ctrl.oi"/>
		[[$ctrl.oi]]
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
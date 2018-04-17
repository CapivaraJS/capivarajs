capivara.component('my-component', {
	template: `
		<input type="text" cp-model="$ctrl.$bindings.cpModel"/>
	`, 
	bindings: ['cpModel'],
	controller: function(){
		const $ctrl = this;

		$ctrl.teste = () => {
			// $ctrl.$bindings.pessoa.nome = 'João';
		};

		$ctrl.$onChanges = (changes) => {
			// console.log('outro jesus', changes);
		};

	}
});
capivara.component('my-component', {
	template: `
		<input cp-model="$ctrl.$bindings.pessoa.nome"/>
	`, 
	bindings: ['pessoa'],
	controller: function(){
		const $ctrl = this;
	}
});
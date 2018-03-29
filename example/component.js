capivara.component('my-component', {
	template: `
        <h1 cp-init="$ctrl.inicializa()">[[$ctrl.frase]]</h1>
    `,
	controller: function () {
		const $ctrl = this;
		$ctrl.frase = 'Ola abigos';

		$ctrl.inicializa = function () {
			console.log('Inicializou');
			console.log(store);
		};

		let store = [];
		let oldf = console.log;
		console.log = function(){
			store.push(arguments);
			oldf.apply(console, arguments);
		};
	}
});
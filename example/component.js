capivara.component('my-component', {
	template: `
        <ul id="some">
            <li cp-repeat="pessoa in $ctrl.pessoas">
                [[pessoa.nome]]
            </li>
        </ul>
    `,
	controller: function(){
		const $ctrl = this;

		$ctrl.pessoas = [
			{ nome: 'João' },
			{ nome: 'Maria' }
		];
	}
});
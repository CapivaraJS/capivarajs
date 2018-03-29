capivara.component('my-component', {
	template: `
        <h1 cp-if="$ctrl.contador == 2">H1 com IF tem a soma igual a [[$ctrl.contador]].</h1>
        <h1 cp-else-if="$ctrl.contador == 3">H1 com ELSE IF tem a soma igual a [[$ctrl.contador]].</h1>
        <h1 cp-else>H1 com ELSE tem a soma igual a [[$ctrl.contador]].</h1>

        <button cp-click="$ctrl.somar()">Clique para Somar</button>
    `,
	controller: function(){
		const $ctrl = this;

		$ctrl.contador = 1;

		$ctrl.somar = function(){
			$ctrl.contador +=1;
		};
	}
});
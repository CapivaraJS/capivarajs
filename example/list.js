capivara.component('my-component', {
    template: `        
        <h1 cp-if="$ctrl.nome == 'felipe'">Primeiro if</h1>

        <h1 cp-if="$ctrl.numero == 6">If</h1>
        <h1 cp-else-if="$ctrl.numero == 8"> Else IF 8 </h1>
        <h1 cp-else-if="$ctrl.numero == 9"> Else IF 9 </h1>
        <h1 cp-else> Else</h1>
        
        <button cp-click="$ctrl.alterar()">Clique para Mostrar</button>
    `,
    controller: function (scope) {
        let $ctrl = this;

        $ctrl.nome = 'felipe';

        $ctrl.numero = 5;

        $ctrl.alterar = function () {
            $ctrl.numero = $ctrl.numero + 1;
        };

    }
});
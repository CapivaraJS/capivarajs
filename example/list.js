capivara.component('my-component', {
    template: `        
        <h1 cp-if="$ctrl.mostrar">If</h1>
        <h1 cp-else> Else</h1>
        

        <button cp-click="$ctrl.alterar()">Clique para Mostrar</button>
    `,
    controller: function (scope) {
        let $ctrl = this;

        $ctrl.alterar = function () {
            $ctrl.mostrar = !$ctrl.mostrar;
        };

    }
});
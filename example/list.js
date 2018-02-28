// noinspection HtmlUnknownAttribute
capivara.component('my-component', {
    template: `        
        <h1 cp-if="mostrar">If</h1>
        <h1 cp-else> Else </h1>
        
        <button cp-click="alterar()">Clique para Mostrar</button>
    `,
    controller: function (scope) {

        scope.mostrar = false;

        scope.alterar = function () {
            scope.mostrar = !scope.mostrar;
        }
    }
});
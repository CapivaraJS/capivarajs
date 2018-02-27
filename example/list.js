capivara.component('my-component', {
    template: `        
        <h1 cp-if="mostrar">Exemplo</h1>
        
        <button cp-click="alterar()">Clique para Mostrar</button>
    `,
    controller: function (scope) {
        scope.numbers = [1, 2, 3, 4, 5, 6];

        scope.mostrar = !scope.mostrar;
    }
});
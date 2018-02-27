capivara.component('my-component', {
    template: `        
        <h1 cp-if="mostrar == 20">Exemplo</h1>
        
        <button cp-click="alterar()">Clique para Mostrar</button>
    `,
    controller: function(scope){
        scope.mostrar = 10;

        scope.alterar = function(){
            scope.mostrar = 20;
        }

    }
});
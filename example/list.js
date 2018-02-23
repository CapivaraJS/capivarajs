
capivara.component('my-component', {
    template: `        
        <h1 cp-show="mostrarTexto">Esse é um texto de exemplo.</h1>

        <button cp-click="alterar()">Clique para Mostrar</button>
    `,
    controller: function(scope){

        scope.mostrarTexto = false;

        scope.alterar = function(){
            scope.mostrarTexto = true;
        }

    }
});
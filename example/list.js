
capivara.component('my-component', {
    template: `        
        <h1 cp-show="teste">Ola pessoas</h1>

        <button cp-click="alterar()">teste</button>
    `,
    controller: function(scope){

        scope.alterar = function(){
            scope.teste = !scope.teste;
        }

    }
});
capivara
    .component('my-component', {
        template: `

            <h1>[[$bindings.titulo]]</h1>

            <button cp-click="alterar()">Mudar</button>  
        `,
        bindings: ['titulo'],
        controller: function(scope){

            scope.alterar = function(){

            };

        }
    });

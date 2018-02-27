capivara.component('mateus', {
    template: `
        <h1> [[ mateus ]] </h1>
    `,
    controller: function(scope){
        scope.mateus = 'Mateus Miranda';

        scope.$onInit = function () {
            console.log('iniciou');
        }

    }
});


// noinspection HtmlUnknownAttribute
capivara.component('my-component', {
    template: `        
        <mateus cp-if="mostrar"  #componentMateus></mateus>
        
        <button cp-click="alterar()">Clique para Mostrar</button>
    `,
    controller: function(scope){
        capivara.componentBuilder('componentMateus').build();

        scope.mostrar = false;

        scope.alterar = function(){
            scope.mostrar = !scope.mostrar;
        }

    }
});
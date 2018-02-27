capivara.component('my-component', {
    template: `        
        <h1 cp-repeat="number in numbers">
            <span cp-if="number != 3">[[number]]</span>
        </h1>
    `,
    controller: function(scope){
        scope.mostrar = 10;

        scope.alterar = function(){
            scope.mostrar = 20;
        };

        scope.numbers = [1,2,3,4,5,6]

    }
});
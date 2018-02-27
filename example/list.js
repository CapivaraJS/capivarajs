capivara.component('my-component', {
    template: `        

        <h1 cp-init="teste(10)">
            [[ 40 + 74 ]]
        </h1>

    `,
    controller: function (scope) {
        scope.teste = function (numero) {
            console.log("iniciou", numero);
        };
    }
});
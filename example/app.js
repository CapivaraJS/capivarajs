capivara.controller(document.body, function(scope){
    
    scope.pessoa = {};

    scope.pessoas = [
        {
            nome: "Mateus",
            idade: 24
        },
        {
            nome: "Felipe"
        }
    ];

    scope.execute = index => {
        scope.pessoas.splice(index, 1);
    }

    scope.salvar = function(pessoa){
        scope.pessoas.push(pessoa);
        scope.pessoa = {};
    };

    scope.teste = function(){
        scope.pessoas = [];
    }


});
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

    scope.salvar = function(pessoa){
        scope.pessoas.push(pessoa);
        scope.pessoa = {};
    };

    scope.teste = function(){
        console.log(scope.pessoas.get())
    }

});
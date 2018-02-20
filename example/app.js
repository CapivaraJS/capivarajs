capivara.constants({
    REPEAT_ATRIBUTE_NAME: 'mateus-repeat'
});

capivara.controller(document.getElementById('context'), function(scope){

    scope.pessoas = [
        {
            nome: 'Gabi'
        },
        {
            nome: 'Teteu'
        },
        {
            nome: 'Caiu'
        }
    ];

});

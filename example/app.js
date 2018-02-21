capivara.component('my-component', {
    template: '<input type="text" cp-model="$bindings.nome"/>',
    bindings: ['nome'],
    controller: function(scope){
    }
})



let pessoa = { nome: 'Mateus' };

capivara.componentBuilder('meuMarcador')
        .context(pessoa)
        .bindings({
            nome: 'nome'
        })
        .build();




function teste(){
    console.log(pessoa);
}

var config = {
    titulo: 'My Title'
}

capivara.componentBuilder('meuMarcador')
        .context(config)
        .bindings({
            titulo: 'titulo'
        })
        .build();


setTimeout(function(){
    config.titulo = 'My Title Modify!';
}, 9000)
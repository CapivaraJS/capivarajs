angular.module('app', [])
    .controller('ctrl', function($scope){

        capivara.initComponent('nome')
                .context($scope)
                .bindings({
                    nomeDoCara: 'nome'
                });


    });
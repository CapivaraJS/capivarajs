angular.module('app', [])
    .controller('ctrl', function($scope){

        $scope.titulo = 'Ola mundo';
        
        $scope.salvar = () => {
            $scope.titulo = 'Felipe';
        };
        
        capivara.initComponent('listagem')
                .context($scope)
                .bindings({
                    pessoa: 'data.pessoa'
                });

    });

capivara.component('my-component', {
    template: `        
        
        <h1 cp-style="{color: $ctrl.numberOne == 70 ? 'red' : 'green'}"> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>


        <p cp-class="{ democlass ; democlass2 }" cp-style="{ padding: '10px';}">Exemplo 1</p> 
        <p cp-style="{ background: $ctrl.blue; padding: '10px';}">Exemplo 2</p>

        <br/>

        
        <h1 cp-if="true"> [[ $ctrl.numberOne + ((10 * $ctrl.numberTwo) / 25) ]] </h1>


        <button cp-click="$ctrl.teste()">Mudar cor</button>  
        
    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.$onInit = function(){
            $ctrl.numberOne = 50;
            $ctrl.numberTwo = 80;
            $ctrl.blue = "blue";
            $ctrl.democlass = "democlass";
        }

        $ctrl.teste = function(s){
            $ctrl.numberOne = 70;
        }
        
    }
});
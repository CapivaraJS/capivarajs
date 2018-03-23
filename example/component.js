capivara.component('my-component', {
    template: `        
            <h1 cp-style="{color: $ctrl.numberOne == 70 ? 'red' : 'green'}"> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>
            <p cp-style="{ background: 'red', padding: '10px'}">Exemplo 1</p>
            <p id="p1" cp-style="{ background: $ctrl.blue, padding: '10px'}">Exemplo 2</p>

            <button type="button" id="btn1" cp-click="$ctrl.changeNumberOne()">Trocar Numero 1</button>
            <button type="button" id="btn2" cp-click="$ctrl.changeBackground()">Trocar Fundo Ex2</button>
        `,
    controller: function () {
        let $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.numberOne = 50;
            $ctrl.numberTwo = 80;
            $ctrl.blue = "blue";
        };
        $ctrl.changeNumberOne = function () {
            $ctrl.numberOne = 70;
        };
        $ctrl.changeBackground = function () {
            $ctrl.blue = "gray";
        }
    }
});
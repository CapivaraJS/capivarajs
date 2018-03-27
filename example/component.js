capivara.component('my-component', {
    template: `        
        <input cp-model="$ctrl.numberOne" type="number"/>
        <input cp-model="$ctrl.numberTwo" type="number"/>
        [[ $ctrl.numberOne + $ctrl.numberTwo ]]
        <button cp-click="$ctrl.sum($ctrl.numberOne - $ctrl.numberTwo)">dsa</button>
    `,
    controller: function () {
        let $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.numberOne = 90;
            $ctrl.numberTwo = 10;
        };

        $ctrl.sum = (value) => {
            console.log(value)
            $ctrl.result = value;
        };

    }
});

capivara.component('my-component', {
    template: `        
        
        <h1 cp-style="color: red"> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>
        <br/>
        <button class="btn btn-success" cp-click="$ctrl.hasClicked()">Click Me!</button>
        <div>[[$ctrl.counter]]</div>
    `,
    controller: function (scope) {
        let $ctrl = this;

        $ctrl.numberOne = 70;
        $ctrl.numberTwo = 80;
        $ctrl.red = "red";
        $ctrl.myparam = "Hello capivara";
        $ctrl.counter = 1;

        $ctrl.hasClicked = function () {
            capivara.$emit('meuEvento',this, $ctrl.myparam);
        }

        capivara.$on('meuEvento', function (param) {
            $ctrl.counter += 1;
        });


    }
});
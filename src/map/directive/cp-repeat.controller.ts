export class RepeatController {
    constructor(private $scope, private $element) { }

    private $onViewInit() {
        this.$element.removeAttribute('hidden');
    }

}

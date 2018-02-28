export interface ComponentConfig {
    template: string;
    controller: any,
    controllerAs: string,
    bindings: Array<string>,
    functions: Array<any>,
    constants: Array<string>
}
export interface ComponentConfig {
    template: string;
    controller: Function,
    bindings: Array<string>,
    functions: Array<any>,
    constants: Array<string>
}
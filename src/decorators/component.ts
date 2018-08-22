import { Capivara } from '../';

export interface ComponentInterface {
  /**
   * @description Name that will be used to invoke the component in html.
   */
  tag?: string;
  /**
   * @description Component HTML template.
   */
  template: string;
  /**
   * @description Update controller name. default: $ctrl
   */
  controllerAs?: string;
  /**
   * @description Css path you want to import.
   */
  style?: string;
  /**
   * @description Declares the constants that will be accepted by component. See https://capivarajs.github.io/#/GettingStarted/Components?id=constants
  */
  constants?: string[];
  /**
   * @description Declares the functions that will be accepted by component. See https://capivarajs.github.io/#/GettingStarted/Components?id=fun%C3%A7%C3%B5es
  */
  functions?: string[];
  /**
    * @description Declares the variables that will be accepted by component. See https://capivarajs.github.io/#/GettingStarted/Components?id=bindings
   */
  bindings?: string[];
}

export const Component = (componentConfig: ComponentInterface) => {
  return (target: any) => {
    const config = {
      template: componentConfig.template,
      style: componentConfig.style,
      constants: componentConfig.constants,
      functions: componentConfig.functions,
      bindings: componentConfig.bindings,
      controllerAs: componentConfig.controllerAs,
      controller: target,
    };
    Capivara.component(componentConfig.tag, config);
  };
};

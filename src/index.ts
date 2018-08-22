import { Eval } from './core';
import { CapivaraInstance } from './core/capivara.instance';
import { Component, Controller } from './decorators';

const Capivara: CapivaraInstance = (function initCapivara(ctx, aliasName) {
  if (!ctx[aliasName]) {
    ctx[aliasName] = new CapivaraInstance();
    ctx[aliasName].core = {
      Eval,
      Component,
      Controller,
    };
  } else {
    console.warn("Gee! CapivaraJS tried to load more than once.");
  }
  return ctx[aliasName];
})(window, 'capivara');

export * from './decorators';
export default Capivara;
export { Capivara };

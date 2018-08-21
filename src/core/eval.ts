export namespace Eval {
  export function exec(source, context) {
    try {
      const contexts = (Array.isArray(context) ? context : [context]).reverse();
      const contextMerged = Object.assign({}, ...contexts);
      const params = Object.keys(contextMerged), paramsValues = params.map((param) => contextMerged[param]);
      return new Function(...params, 'return ' + source)(...paramsValues);
    } catch (e) { throw e; }
  }
}

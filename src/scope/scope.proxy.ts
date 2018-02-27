import _ from 'lodash';
import { Scope } from './scope';

export class ScopeProxy {
    
    /**
     * Escopo principal
     */
    scope: Scope;

    /**
     * Proxys dos objetos desse escopo
     */
    proxiedObjs: WeakSet<any>;

    /**
     * @param obj Objeto que será feito o proxy
     * @param _scope Instância do escopo criado.
     */
    constructor(obj, _scope: Scope) {
        this.scope = _scope;
        this.proxiedObjs = new WeakSet();
        return this.createProxiedObject(obj);
    }   

    /**
     * 
     * @method Boolean Verifica se o objeto informado é uma instância nativa do JS.
     * @param obj Objeto a ser analisado o tipo da instância.
     */
    isNativeFn(obj) {
        return obj instanceof Date;
        
    }

    /**
     * @method Proxy Cria um proxy em um determinado objeto, para que possa ser sobrescrito os metodos GET e SET que permitem atualizar os elementos quando o conteudo da variavel for alterado.
     * @param objToProxy Objeto a ser encapsulado no proxy.
     */
    createProxiedObject(objToProxy) {
        for (let x in objToProxy) {
            let subObj = objToProxy[x];
            if (subObj !== null && typeof subObj === 'object' && !this.proxiedObjs.has(subObj)) {
                if(!this.isNativeFn(subObj)){
                    objToProxy[x] = this.createProxiedObject(subObj);
                }
            }
        }

        let proxied = new Proxy(objToProxy, {
            get: (target, key) => this.get(target, key),
            set: (target, key, value) => this.set(target, key, value)
        });

        proxied.get = () => this.getObjectWithoutProxy(proxied);

        this.proxiedObjs.add(proxied);
        return proxied;
    }

    /**
     * @method Object Função executado quando quer o objeto original sem proxy.
     * @param proxied Proxy que tem o objeto encapsulado
     */
    getObjectWithoutProxy(proxied){
        return JSON.parse(JSON.stringify(proxied));
    }

    /**
     * @method any Função executado quando o valor do objeto é acionado.
     * @param target Objeto acionado
     * @param key Atributo do objeto que foi acionado
     */
    get(target, key): any {
        return _.get(target, key);
    }

    /**
     * @method Boolean Atualiza um objeto pelo atributo e seu novo valor.
     * @param target Objeto que foi alterado
     * @param key Atributo que foi alterado
     * @param value Novo valor que foi inserido
     */
    set(target, key, value): any {
        if (_.isEqual(_.get(target, key), value)) {
            return true;
        }

        //proxy nested objects
        if (value !== null && typeof value === 'object' && !this.proxiedObjs.has(value)) {
            if(!this.isNativeFn(value)){
                value = this.createProxiedObject(value);
            }
        }

        _.set(target, key, value);
        
        this.scope.mapDom.reload();

        return true;
    }

}

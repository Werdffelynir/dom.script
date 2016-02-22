(function () {

    'use strict';

    var dom = function(selector){

        if (!(this instanceof Dom)) return new Dom(selector);

        if(selector === 'body' && document.body){
            this._elementsOptions('body', document.body);

        }
        else if(selector === 'head' && document.head){
            this._elementsOptions('head', document.head);

        }
        else if(typeof selector === 'string'){
            this.query(selector);

        }else if(typeof selector === 'object' && (selector instanceof HTMLCollection || selector instanceof NodeList)){
            this._elementsOptions(null, selector);

        }
        else if(typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE){
            this._elementsOptions(null, selector);

        }else
            return this;
    };

    var internal = {}, proto = {
        selector:null,
        elements:[],
        length:0
    };
    internal.merge = function(obj, src){
        for (var key in src)
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        return obj;
    };

    /**
     * Вернет один выбраный объект, первый если выбранно большн одного.
     * Не изменяет экземпляр
     * @param index
     * @returns {*}
     */
    proto.one = function(index){
        index = index || 0;
        if(this.elements.length == 0) return;
        return this.elements[index];
    };

    /**
     * Вернет все выбраные объекты
     * Не изменяет экземпляр
     * @returns {Array}
     */
    proto.all = function (){
        if(this.elements.length == 0) return;
        return this.elements;
    };

    /**
     * Вернет первый дочерний елемент firstChild
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.first = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].firstChild;
        if(elem) {
            while(elem && elem.nodeType !== Node.ELEMENT_NODE)
                elem = elem.nextSibling;
        }
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет последний дочерний елемент lastChild
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.last = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].lastChild;
        if(elem) {
            while(elem && elem.nodeType !== Node.ELEMENT_NODE)
                elem = elem.previousSibling;
        }
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет последующий елемент nextSibling
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.next = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].nextSibling;
        if(elem) {
            while(elem.nodeType !== Node.ELEMENT_NODE)
                elem = elem.nextSibling;
        }
        this._elementsOptions(null, elem);
        return this;
    };


    /**
     * Вернет предведущий елемент previousSibling
     * Изменяет экземпляр
     * @returns {proto}
     */
    proto.prev = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].previousSibling;
        if(elem) {
            while(elem.nodeType !== Node.ELEMENT_NODE)
                elem = elem.previousSibling;
        }
        this._elementsOptions(null, elem);
        return this;
    };

    proto.children = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].children;
        this._elementsOptions(null, elem);
        return this;
    };

    proto.parent = function (){
        if(this.elements.length == 0) return;
        var elem = this.elements[0].parentNode;
        this._elementsOptions(null, elem);
        return this;
    };

    proto.find = function (selector){
        if(this.elements.length == 0) return;
        var elem = [];
        try{
            this.elements.map(function(item){
                var finds = proto.query(selector,item);
                if(finds) {
                    elem = elem.concat([].slice.call(finds));
                }
            });
        }catch(e){}
        this._elementsOptions(null, elem);
        return this;
    };


    proto.text = function (param){
        if(this.elements.length == 0) return;
        if(param == undefined)
            return this.elements[0].textContent;
        else
            this.elements[0].textContent = param;

        return this;
    };

    proto.html = function (param){
        if(this.elements.length == 0) return;
        if(param == undefined)
            return this.elements[0].innerHTML;
        else
            this.elements[0].innerHTML = param;

        return this;
    };

    proto.css = function (param, value){
        if(this.elements.length == 0) return;
        try{
            this.elements.map(function(elem){
                elem.style[param] = value;
            });
        }catch(e){}
        return this;
    };

    proto.on = function (eventName, eventFunc, bubble){
        if(this.elements.length == 0) return;
        try{
            this.elements.map(function(elem){
                elem.addEventListener(eventName, eventFunc, bubble);
            });
        }catch(e){}
        return this;
    };


    proto.each = function (func){
        if(this.elements.length == 0) return;
        var self = this;
        try{
            this.elements.map(function(elem, index){
                func.call(self, elem, index);
            });
        }catch(e){}
        return this;
    };


    /**
     * Назначение параметров для обрабюотчиков.
     * Приватный метод
     * @param selector
     * @param elements
     * @private
     */
    proto._elementsOptions = function(selector, elements) {
        this.selector = (typeof selector === 'string') ? selector : null;
        if(elements){
            if(typeof elements === 'object' && (elements instanceof HTMLCollection || elements instanceof NodeList))
                elements = [].slice.call(elements);
            else if(typeof elements === 'object' && elements.nodeType === Node.ELEMENT_NODE)
                elements = [elements];
        }
        this.elements = (elements instanceof Array) ? elements : [];
        this.length = this.elements.length;
    };

    /**
     * Базовый метод выборки элементов с DOM дерева
     * @param selector
     * @param from
     * @returns {*}
     */
    proto.query = function (selector, from){
        from = (from && from.nodeType === Node.ELEMENT_NODE) ? from : window.document;
        var find = from.querySelectorAll(selector),
            elem = (find) ? [].slice.call(find) : [];
        this._elementsOptions(selector, elem);
        return elem;
    };

    dom.prototype = proto;
    dom.prototype.constructor = dom;
    window.Dom = dom;

})();



function dom(selector){
    var privateController = {};
    var publicController = {
        selector:null,
        elements:[],
        length:0,
        queryBySelector:function(selector){
            if(selector === 'body' && document.body){
                this.selector = 'body';
                this.elements[0] = document.body;
                this.length = 1;
            }
            else if(typeof selector === 'string'){
                this.selector = selector;
                this.elements = document.querySelectorAll(this.selector);
                this.length = this.elements.length;
            }else if(typeof selector === 'object' && selector instanceof HTMLCollection){
                this.selector = null;
                for(var iHC = 0; iHC<selector.length; iHC++)
                    this.elements[iHC] = selector[iHC];
                this.length = selector.length;
            }
            else if(typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE){
                this.selector = null;
                this.elements[0] = selector;
                this.length = 1;
            }else
                return this;
        },
        one:function(index){
            index = index || 0;
            if(this.elements.length == 0) return;
            return this.elements[index];
        },
        all:function(index){
            index = index || 0;
            if(this.elements.length == 0) return;
            return this.elements;
        },
        first:function(){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].firstChild;
            while(elem.nodeType !== Node.ELEMENT_NODE) elem = elem.nextSibling;
            return elem;
        },
        last:function(){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].lastChild;
            while(elem.nodeType !== Node.ELEMENT_NODE) elem = elem.previousSibling;
            return elem;
        },
        prev:function(){
            //console.log(this.elements);
            if(this.elements.length == 0) return;
            var elem = this.elements[0].previousSibling;
            while(elem.nodeType !== Node.ELEMENT_NODE) elem = elem.previousSibling;
            return elem;
        },
        next:function(){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].nextSibling;
            while(elem.nodeType !== Node.ELEMENT_NODE) elem = elem.nextSibling;
            return elem;
        },
        children:function(){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].children;
            return elem;
        },
        parent:function(){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].parentNode;
            return elem;
        },
        find:function(selector){
            if(this.elements.length == 0) return;
            var elem = this.elements[0].querySelectorAll(selector);
            return elem;
        },
        text:function(param){
            if(this.elements.length == 0) return;
            if(param == undefined) return this.elements[0].textContent;
            else this.elements[0].textContent = param;
        },
        html:function(param){
            if(this.elements.length == 0) return;
            if(param == undefined) return this.elements[0].innerHTML;
            else this.elements[0].innerHTML = param;
        }
    };

    publicController.queryBySelector(selector);
    return publicController;
}


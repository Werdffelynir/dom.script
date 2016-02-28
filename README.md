# script.dom


## test function
```
var p = new Dom('p');
p.css('border','3px solid #000');
```


## methods
```
.one = function(index)
.all = function ()
.first = function ()
.last = function ()
.next = function ()
.prev = function ()
.children = function ()
.parent = function ()
.find = function (selector)
.text = function (param)
.html = function (param)
.css = function (param, value)
.on = function (eventName, eventFunc, bubble)
.each = function (func)
.query = function (selector, from)

Dom.loaded = function (func)
Dom.isLoaded = function () : bool
```

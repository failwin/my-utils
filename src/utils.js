(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        var mod = {
            exports: {}
        };
        var result = factory(mod.exports);
        global.utils = result ? result : mod.exports;
    }
})(this, function (exports) {

'use strict';
var UtilService = (function() {
    function UtilService(){
    	if (typeof window === 'undefined') {
            return;
        }
        this._id = 0;
        this._vendor = {};

        this._readyList = [];
        this._readyFired = false;
        this._readyEventHandlersInstalled = false;

        this._initVendors();
        this.supportsTransitions = this.supportsTransitions();
        this.supportsPlaceholder = this.supportsPlaceholder();
        this.supportsPerspective = this.supportsPerspective();
        this.supportsColumns = this.supportsColumns();
        this.supportsVUnints = this.supportsVUnints();

        var document = this.getDocument();
        var window = this.getWindow();

        this.domReady(function(){
            if (this.supportsVUnints()) {
                document.body.classList.add('vunits');
            }
        }.bind(this));

        // requestAnimationFrame/cancelAnimationFrame
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                    window[vendors[x]+'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
        }());
    }

    UtilService.prototype.isWindow = function() {
        var win = this.getWindow().
        return (/iphone|ipad|ipod|android/i.test(win.navigator.userAgent.toLowerCase()));
    };

    UtilService.prototype.getWindow = function(node) {
        let doc = this.getDocument(node);
        return doc && doc.defaultView || doc.parentWindow;
    };

    UtilService.prototype.getDocument = function(node) {
        return (node && node.ownerDocument) || document;
    };

    UtilService.prototype.inherits = function(ctor, superCtor){
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    };

    UtilService.prototype.ajax = function(method, url, data, opts) {
        var self = this;
        var promise;

        return new Promise(function(resolve, reject) {
            var params = null,
                xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var response = JSON.parse(xmlhttp.responseText);
                        resolve(response);
                    }
                    else {
                        reject(xmlhttp.statusText);
                    }
                }
            };

            if (opts.withCredentials) {
                xmlhttp.withCredentials = true;
            }

            if (method == 'POST') {
                if (typeof(FormData) !== 'undefined' && data instanceof FormData) {
                    params = data;
                    xmlhttp.open(method, url, true);
                }
                else {
                    params = self.serialize(data);
                    params = params + '&t=' + Math.random();
                    xmlhttp.open(method, url, true);
                    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    //xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
                    //xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    //xmlhttp.setRequestHeader("Content-length", params.length);
                }
            }
            else {
                var getString = self.serialize(data);
                var getUrl = url + '?' + getString;
                getUrl += '&t=' + Math.random();
                xmlhttp.open(method, getUrl, true);
            }

            xmlhttp.send(params);
        });
    };
    UtilService.prototype.serialize = function(obj) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }

        return str.join("&");
    };

    UtilService.prototype.isArray = function(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    UtilService.prototype.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    UtilService.prototype.isString = function(obj) {
        var type = typeof obj;
        return type === 'string' && !!obj;
    };
    UtilService.prototype.isFunction = function(obj, _name) {
        var name = _name || 'Function';
        return Object.prototype.toString.call(obj) === '[object ' + name + ']';
    };

    UtilService.prototype.extend = function(obj, prop, isDeep) {
        var src, copyIsArray, copy, name, clone,
            target = obj || {},
            i = 1,
            length = arguments.length,
            deep = isDeep,
            options = prop;

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !this.isFunction(target) ) {
            target = {};
        }

        for ( name in options ) {
            if (prop.hasOwnProperty(name)) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && this.isObject(copy) && !this.isFunction(copy)) {
                    copyIsArray = this.isArray(copy);
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && this.isArray(src) ? src : [];
                    } else {
                        clone = src ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = this.extend( clone, copy, deep );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }

        return target;
    };

    UtilService.prototype.getWiddowWidth = function() {
        var document = this.getDocument();
        return document.documentElement.clientWidth || document.body.clientWidth;
    };
    UtilService.prototype.getWiddowHeight = function() {
        var document = this.getDocument();
        return document.documentElement.clientHeight || document.body.clientHeight;
    };
    UtilService.prototype.getWiddowScrollTop = function() {
        var document = this.getDocument();
        var window = this.getWindow();
        return window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
    };

    UtilService.prototype.supportsTransitions = function() {
        var document = this.getDocument();
        //return function(){return false;};
        var _elementStyle = document.createElement('div').style;

        var result =  this.getPrefixedPropertyName('transition') in _elementStyle;

        return function(){return result;};
    };
    UtilService.prototype.supportsPlaceholder = function() {
        var document = this.getDocument();
        var input = document.createElement('input');
        var support = typeof (input.placeholder) != 'undefined';
        return function() {
            return support;
        };
    };
    UtilService.prototype.supportsPerspective = function() {
        var document = this.getDocument();
        var _elementStyle = document.createElement('div').style;

        var result =  this.getPrefixedPropertyName('perspective') in _elementStyle;

        return function() { return result; };
    };
    UtilService.prototype.supportsColumns = function() {
        var document = this.getDocument();
        var elementStyle = document.createElement('div').style;

        var result = false;

        var vendors = [
            'columnCount',
            'webkitColumnCount',
            'WebkitColumnCount',
            'MozColumnCount',
            'msColumnCount',
            'MsColumnCount',
            'OColumnCount'
        ];
        for (var i = 0, len = vendors.length; i < len; i++) {
            var style = vendors[i];
            if (style in elementStyle) {
                result = true;
                /* jshint ignore:start */
                return function () { return result; };
                /* jshint ignore:end */
            }
        }

        return function() { return result; };
    };
    UtilService.prototype.supportsVUnints = function() {
        var result = true;

        var document = this.getDocument();
        var window = this.getWindow();

        var elementStyle = document.createElement('div').style;

        var units = ['vw', 'vh'].filter(function(unit) {
            elementStyle.width = '';
            elementStyle.width = '10' + unit;
            return !elementStyle.width;
        });

        if (units.length > 0) {
            result = false;
        }
        if (window.navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
            result = false;
        }

        return function() { return result; };
    };

    UtilService.prototype.getElementText = function(elem) {
        var node,
            ret = "",
            i = 0,
            nodeType = false;

        if (typeof elem == 'undefined'){
            return false;
        }

        if (typeof elem.nodeType != 'undefined'){
            nodeType = elem.nodeType;
        }

        if ( !nodeType ) {
            // If no nodeType, this is expected to be an array
            while ( (node = elem[i++]) ) {
                // Do not traverse comment nodes
                ret += this.getElementText( node );
            }
        }
        else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (jQuery #11153)
            if ( typeof elem.textContent === "string" ) {
                return elem.textContent;
            } else {
                // Traverse its children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    ret += this.getElementText( elem );
                }
            }
        } else if ( nodeType === 3 || nodeType === 4 ) {
            return elem.nodeValue;
        }
        // Do not include comment or processing instruction nodes

        return ret;
    };
    UtilService.prototype.appendElement = function(parent, element) {
        var fragment = element;
        if(typeof element === 'string') {
            fragment = this.createElement(element);
        }
        parent.appendChild(fragment);
        return parent.lastChild;
    };
    UtilService.prototype.prependElement = function(parent, element) {
        var fragment = element;
        if(typeof element === 'string') {
            fragment = this.createElement(element);
        }
        if (!parent.firstChild) {
            parent.appendChild(fragment);
            return parent.lastChild;
        }
        parent.insertBefore(fragment, parent.firstChild);
        return parent.firstChild;
    };
    UtilService.prototype.insertBeforeElement = function(parent, element, where) {
        if (!where) {
            return this.appendElement(parent, element);
        }
        var fragment = element;
        if(typeof element === 'string') {
            fragment = this.createElement(element);
        }
        return parent.insertBefore(fragment, where);
    };
    UtilService.prototype.insertBefore = function(parent, element, index) {
        if (index === 0) {
            return this.prependElement(parent, element);
        }
        var prevElem = parent.children[index];
        if (!prevElem) {
            return this.appendElement(parent, element);
        }
        var fragment = element;
        if(typeof element === 'string') {
            fragment = this.createElement(element);
        }
        if (fragment === prevElem) {
            return prevElem;
        }
        parent.insertBefore(fragment, prevElem);
        return parent.children[index];
    };
    UtilService.prototype.clearElement = function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    UtilService.prototype.createElement = function(str) {
        var document = this.getDocument();

        var frag = document.createDocumentFragment();

        var elem = document.createElement('div');
        elem.innerHTML = str;

        while (elem.childNodes[0]) {
            frag.appendChild(elem.childNodes[0]);
        }
        return frag.childNodes[0];
    };

    UtilService.prototype.getElementIndex = function(node) {
        var i=0;
        while(node.previousSibling){
            node = node.previousSibling;
            if(node.nodeType === 1){
                i++;
            }
        }
        return i;
    };
    UtilService.prototype.isElementMatched = function(element, selector) {
        var document = this.getDocument();

        var p = Element.prototype;
        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(element, selector);
    };
    UtilService.prototype.getElementClosest = function(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }

        while (element) {
            if (this.isElementMatched(element, selector)) {
                break;
            }

            element = element.parentElement;
        }

        return element;
    };


    UtilService.prototype.addEventListener = function($holders, eventName, targetSelector, handler){
        var self = this;

        var delegatedHandlers = [];

        if (!$holders) {
            return;
        }

        var document = this.getDocument();
        var window = this.getWindow();

        if (typeof targetSelector == 'function') {
            handler = targetSelector;
            targetSelector = false;
        }

        handler = handler || function() {};

        if (this.isString($holders)) {
            $holders = document.querySelectorAll($holders);
        }
        else if (!$holders.length) {
            $holders = [$holders];
        }

        $holders = Array.prototype.slice.call($holders, 0);

        if ($holders.length === 0) {
            return;
        }

        $holders.forEach(function($holder) {
            if (targetSelector) {
                var delegatedHandler = delegateEvent($holder, eventName, targetSelector, handler);
                delegatedHandlers.push(delegatedHandler);
            }
            else {
                $holder.addEventListener(eventName, handler);
            }
        });

        function delegateEvent($holder, eventName, targetSelector, handler) {
            var delegatedHandler = function(e) {
                var event = e || window.event;
                var target = event.target || event.srcElement,
                    delegateTarget = false;

                do {
                    if (target == $holder) {
                        return;
                    }
                    if (! self.isElementMatched(target, targetSelector) ) {
                        continue;
                    }
                    delegateTarget = target;
                    target = {parentElement : false, parentNode : false};
                } while( (target = target.parentElement || target.parentNode) );

                if (delegateTarget){
                    handler.call(delegateTarget, event);
                }
            };
            $holder.addEventListener(eventName, delegatedHandler);

            return delegatedHandler;
        }

        return function removeEventListener() {
            $holders.forEach(function($holder, i) {
                if (targetSelector) {
                    $holder.removeEventListener(eventName, delegatedHandlers[i]);
                    delegatedHandlers[i] = null;
                }
                else {
                    $holder.removeEventListener(eventName, handler);
                }
            });

            $holders = null;
        };
    };

    UtilService.prototype.transitionEnd = function ($elemnt, elementClass, callback, _maxTime) {
        callback = callback || function() {};
        var timer = null,
            maxTime = _maxTime || 5000;

        timer = setTimeout(finishTransition, maxTime);

        $elemnt.addEventListener('transitionend', transitionEnd, false);
        $elemnt.addEventListener('msTransitionEnd', transitionEnd, false);
        $elemnt.addEventListener('mozTransitionEnd', transitionEnd, false);
        $elemnt.addEventListener('webkitTransitionEnd', transitionEnd, false);

        function transitionEnd(event) {
            if (event.target == $elemnt && event.target.classList.contains(elementClass)) {
                $elemnt.removeEventListener('transitionend', transitionEnd, false);
                $elemnt.removeEventListener('msTransitionEnd', transitionEnd, false);
                $elemnt.removeEventListener('mozTransitionEnd', transitionEnd, false);
                $elemnt.removeEventListener('webkitTransitionEnd', transitionEnd, false);

                clearTimeout(timer);

                callback();

                $elemnt = null;
            }
        }

        function finishTransition() {
            if (!$elemnt) {
                return;
            }

            var fakeEvent = {
                target: $elemnt
            };
            transitionEnd(fakeEvent);
        }

        return finishTransition;
    };

    UtilService.prototype.animateCss = function (el, styles, _opt) {
        var self = this;

        var tick = 20,
            maxTime = 5000,
            timer = null;

        var defOpt = {
            duration: 0,
            delay: 0,
            easing: '',
            onComplete: function () { }
        };

        var opt = this.extend(defOpt, _opt);

        var transEndEventNames = {
            'webkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        };
        //var transEndEventName = transEndEventNames[ this.getPrefixedPropertyName('transition') ];

        //var eventType = this.getPrefixedEventType('TransitionEnd');
        var eventType = transEndEventNames[this.getPrefixedPropertyName('transition')];

        var transitionProperty = this.getPrefixedPropertyName('transitionProperty'),
            transitionDuration = this.getPrefixedPropertyName('transitionDuration'),
            transitionTimingFunction = this.getPrefixedPropertyName('transitionTimingFunction'),
            transitionDelay = this.getPrefixedPropertyName('transitionDelay');

        var transitionPropertyStr = '',
            transitionDurationStr = (!opt.duration) ? 0 : opt.duration / 1000 + 's',
            transitionTimingFunctionStr = (!opt.easing) ? '' : opt.easing,
            transitionDelayStr = (!opt.delay) ? 0 : opt.delay / 1000 + 's';

        if (transitionDurationStr || transitionDelayStr) {
            setTimeout(function () {
                transitionPreparing();
                transitionStart();
            }, tick);

            //timer = setTimeout(function() {
            //    console.log('transitionEnd - error');
            //    transitionEnd();
            //}, maxTime);

            el.addEventListener(eventType, transitionEnd, false);
        }
        else {
            transitionStart();
            transitionEnd();
        }

        function transitionPreparing() {
            var index = 0;
            for (var propertyName in styles) {
                if (!styles.hasOwnProperty(propertyName)) { continue; }
                if (propertyName == 'transform') {
                    propertyName = self.getPrefixedStyleValue(propertyName);
                }
                transitionPropertyStr += ((index === 0) ? '' : ', ') + propertyName;
                index++;
            }

            // set transition
            if (transitionPropertyStr) {
                el.style[transitionProperty] = transitionPropertyStr;
            }
            if (transitionDuration) {
                el.style[transitionDuration] = transitionDurationStr;
            }
            if (transitionTimingFunction) {
                el.style[transitionTimingFunction] = transitionTimingFunctionStr;
            }
            if (transitionDelay) {
                el.style[transitionDelay] = transitionDelayStr;
            }
        }

        function transitionStart() {
            // set styles
            for (var propertyName in styles) {
                if (!styles.hasOwnProperty(propertyName)) { continue; }
                var value = styles[propertyName];
                propertyName = self.getCameCaseString(propertyName);
                if (propertyName == 'transform') {
                    propertyName = self.getPrefixedPropertyName(propertyName);
                }
                el.style[propertyName] = value;
            }
        }

        function transitionEnd(event) {
            if (event && event.target != el) {
                return;
            }

            el.removeEventListener(eventType, transitionEnd, false);
            //clearTimeout(timer);

            if (transitionPropertyStr) {
                el.style[transitionProperty] = '';
            }
            if (transitionDuration) {
                el.style[transitionDuration] = '';
            }
            if (transitionTimingFunction) {
                el.style[transitionTimingFunction] = '';
            }
            if (transitionDelay) {
                el.style[transitionDelay] = '';
            }

            if (typeof opt.onComplete == 'function') {
                opt.onComplete();
            }
        }
    };
    UtilService.prototype._initVendors = function() {
        var document = this.getDocument();

        var i, transform, vendor, vendorsCss, vendors, _i, _len, elementStyle;
        elementStyle = document.createElement('div').style;
        vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
        vendorsCss = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
        for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
            vendor = vendors[i];
            transform = vendors[i] + 'ransform';
            if (transform in elementStyle) {
                this._vendor = {
                    js : vendors[i].substr(0, vendors[i].length - 1),
                    css : vendorsCss[i]
                };
                return;
            }
        }
        this._vendor = {
            js : false,
            css : false
        };
    };
    UtilService.prototype.getPrefixedPropertyName = function(propertyName) {
        if (this._vendor.js === false) {
            return false;
        }
        if (this._vendor.js === '') {
            return propertyName;
        }
        return this._vendor.js + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    };
    UtilService.prototype.getPrefixedStyleValue = function(slyleValue) {
        if (this._vendor.css === false) {
            return false;
        }
        if (this._vendor.css === '') {
            return slyleValue;
        }
        return this._vendor.css + slyleValue;
    };
    UtilService.prototype.getPrefixedEventType = function(eventType) {
        if (this._vendor.js === false) {
            return false;
        }
        if (this._vendor.js === '') {
            return eventType.toLowerCase();
        }
        return this._vendor.js.toLowerCase() + eventType;
    };
    UtilService.prototype.getCameCaseString = function(string) {
        return string.replace(/-([a-z])/g, function(str, letter){
            return letter.toUpperCase();
        });
    };

    UtilService.prototype.arraysDiff = function(base, current) {
        var result = [];

        var baseMap = {},
            baseIndices = [];

        var operateMap = {};

        // map base array
        for (var i = 0, len = base.length; i < len; i++) {
            var node = base[i];
            var id = node.id;
            baseMap[id] = node;
            node.$$i = i;
            baseIndices.push(i);
        }

        // iterate over current nodes and base nodes
        for (var i = 0, len = current.length; i < len; i++) {
            var currenNode = current[i],
                baseNode = base[baseIndices[i]],
                id = currenNode.id;

            // skip if we already performed an insertion map
            if (operateMap[id]) {
                continue;
            }

            // check if the node has an id
            // if it exists in the base map, then move that node to the correct
            // position, this will usually be the same node, which means no dom move
            // is necessary, otherwise clone the node from the source (new inserts)
            var existing = baseMap[id];
            if (existing) {
                if (!baseNode || existing.id != baseNode.id) {
                    var relativeBaseIndex = existing.$$i;
                    result.push({
                        'action': 'moveChildElement',
                        'element': existing,
                        'baseIndex': '0>' + relativeBaseIndex,
                        'sourceIndex': '0>' + i
                    });

                    // move the index so we can retrieve the next appropriate node
                    baseIndices.splice(i, 0, baseIndices.splice(relativeBaseIndex, 1)[0]);
                }
            } else {
                var relativeBaseIndex = i;
                result.push({
                    'action': 'insertChildElement',
                    'element': currenNode,
                    'baseIndex': '0>' + relativeBaseIndex,
                    'sourceIndex': '0>' + relativeBaseIndex });
            }
            operateMap[id] = true;
        }

        // Remove any tail nodes in the base
        for (var i = 0, len = base.length; i < len; i++) {
            var remove = base[i];
            var removeId = remove.id;
            if (!operateMap[removeId]) {
                result.push({
                    'action': 'removeChildElement',
                    'element': remove,
                    'baseIndex': '0>' + remove.$$i,
                    'sourceIndex': null });
            }
        }

        result.sort(UtilService._sortChange);

        return result;
    };
    UtilService.prototype.domListPatch = function(domList, changes, beforeAdd, afterAdd, beforeRemove, afterRemove) {

        var moves = [],
            insertions = [],
            removals = [];

        for(var i = 0, c = changes.length; i < c; i++) {
            var change = changes[i];

            if (change.action == 'insertChildElement') {
                insertions.push(change);
            }
            else if (change.action == 'removeChildElement') {
                removals.push(change);
            }
            else if (change.action == 'moveChildElement') {
                // TODO check if we realy need this movement, by Node index
                moves.push(change);
            }
        }

        moves.sort(UtilService._sortChange);
        insertions.sort(UtilService._sortChange);

        for(var i = 0, c = moves.length; i < c; i++) {
            var change = moves[i],
                element = change.element,
                baseIndex = change.baseIndex ? change.baseIndex.split('>')[1] : null,
                sourceIndex = change.sourceIndex ? change.sourceIndex.split('>')[1] : null;

            if (change.action == 'moveChildElement') {
                var $item = domList.childNodes[baseIndex];
                if (!$item) {
                    continue;
                }
                utils.insertBeforeElement(domList, $item, domList.children[sourceIndex]);
            }
        }

        for(var i = 0, c = insertions.length; i < c; i++) {
            var change = insertions[i],
                element = change.element,
                baseIndex = change.baseIndex ? change.baseIndex.split('>')[1] : null,
                sourceIndex = change.sourceIndex ? change.sourceIndex.split('>')[1] : null;

            if (change.action == 'insertChildElement') {
                beforeAdd(element, function(html) {
                    var $item = utils.insertBeforeElement(domList, html, domList.children[sourceIndex]);
                    afterAdd(element, $item);
                });
            }
        }

        for(var i = 0, c = removals.length; i < c; i++) {
            var change = removals[i],
                element = change.element,
                baseIndex = change.baseIndex ? + change.baseIndex.split('>')[1] : null,
                sourceIndex = change.sourceIndex ? + change.sourceIndex.split('>')[1] : null;

            if (change.action == 'removeChildElement') {
                var $item = domList.children[baseIndex];

                beforeRemove(element, $item, function($item) {
                    domList.removeChild($item);
                    afterRemove(element, $item);
                });
            }
        }

    };
    UtilService._sortChange = function(a, b) {
        if (a['sourceIndex'] === b['sourceIndex']) {
            return 0;
        } else if (!a['sourceIndex'] && b['sourceIndex']) {
            return -1;
        } else if (a['sourceIndex'] && !b['sourceIndex']) {
            return 1;
        }
        var aIndices = a['sourceIndex'].split('>');
        var bIndices = b['sourceIndex'].split('>');
        var equal = true;
        var i = 0;
        while (equal && i < aIndices.length && i < bIndices.length) {
            var aN = parseInt(aIndices[i], 10);
            var bN = parseInt(bIndices[i], 10);
            if (aN === bN) {
                i++;
                continue;
            } else if (isNaN(aN) || isNaN(bN)) {
                return isNaN(aN) ? 1 : -1;
            } else {
                return aN > bN ? 1 : -1;
            }
        }

        return 0;
    };

    UtilService.prototype.updateList = function(domList, base, current, hooks) {
        var lastBlockMap = {},
            nextBlockMap = {},
            nextBlockOrder;

        base.forEach(function(item, index) {
            item.$$index = index;
            item.$$isNew = false;
            lastBlockMap[item.id] = item;
        });

        var previousNodeId = 0,
            nextNodeId;

        var collectionLength = current.length;
        nextBlockOrder = new Array(collectionLength);

        // locate existing items
        for (var index = 0; index < collectionLength; index++) {
            var key = index;
            var value = current[key];
            var trackById = value.id;
            if (lastBlockMap[trackById]) {
                // found previously seen block
                var block = lastBlockMap[trackById];
                delete lastBlockMap[trackById];
                nextBlockMap[trackById] = block;
                nextBlockOrder[index] = block;
            } else if (nextBlockMap[trackById]) {
                // if collision detected  throw an error
                throw new Error('UtilService.updateList(), Duplicates in a repeater are not allowed.');
            } else {
                // new never before seen block
                value.$$isNew = true;
                nextBlockOrder[index] = value;
                nextBlockMap[trackById] = value;
            }
        }

        // remove leftover items
        for (var blockKey in lastBlockMap) {
            var block = lastBlockMap[blockKey];
            var index = block.$$index;
            // TODO Remove element

            console.log('Remove', block.id, index);

            var elem = domList.children[index];
            if (!elem) {
                console.log('NOR FOUND!!!');
            }
            domList.removeChild(elem);


        }

        // we are not using forEach for perf reasons (trying to avoid #call)
        for (index = 0; index < collectionLength; index++) {
            key = index;
            value = current[key];
            block = nextBlockOrder[index];

            console.log(block);

            if (!block.$$isNew) {
                // if we have already seen this object, then move it
                //nextNodeId = previousNodeId;

                // skip nodes that are already pending removal via leave animation
                //do {
                //    nextNode = nextNode.nextSibling;
                //} while (nextNode && nextNode[NG_REMOVED]);

                //do {
                //    nextNodeId++;
                //} while (nextNodeId < collectionLength && redyForRemove(nextNodeId));


                //block.$$isNew = false;
                console.log('previousNodeId - ' + previousNodeId);

                if (block.$$index != previousNodeId) {
                    console.log('Move', block.id, previousNodeId);

                    var elem = domList.children[block.$$index];
                    if (!elem) {
                        console.log('NOR FOUND!!!');
                    }
                    this.insertBefore(domList, elem, previousNodeId);


                }
                previousNodeId++;
            } else {
                // new item which we don't know about

                console.log('Enter', block.id, previousNodeId);

                this.insertBefore(domList, '<li>'+ block.id +'</li>', previousNodeId);

                previousNodeId++;

                nextBlockMap[block.id] = block;
            }
        }
        //lastBlockMap = nextBlockMap;
    };

    UtilService.prototype._ready = function() {
        if (!this._readyFired) {
            // this must be set to true before we start calling callbacks
            this._readyFired = true;
            for (var i = 0; i < this._readyList.length; i++) {
                this._readyList[i].fn();
            }
            this._readyList = [];
        }
    };
    UtilService.prototype._readyStateChange = function() {
        var document = this.getDocument();

        if ( document.readyState === "complete" ) {
            this._ready();
        }
    };
    UtilService.prototype.domReady = function(callback) {
        var self = this;

        var document = this.getDocument();
        var window = this.getWindow();

        if (this._readyFired) {
            setTimeout(function() {callback();}, 1);
            return;
        } else {
            this._readyList.push({fn: callback});
        }

        if (document.readyState === "complete") {
            setTimeout(function(){
                self._ready();
            }, 1);
        } else if (!this._readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function(){
                    self._ready();
                }, false);
                window.addEventListener("load", function(){
                    self._ready();
                }, false);
            } else {
                document.attachEvent("onreadystatechange", function(){
                    self._readyStateChange();
                });
                window.attachEvent("onload", function(){
                    self._ready();
                });
            }
            this._readyEventHandlersInstalled = true;
        }
    };

    UtilService.prototype.scrollTo = function(dest, time, callback) {
        callback = callback || function () {};

        var document = this.getDocument();
        var window = this.getWindow();

        var element = document.body;

        var startPos = element.scrollTop,
            increment = 5;

        if (dest < startPos){
            increment *= -1;
        }

        var animateScroll = function() {
            if (Math.abs(startPos - dest) <= 5) {
                return callback();
            }
            startPos += increment;

            element.scrollTop = startPos;

            if (window.scrollTo) {
                window.scrollTo(0, startPos);
            }

            var $html = document.querySelector('html');

            if ($html.scrollTo) {
                $html.scrollTo(0, startPos);
            }

            //requestAnimationFrame(animateScroll);

            var framesPerSecond = 50;

            setTimeout(function() {
                requestAnimationFrame(animateScroll);

                // animating/drawing code goes here


            }, 1000 / framesPerSecond);

            //setTimeout(function() {
            //    animateScroll();
            //}, 5);
        };

        animateScroll();
    };

    return UtilService;
})();

var utils = new UtilService();
utils.UtilService = UtilService;

exports.utils = utils;
exports.UtilService = UtilService;

return utils;

});

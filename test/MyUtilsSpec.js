var simulateEvent = window.simulateEvent;
var sinon = window.sinon;

var utils = window.utils;
var UtilService = utils.UtilService;

describe('UtilService', function() {
    var utils;

    beforeEach(function() {
        utils = new UtilService();
    });

    describe('insertBefore', function() {

        it('should add item to empty holder', function() {
            var parent = document.createElement('ul');
            var elem = document.createElement('li');

            var res = utils.insertBefore(parent, elem, 0);

            expect(parent.children.length).toBe(1);
            expect(parent.firstChild).toBe(elem);
        });

        it('should return reference to inserted element', function() {
            var parent = document.createElement('ul');
            var elem = document.createElement('li');

            var res = utils.insertBefore(parent, elem, 0);

            expect(parent.children.length).toBe(1);
            expect(res).toBe(parent.children[0]);
        });

        it('should add item into holder', function() {
            var parent = document.createElement('ul');
            parent.innerHTML = '<li>1</li><li>2</li>';
            var elem = document.createElement('li');

            var res = utils.insertBefore(parent, elem, 1);

            expect(parent.children.length).toBe(3);
            expect(parent.children[1]).toBe(elem);
        });

        it('should add item at the end if anchor does not found', function() {
            var parent = document.createElement('ul');
            parent.innerHTML = '<li>1</li><li>2</li>';
            var elem = document.createElement('li');

            var res = utils.insertBefore(parent, elem, 10);

            expect(parent.children.length).toBe(3);
            expect(parent.lastChild).toBe(elem);
        });
    });

    describe('transitionEnd', function() {
        var callback,
            elem;

        beforeEach(function(){
            callback = jasmine.createSpy('transitionEndHandler');
            elem = utils.createElement('<div class="my-class" />');
        });

        it('should call callback at transition end event', function() {
            utils.transitionEnd(elem, 'my-class', callback);

            simulateEvent.simulate(elem, 'transitionend');

            expect(callback).toHaveBeenCalled();
            expect(callback.calls.count()).toBe(1);
        });

        it('should call callback at transition end event only when appropriate class is found', function() {
            utils.transitionEnd(elem, 'my-fake-class', callback);

            simulateEvent.simulate(elem, 'transitionend');

            expect(callback).not.toHaveBeenCalled();
        });

        it('should force finish animation', function() {
            var close = utils.transitionEnd(elem, 'my-class', callback);

            close();

            expect(callback).toHaveBeenCalled();
            expect(callback.calls.count()).toBe(1);

            close();

            expect(callback.calls.count()).toBe(1);
        });


    });

    describe('animateCss', function() {
        var callback,
            elem,
            clock;

        beforeEach(function(){
            callback = jasmine.createSpy('transitionEndHandler');

            var html = '<div class="my-class" style="position: relative; left: 1px; transform: rotate(9deg)"/>';
            elem = utils.createElement(html);

            clock = sinon.useFakeTimers();
        });

        afterEach(function(){
            clock.restore();
        });

        it('should call callback immediately if no "duration" defined', function() {
            utils.animateCss(elem,
                {
                    left: '10px'
                },
                {
                    onComplete: callback
                }
            );

            //simulateEvent.simulate(elem, 'transitionend');

            expect(callback).toHaveBeenCalled();
            expect(callback.calls.count()).toBe(1);
        });

        it('should call callback with some duration at transition end event', function() {
            utils.animateCss(elem,
                {
                    left: '10px'
                },
                {
                    duration: 100,
                    onComplete: callback
                }
            );

            expect(callback).not.toHaveBeenCalled();

            simulateEvent.simulate(elem, 'transitionend');

            expect(callback).toHaveBeenCalled();
            expect(callback.calls.count()).toBe(1);
        });

        it('should apply defined styles', function() {
            var transformName = utils.getPrefixedPropertyName('transform');
            utils.animateCss(elem,
                {
                    left: '10px',
                    transform: 'rotate(20deg)'
                },
                {
                    duration: 100,
                    onComplete: callback
                }
            );

            clock.tick(25);
            simulateEvent.simulate(elem, 'transitionend');

            expect(elem.style.left).toBe('10px');
            expect(elem.style[transformName]).toBe('rotate(20deg)');
        });
    });

    describe('addEventListener', function() {
        function triggerEvent(name, element) {
            var event;

            if (document.createEvent) {
                event = document.createEvent("HTMLEvents");
                event.initEvent(name, true, true);
            } else {
                event = document.createEventObject();
                event.eventType = name;
            }

            event.eventName = name;

            if (document.createEvent) {
                element.dispatchEvent(event);
            } else {
                element.fireEvent("on" + event.eventType, event);
            }
        }

        it('should add simple event listener', function() {
            var elem = utils.createElement('<a />');
            var clickHandler = jasmine.createSpy('clickHandler');

            utils.addEventListener(elem, 'click', clickHandler);

            expect(clickHandler).not.toHaveBeenCalled();

            triggerEvent('click', elem);

            expect(clickHandler).toHaveBeenCalled();
            expect(clickHandler.calls.count()).toBe(1);

            triggerEvent('click', elem);

            expect(clickHandler.calls.count()).toBe(2);
        });

        it('should remove simple event listener', function() {
            var elem = utils.createElement('<a />');
            var clickHandler = jasmine.createSpy('clickHandler');

            var clear = utils.addEventListener(elem, 'click', clickHandler);

            triggerEvent('click', elem);

            expect(clickHandler).toHaveBeenCalled();
            expect(clickHandler.calls.count()).toBe(1);

            clear();

            triggerEvent('click', elem);

            expect(clickHandler.calls.count()).toBe(1);
        });

        it('should add simple event to groups of elements', function() {
            var elem = utils.createElement('<div><a /><a /><a /></div>');
            var clickHandler = jasmine.createSpy('clickHandler');

            utils.addEventListener(elem.children, 'click', clickHandler);

            expect(clickHandler).not.toHaveBeenCalled();

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);
            triggerEvent('click', elem.children[2]);

            expect(clickHandler).toHaveBeenCalled();
            expect(clickHandler.calls.count()).toBe(3);

        });

        it('should remove simple event from groups of elements', function() {
            var elem = utils.createElement('<div><a /><a /><a /></div>');
            var clickHandler = jasmine.createSpy('clickHandler');

            var clear = utils.addEventListener(elem.children, 'click', clickHandler);

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);
            triggerEvent('click', elem.children[2]);

            expect(clickHandler.calls.count()).toBe(3);

            clear();

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);
            triggerEvent('click', elem.children[2]);

            expect(clickHandler.calls.count()).toBe(3);
        });

        it('should add delegated event handler', function() {
            var elem = utils.createElement('<div><a class="link" /><a /><a class="link" /></div>');
            var clickHandler = jasmine.createSpy('clickHandler');

            var clear = utils.addEventListener(elem, 'click', '.link', clickHandler);

            expect(clickHandler).not.toHaveBeenCalled();

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);

            expect(clickHandler).toHaveBeenCalled();
            expect(clickHandler.calls.count()).toBe(1);

        });

        it('should remove delegated event handler', function() {
            var elem = utils.createElement('<div><a class="link" /><a /><a class="link" /></div>');
            var clickHandler = jasmine.createSpy('clickHandler');

            var clear = utils.addEventListener(elem, 'click', '.link', clickHandler);

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);

            expect(clickHandler.calls.count()).toBe(1);

            clear();

            triggerEvent('click', elem.children[0]);
            triggerEvent('click', elem.children[1]);

            expect(clickHandler.calls.count()).toBe(1);
        });
    });

    describe('isArray', function() {

        it('should determinate array like an array', function() {
            var o = [];
            expect(utils.isArray(o)).toBeTruthy();
        });

        it('should determinate object like not an array', function() {
            var o = {};
            expect(utils.isArray(o)).not.toBeTruthy();
        });
    });

    describe('isObject', function() {

        it('should determinate array like a object', function() {
            var o = [];
            expect(utils.isObject(o)).toBeTruthy();
        });

        it('should determinate object like a object', function() {
            var o = {};
            expect(utils.isObject(o)).toBeTruthy();
        });

        it('should determinate function like a object', function() {
            var o = function(){};
            expect(utils.isObject(o)).toBeTruthy();
        });
    });

    describe('isFunction', function() {

        it('should determinate function like a function', function() {
            var o = function(){};
            expect(utils.isFunction(o)).toBeTruthy();
        });

        it('should determinate array like not a function', function() {
            var o = [];
            expect(utils.isFunction(o)).not.toBeTruthy();
        });

        it('should determinate object like not a function', function() {
            var o = {};
            expect(utils.isFunction(o)).not.toBeTruthy();
        });
    });

    describe('extend', function() {

        it('should extend object with simple types', function() {
            var from = {a: 10, b: 'str'};
            var res = utils.extend({}, from);
            expect(res).not.toBe(from);
            expect(res).toEqual(from);
        });

        it('should extend object with object types', function() {
            var from = {a: 10, b: 'str', c: {a: 1}, d: [0, 1, 2]};
            var res = utils.extend({}, from);
            expect(res).not.toBe(from);
            expect(res).toEqual(from);
        });

        it('should copy only reference for nested object types', function() {
            var from = {a: 10, b: 'str', c: {a: 1}, d: [0, 1, 2]};
            var res = utils.extend({}, from);
            expect(res.c).toBe(from.c);
            expect(res.d).toBe(from.d);
        });

        it('should deep copy nested object types', function() {
            var from = {a: 10, b: 'str', c: {a: 1}, d: [0, 1, 2]};
            var res = utils.extend({}, from, true);

            expect(res.c).not.toBe(from.c);
            expect(res.d).not.toBe(from.d);

            expect(res.c).toEqual(from.c);
            expect(res.d).toEqual(from.d);
        });

        it('should copy functions types', function() {
            var wasCalled = false;
            var from = {a: 10, b: 'str', c: {a: 1}, d: [0, 1, 2], e: function(){wasCalled = true;}};
            var res = utils.extend({}, from);

            expect(res.c).toBe(from.c);
            expect(res.d).toBe(from.d);
            expect(res.e).toBeDefined();
            expect(res.e).toBe(from.e);

            expect(wasCalled).toBe(false);
            res.e();
            expect(wasCalled).toBe(true);
        });

        it('should copy function reference with isDeep flag', function() {
            var wasCalled = false;
            var from = {a: 10, b: 'str', c: {a: 1}, d: [0, 1, 2], e: function(){wasCalled = true;}};
            var res = utils.extend({}, from, true);

            expect(res.c).not.toBe(from.c);
            expect(res.d).not.toBe(from.d);
            expect(res.e).toBeDefined();
            expect(res.e).toBe(from.e);

            expect(wasCalled).toBe(false);
            res.e();
            expect(wasCalled).toBe(true);
        });
    });
});
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

        it('should force finish animation', function() {
            var callback = jasmine.createSpy('transitionEndHandler');
            var elem = utils.createElement('<div class="my-class" />');

            var close = utils.transitionEnd(elem, 'my-class', callback);

            close();

            expect(callback).toHaveBeenCalled();
            expect(callback.calls.count()).toBe(1);

            close();

            expect(callback.calls.count()).toBe(1);
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
});
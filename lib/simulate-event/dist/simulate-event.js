!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.simulateEvent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],2:[function(_dereq_,module,exports){
var extend = _dereq_('xtend/mutable')

/**
 * Set some default options.
 *
 * @type {Object}
 */
var eventOptions = {
  UIEvent: function () {
    return {
      view: document.defaultView
    }
  },
  FocusEvent: function () {
    return eventOptions.UIEvent.apply(this, arguments)
  },
  MouseEvent: function (type) {
    return {
      button: 0,
      bubbles: (type !== 'mouseenter' && type !== 'mouseleave'),
      cancelable: (type !== 'mouseenter' && type !== 'mouseleave'),
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      clientX: 1,
      clientY: 1,
      screenX: 0,
      screenY: 0,
      view: document.defaultView,
      relatedTarget: document.documentElement
    }
  },
  WheelEvent: function (type) {
    return eventOptions.MouseEvent.apply(this, arguments)
  },
  KeyboardEvent: function () {
    return {
      view: document.defaultView,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: 0
    }
  }
}

/**
 * Map event names to constructor names.
 *
 * @type {Object}
 */
var eventTypes = {
  beforeprint: 'Event',
  afterprint: 'Event',
  beforeunload: 'Event',
  abort: 'Event',
  error: 'Event',
  change: 'Event',
  submit: 'Event',
  reset: 'Event',
  cached: 'Event',
  canplay: 'Event',
  canplaythrough: 'Event',
  chargingchange: 'Event',
  chargingtimechange: 'Event',
  checking: 'Event',
  close: 'Event',
  downloading: 'Event',
  durationchange: 'Event',
  emptied: 'Event',
  ended: 'Event',
  fullscreenchange: 'Event',
  fullscreenerror: 'Event',
  invalid: 'Event',
  levelchange: 'Event',
  loadeddata: 'Event',
  loadedmetadata: 'Event',
  noupdate: 'Event',
  obsolete: 'Event',
  offline: 'Event',
  online: 'Event',
  open: 'Event',
  orientationchange: 'Event',
  pause: 'Event',
  pointerlockchange: 'Event',
  pointerlockerror: 'Event',
  copy: 'Event',
  cut: 'Event',
  paste: 'Event',
  play: 'Event',
  playing: 'Event',
  ratechange: 'Event',
  readystatechange: 'Event',
  seeked: 'Event',
  seeking: 'Event',
  stalled: 'Event',
  success: 'Event',
  suspend: 'Event',
  timeupdate: 'Event',
  updateready: 'Event',
  visibilitychange: 'Event',
  volumechange: 'Event',
  waiting: 'Event',
  load: 'UIEvent',
  unload: 'UIEvent',
  resize: 'UIEvent',
  scroll: 'UIEvent',
  select: 'UIEvent',
  drag: 'MouseEvent',
  dragenter: 'MouseEvent',
  dragleave: 'MouseEvent',
  dragover: 'MouseEvent',
  dragstart: 'MouseEvent',
  dragend: 'MouseEvent',
  drop: 'MouseEvent',
  touchcancel: 'UIEvent',
  touchend: 'UIEvent',
  touchenter: 'UIEvent',
  touchleave: 'UIEvent',
  touchmove: 'UIEvent',
  touchstart: 'UIEvent',
  blur: 'UIEvent',
  focus: 'UIEvent',
  focusin: 'UIEvent',
  focusout: 'UIEvent',
  input: 'UIEvent',
  show: 'MouseEvent',
  click: 'MouseEvent',
  dblclick: 'MouseEvent',
  mouseenter: 'MouseEvent',
  mouseleave: 'MouseEvent',
  mousedown: 'MouseEvent',
  mouseup: 'MouseEvent',
  mouseover: 'MouseEvent',
  mousemove: 'MouseEvent',
  mouseout: 'MouseEvent',
  contextmenu: 'MouseEvent',
  wheel: 'WheelEvent',
  message: 'MessageEvent',
  storage: 'StorageEvent',
  timeout: 'StorageEvent',
  keydown: 'KeyboardEvent',
  keypress: 'KeyboardEvent',
  keyup: 'KeyboardEvent',
  progress: 'ProgressEvent',
  loadend: 'ProgressEvent',
  loadstart: 'ProgressEvent',
  popstate: 'PopStateEvent',
  hashchange: 'HashChangeEvent',
  transitionend: 'TransitionEvent',
  compositionend: 'CompositionEvent',
  compositionstart: 'CompositionEvent',
  compositionupdate: 'CompositionEvent',
  pagehide: 'PageTransitionEvent',
  pageshow: 'PageTransitionEvent'
}

/**
 * Map the event type constructor to the initialization method.
 *
 * @type {Object}
 */
var eventInit = {
  Event: 'initEvent',
  UIEvent: 'initUIEvent',
  FocusEvent: 'initUIEvent',
  MouseEvent: 'initMouseEvent',
  WheelEvent: 'initMouseEvent',
  MessageEvent: 'initMessageEvent',
  StorageEvent: 'initStorageEvent',
  KeyboardEvent: 'initKeyboardEvent',
  ProgressEvent: 'initEvent',
  PopStateEvent: 'initEvent',
  TransitionEvent: 'initEvent',
  HashChangeEvent: 'initHashChangeEvent',
  CompositionEvent: 'initCompositionEvent',
  DeviceMotionEvent: 'initDeviceMotionEvent',
  PageTransitionEvent: 'initEvent',
  DeviceOrientationEvent: 'initDeviceOrientationEvent'
}

/**
 * Map the options object to initialization parameters.
 *
 * @type {Object}
 */
var eventParameters = {
  initEvent: [],
  initUIEvent: [
    'view',
    'detail'
  ],
  initKeyboardEvent: [
    'view',
    'char',
    'key',
    'location',
    'modifiersList',
    'repeat',
    'locale'
  ],
  initKeyEvent: [
    'view',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'keyCode',
    'charCode'
  ],
  initMouseEvent: [
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget'
  ],
  initHashChangeEvent: [
    'oldURL',
    'newURL'
  ],
  initCompositionEvent: [
    'view',
    'data',
    'locale'
  ],
  initDeviceMotionEvent: [
    'acceleration',
    'accelerationIncludingGravity',
    'rotationRate',
    'interval'
  ],
  initDeviceOrientationEvent: [
    'alpha',
    'beta',
    'gamma',
    'absolute'
  ],
  initMessageEvent: [
    'data',
    'origin',
    'lastEventId',
    'source'
  ],
  initStorageEvent: [
    'key',
    'oldValue',
    'newValue',
    'url',
    'storageArea'
  ]
}

/**
 * Map the event types to constructors.
 *
 * @type {Object}
 */
var eventConstructors = {
  UIEvent: window.UIEvent,
  FocusEvent: window.FocusEvent,
  MouseEvent: window.MouseEvent,
  WheelEvent: window.MouseEvent,
  KeyboardEvent: window.KeyboardEvent
}

/**
 * Get attributes which must be overriden manually.
 *
 * @param {String} eventType
 * @param {Object} options.
 */
function getOverrides (eventType, options) {
  if (eventType === 'KeyboardEvent' && options) {
    return {
      keyCode: options.keyCode || 0,
      key: options.key || 0,
      which: options.which || options.keyCode || 0
    }
  }
}

/**
 * Generate an event.
 *
 * @param  {String}  type
 * @param  {Object}  options
 * @return {Event}
 */
exports.generate = function (type, options) {
  // Immediately throw an error when the event name does not translate.
  if (!eventTypes.hasOwnProperty(type)) {
    throw new SyntaxError('Unsupported event type')
  }

  var eventType = eventTypes[type]
  var event
  var key

  // Handle parameters which must be manually overridden using
  // `Object.defineProperty`.
  var overrides = getOverrides(eventType, options)

  // Extend a new object with the default and passed in options.
  // Existing events already have all of their defaults set.
  if (!(options instanceof window.Event)) {
    // Check for extra defaults to pass in.
    if (eventType in eventOptions) {
      options = extend({
        bubbles: true,
        cancelable: true
      }, eventOptions[eventType](type, options), options)
    } else {
      options = extend({
        bubbles: true,
        cancelable: true
      }, options)
    }
  }

  // Attempt the Event Constructors DOM API.
  var Constructor = eventConstructors[eventType] || window.Event

  try {
    event = new Constructor(type, options)

    // Add the override properties.
    for (key in overrides) {
      Object.defineProperty(event, key, {
        value: overrides[key]
      })
    }

    return event
  } catch (e) {
    // Continue.
  }

  // In IE11, the Keyboard event does not allow setting the
  // keyCode property, even with Object.defineProperty,
  // so we have to use UIEvent.
  var ua = window.navigator.userAgent.toLowerCase()
  var msie = Math.max(ua.indexOf('msie'), ua.indexOf('trident'))

  if (msie >= 0 && eventType === 'KeyboardEvent') {
    eventType = 'UIEvent'
  }

  var initEvent = eventInit[eventType]

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    event = extend(document.createEventObject(), options)

    // Add the override properties.
    for (key in overrides) {
      Object.defineProperty(event, key, {
        value: overrides[key]
      })
    }

    return event
  }

  event = extend(document.createEvent(eventType), options)

  // Handle differences between `initKeyboardEvent` and `initKeyEvent`.
  if (initEvent === 'initKeyboardEvent') {
    if (event[initEvent] === void 0) {
      initEvent = 'initKeyEvent'
    } else if (!('modifiersList' in options)) {
      var mods = []
      if (options.metaKey) mods.push('Meta')
      if (options.altKey) mods.push('Alt')
      if (options.shiftKey) mods.push('Shift')
      if (options.ctrlKey) mods.push('Control')
      options['modifiersList'] = mods.join(' ')
    }
  }

  // Map argument names to the option values.
  var args = eventParameters[initEvent].map(function (parameter) {
    return options[parameter]
  })

  // Initialize the event using the built-in method.
  event[initEvent].apply(
    event, [type, options.bubbles, options.cancelable].concat(args)
  )

  // Add the override properties.
  for (key in overrides) {
    Object.defineProperty(event, key, {
      value: overrides[key]
    })
  }

  return event
}

/**
 * Simulate an event which is dispatched on the given element.
 *
 * @param  {Element} element
 * @param  {String}  type
 * @param  {Object}  options
 * @return {Boolean}
 */
exports.simulate = function (element, type, options) {
  var event = exports.generate(type, options)

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    return element.fireEvent('on' + type, event)
  }
  return element.dispatchEvent(event)
}

},{"xtend/mutable":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQ6XFxQcm9ncmFtIEZpbGVzXFxfV2ViU3Rvcm1Qcm9qZWN0c1xcdXRpbHNcXG5vZGVfbW9kdWxlc1xcc2ltdWxhdGUtZXZlbnRcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImQ6L1Byb2dyYW0gRmlsZXMvX1dlYlN0b3JtUHJvamVjdHMvdXRpbHMvbm9kZV9tb2R1bGVzL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy94dGVuZC9tdXRhYmxlLmpzIiwiZDovUHJvZ3JhbSBGaWxlcy9fV2ViU3Rvcm1Qcm9qZWN0cy91dGlscy9ub2RlX21vZHVsZXMvc2ltdWxhdGUtZXZlbnQvc2ltdWxhdGUtZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsInZhciBleHRlbmQgPSByZXF1aXJlKCd4dGVuZC9tdXRhYmxlJylcblxuLyoqXG4gKiBTZXQgc29tZSBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50T3B0aW9ucyA9IHtcbiAgVUlFdmVudDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiBkb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgIH1cbiAgfSxcbiAgRm9jdXNFdmVudDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBldmVudE9wdGlvbnMuVUlFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH0sXG4gIE1vdXNlRXZlbnQ6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1dHRvbjogMCxcbiAgICAgIGJ1YmJsZXM6ICh0eXBlICE9PSAnbW91c2VlbnRlcicgJiYgdHlwZSAhPT0gJ21vdXNlbGVhdmUnKSxcbiAgICAgIGNhbmNlbGFibGU6ICh0eXBlICE9PSAnbW91c2VlbnRlcicgJiYgdHlwZSAhPT0gJ21vdXNlbGVhdmUnKSxcbiAgICAgIGN0cmxLZXk6IGZhbHNlLFxuICAgICAgYWx0S2V5OiBmYWxzZSxcbiAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgIG1ldGFLZXk6IGZhbHNlLFxuICAgICAgY2xpZW50WDogMSxcbiAgICAgIGNsaWVudFk6IDEsXG4gICAgICBzY3JlZW5YOiAwLFxuICAgICAgc2NyZWVuWTogMCxcbiAgICAgIHZpZXc6IGRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgcmVsYXRlZFRhcmdldDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgfVxuICB9LFxuICBXaGVlbEV2ZW50OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHJldHVybiBldmVudE9wdGlvbnMuTW91c2VFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH0sXG4gIEtleWJvYXJkRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzogZG9jdW1lbnQuZGVmYXVsdFZpZXcsXG4gICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgIGtleUNvZGU6IDBcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNYXAgZXZlbnQgbmFtZXMgdG8gY29uc3RydWN0b3IgbmFtZXMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50VHlwZXMgPSB7XG4gIGJlZm9yZXByaW50OiAnRXZlbnQnLFxuICBhZnRlcnByaW50OiAnRXZlbnQnLFxuICBiZWZvcmV1bmxvYWQ6ICdFdmVudCcsXG4gIGFib3J0OiAnRXZlbnQnLFxuICBlcnJvcjogJ0V2ZW50JyxcbiAgY2hhbmdlOiAnRXZlbnQnLFxuICBzdWJtaXQ6ICdFdmVudCcsXG4gIHJlc2V0OiAnRXZlbnQnLFxuICBjYWNoZWQ6ICdFdmVudCcsXG4gIGNhbnBsYXk6ICdFdmVudCcsXG4gIGNhbnBsYXl0aHJvdWdoOiAnRXZlbnQnLFxuICBjaGFyZ2luZ2NoYW5nZTogJ0V2ZW50JyxcbiAgY2hhcmdpbmd0aW1lY2hhbmdlOiAnRXZlbnQnLFxuICBjaGVja2luZzogJ0V2ZW50JyxcbiAgY2xvc2U6ICdFdmVudCcsXG4gIGRvd25sb2FkaW5nOiAnRXZlbnQnLFxuICBkdXJhdGlvbmNoYW5nZTogJ0V2ZW50JyxcbiAgZW1wdGllZDogJ0V2ZW50JyxcbiAgZW5kZWQ6ICdFdmVudCcsXG4gIGZ1bGxzY3JlZW5jaGFuZ2U6ICdFdmVudCcsXG4gIGZ1bGxzY3JlZW5lcnJvcjogJ0V2ZW50JyxcbiAgaW52YWxpZDogJ0V2ZW50JyxcbiAgbGV2ZWxjaGFuZ2U6ICdFdmVudCcsXG4gIGxvYWRlZGRhdGE6ICdFdmVudCcsXG4gIGxvYWRlZG1ldGFkYXRhOiAnRXZlbnQnLFxuICBub3VwZGF0ZTogJ0V2ZW50JyxcbiAgb2Jzb2xldGU6ICdFdmVudCcsXG4gIG9mZmxpbmU6ICdFdmVudCcsXG4gIG9ubGluZTogJ0V2ZW50JyxcbiAgb3BlbjogJ0V2ZW50JyxcbiAgb3JpZW50YXRpb25jaGFuZ2U6ICdFdmVudCcsXG4gIHBhdXNlOiAnRXZlbnQnLFxuICBwb2ludGVybG9ja2NoYW5nZTogJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tlcnJvcjogJ0V2ZW50JyxcbiAgY29weTogJ0V2ZW50JyxcbiAgY3V0OiAnRXZlbnQnLFxuICBwYXN0ZTogJ0V2ZW50JyxcbiAgcGxheTogJ0V2ZW50JyxcbiAgcGxheWluZzogJ0V2ZW50JyxcbiAgcmF0ZWNoYW5nZTogJ0V2ZW50JyxcbiAgcmVhZHlzdGF0ZWNoYW5nZTogJ0V2ZW50JyxcbiAgc2Vla2VkOiAnRXZlbnQnLFxuICBzZWVraW5nOiAnRXZlbnQnLFxuICBzdGFsbGVkOiAnRXZlbnQnLFxuICBzdWNjZXNzOiAnRXZlbnQnLFxuICBzdXNwZW5kOiAnRXZlbnQnLFxuICB0aW1ldXBkYXRlOiAnRXZlbnQnLFxuICB1cGRhdGVyZWFkeTogJ0V2ZW50JyxcbiAgdmlzaWJpbGl0eWNoYW5nZTogJ0V2ZW50JyxcbiAgdm9sdW1lY2hhbmdlOiAnRXZlbnQnLFxuICB3YWl0aW5nOiAnRXZlbnQnLFxuICBsb2FkOiAnVUlFdmVudCcsXG4gIHVubG9hZDogJ1VJRXZlbnQnLFxuICByZXNpemU6ICdVSUV2ZW50JyxcbiAgc2Nyb2xsOiAnVUlFdmVudCcsXG4gIHNlbGVjdDogJ1VJRXZlbnQnLFxuICBkcmFnOiAnTW91c2VFdmVudCcsXG4gIGRyYWdlbnRlcjogJ01vdXNlRXZlbnQnLFxuICBkcmFnbGVhdmU6ICdNb3VzZUV2ZW50JyxcbiAgZHJhZ292ZXI6ICdNb3VzZUV2ZW50JyxcbiAgZHJhZ3N0YXJ0OiAnTW91c2VFdmVudCcsXG4gIGRyYWdlbmQ6ICdNb3VzZUV2ZW50JyxcbiAgZHJvcDogJ01vdXNlRXZlbnQnLFxuICB0b3VjaGNhbmNlbDogJ1VJRXZlbnQnLFxuICB0b3VjaGVuZDogJ1VJRXZlbnQnLFxuICB0b3VjaGVudGVyOiAnVUlFdmVudCcsXG4gIHRvdWNobGVhdmU6ICdVSUV2ZW50JyxcbiAgdG91Y2htb3ZlOiAnVUlFdmVudCcsXG4gIHRvdWNoc3RhcnQ6ICdVSUV2ZW50JyxcbiAgYmx1cjogJ1VJRXZlbnQnLFxuICBmb2N1czogJ1VJRXZlbnQnLFxuICBmb2N1c2luOiAnVUlFdmVudCcsXG4gIGZvY3Vzb3V0OiAnVUlFdmVudCcsXG4gIGlucHV0OiAnVUlFdmVudCcsXG4gIHNob3c6ICdNb3VzZUV2ZW50JyxcbiAgY2xpY2s6ICdNb3VzZUV2ZW50JyxcbiAgZGJsY2xpY2s6ICdNb3VzZUV2ZW50JyxcbiAgbW91c2VlbnRlcjogJ01vdXNlRXZlbnQnLFxuICBtb3VzZWxlYXZlOiAnTW91c2VFdmVudCcsXG4gIG1vdXNlZG93bjogJ01vdXNlRXZlbnQnLFxuICBtb3VzZXVwOiAnTW91c2VFdmVudCcsXG4gIG1vdXNlb3ZlcjogJ01vdXNlRXZlbnQnLFxuICBtb3VzZW1vdmU6ICdNb3VzZUV2ZW50JyxcbiAgbW91c2VvdXQ6ICdNb3VzZUV2ZW50JyxcbiAgY29udGV4dG1lbnU6ICdNb3VzZUV2ZW50JyxcbiAgd2hlZWw6ICdXaGVlbEV2ZW50JyxcbiAgbWVzc2FnZTogJ01lc3NhZ2VFdmVudCcsXG4gIHN0b3JhZ2U6ICdTdG9yYWdlRXZlbnQnLFxuICB0aW1lb3V0OiAnU3RvcmFnZUV2ZW50JyxcbiAga2V5ZG93bjogJ0tleWJvYXJkRXZlbnQnLFxuICBrZXlwcmVzczogJ0tleWJvYXJkRXZlbnQnLFxuICBrZXl1cDogJ0tleWJvYXJkRXZlbnQnLFxuICBwcm9ncmVzczogJ1Byb2dyZXNzRXZlbnQnLFxuICBsb2FkZW5kOiAnUHJvZ3Jlc3NFdmVudCcsXG4gIGxvYWRzdGFydDogJ1Byb2dyZXNzRXZlbnQnLFxuICBwb3BzdGF0ZTogJ1BvcFN0YXRlRXZlbnQnLFxuICBoYXNoY2hhbmdlOiAnSGFzaENoYW5nZUV2ZW50JyxcbiAgdHJhbnNpdGlvbmVuZDogJ1RyYW5zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uZW5kOiAnQ29tcG9zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uc3RhcnQ6ICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb251cGRhdGU6ICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgcGFnZWhpZGU6ICdQYWdlVHJhbnNpdGlvbkV2ZW50JyxcbiAgcGFnZXNob3c6ICdQYWdlVHJhbnNpdGlvbkV2ZW50J1xufVxuXG4vKipcbiAqIE1hcCB0aGUgZXZlbnQgdHlwZSBjb25zdHJ1Y3RvciB0byB0aGUgaW5pdGlhbGl6YXRpb24gbWV0aG9kLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudEluaXQgPSB7XG4gIEV2ZW50OiAnaW5pdEV2ZW50JyxcbiAgVUlFdmVudDogJ2luaXRVSUV2ZW50JyxcbiAgRm9jdXNFdmVudDogJ2luaXRVSUV2ZW50JyxcbiAgTW91c2VFdmVudDogJ2luaXRNb3VzZUV2ZW50JyxcbiAgV2hlZWxFdmVudDogJ2luaXRNb3VzZUV2ZW50JyxcbiAgTWVzc2FnZUV2ZW50OiAnaW5pdE1lc3NhZ2VFdmVudCcsXG4gIFN0b3JhZ2VFdmVudDogJ2luaXRTdG9yYWdlRXZlbnQnLFxuICBLZXlib2FyZEV2ZW50OiAnaW5pdEtleWJvYXJkRXZlbnQnLFxuICBQcm9ncmVzc0V2ZW50OiAnaW5pdEV2ZW50JyxcbiAgUG9wU3RhdGVFdmVudDogJ2luaXRFdmVudCcsXG4gIFRyYW5zaXRpb25FdmVudDogJ2luaXRFdmVudCcsXG4gIEhhc2hDaGFuZ2VFdmVudDogJ2luaXRIYXNoQ2hhbmdlRXZlbnQnLFxuICBDb21wb3NpdGlvbkV2ZW50OiAnaW5pdENvbXBvc2l0aW9uRXZlbnQnLFxuICBEZXZpY2VNb3Rpb25FdmVudDogJ2luaXREZXZpY2VNb3Rpb25FdmVudCcsXG4gIFBhZ2VUcmFuc2l0aW9uRXZlbnQ6ICdpbml0RXZlbnQnLFxuICBEZXZpY2VPcmllbnRhdGlvbkV2ZW50OiAnaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQnXG59XG5cbi8qKlxuICogTWFwIHRoZSBvcHRpb25zIG9iamVjdCB0byBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudFBhcmFtZXRlcnMgPSB7XG4gIGluaXRFdmVudDogW10sXG4gIGluaXRVSUV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkZXRhaWwnXG4gIF0sXG4gIGluaXRLZXlib2FyZEV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdjaGFyJyxcbiAgICAna2V5JyxcbiAgICAnbG9jYXRpb24nLFxuICAgICdtb2RpZmllcnNMaXN0JyxcbiAgICAncmVwZWF0JyxcbiAgICAnbG9jYWxlJ1xuICBdLFxuICBpbml0S2V5RXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2N0cmxLZXknLFxuICAgICdhbHRLZXknLFxuICAgICdzaGlmdEtleScsXG4gICAgJ21ldGFLZXknLFxuICAgICdrZXlDb2RlJyxcbiAgICAnY2hhckNvZGUnXG4gIF0sXG4gIGluaXRNb3VzZUV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkZXRhaWwnLFxuICAgICdzY3JlZW5YJyxcbiAgICAnc2NyZWVuWScsXG4gICAgJ2NsaWVudFgnLFxuICAgICdjbGllbnRZJyxcbiAgICAnY3RybEtleScsXG4gICAgJ2FsdEtleScsXG4gICAgJ3NoaWZ0S2V5JyxcbiAgICAnbWV0YUtleScsXG4gICAgJ2J1dHRvbicsXG4gICAgJ3JlbGF0ZWRUYXJnZXQnXG4gIF0sXG4gIGluaXRIYXNoQ2hhbmdlRXZlbnQ6IFtcbiAgICAnb2xkVVJMJyxcbiAgICAnbmV3VVJMJ1xuICBdLFxuICBpbml0Q29tcG9zaXRpb25FdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGF0YScsXG4gICAgJ2xvY2FsZSdcbiAgXSxcbiAgaW5pdERldmljZU1vdGlvbkV2ZW50OiBbXG4gICAgJ2FjY2VsZXJhdGlvbicsXG4gICAgJ2FjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHknLFxuICAgICdyb3RhdGlvblJhdGUnLFxuICAgICdpbnRlcnZhbCdcbiAgXSxcbiAgaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQ6IFtcbiAgICAnYWxwaGEnLFxuICAgICdiZXRhJyxcbiAgICAnZ2FtbWEnLFxuICAgICdhYnNvbHV0ZSdcbiAgXSxcbiAgaW5pdE1lc3NhZ2VFdmVudDogW1xuICAgICdkYXRhJyxcbiAgICAnb3JpZ2luJyxcbiAgICAnbGFzdEV2ZW50SWQnLFxuICAgICdzb3VyY2UnXG4gIF0sXG4gIGluaXRTdG9yYWdlRXZlbnQ6IFtcbiAgICAna2V5JyxcbiAgICAnb2xkVmFsdWUnLFxuICAgICduZXdWYWx1ZScsXG4gICAgJ3VybCcsXG4gICAgJ3N0b3JhZ2VBcmVhJ1xuICBdXG59XG5cbi8qKlxuICogTWFwIHRoZSBldmVudCB0eXBlcyB0byBjb25zdHJ1Y3RvcnMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50Q29uc3RydWN0b3JzID0ge1xuICBVSUV2ZW50OiB3aW5kb3cuVUlFdmVudCxcbiAgRm9jdXNFdmVudDogd2luZG93LkZvY3VzRXZlbnQsXG4gIE1vdXNlRXZlbnQ6IHdpbmRvdy5Nb3VzZUV2ZW50LFxuICBXaGVlbEV2ZW50OiB3aW5kb3cuTW91c2VFdmVudCxcbiAgS2V5Ym9hcmRFdmVudDogd2luZG93LktleWJvYXJkRXZlbnRcbn1cblxuLyoqXG4gKiBHZXQgYXR0cmlidXRlcyB3aGljaCBtdXN0IGJlIG92ZXJyaWRlbiBtYW51YWxseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gZ2V0T3ZlcnJpZGVzIChldmVudFR5cGUsIG9wdGlvbnMpIHtcbiAgaWYgKGV2ZW50VHlwZSA9PT0gJ0tleWJvYXJkRXZlbnQnICYmIG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5Q29kZTogb3B0aW9ucy5rZXlDb2RlIHx8IDAsXG4gICAgICBrZXk6IG9wdGlvbnMua2V5IHx8IDAsXG4gICAgICB3aGljaDogb3B0aW9ucy53aGljaCB8fCBvcHRpb25zLmtleUNvZGUgfHwgMFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gIHR5cGVcbiAqIEBwYXJhbSAge09iamVjdH0gIG9wdGlvbnNcbiAqIEByZXR1cm4ge0V2ZW50fVxuICovXG5leHBvcnRzLmdlbmVyYXRlID0gZnVuY3Rpb24gKHR5cGUsIG9wdGlvbnMpIHtcbiAgLy8gSW1tZWRpYXRlbHkgdGhyb3cgYW4gZXJyb3Igd2hlbiB0aGUgZXZlbnQgbmFtZSBkb2VzIG5vdCB0cmFuc2xhdGUuXG4gIGlmICghZXZlbnRUeXBlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5zdXBwb3J0ZWQgZXZlbnQgdHlwZScpXG4gIH1cblxuICB2YXIgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1t0eXBlXVxuICB2YXIgZXZlbnRcbiAgdmFyIGtleVxuXG4gIC8vIEhhbmRsZSBwYXJhbWV0ZXJzIHdoaWNoIG11c3QgYmUgbWFudWFsbHkgb3ZlcnJpZGRlbiB1c2luZ1xuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cbiAgdmFyIG92ZXJyaWRlcyA9IGdldE92ZXJyaWRlcyhldmVudFR5cGUsIG9wdGlvbnMpXG5cbiAgLy8gRXh0ZW5kIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IGFuZCBwYXNzZWQgaW4gb3B0aW9ucy5cbiAgLy8gRXhpc3RpbmcgZXZlbnRzIGFscmVhZHkgaGF2ZSBhbGwgb2YgdGhlaXIgZGVmYXVsdHMgc2V0LlxuICBpZiAoIShvcHRpb25zIGluc3RhbmNlb2Ygd2luZG93LkV2ZW50KSkge1xuICAgIC8vIENoZWNrIGZvciBleHRyYSBkZWZhdWx0cyB0byBwYXNzIGluLlxuICAgIGlmIChldmVudFR5cGUgaW4gZXZlbnRPcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfSwgZXZlbnRPcHRpb25zW2V2ZW50VHlwZV0odHlwZSwgb3B0aW9ucyksIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9LCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIC8vIEF0dGVtcHQgdGhlIEV2ZW50IENvbnN0cnVjdG9ycyBET00gQVBJLlxuICB2YXIgQ29uc3RydWN0b3IgPSBldmVudENvbnN0cnVjdG9yc1tldmVudFR5cGVdIHx8IHdpbmRvdy5FdmVudFxuXG4gIHRyeSB7XG4gICAgZXZlbnQgPSBuZXcgQ29uc3RydWN0b3IodHlwZSwgb3B0aW9ucylcblxuICAgIC8vIEFkZCB0aGUgb3ZlcnJpZGUgcHJvcGVydGllcy5cbiAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwga2V5LCB7XG4gICAgICAgIHZhbHVlOiBvdmVycmlkZXNba2V5XVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnRpbnVlLlxuICB9XG5cbiAgLy8gSW4gSUUxMSwgdGhlIEtleWJvYXJkIGV2ZW50IGRvZXMgbm90IGFsbG93IHNldHRpbmcgdGhlXG4gIC8vIGtleUNvZGUgcHJvcGVydHksIGV2ZW4gd2l0aCBPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIC8vIHNvIHdlIGhhdmUgdG8gdXNlIFVJRXZlbnQuXG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgdmFyIG1zaWUgPSBNYXRoLm1heCh1YS5pbmRleE9mKCdtc2llJyksIHVhLmluZGV4T2YoJ3RyaWRlbnQnKSlcblxuICBpZiAobXNpZSA+PSAwICYmIGV2ZW50VHlwZSA9PT0gJ0tleWJvYXJkRXZlbnQnKSB7XG4gICAgZXZlbnRUeXBlID0gJ1VJRXZlbnQnXG4gIH1cblxuICB2YXIgaW5pdEV2ZW50ID0gZXZlbnRJbml0W2V2ZW50VHlwZV1cblxuICAvLyBJbiA8IElFOSwgdGhlIGBjcmVhdGVFdmVudGAgZnVuY3Rpb24gaXMgbm90IGF2YWlsYWJsZSBhbmQgd2UgaGF2ZSB0b1xuICAvLyByZXNvcnQgdG8gdXNpbmcgYGZpcmVFdmVudGAuXG4gIGlmICghZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICBldmVudCA9IGV4dGVuZChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpLCBvcHRpb25zKVxuXG4gICAgLy8gQWRkIHRoZSBvdmVycmlkZSBwcm9wZXJ0aWVzLlxuICAgIGZvciAoa2V5IGluIG92ZXJyaWRlcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBrZXksIHtcbiAgICAgICAgdmFsdWU6IG92ZXJyaWRlc1trZXldXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBldmVudFxuICB9XG5cbiAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSwgb3B0aW9ucylcblxuICAvLyBIYW5kbGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgaW5pdEtleWJvYXJkRXZlbnRgIGFuZCBgaW5pdEtleUV2ZW50YC5cbiAgaWYgKGluaXRFdmVudCA9PT0gJ2luaXRLZXlib2FyZEV2ZW50Jykge1xuICAgIGlmIChldmVudFtpbml0RXZlbnRdID09PSB2b2lkIDApIHtcbiAgICAgIGluaXRFdmVudCA9ICdpbml0S2V5RXZlbnQnXG4gICAgfSBlbHNlIGlmICghKCdtb2RpZmllcnNMaXN0JyBpbiBvcHRpb25zKSkge1xuICAgICAgdmFyIG1vZHMgPSBbXVxuICAgICAgaWYgKG9wdGlvbnMubWV0YUtleSkgbW9kcy5wdXNoKCdNZXRhJylcbiAgICAgIGlmIChvcHRpb25zLmFsdEtleSkgbW9kcy5wdXNoKCdBbHQnKVxuICAgICAgaWYgKG9wdGlvbnMuc2hpZnRLZXkpIG1vZHMucHVzaCgnU2hpZnQnKVxuICAgICAgaWYgKG9wdGlvbnMuY3RybEtleSkgbW9kcy5wdXNoKCdDb250cm9sJylcbiAgICAgIG9wdGlvbnNbJ21vZGlmaWVyc0xpc3QnXSA9IG1vZHMuam9pbignICcpXG4gICAgfVxuICB9XG5cbiAgLy8gTWFwIGFyZ3VtZW50IG5hbWVzIHRvIHRoZSBvcHRpb24gdmFsdWVzLlxuICB2YXIgYXJncyA9IGV2ZW50UGFyYW1ldGVyc1tpbml0RXZlbnRdLm1hcChmdW5jdGlvbiAocGFyYW1ldGVyKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNbcGFyYW1ldGVyXVxuICB9KVxuXG4gIC8vIEluaXRpYWxpemUgdGhlIGV2ZW50IHVzaW5nIHRoZSBidWlsdC1pbiBtZXRob2QuXG4gIGV2ZW50W2luaXRFdmVudF0uYXBwbHkoXG4gICAgZXZlbnQsIFt0eXBlLCBvcHRpb25zLmJ1YmJsZXMsIG9wdGlvbnMuY2FuY2VsYWJsZV0uY29uY2F0KGFyZ3MpXG4gIClcblxuICAvLyBBZGQgdGhlIG92ZXJyaWRlIHByb3BlcnRpZXMuXG4gIGZvciAoa2V5IGluIG92ZXJyaWRlcykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwga2V5LCB7XG4gICAgICB2YWx1ZTogb3ZlcnJpZGVzW2tleV1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIGV2ZW50XG59XG5cbi8qKlxuICogU2ltdWxhdGUgYW4gZXZlbnQgd2hpY2ggaXMgZGlzcGF0Y2hlZCBvbiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLnNpbXVsYXRlID0gZnVuY3Rpb24gKGVsZW1lbnQsIHR5cGUsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50ID0gZXhwb3J0cy5nZW5lcmF0ZSh0eXBlLCBvcHRpb25zKVxuXG4gIC8vIEluIDwgSUU5LCB0aGUgYGNyZWF0ZUV2ZW50YCBmdW5jdGlvbiBpcyBub3QgYXZhaWxhYmxlIGFuZCB3ZSBoYXZlIHRvXG4gIC8vIHJlc29ydCB0byB1c2luZyBgZmlyZUV2ZW50YC5cbiAgaWYgKCFkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmZpcmVFdmVudCgnb24nICsgdHlwZSwgZXZlbnQpXG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcbn1cbiJdfQ==
(2)
});

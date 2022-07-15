document.addEventListener("DOMContentLoaded", () => {
  /**
   * Swiper 8.1.6
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * https://swiperjs.com
   *
   * Copyright 2014-2022 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: May 25, 2022
   */
  
  (function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Swiper = factory());
  })(this, (function () { 'use strict';
  
      /**
       * SSR Window 4.0.2
       * Better handling for window object in SSR environment
       * https://github.com/nolimits4web/ssr-window
       *
       * Copyright 2021, Vladimir Kharlampidi
       *
       * Licensed under MIT
       *
       * Released on: December 13, 2021
       */
  
      /* eslint-disable no-param-reassign */
      function isObject$1(obj) {
        return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
      }
  
      function extend$1(target, src) {
        if (target === void 0) {
          target = {};
        }
  
        if (src === void 0) {
          src = {};
        }
  
        Object.keys(src).forEach(key => {
          if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
            extend$1(target[key], src[key]);
          }
        });
      }
  
      const ssrDocument = {
        body: {},
  
        addEventListener() {},
  
        removeEventListener() {},
  
        activeElement: {
          blur() {},
  
          nodeName: ''
        },
  
        querySelector() {
          return null;
        },
  
        querySelectorAll() {
          return [];
        },
  
        getElementById() {
          return null;
        },
  
        createEvent() {
          return {
            initEvent() {}
  
          };
        },
  
        createElement() {
          return {
            children: [],
            childNodes: [],
            style: {},
  
            setAttribute() {},
  
            getElementsByTagName() {
              return [];
            }
  
          };
        },
  
        createElementNS() {
          return {};
        },
  
        importNode() {
          return null;
        },
  
        location: {
          hash: '',
          host: '',
          hostname: '',
          href: '',
          origin: '',
          pathname: '',
          protocol: '',
          search: ''
        }
      };
  
      function getDocument() {
        const doc = typeof document !== 'undefined' ? document : {};
        extend$1(doc, ssrDocument);
        return doc;
      }
  
      const ssrWindow = {
        document: ssrDocument,
        navigator: {
          userAgent: ''
        },
        location: {
          hash: '',
          host: '',
          hostname: '',
          href: '',
          origin: '',
          pathname: '',
          protocol: '',
          search: ''
        },
        history: {
          replaceState() {},
  
          pushState() {},
  
          go() {},
  
          back() {}
  
        },
        CustomEvent: function CustomEvent() {
          return this;
        },
  
        addEventListener() {},
  
        removeEventListener() {},
  
        getComputedStyle() {
          return {
            getPropertyValue() {
              return '';
            }
  
          };
        },
  
        Image() {},
  
        Date() {},
  
        screen: {},
  
        setTimeout() {},
  
        clearTimeout() {},
  
        matchMedia() {
          return {};
        },
  
        requestAnimationFrame(callback) {
          if (typeof setTimeout === 'undefined') {
            callback();
            return null;
          }
  
          return setTimeout(callback, 0);
        },
  
        cancelAnimationFrame(id) {
          if (typeof setTimeout === 'undefined') {
            return;
          }
  
          clearTimeout(id);
        }
  
      };
  
      function getWindow() {
        const win = typeof window !== 'undefined' ? window : {};
        extend$1(win, ssrWindow);
        return win;
      }
  
      /**
       * Dom7 4.0.4
       * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
       * https://framework7.io/docs/dom7.html
       *
       * Copyright 2022, Vladimir Kharlampidi
       *
       * Licensed under MIT
       *
       * Released on: January 11, 2022
       */
      /* eslint-disable no-proto */
  
      function makeReactive(obj) {
        const proto = obj.__proto__;
        Object.defineProperty(obj, '__proto__', {
          get() {
            return proto;
          },
  
          set(value) {
            proto.__proto__ = value;
          }
  
        });
      }
  
      class Dom7 extends Array {
        constructor(items) {
          if (typeof items === 'number') {
            super(items);
          } else {
            super(...(items || []));
            makeReactive(this);
          }
        }
  
      }
  
      function arrayFlat(arr) {
        if (arr === void 0) {
          arr = [];
        }
  
        const res = [];
        arr.forEach(el => {
          if (Array.isArray(el)) {
            res.push(...arrayFlat(el));
          } else {
            res.push(el);
          }
        });
        return res;
      }
  
      function arrayFilter(arr, callback) {
        return Array.prototype.filter.call(arr, callback);
      }
  
      function arrayUnique(arr) {
        const uniqueArray = [];
  
        for (let i = 0; i < arr.length; i += 1) {
          if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
        }
  
        return uniqueArray;
      }
  
  
      function qsa(selector, context) {
        if (typeof selector !== 'string') {
          return [selector];
        }
  
        const a = [];
        const res = context.querySelectorAll(selector);
  
        for (let i = 0; i < res.length; i += 1) {
          a.push(res[i]);
        }
  
        return a;
      }
  
      function $(selector, context) {
        const window = getWindow();
        const document = getDocument();
        let arr = [];
  
        if (!context && selector instanceof Dom7) {
          return selector;
        }
  
        if (!selector) {
          return new Dom7(arr);
        }
  
        if (typeof selector === 'string') {
          const html = selector.trim();
  
          if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
            let toCreate = 'div';
            if (html.indexOf('<li') === 0) toCreate = 'ul';
            if (html.indexOf('<tr') === 0) toCreate = 'tbody';
            if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
            if (html.indexOf('<tbody') === 0) toCreate = 'table';
            if (html.indexOf('<option') === 0) toCreate = 'select';
            const tempParent = document.createElement(toCreate);
            tempParent.innerHTML = html;
  
            for (let i = 0; i < tempParent.childNodes.length; i += 1) {
              arr.push(tempParent.childNodes[i]);
            }
          } else {
            arr = qsa(selector.trim(), context || document);
          } // arr = qsa(selector, document);
  
        } else if (selector.nodeType || selector === window || selector === document) {
          arr.push(selector);
        } else if (Array.isArray(selector)) {
          if (selector instanceof Dom7) return selector;
          arr = selector;
        }
  
        return new Dom7(arrayUnique(arr));
      }
  
      $.fn = Dom7.prototype; // eslint-disable-next-line
  
      function addClass() {
        for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
          classes[_key] = arguments[_key];
        }
  
        const classNames = arrayFlat(classes.map(c => c.split(' ')));
        this.forEach(el => {
          el.classList.add(...classNames);
        });
        return this;
      }
  
      function removeClass() {
        for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          classes[_key2] = arguments[_key2];
        }
  
        const classNames = arrayFlat(classes.map(c => c.split(' ')));
        this.forEach(el => {
          el.classList.remove(...classNames);
        });
        return this;
      }
  
      function toggleClass() {
        for (var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          classes[_key3] = arguments[_key3];
        }
  
        const classNames = arrayFlat(classes.map(c => c.split(' ')));
        this.forEach(el => {
          classNames.forEach(className => {
            el.classList.toggle(className);
          });
        });
      }
  
      function hasClass() {
        for (var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          classes[_key4] = arguments[_key4];
        }
  
        const classNames = arrayFlat(classes.map(c => c.split(' ')));
        return arrayFilter(this, el => {
          return classNames.filter(className => el.classList.contains(className)).length > 0;
        }).length > 0;
      }
  
      function attr(attrs, value) {
        if (arguments.length === 1 && typeof attrs === 'string') {
          // Get attr
          if (this[0]) return this[0].getAttribute(attrs);
          return undefined;
        } // Set attrs
  
  
        for (let i = 0; i < this.length; i += 1) {
          if (arguments.length === 2) {
            // String
            this[i].setAttribute(attrs, value);
          } else {
            // Object
            for (const attrName in attrs) {
              this[i][attrName] = attrs[attrName];
              this[i].setAttribute(attrName, attrs[attrName]);
            }
          }
        }
  
        return this;
      }
  
      function removeAttr(attr) {
        for (let i = 0; i < this.length; i += 1) {
          this[i].removeAttribute(attr);
        }
  
        return this;
      }
  
      function transform(transform) {
        for (let i = 0; i < this.length; i += 1) {
          this[i].style.transform = transform;
        }
  
        return this;
      }
  
      function transition$1(duration) {
        for (let i = 0; i < this.length; i += 1) {
          this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
        }
  
        return this;
      }
  
      function on() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
  
        let [eventType, targetSelector, listener, capture] = args;
  
        if (typeof args[1] === 'function') {
          [eventType, listener, capture] = args;
          targetSelector = undefined;
        }
  
        if (!capture) capture = false;
  
        function handleLiveEvent(e) {
          const target = e.target;
          if (!target) return;
          const eventData = e.target.dom7EventData || [];
  
          if (eventData.indexOf(e) < 0) {
            eventData.unshift(e);
          }
  
          if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
            const parents = $(target).parents(); // eslint-disable-line
  
            for (let k = 0; k < parents.length; k += 1) {
              if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
            }
          }
        }
  
        function handleEvent(e) {
          const eventData = e && e.target ? e.target.dom7EventData || [] : [];
  
          if (eventData.indexOf(e) < 0) {
            eventData.unshift(e);
          }
  
          listener.apply(this, eventData);
        }
  
        const events = eventType.split(' ');
        let j;
  
        for (let i = 0; i < this.length; i += 1) {
          const el = this[i];
  
          if (!targetSelector) {
            for (j = 0; j < events.length; j += 1) {
              const event = events[j];
              if (!el.dom7Listeners) el.dom7Listeners = {};
              if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
              el.dom7Listeners[event].push({
                listener,
                proxyListener: handleEvent
              });
              el.addEventListener(event, handleEvent, capture);
            }
          } else {
            // Live events
            for (j = 0; j < events.length; j += 1) {
              const event = events[j];
              if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
              if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
              el.dom7LiveListeners[event].push({
                listener,
                proxyListener: handleLiveEvent
              });
              el.addEventListener(event, handleLiveEvent, capture);
            }
          }
        }
  
        return this;
      }
  
      function off() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
  
        let [eventType, targetSelector, listener, capture] = args;
  
        if (typeof args[1] === 'function') {
          [eventType, listener, capture] = args;
          targetSelector = undefined;
        }
  
        if (!capture) capture = false;
        const events = eventType.split(' ');
  
        for (let i = 0; i < events.length; i += 1) {
          const event = events[i];
  
          for (let j = 0; j < this.length; j += 1) {
            const el = this[j];
            let handlers;
  
            if (!targetSelector && el.dom7Listeners) {
              handlers = el.dom7Listeners[event];
            } else if (targetSelector && el.dom7LiveListeners) {
              handlers = el.dom7LiveListeners[event];
            }
  
            if (handlers && handlers.length) {
              for (let k = handlers.length - 1; k >= 0; k -= 1) {
                const handler = handlers[k];
  
                if (listener && handler.listener === listener) {
                  el.removeEventListener(event, handler.proxyListener, capture);
                  handlers.splice(k, 1);
                } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                  el.removeEventListener(event, handler.proxyListener, capture);
                  handlers.splice(k, 1);
                } else if (!listener) {
                  el.removeEventListener(event, handler.proxyListener, capture);
                  handlers.splice(k, 1);
                }
              }
            }
          }
        }
  
        return this;
      }
  
      function trigger() {
        const window = getWindow();
  
        for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }
  
        const events = args[0].split(' ');
        const eventData = args[1];
  
        for (let i = 0; i < events.length; i += 1) {
          const event = events[i];
  
          for (let j = 0; j < this.length; j += 1) {
            const el = this[j];
  
            if (window.CustomEvent) {
              const evt = new window.CustomEvent(event, {
                detail: eventData,
                bubbles: true,
                cancelable: true
              });
              el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
              el.dispatchEvent(evt);
              el.dom7EventData = [];
              delete el.dom7EventData;
            }
          }
        }
  
        return this;
      }
  
      function transitionEnd$1(callback) {
        const dom = this;
  
        function fireCallBack(e) {
          if (e.target !== this) return;
          callback.call(this, e);
          dom.off('transitionend', fireCallBack);
        }
  
        if (callback) {
          dom.on('transitionend', fireCallBack);
        }
  
        return this;
      }
  
      function outerWidth(includeMargins) {
        if (this.length > 0) {
          if (includeMargins) {
            const styles = this.styles();
            return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
          }
  
          return this[0].offsetWidth;
        }
  
        return null;
      }
  
      function outerHeight(includeMargins) {
        if (this.length > 0) {
          if (includeMargins) {
            const styles = this.styles();
            return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
          }
  
          return this[0].offsetHeight;
        }
  
        return null;
      }
  
      function offset() {
        if (this.length > 0) {
          const window = getWindow();
          const document = getDocument();
          const el = this[0];
          const box = el.getBoundingClientRect();
          const body = document.body;
          const clientTop = el.clientTop || body.clientTop || 0;
          const clientLeft = el.clientLeft || body.clientLeft || 0;
          const scrollTop = el === window ? window.scrollY : el.scrollTop;
          const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
          return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
          };
        }
  
        return null;
      }
  
      function styles() {
        const window = getWindow();
        if (this[0]) return window.getComputedStyle(this[0], null);
        return {};
      }
  
      function css(props, value) {
        const window = getWindow();
        let i;
  
        if (arguments.length === 1) {
          if (typeof props === 'string') {
            // .css('width')
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
          } else {
            // .css({ width: '100px' })
            for (i = 0; i < this.length; i += 1) {
              for (const prop in props) {
                this[i].style[prop] = props[prop];
              }
            }
  
            return this;
          }
        }
  
        if (arguments.length === 2 && typeof props === 'string') {
          // .css('width', '100px')
          for (i = 0; i < this.length; i += 1) {
            this[i].style[props] = value;
          }
  
          return this;
        }
  
        return this;
      }
  
      function each(callback) {
        if (!callback) return this;
        this.forEach((el, index) => {
          callback.apply(el, [el, index]);
        });
        return this;
      }
  
      function filter(callback) {
        const result = arrayFilter(this, callback);
        return $(result);
      }
  
      function html(html) {
        if (typeof html === 'undefined') {
          return this[0] ? this[0].innerHTML : null;
        }
  
        for (let i = 0; i < this.length; i += 1) {
          this[i].innerHTML = html;
        }
  
        return this;
      }
  
      function text(text) {
        if (typeof text === 'undefined') {
          return this[0] ? this[0].textContent.trim() : null;
        }
  
        for (let i = 0; i < this.length; i += 1) {
          this[i].textContent = text;
        }
  
        return this;
      }
  
      function is(selector) {
        const window = getWindow();
        const document = getDocument();
        const el = this[0];
        let compareWith;
        let i;
        if (!el || typeof selector === 'undefined') return false;
  
        if (typeof selector === 'string') {
          if (el.matches) return el.matches(selector);
          if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
          if (el.msMatchesSelector) return el.msMatchesSelector(selector);
          compareWith = $(selector);
  
          for (i = 0; i < compareWith.length; i += 1) {
            if (compareWith[i] === el) return true;
          }
  
          return false;
        }
  
        if (selector === document) {
          return el === document;
        }
  
        if (selector === window) {
          return el === window;
        }
  
        if (selector.nodeType || selector instanceof Dom7) {
          compareWith = selector.nodeType ? [selector] : selector;
  
          for (i = 0; i < compareWith.length; i += 1) {
            if (compareWith[i] === el) return true;
          }
  
          return false;
        }
  
        return false;
      }
  
      function index() {
        let child = this[0];
        let i;
  
        if (child) {
          i = 0; // eslint-disable-next-line
  
          while ((child = child.previousSibling) !== null) {
            if (child.nodeType === 1) i += 1;
          }
  
          return i;
        }
  
        return undefined;
      }
  
      function eq(index) {
        if (typeof index === 'undefined') return this;
        const length = this.length;
  
        if (index > length - 1) {
          return $([]);
        }
  
        if (index < 0) {
          const returnIndex = length + index;
          if (returnIndex < 0) return $([]);
          return $([this[returnIndex]]);
        }
  
        return $([this[index]]);
      }
  
      function append() {
        let newChild;
        const document = getDocument();
  
        for (let k = 0; k < arguments.length; k += 1) {
          newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];
  
          for (let i = 0; i < this.length; i += 1) {
            if (typeof newChild === 'string') {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = newChild;
  
              while (tempDiv.firstChild) {
                this[i].appendChild(tempDiv.firstChild);
              }
            } else if (newChild instanceof Dom7) {
              for (let j = 0; j < newChild.length; j += 1) {
                this[i].appendChild(newChild[j]);
              }
            } else {
              this[i].appendChild(newChild);
            }
          }
        }
  
        return this;
      }
  
      function prepend(newChild) {
        const document = getDocument();
        let i;
        let j;
  
        for (i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;
  
            for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
              this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            }
          } else if (newChild instanceof Dom7) {
            for (j = 0; j < newChild.length; j += 1) {
              this[i].insertBefore(newChild[j], this[i].childNodes[0]);
            }
          } else {
            this[i].insertBefore(newChild, this[i].childNodes[0]);
          }
        }
  
        return this;
      }
  
      function next(selector) {
        if (this.length > 0) {
          if (selector) {
            if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
              return $([this[0].nextElementSibling]);
            }
  
            return $([]);
          }
  
          if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
          return $([]);
        }
  
        return $([]);
      }
  
      function nextAll(selector) {
        const nextEls = [];
        let el = this[0];
        if (!el) return $([]);
  
        while (el.nextElementSibling) {
          const next = el.nextElementSibling; // eslint-disable-line
  
          if (selector) {
            if ($(next).is(selector)) nextEls.push(next);
          } else nextEls.push(next);
  
          el = next;
        }
  
        return $(nextEls);
      }
  
      function prev(selector) {
        if (this.length > 0) {
          const el = this[0];
  
          if (selector) {
            if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
              return $([el.previousElementSibling]);
            }
  
            return $([]);
          }
  
          if (el.previousElementSibling) return $([el.previousElementSibling]);
          return $([]);
        }
  
        return $([]);
      }
  
      function prevAll(selector) {
        const prevEls = [];
        let el = this[0];
        if (!el) return $([]);
  
        while (el.previousElementSibling) {
          const prev = el.previousElementSibling; // eslint-disable-line
  
          if (selector) {
            if ($(prev).is(selector)) prevEls.push(prev);
          } else prevEls.push(prev);
  
          el = prev;
        }
  
        return $(prevEls);
      }
  
      function parent(selector) {
        const parents = []; // eslint-disable-line
  
        for (let i = 0; i < this.length; i += 1) {
          if (this[i].parentNode !== null) {
            if (selector) {
              if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else {
              parents.push(this[i].parentNode);
            }
          }
        }
  
        return $(parents);
      }
  
      function parents(selector) {
        const parents = []; // eslint-disable-line
  
        for (let i = 0; i < this.length; i += 1) {
          let parent = this[i].parentNode; // eslint-disable-line
  
          while (parent) {
            if (selector) {
              if ($(parent).is(selector)) parents.push(parent);
            } else {
              parents.push(parent);
            }
  
            parent = parent.parentNode;
          }
        }
  
        return $(parents);
      }
  
      function closest(selector) {
        let closest = this; // eslint-disable-line
  
        if (typeof selector === 'undefined') {
          return $([]);
        }
  
        if (!closest.is(selector)) {
          closest = closest.parents(selector).eq(0);
        }
  
        return closest;
      }
  
      function find(selector) {
        const foundElements = [];
  
        for (let i = 0; i < this.length; i += 1) {
          const found = this[i].querySelectorAll(selector);
  
          for (let j = 0; j < found.length; j += 1) {
            foundElements.push(found[j]);
          }
        }
  
        return $(foundElements);
      }
  
      function children(selector) {
        const children = []; // eslint-disable-line
  
        for (let i = 0; i < this.length; i += 1) {
          const childNodes = this[i].children;
  
          for (let j = 0; j < childNodes.length; j += 1) {
            if (!selector || $(childNodes[j]).is(selector)) {
              children.push(childNodes[j]);
            }
          }
        }
  
        return $(children);
      }
  
      function remove() {
        for (let i = 0; i < this.length; i += 1) {
          if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        }
  
        return this;
      }
  
      const Methods = {
        addClass,
        removeClass,
        hasClass,
        toggleClass,
        attr,
        removeAttr,
        transform,
        transition: transition$1,
        on,
        off,
        trigger,
        transitionEnd: transitionEnd$1,
        outerWidth,
        outerHeight,
        styles,
        offset,
        css,
        each,
        html,
        text,
        is,
        index,
        eq,
        append,
        prepend,
        next,
        nextAll,
        prev,
        prevAll,
        parent,
        parents,
        closest,
        find,
        children,
        filter,
        remove
      };
      Object.keys(Methods).forEach(methodName => {
        Object.defineProperty($.fn, methodName, {
          value: Methods[methodName],
          writable: true
        });
      });
  
      function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach(key => {
          try {
            object[key] = null;
          } catch (e) {// no getter for object
          }
  
          try {
            delete object[key];
          } catch (e) {// something got wrong
          }
        });
      }
  
      function nextTick(callback, delay) {
        if (delay === void 0) {
          delay = 0;
        }
  
        return setTimeout(callback, delay);
      }
  
      function now() {
        return Date.now();
      }
  
      function getComputedStyle$1(el) {
        const window = getWindow();
        let style;
  
        if (window.getComputedStyle) {
          style = window.getComputedStyle(el, null);
        }
  
        if (!style && el.currentStyle) {
          style = el.currentStyle;
        }
  
        if (!style) {
          style = el.style;
        }
  
        return style;
      }
  
      function getTranslate(el, axis) {
        if (axis === void 0) {
          axis = 'x';
        }
  
        const window = getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = getComputedStyle$1(el);
  
        if (window.WebKitCSSMatrix) {
          curTransform = curStyle.transform || curStyle.webkitTransform;
  
          if (curTransform.split(',').length > 6) {
            curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
          } // Some old versions of Webkit choke when 'none' is passed; pass
          // empty string instead in this case
  
  
          transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
        } else {
          transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
          matrix = transformMatrix.toString().split(',');
        }
  
        if (axis === 'x') {
          // Latest Chrome and webkits Fix
          if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
          else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
          else curTransform = parseFloat(matrix[4]);
        }
  
        if (axis === 'y') {
          // Latest Chrome and webkits Fix
          if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
          else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
          else curTransform = parseFloat(matrix[5]);
        }
  
        return curTransform || 0;
      }
  
      function isObject(o) {
        return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
      }
  
      function isNode(node) {
        // eslint-disable-next-line
        if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
          return node instanceof HTMLElement;
        }
  
        return node && (node.nodeType === 1 || node.nodeType === 11);
      }
  
      function extend() {
        const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
        const noExtend = ['__proto__', 'constructor', 'prototype'];
  
        for (let i = 1; i < arguments.length; i += 1) {
          const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
  
          if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
            const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
  
            for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
              const nextKey = keysArray[nextIndex];
              const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
  
              if (desc !== undefined && desc.enumerable) {
                if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                  if (nextSource[nextKey].__swiper__) {
                    to[nextKey] = nextSource[nextKey];
                  } else {
                    extend(to[nextKey], nextSource[nextKey]);
                  }
                } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                  to[nextKey] = {};
  
                  if (nextSource[nextKey].__swiper__) {
                    to[nextKey] = nextSource[nextKey];
                  } else {
                    extend(to[nextKey], nextSource[nextKey]);
                  }
                } else {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
        }
  
        return to;
      }
  
      function setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
      }
  
      function animateCSSModeScroll(_ref) {
        let {
          swiper,
          targetPosition,
          side
        } = _ref;
        const window = getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = 'none';
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? 'next' : 'prev';
  
        const isOutOfBound = (current, target) => {
          return dir === 'next' && current >= target || dir === 'prev' && current <= target;
        };
  
        const animate = () => {
          time = new Date().getTime();
  
          if (startTime === null) {
            startTime = time;
          }
  
          const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
          const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
          let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
  
          if (isOutOfBound(currentPosition, targetPosition)) {
            currentPosition = targetPosition;
          }
  
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
  
          if (isOutOfBound(currentPosition, targetPosition)) {
            swiper.wrapperEl.style.overflow = 'hidden';
            swiper.wrapperEl.style.scrollSnapType = '';
            setTimeout(() => {
              swiper.wrapperEl.style.overflow = '';
              swiper.wrapperEl.scrollTo({
                [side]: currentPosition
              });
            });
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            return;
          }
  
          swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
  
        animate();
      }
  
      let support;
  
      function calcSupport() {
        const window = getWindow();
        const document = getDocument();
        return {
          smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
          touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
          passiveListener: function checkPassiveListener() {
            let supportsPassive = false;
  
            try {
              const opts = Object.defineProperty({}, 'passive', {
                // eslint-disable-next-line
                get() {
                  supportsPassive = true;
                }
  
              });
              window.addEventListener('testPassiveListener', null, opts);
            } catch (e) {// No support
            }
  
            return supportsPassive;
          }(),
          gestures: function checkGestures() {
            return 'ongesturestart' in window;
          }()
        };
      }
  
      function getSupport() {
        if (!support) {
          support = calcSupport();
        }
  
        return support;
      }
  
      let deviceCached;
  
      function calcDevice(_temp) {
        let {
          userAgent
        } = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
          ios: false,
          android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === 'Win32';
        let macos = platform === 'MacIntel'; // iPadOs 13 fix
  
        const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
          ipad = ua.match(/(Version)\/([\d.]+)/);
          if (!ipad) ipad = [0, 1, '13_0_0'];
          macos = false;
        } // Android
  
  
        if (android && !windows) {
          device.os = 'android';
          device.android = true;
        }
  
        if (ipad || iphone || ipod) {
          device.os = 'ios';
          device.ios = true;
        } // Export object
  
  
        return device;
      }
  
      function getDevice(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
  
        if (!deviceCached) {
          deviceCached = calcDevice(overrides);
        }
  
        return deviceCached;
      }
  
      let browser;
  
      function calcBrowser() {
        const window = getWindow();
  
        function isSafari() {
          const ua = window.navigator.userAgent.toLowerCase();
          return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
        }
  
        return {
          isSafari: isSafari(),
          isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
      }
  
      function getBrowser() {
        if (!browser) {
          browser = calcBrowser();
        }
  
        return browser;
      }
  
      function Resize(_ref) {
        let {
          swiper,
          on,
          emit
        } = _ref;
        const window = getWindow();
        let observer = null;
        let animationFrame = null;
  
        const resizeHandler = () => {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          emit('beforeResize');
          emit('resize');
        };
  
        const createObserver = () => {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          observer = new ResizeObserver(entries => {
            animationFrame = window.requestAnimationFrame(() => {
              const {
                width,
                height
              } = swiper;
              let newWidth = width;
              let newHeight = height;
              entries.forEach(_ref2 => {
                let {
                  contentBoxSize,
                  contentRect,
                  target
                } = _ref2;
                if (target && target !== swiper.el) return;
                newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
              });
  
              if (newWidth !== width || newHeight !== height) {
                resizeHandler();
              }
            });
          });
          observer.observe(swiper.el);
        };
  
        const removeObserver = () => {
          if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
          }
  
          if (observer && observer.unobserve && swiper.el) {
            observer.unobserve(swiper.el);
            observer = null;
          }
        };
  
        const orientationChangeHandler = () => {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          emit('orientationchange');
        };
  
        on('init', () => {
          if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
            createObserver();
            return;
          }
  
          window.addEventListener('resize', resizeHandler);
          window.addEventListener('orientationchange', orientationChangeHandler);
        });
        on('destroy', () => {
          removeObserver();
          window.removeEventListener('resize', resizeHandler);
          window.removeEventListener('orientationchange', orientationChangeHandler);
        });
      }
  
      function Observer(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const observers = [];
        const window = getWindow();
  
        const attach = function (target, options) {
          if (options === void 0) {
            options = {};
          }
  
          const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
          const observer = new ObserverFunc(mutations => {
            // The observerUpdate event should only be triggered
            // once despite the number of mutations.  Additional
            // triggers are redundant and are very costly
            if (mutations.length === 1) {
              emit('observerUpdate', mutations[0]);
              return;
            }
  
            const observerUpdate = function observerUpdate() {
              emit('observerUpdate', mutations[0]);
            };
  
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(observerUpdate);
            } else {
              window.setTimeout(observerUpdate, 0);
            }
          });
          observer.observe(target, {
            attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
            childList: typeof options.childList === 'undefined' ? true : options.childList,
            characterData: typeof options.characterData === 'undefined' ? true : options.characterData
          });
          observers.push(observer);
        };
  
        const init = () => {
          if (!swiper.params.observer) return;
  
          if (swiper.params.observeParents) {
            const containerParents = swiper.$el.parents();
  
            for (let i = 0; i < containerParents.length; i += 1) {
              attach(containerParents[i]);
            }
          } // Observe container
  
  
          attach(swiper.$el[0], {
            childList: swiper.params.observeSlideChildren
          }); // Observe wrapper
  
          attach(swiper.$wrapperEl[0], {
            attributes: false
          });
        };
  
        const destroy = () => {
          observers.forEach(observer => {
            observer.disconnect();
          });
          observers.splice(0, observers.length);
        };
  
        extendParams({
          observer: false,
          observeParents: false,
          observeSlideChildren: false
        });
        on('init', init);
        on('destroy', destroy);
      }
  
      /* eslint-disable no-underscore-dangle */
      var eventsEmitter = {
        on(events, handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (typeof handler !== 'function') return self;
          const method = priority ? 'unshift' : 'push';
          events.split(' ').forEach(event => {
            if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
            self.eventsListeners[event][method](handler);
          });
          return self;
        },
  
        once(events, handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (typeof handler !== 'function') return self;
  
          function onceHandler() {
            self.off(events, onceHandler);
  
            if (onceHandler.__emitterProxy) {
              delete onceHandler.__emitterProxy;
            }
  
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
  
            handler.apply(self, args);
          }
  
          onceHandler.__emitterProxy = handler;
          return self.on(events, onceHandler, priority);
        },
  
        onAny(handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (typeof handler !== 'function') return self;
          const method = priority ? 'unshift' : 'push';
  
          if (self.eventsAnyListeners.indexOf(handler) < 0) {
            self.eventsAnyListeners[method](handler);
          }
  
          return self;
        },
  
        offAny(handler) {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (!self.eventsAnyListeners) return self;
          const index = self.eventsAnyListeners.indexOf(handler);
  
          if (index >= 0) {
            self.eventsAnyListeners.splice(index, 1);
          }
  
          return self;
        },
  
        off(events, handler) {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (!self.eventsListeners) return self;
          events.split(' ').forEach(event => {
            if (typeof handler === 'undefined') {
              self.eventsListeners[event] = [];
            } else if (self.eventsListeners[event]) {
              self.eventsListeners[event].forEach((eventHandler, index) => {
                if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                  self.eventsListeners[event].splice(index, 1);
                }
              });
            }
          });
          return self;
        },
  
        emit() {
          const self = this;
          if (!self.eventsListeners || self.destroyed) return self;
          if (!self.eventsListeners) return self;
          let events;
          let data;
          let context;
  
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
  
          if (typeof args[0] === 'string' || Array.isArray(args[0])) {
            events = args[0];
            data = args.slice(1, args.length);
            context = self;
          } else {
            events = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
          }
  
          data.unshift(context);
          const eventsArray = Array.isArray(events) ? events : events.split(' ');
          eventsArray.forEach(event => {
            if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
              self.eventsAnyListeners.forEach(eventHandler => {
                eventHandler.apply(context, [event, ...data]);
              });
            }
  
            if (self.eventsListeners && self.eventsListeners[event]) {
              self.eventsListeners[event].forEach(eventHandler => {
                eventHandler.apply(context, data);
              });
            }
          });
          return self;
        }
  
      };
  
      function updateSize() {
        const swiper = this;
        let width;
        let height;
        const $el = swiper.$el;
  
        if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
          width = swiper.params.width;
        } else {
          width = $el[0].clientWidth;
        }
  
        if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
          height = swiper.params.height;
        } else {
          height = $el[0].clientHeight;
        }
  
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
          return;
        } // Subtract paddings
  
  
        width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
        height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
          width,
          height,
          size: swiper.isHorizontal() ? width : height
        });
      }
  
      function updateSlides() {
        const swiper = this;
  
        function getDirectionLabel(property) {
          if (swiper.isHorizontal()) {
            return property;
          } // prettier-ignore
  
  
          return {
            'width': 'height',
            'margin-top': 'margin-left',
            'margin-bottom ': 'margin-right',
            'margin-left': 'margin-top',
            'margin-right': 'margin-bottom',
            'padding-left': 'padding-top',
            'padding-right': 'padding-bottom',
            'marginRight': 'marginBottom'
          }[property];
        }
  
        function getDirectionPropertyValue(node, label) {
          return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
  
        const params = swiper.params;
        const {
          $wrapperEl,
          size: swiperSize,
          rtlTranslate: rtl,
          wrongRTL
        } = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
  
        if (typeof offsetBefore === 'function') {
          offsetBefore = params.slidesOffsetBefore.call(swiper);
        }
  
        let offsetAfter = params.slidesOffsetAfter;
  
        if (typeof offsetAfter === 'function') {
          offsetAfter = params.slidesOffsetAfter.call(swiper);
        }
  
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
  
        if (typeof swiperSize === 'undefined') {
          return;
        }
  
        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
          spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
        }
  
        swiper.virtualSize = -spaceBetween; // reset margins
  
        if (rtl) slides.css({
          marginLeft: '',
          marginBottom: '',
          marginTop: ''
        });else slides.css({
          marginRight: '',
          marginBottom: '',
          marginTop: ''
        }); // reset cssMode offsets
  
        if (params.centeredSlides && params.cssMode) {
          setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
          setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
        }
  
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  
        if (gridEnabled) {
          swiper.grid.initSlides(slidesLength);
        } // Calc slides
  
  
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
          return typeof params.breakpoints[key].slidesPerView !== 'undefined';
        }).length > 0;
  
        for (let i = 0; i < slidesLength; i += 1) {
          slideSize = 0;
          const slide = slides.eq(i);
  
          if (gridEnabled) {
            swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
          }
  
          if (slide.css('display') === 'none') continue; // eslint-disable-line
  
          if (params.slidesPerView === 'auto') {
            if (shouldResetSlideSize) {
              slides[i].style[getDirectionLabel('width')] = ``;
            }
  
            const slideStyles = getComputedStyle(slide[0]);
            const currentTransform = slide[0].style.transform;
            const currentWebKitTransform = slide[0].style.webkitTransform;
  
            if (currentTransform) {
              slide[0].style.transform = 'none';
            }
  
            if (currentWebKitTransform) {
              slide[0].style.webkitTransform = 'none';
            }
  
            if (params.roundLengths) {
              slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
            } else {
              // eslint-disable-next-line
              const width = getDirectionPropertyValue(slideStyles, 'width');
              const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
              const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
              const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
              const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
              const boxSizing = slideStyles.getPropertyValue('box-sizing');
  
              if (boxSizing && boxSizing === 'border-box') {
                slideSize = width + marginLeft + marginRight;
              } else {
                const {
                  clientWidth,
                  offsetWidth
                } = slide[0];
                slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
              }
            }
  
            if (currentTransform) {
              slide[0].style.transform = currentTransform;
            }
  
            if (currentWebKitTransform) {
              slide[0].style.webkitTransform = currentWebKitTransform;
            }
  
            if (params.roundLengths) slideSize = Math.floor(slideSize);
          } else {
            slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
            if (params.roundLengths) slideSize = Math.floor(slideSize);
  
            if (slides[i]) {
              slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
            }
          }
  
          if (slides[i]) {
            slides[i].swiperSlideSize = slideSize;
          }
  
          slidesSizesGrid.push(slideSize);
  
          if (params.centeredSlides) {
            slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
            if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
            if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
            if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
            if (params.roundLengths) slidePosition = Math.floor(slidePosition);
            if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
            slidesGrid.push(slidePosition);
          } else {
            if (params.roundLengths) slidePosition = Math.floor(slidePosition);
            if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
            slidesGrid.push(slidePosition);
            slidePosition = slidePosition + slideSize + spaceBetween;
          }
  
          swiper.virtualSize += slideSize + spaceBetween;
          prevSlideSize = slideSize;
          index += 1;
        }
  
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  
        if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
          $wrapperEl.css({
            width: `${swiper.virtualSize + params.spaceBetween}px`
          });
        }
  
        if (params.setWrapperSize) {
          $wrapperEl.css({
            [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
          });
        }
  
        if (gridEnabled) {
          swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        } // Remove last grid elements depending on width
  
  
        if (!params.centeredSlides) {
          const newSlidesGrid = [];
  
          for (let i = 0; i < snapGrid.length; i += 1) {
            let slidesGridItem = snapGrid[i];
            if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
  
            if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
              newSlidesGrid.push(slidesGridItem);
            }
          }
  
          snapGrid = newSlidesGrid;
  
          if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
            snapGrid.push(swiper.virtualSize - swiperSize);
          }
        }
  
        if (snapGrid.length === 0) snapGrid = [0];
  
        if (params.spaceBetween !== 0) {
          const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
          slides.filter((_, slideIndex) => {
            if (!params.cssMode) return true;
  
            if (slideIndex === slides.length - 1) {
              return false;
            }
  
            return true;
          }).css({
            [key]: `${spaceBetween}px`
          });
        }
  
        if (params.centeredSlides && params.centeredSlidesBounds) {
          let allSlidesSize = 0;
          slidesSizesGrid.forEach(slideSizeValue => {
            allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
          });
          allSlidesSize -= params.spaceBetween;
          const maxSnap = allSlidesSize - swiperSize;
          snapGrid = snapGrid.map(snap => {
            if (snap < 0) return -offsetBefore;
            if (snap > maxSnap) return maxSnap + offsetAfter;
            return snap;
          });
        }
  
        if (params.centerInsufficientSlides) {
          let allSlidesSize = 0;
          slidesSizesGrid.forEach(slideSizeValue => {
            allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
          });
          allSlidesSize -= params.spaceBetween;
  
          if (allSlidesSize < swiperSize) {
            const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
            snapGrid.forEach((snap, snapIndex) => {
              snapGrid[snapIndex] = snap - allSlidesOffset;
            });
            slidesGrid.forEach((snap, snapIndex) => {
              slidesGrid[snapIndex] = snap + allSlidesOffset;
            });
          }
        }
  
        Object.assign(swiper, {
          slides,
          snapGrid,
          slidesGrid,
          slidesSizesGrid
        });
  
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
          setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
          setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
          const addToSnapGrid = -swiper.snapGrid[0];
          const addToSlidesGrid = -swiper.slidesGrid[0];
          swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
          swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
        }
  
        if (slidesLength !== previousSlidesLength) {
          swiper.emit('slidesLengthChange');
        }
  
        if (snapGrid.length !== previousSnapGridLength) {
          if (swiper.params.watchOverflow) swiper.checkOverflow();
          swiper.emit('snapGridLengthChange');
        }
  
        if (slidesGrid.length !== previousSlidesGridLength) {
          swiper.emit('slidesGridLengthChange');
        }
  
        if (params.watchSlidesProgress) {
          swiper.updateSlidesOffset();
        }
  
        if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
          const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
          const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
  
          if (slidesLength <= params.maxBackfaceHiddenSlides) {
            if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
          } else if (hasClassBackfaceClassAdded) {
            swiper.$el.removeClass(backFaceHiddenClass);
          }
        }
      }
  
      function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
  
        if (typeof speed === 'number') {
          swiper.setTransition(speed);
        } else if (speed === true) {
          swiper.setTransition(swiper.params.speed);
        }
  
        const getSlideByIndex = index => {
          if (isVirtual) {
            return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
          }
  
          return swiper.slides.eq(index)[0];
        }; // Find slides currently in view
  
  
        if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
          if (swiper.params.centeredSlides) {
            (swiper.visibleSlides || $([])).each(slide => {
              activeSlides.push(slide);
            });
          } else {
            for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
              const index = swiper.activeIndex + i;
              if (index > swiper.slides.length && !isVirtual) break;
              activeSlides.push(getSlideByIndex(index));
            }
          }
        } else {
          activeSlides.push(getSlideByIndex(swiper.activeIndex));
        } // Find new height from highest slide in view
  
  
        for (i = 0; i < activeSlides.length; i += 1) {
          if (typeof activeSlides[i] !== 'undefined') {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
          }
        } // Update Height
  
  
        if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
      }
  
      function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
  
        for (let i = 0; i < slides.length; i += 1) {
          slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
      }
  
      function updateSlidesProgress(translate) {
        if (translate === void 0) {
          translate = this && this.translate || 0;
        }
  
        const swiper = this;
        const params = swiper.params;
        const {
          slides,
          rtlTranslate: rtl,
          snapGrid
        } = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate; // Visible Slides
  
        slides.removeClass(params.slideVisibleClass);
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
  
        for (let i = 0; i < slides.length; i += 1) {
          const slide = slides[i];
          let slideOffset = slide.swiperSlideOffset;
  
          if (params.cssMode && params.centeredSlides) {
            slideOffset -= slides[0].swiperSlideOffset;
          }
  
          const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
          const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
          const slideBefore = -(offsetCenter - slideOffset);
          const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
          const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
  
          if (isVisible) {
            swiper.visibleSlides.push(slide);
            swiper.visibleSlidesIndexes.push(i);
            slides.eq(i).addClass(params.slideVisibleClass);
          }
  
          slide.progress = rtl ? -slideProgress : slideProgress;
          slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
  
        swiper.visibleSlides = $(swiper.visibleSlides);
      }
  
      function updateProgress(translate) {
        const swiper = this;
  
        if (typeof translate === 'undefined') {
          const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line
  
          translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
  
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {
          progress,
          isBeginning,
          isEnd
        } = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
  
        if (translatesDiff === 0) {
          progress = 0;
          isBeginning = true;
          isEnd = true;
        } else {
          progress = (translate - swiper.minTranslate()) / translatesDiff;
          isBeginning = progress <= 0;
          isEnd = progress >= 1;
        }
  
        Object.assign(swiper, {
          progress,
          isBeginning,
          isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  
        if (isBeginning && !wasBeginning) {
          swiper.emit('reachBeginning toEdge');
        }
  
        if (isEnd && !wasEnd) {
          swiper.emit('reachEnd toEdge');
        }
  
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
          swiper.emit('fromEdge');
        }
  
        swiper.emit('progress', progress);
      }
  
      function updateSlidesClasses() {
        const swiper = this;
        const {
          slides,
          params,
          $wrapperEl,
          activeIndex,
          realIndex
        } = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
        let activeSlide;
  
        if (isVirtual) {
          activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
        } else {
          activeSlide = slides.eq(activeIndex);
        } // Active classes
  
  
        activeSlide.addClass(params.slideActiveClass);
  
        if (params.loop) {
          // Duplicate to all looped slides
          if (activeSlide.hasClass(params.slideDuplicateClass)) {
            $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
          } else {
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
          }
        } // Next Slide
  
  
        let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
  
        if (params.loop && nextSlide.length === 0) {
          nextSlide = slides.eq(0);
          nextSlide.addClass(params.slideNextClass);
        } // Prev Slide
  
  
        let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
  
        if (params.loop && prevSlide.length === 0) {
          prevSlide = slides.eq(-1);
          prevSlide.addClass(params.slidePrevClass);
        }
  
        if (params.loop) {
          // Duplicate to all looped slides
          if (nextSlide.hasClass(params.slideDuplicateClass)) {
            $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
          } else {
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
          }
  
          if (prevSlide.hasClass(params.slideDuplicateClass)) {
            $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
          } else {
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
          }
        }
  
        swiper.emitSlidesClasses();
      }
  
      function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {
          slidesGrid,
          snapGrid,
          params,
          activeIndex: previousIndex,
          realIndex: previousRealIndex,
          snapIndex: previousSnapIndex
        } = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
  
        if (typeof activeIndex === 'undefined') {
          for (let i = 0; i < slidesGrid.length; i += 1) {
            if (typeof slidesGrid[i + 1] !== 'undefined') {
              if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
                activeIndex = i;
              } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
                activeIndex = i + 1;
              }
            } else if (translate >= slidesGrid[i]) {
              activeIndex = i;
            }
          } // Normalize slideIndex
  
  
          if (params.normalizeSlideIndex) {
            if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
          }
        }
  
        if (snapGrid.indexOf(translate) >= 0) {
          snapIndex = snapGrid.indexOf(translate);
        } else {
          const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
          snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
  
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  
        if (activeIndex === previousIndex) {
          if (snapIndex !== previousSnapIndex) {
            swiper.snapIndex = snapIndex;
            swiper.emit('snapIndexChange');
          }
  
          return;
        } // Get real index
  
  
        const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
        Object.assign(swiper, {
          snapIndex,
          realIndex,
          previousIndex,
          activeIndex
        });
        swiper.emit('activeIndexChange');
        swiper.emit('snapIndexChange');
  
        if (previousRealIndex !== realIndex) {
          swiper.emit('realIndexChange');
        }
  
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
          swiper.emit('slideChange');
        }
      }
  
      function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = $(e).closest(`.${params.slideClass}`)[0];
        let slideFound = false;
        let slideIndex;
  
        if (slide) {
          for (let i = 0; i < swiper.slides.length; i += 1) {
            if (swiper.slides[i] === slide) {
              slideFound = true;
              slideIndex = i;
              break;
            }
          }
        }
  
        if (slide && slideFound) {
          swiper.clickedSlide = slide;
  
          if (swiper.virtual && swiper.params.virtual.enabled) {
            swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
          } else {
            swiper.clickedIndex = slideIndex;
          }
        } else {
          swiper.clickedSlide = undefined;
          swiper.clickedIndex = undefined;
          return;
        }
  
        if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
          swiper.slideToClickedSlide();
        }
      }
  
      var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
      };
  
      function getSwiperTranslate(axis) {
        if (axis === void 0) {
          axis = this.isHorizontal() ? 'x' : 'y';
        }
  
        const swiper = this;
        const {
          params,
          rtlTranslate: rtl,
          translate,
          $wrapperEl
        } = swiper;
  
        if (params.virtualTranslate) {
          return rtl ? -translate : translate;
        }
  
        if (params.cssMode) {
          return translate;
        }
  
        let currentTranslate = getTranslate($wrapperEl[0], axis);
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
      }
  
      function setTranslate(translate, byController) {
        const swiper = this;
        const {
          rtlTranslate: rtl,
          params,
          $wrapperEl,
          wrapperEl,
          progress
        } = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
  
        if (swiper.isHorizontal()) {
          x = rtl ? -translate : translate;
        } else {
          y = translate;
        }
  
        if (params.roundLengths) {
          x = Math.floor(x);
          y = Math.floor(y);
        }
  
        if (params.cssMode) {
          wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
        } else if (!params.virtualTranslate) {
          $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
        }
  
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress
  
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  
        if (translatesDiff === 0) {
          newProgress = 0;
        } else {
          newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        }
  
        if (newProgress !== progress) {
          swiper.updateProgress(translate);
        }
  
        swiper.emit('setTranslate', swiper.translate, byController);
      }
  
      function minTranslate() {
        return -this.snapGrid[0];
      }
  
      function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
      }
  
      function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) {
          translate = 0;
        }
  
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        if (translateBounds === void 0) {
          translateBounds = true;
        }
  
        const swiper = this;
        const {
          params,
          wrapperEl
        } = swiper;
  
        if (swiper.animating && params.preventInteractionOnTransition) {
          return false;
        }
  
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress
  
        swiper.updateProgress(newTranslate);
  
        if (params.cssMode) {
          const isH = swiper.isHorizontal();
  
          if (speed === 0) {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
          } else {
            if (!swiper.support.smoothScroll) {
              animateCSSModeScroll({
                swiper,
                targetPosition: -newTranslate,
                side: isH ? 'left' : 'top'
              });
              return true;
            }
  
            wrapperEl.scrollTo({
              [isH ? 'left' : 'top']: -newTranslate,
              behavior: 'smooth'
            });
          }
  
          return true;
        }
  
        if (speed === 0) {
          swiper.setTransition(0);
          swiper.setTranslate(newTranslate);
  
          if (runCallbacks) {
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.emit('transitionEnd');
          }
        } else {
          swiper.setTransition(speed);
          swiper.setTranslate(newTranslate);
  
          if (runCallbacks) {
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.emit('transitionStart');
          }
  
          if (!swiper.animating) {
            swiper.animating = true;
  
            if (!swiper.onTranslateToWrapperTransitionEnd) {
              swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
                swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
                swiper.onTranslateToWrapperTransitionEnd = null;
                delete swiper.onTranslateToWrapperTransitionEnd;
  
                if (runCallbacks) {
                  swiper.emit('transitionEnd');
                }
              };
            }
  
            swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
            swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
          }
        }
  
        return true;
      }
  
      var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
      };
  
      function setTransition(duration, byController) {
        const swiper = this;
  
        if (!swiper.params.cssMode) {
          swiper.$wrapperEl.transition(duration);
        }
  
        swiper.emit('setTransition', duration, byController);
      }
  
      function transitionEmit(_ref) {
        let {
          swiper,
          runCallbacks,
          direction,
          step
        } = _ref;
        const {
          activeIndex,
          previousIndex
        } = swiper;
        let dir = direction;
  
        if (!dir) {
          if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
        }
  
        swiper.emit(`transition${step}`);
  
        if (runCallbacks && activeIndex !== previousIndex) {
          if (dir === 'reset') {
            swiper.emit(`slideResetTransition${step}`);
            return;
          }
  
          swiper.emit(`slideChangeTransition${step}`);
  
          if (dir === 'next') {
            swiper.emit(`slideNextTransition${step}`);
          } else {
            swiper.emit(`slidePrevTransition${step}`);
          }
        }
      }
  
      function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        const {
          params
        } = swiper;
        if (params.cssMode) return;
  
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
  
        transitionEmit({
          swiper,
          runCallbacks,
          direction,
          step: 'Start'
        });
      }
  
      function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        const {
          params
        } = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
          swiper,
          runCallbacks,
          direction,
          step: 'End'
        });
      }
  
      var transition = {
        setTransition,
        transitionStart,
        transitionEnd
      };
  
      function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) {
          index = 0;
        }
  
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        if (typeof index !== 'number' && typeof index !== 'string') {
          throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
        }
  
        if (typeof index === 'string') {
          /**
           * The `index` argument converted from `string` to `number`.
           * @type {number}
           */
          const indexAsNumber = parseInt(index, 10);
          /**
           * Determines whether the `index` argument is a valid `number`
           * after being converted from the `string` type.
           * @type {boolean}
           */
  
          const isValidNumber = isFinite(indexAsNumber);
  
          if (!isValidNumber) {
            throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
          } // Knowing that the converted `index` is a valid number,
          // we can update the original argument's value.
  
  
          index = indexAsNumber;
        }
  
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {
          params,
          snapGrid,
          slidesGrid,
          previousIndex,
          activeIndex,
          rtlTranslate: rtl,
          wrapperEl,
          enabled
        } = swiper;
  
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
          return false;
        }
  
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  
        if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
          swiper.emit('beforeSlideChangeStart');
        }
  
        const translate = -snapGrid[snapIndex]; // Update progress
  
        swiper.updateProgress(translate); // Normalize slideIndex
  
        if (params.normalizeSlideIndex) {
          for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
  
            if (typeof slidesGrid[i + 1] !== 'undefined') {
              if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
                slideIndex = i;
              } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
                slideIndex = i + 1;
              }
            } else if (normalizedTranslate >= normalizedGrid) {
              slideIndex = i;
            }
          }
        } // Directions locks
  
  
        if (swiper.initialized && slideIndex !== activeIndex) {
          if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
            return false;
          }
  
          if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
            if ((activeIndex || 0) !== slideIndex) return false;
          }
        }
  
        let direction;
        if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index
  
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
          swiper.updateActiveIndex(slideIndex); // Update Height
  
          if (params.autoHeight) {
            swiper.updateAutoHeight();
          }
  
          swiper.updateSlidesClasses();
  
          if (params.effect !== 'slide') {
            swiper.setTranslate(translate);
          }
  
          if (direction !== 'reset') {
            swiper.transitionStart(runCallbacks, direction);
            swiper.transitionEnd(runCallbacks, direction);
          }
  
          return false;
        }
  
        if (params.cssMode) {
          const isH = swiper.isHorizontal();
          const t = rtl ? translate : -translate;
  
          if (speed === 0) {
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  
            if (isVirtual) {
              swiper.wrapperEl.style.scrollSnapType = 'none';
              swiper._immediateVirtual = true;
            }
  
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
  
            if (isVirtual) {
              requestAnimationFrame(() => {
                swiper.wrapperEl.style.scrollSnapType = '';
                swiper._swiperImmediateVirtual = false;
              });
            }
          } else {
            if (!swiper.support.smoothScroll) {
              animateCSSModeScroll({
                swiper,
                targetPosition: t,
                side: isH ? 'left' : 'top'
              });
              return true;
            }
  
            wrapperEl.scrollTo({
              [isH ? 'left' : 'top']: t,
              behavior: 'smooth'
            });
          }
  
          return true;
        }
  
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.transitionStart(runCallbacks, direction);
  
        if (speed === 0) {
          swiper.transitionEnd(runCallbacks, direction);
        } else if (!swiper.animating) {
          swiper.animating = true;
  
          if (!swiper.onSlideToWrapperTransitionEnd) {
            swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) return;
              if (e.target !== this) return;
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
              swiper.onSlideToWrapperTransitionEnd = null;
              delete swiper.onSlideToWrapperTransitionEnd;
              swiper.transitionEnd(runCallbacks, direction);
            };
          }
  
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
        }
  
        return true;
      }
  
      function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) {
          index = 0;
        }
  
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        let newIndex = index;
  
        if (swiper.params.loop) {
          newIndex += swiper.loopedSlides;
        }
  
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
      }
  
      /* eslint no-unused-vars: "off" */
      function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        const {
          animating,
          enabled,
          params
        } = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
  
        if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
          perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
        }
  
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  
        if (params.loop) {
          if (animating && params.loopPreventsSlide) return false;
          swiper.loopFix(); // eslint-disable-next-line
  
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
  
        if (params.rewind && swiper.isEnd) {
          return swiper.slideTo(0, speed, runCallbacks, internal);
        }
  
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      }
  
      /* eslint no-unused-vars: "off" */
      function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        const {
          params,
          animating,
          snapGrid,
          slidesGrid,
          rtlTranslate,
          enabled
        } = swiper;
        if (!enabled) return swiper;
  
        if (params.loop) {
          if (animating && params.loopPreventsSlide) return false;
          swiper.loopFix(); // eslint-disable-next-line
  
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
  
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
  
        function normalize(val) {
          if (val < 0) return -Math.floor(Math.abs(val));
          return Math.floor(val);
        }
  
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map(val => normalize(val));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  
        if (typeof prevSnap === 'undefined' && params.cssMode) {
          let prevSnapIndex;
          snapGrid.forEach((snap, snapIndex) => {
            if (normalizedTranslate >= snap) {
              // prevSnap = snap;
              prevSnapIndex = snapIndex;
            }
          });
  
          if (typeof prevSnapIndex !== 'undefined') {
            prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
          }
        }
  
        let prevIndex = 0;
  
        if (typeof prevSnap !== 'undefined') {
          prevIndex = slidesGrid.indexOf(prevSnap);
          if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
  
          if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
            prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
            prevIndex = Math.max(prevIndex, 0);
          }
        }
  
        if (params.rewind && swiper.isBeginning) {
          const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
          return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
  
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
      }
  
      /* eslint no-unused-vars: "off" */
      function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
      }
  
      /* eslint no-unused-vars: "off" */
      function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (speed === void 0) {
          speed = this.params.speed;
        }
  
        if (runCallbacks === void 0) {
          runCallbacks = true;
        }
  
        if (threshold === void 0) {
          threshold = 0.5;
        }
  
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  
        if (translate >= swiper.snapGrid[snapIndex]) {
          // The current translate is on or after the current snap index, so the choice
          // is between the current index and the one after it.
          const currentSnap = swiper.snapGrid[snapIndex];
          const nextSnap = swiper.snapGrid[snapIndex + 1];
  
          if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
            index += swiper.params.slidesPerGroup;
          }
        } else {
          // The current translate is before the current snap index, so the choice
          // is between the current index and the one before it.
          const prevSnap = swiper.snapGrid[snapIndex - 1];
          const currentSnap = swiper.snapGrid[snapIndex];
  
          if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
            index -= swiper.params.slidesPerGroup;
          }
        }
  
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
      }
  
      function slideToClickedSlide() {
        const swiper = this;
        const {
          params,
          $wrapperEl
        } = swiper;
        const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
  
        if (params.loop) {
          if (swiper.animating) return;
          realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
  
          if (params.centeredSlides) {
            if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
              swiper.loopFix();
              slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
              nextTick(() => {
                swiper.slideTo(slideToIndex);
              });
            } else {
              swiper.slideTo(slideToIndex);
            }
          } else if (slideToIndex > swiper.slides.length - slidesPerView) {
            swiper.loopFix();
            slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
            nextTick(() => {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else {
          swiper.slideTo(slideToIndex);
        }
      }
  
      var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
      };
  
      function loopCreate() {
        const swiper = this;
        const document = getDocument();
        const {
          params,
          $wrapperEl
        } = swiper; // Remove duplicated slides
  
        const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
        $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
        let slides = $selector.children(`.${params.slideClass}`);
  
        if (params.loopFillGroupWithBlank) {
          const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
  
          if (blankSlidesNum !== params.slidesPerGroup) {
            for (let i = 0; i < blankSlidesNum; i += 1) {
              const blankNode = $(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
              $selector.append(blankNode);
            }
  
            slides = $selector.children(`.${params.slideClass}`);
          }
        }
  
        if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
        swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
        swiper.loopedSlides += params.loopAdditionalSlides;
  
        if (swiper.loopedSlides > slides.length) {
          swiper.loopedSlides = slides.length;
        }
  
        const prependSlides = [];
        const appendSlides = [];
        slides.each((el, index) => {
          const slide = $(el);
  
          if (index < swiper.loopedSlides) {
            appendSlides.push(el);
          }
  
          if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
            prependSlides.push(el);
          }
  
          slide.attr('data-swiper-slide-index', index);
        });
  
        for (let i = 0; i < appendSlides.length; i += 1) {
          $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
  
        for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
          $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
      }
  
      function loopFix() {
        const swiper = this;
        swiper.emit('beforeLoopFix');
        const {
          activeIndex,
          slides,
          loopedSlides,
          allowSlidePrev,
          allowSlideNext,
          snapGrid,
          rtlTranslate: rtl
        } = swiper;
        let newIndex;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        const snapTranslate = -snapGrid[activeIndex];
        const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding
  
        if (activeIndex < loopedSlides) {
          newIndex = slides.length - loopedSlides * 3 + activeIndex;
          newIndex += loopedSlides;
          const slideChanged = swiper.slideTo(newIndex, 0, false, true);
  
          if (slideChanged && diff !== 0) {
            swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
          }
        } else if (activeIndex >= slides.length - loopedSlides) {
          // Fix For Positive Oversliding
          newIndex = -slides.length + activeIndex + loopedSlides;
          newIndex += loopedSlides;
          const slideChanged = swiper.slideTo(newIndex, 0, false, true);
  
          if (slideChanged && diff !== 0) {
            swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
          }
        }
  
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        swiper.emit('loopFix');
      }
  
      function loopDestroy() {
        const swiper = this;
        const {
          $wrapperEl,
          params,
          slides
        } = swiper;
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
        slides.removeAttr('data-swiper-slide-index');
      }
  
      var loop = {
        loopCreate,
        loopFix,
        loopDestroy
      };
  
      function setGrabCursor(moving) {
        const swiper = this;
        if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
        el.style.cursor = 'move';
        el.style.cursor = moving ? 'grabbing' : 'grab';
      }
  
      function unsetGrabCursor() {
        const swiper = this;
  
        if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
          return;
        }
  
        swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
      }
  
      var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
      };
  
      function closestElement(selector, base) {
        if (base === void 0) {
          base = this;
        }
  
        function __closestFrom(el) {
          if (!el || el === getDocument() || el === getWindow()) return null;
          if (el.assignedSlot) el = el.assignedSlot;
          const found = el.closest(selector);
  
          if (!found && !el.getRootNode) {
            return null;
          }
  
          return found || __closestFrom(el.getRootNode().host);
        }
  
        return __closestFrom(base);
      }
  
      function onTouchStart(event) {
        const swiper = this;
        const document = getDocument();
        const window = getWindow();
        const data = swiper.touchEventsData;
        const {
          params,
          touches,
          enabled
        } = swiper;
        if (!enabled) return;
  
        if (swiper.animating && params.preventInteractionOnTransition) {
          return;
        }
  
        if (!swiper.animating && params.cssMode && params.loop) {
          swiper.loopFix();
        }
  
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let $targetEl = $(e.target);
  
        if (params.touchEventsTarget === 'wrapper') {
          if (!$targetEl.closest(swiper.wrapperEl).length) return;
        }
  
        data.isTouchEvent = e.type === 'touchstart';
        if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
        if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return; // change target el for shadow root component
  
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  
        if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) {
          $targetEl = $(event.path[0]);
        }
  
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element
  
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
          swiper.allowClick = true;
          return;
        }
  
        if (params.swipeHandler) {
          if (!$targetEl.closest(params.swipeHandler)[0]) return;
        }
  
        touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore
  
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
          if (edgeSwipeDetection === 'prevent') {
            event.preventDefault();
          } else {
            return;
          }
        }
  
        Object.assign(data, {
          isTouched: true,
          isMoved: false,
          allowTouchCallbacks: true,
          isScrolling: undefined,
          startMoving: undefined
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = undefined;
        if (params.threshold > 0) data.allowThresholdMove = false;
  
        if (e.type !== 'touchstart') {
          let preventDefault = true;
  
          if ($targetEl.is(data.focusableElements)) {
            preventDefault = false;
  
            if ($targetEl[0].nodeName === 'SELECT') {
              data.isTouched = false;
            }
          }
  
          if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
            document.activeElement.blur();
          }
  
          const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  
          if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
            e.preventDefault();
          }
        }
  
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
          swiper.freeMode.onTouchStart();
        }
  
        swiper.emit('touchStart', e);
      }
  
      function onTouchMove(event) {
        const document = getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {
          params,
          touches,
          rtlTranslate: rtl,
          enabled
        } = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
  
        if (!data.isTouched) {
          if (data.startMoving && data.isScrolling) {
            swiper.emit('touchMoveOpposite', e);
          }
  
          return;
        }
  
        if (data.isTouchEvent && e.type !== 'touchmove') return;
        const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
        const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
        const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;
  
        if (e.preventedByNestedSwiper) {
          touches.startX = pageX;
          touches.startY = pageY;
          return;
        }
  
        if (!swiper.allowTouchMove) {
          if (!$(e.target).is(data.focusableElements)) {
            swiper.allowClick = false;
          }
  
          if (data.isTouched) {
            Object.assign(touches, {
              startX: pageX,
              startY: pageY,
              currentX: pageX,
              currentY: pageY
            });
            data.touchStartTime = now();
          }
  
          return;
        }
  
        if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
          if (swiper.isVertical()) {
            // Vertical
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
              data.isTouched = false;
              data.isMoved = false;
              return;
            }
          } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
            return;
          }
        }
  
        if (data.isTouchEvent && document.activeElement) {
          if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
          }
        }
  
        if (data.allowTouchCallbacks) {
          swiper.emit('touchMove', e);
        }
  
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  
        if (typeof data.isScrolling === 'undefined') {
          let touchAngle;
  
          if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
            data.isScrolling = false;
          } else {
            // eslint-disable-next-line
            if (diffX * diffX + diffY * diffY >= 25) {
              touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
              data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
          }
        }
  
        if (data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }
  
        if (typeof data.startMoving === 'undefined') {
          if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
            data.startMoving = true;
          }
        }
  
        if (data.isScrolling) {
          data.isTouched = false;
          return;
        }
  
        if (!data.startMoving) {
          return;
        }
  
        swiper.allowClick = false;
  
        if (!params.cssMode && e.cancelable) {
          e.preventDefault();
        }
  
        if (params.touchMoveStopPropagation && !params.nested) {
          e.stopPropagation();
        }
  
        if (!data.isMoved) {
          if (params.loop && !params.cssMode) {
            swiper.loopFix();
          }
  
          data.startTranslate = swiper.getTranslate();
          swiper.setTransition(0);
  
          if (swiper.animating) {
            swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
          }
  
          data.allowMomentumBounce = false; // Grab Cursor
  
          if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
            swiper.setGrabCursor(true);
          }
  
          swiper.emit('sliderFirstMove', e);
        }
  
        swiper.emit('sliderMove', e);
        data.isMoved = true;
        let diff = swiper.isHorizontal() ? diffX : diffY;
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) diff = -diff;
        swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
  
        if (params.touchReleaseOnEdges) {
          resistanceRatio = 0;
        }
  
        if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
          disableParentSwiper = false;
          if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
          disableParentSwiper = false;
          if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
  
        if (disableParentSwiper) {
          e.preventedByNestedSwiper = true;
        } // Directions locks
  
  
        if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
          data.currentTranslate = data.startTranslate;
        }
  
        if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
          data.currentTranslate = data.startTranslate;
        }
  
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
          data.currentTranslate = data.startTranslate;
        } // Threshold
  
  
        if (params.threshold > 0) {
          if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
              data.allowThresholdMove = true;
              touches.startX = touches.currentX;
              touches.startY = touches.currentY;
              data.currentTranslate = data.startTranslate;
              touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
              return;
            }
          } else {
            data.currentTranslate = data.startTranslate;
            return;
          }
        }
  
        if (!params.followFinger || params.cssMode) return; // Update active index in free mode
  
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
  
        if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
          swiper.freeMode.onTouchMove();
        } // Update progress
  
  
        swiper.updateProgress(data.currentTranslate); // Update translate
  
        swiper.setTranslate(data.currentTranslate);
      }
  
      function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const {
          params,
          touches,
          rtlTranslate: rtl,
          slidesGrid,
          enabled
        } = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
  
        if (data.allowTouchCallbacks) {
          swiper.emit('touchEnd', e);
        }
  
        data.allowTouchCallbacks = false;
  
        if (!data.isTouched) {
          if (data.isMoved && params.grabCursor) {
            swiper.setGrabCursor(false);
          }
  
          data.isMoved = false;
          data.startMoving = false;
          return;
        } // Return Grab Cursor
  
  
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(false);
        } // Time diff
  
  
        const touchEndTime = now();
        const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click
  
        if (swiper.allowClick) {
          const pathTree = e.path || e.composedPath && e.composedPath();
          swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
          swiper.emit('tap click', e);
  
          if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
            swiper.emit('doubleTap doubleClick', e);
          }
        }
  
        data.lastClickTime = now();
        nextTick(() => {
          if (!swiper.destroyed) swiper.allowClick = true;
        });
  
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
          data.isTouched = false;
          data.isMoved = false;
          data.startMoving = false;
          return;
        }
  
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
  
        if (params.followFinger) {
          currentPos = rtl ? swiper.translate : -swiper.translate;
        } else {
          currentPos = -data.currentTranslate;
        }
  
        if (params.cssMode) {
          return;
        }
  
        if (swiper.params.freeMode && params.freeMode.enabled) {
          swiper.freeMode.onTouchEnd({
            currentPos
          });
          return;
        } // Find current slide
  
  
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
  
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
          const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  
          if (typeof slidesGrid[i + increment] !== 'undefined') {
            if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
              stopIndex = i;
              groupSize = slidesGrid[i + increment] - slidesGrid[i];
            }
          } else if (currentPos >= slidesGrid[i]) {
            stopIndex = i;
            groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
          }
        }
  
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
  
        if (params.rewind) {
          if (swiper.isBeginning) {
            rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
          } else if (swiper.isEnd) {
            rewindFirstIndex = 0;
          }
        } // Find current slide size
  
  
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  
        if (timeDiff > params.longSwipesMs) {
          // Long touches
          if (!params.longSwipes) {
            swiper.slideTo(swiper.activeIndex);
            return;
          }
  
          if (swiper.swipeDirection === 'next') {
            if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
          }
  
          if (swiper.swipeDirection === 'prev') {
            if (ratio > 1 - params.longSwipesRatio) {
              swiper.slideTo(stopIndex + increment);
            } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
              swiper.slideTo(rewindLastIndex);
            } else {
              swiper.slideTo(stopIndex);
            }
          }
        } else {
          // Short swipes
          if (!params.shortSwipes) {
            swiper.slideTo(swiper.activeIndex);
            return;
          }
  
          const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
  
          if (!isNavButtonTarget) {
            if (swiper.swipeDirection === 'next') {
              swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
            }
  
            if (swiper.swipeDirection === 'prev') {
              swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            }
          } else if (e.target === swiper.navigation.nextEl) {
            swiper.slideTo(stopIndex + increment);
          } else {
            swiper.slideTo(stopIndex);
          }
        }
      }
  
      function onResize() {
        const swiper = this;
        const {
          params,
          el
        } = swiper;
        if (el && el.offsetWidth === 0) return; // Breakpoints
  
        if (params.breakpoints) {
          swiper.setBreakpoint();
        } // Save locks
  
  
        const {
          allowSlideNext,
          allowSlidePrev,
          snapGrid
        } = swiper; // Disable locks on resize
  
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
  
        if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
          swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
  
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.run();
        } // Return locks after resize
  
  
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
  
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }
      }
  
      function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
  
        if (!swiper.allowClick) {
          if (swiper.params.preventClicks) e.preventDefault();
  
          if (swiper.params.preventClicksPropagation && swiper.animating) {
            e.stopPropagation();
            e.stopImmediatePropagation();
          }
        }
      }
  
      function onScroll() {
        const swiper = this;
        const {
          wrapperEl,
          rtlTranslate,
          enabled
        } = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
  
        if (swiper.isHorizontal()) {
          swiper.translate = -wrapperEl.scrollLeft;
        } else {
          swiper.translate = -wrapperEl.scrollTop;
        } // eslint-disable-next-line
  
  
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  
        if (translatesDiff === 0) {
          newProgress = 0;
        } else {
          newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        }
  
        if (newProgress !== swiper.progress) {
          swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        }
  
        swiper.emit('setTranslate', swiper.translate, false);
      }
  
      let dummyEventAttached = false;
  
      function dummyEventListener() {}
  
      const events = (swiper, method) => {
        const document = getDocument();
        const {
          params,
          touchEvents,
          el,
          wrapperEl,
          device,
          support
        } = swiper;
        const capture = !!params.nested;
        const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
        const swiperMethod = method; // Touch Events
  
        if (!support.touch) {
          el[domMethod](touchEvents.start, swiper.onTouchStart, false);
          document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
          document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
        } else {
          const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
          el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
            passive: false,
            capture
          } : capture);
          el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
  
          if (touchEvents.cancel) {
            el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
          }
        } // Prevent Links Clicks
  
  
        if (params.preventClicks || params.preventClicksPropagation) {
          el[domMethod]('click', swiper.onClick, true);
        }
  
        if (params.cssMode) {
          wrapperEl[domMethod]('scroll', swiper.onScroll);
        } // Resize handler
  
  
        if (params.updateOnWindowResize) {
          swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
        } else {
          swiper[swiperMethod]('observerUpdate', onResize, true);
        }
      };
  
      function attachEvents() {
        const swiper = this;
        const document = getDocument();
        const {
          params,
          support
        } = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
  
        if (params.cssMode) {
          swiper.onScroll = onScroll.bind(swiper);
        }
  
        swiper.onClick = onClick.bind(swiper);
  
        if (support.touch && !dummyEventAttached) {
          document.addEventListener('touchstart', dummyEventListener);
          dummyEventAttached = true;
        }
  
        events(swiper, 'on');
      }
  
      function detachEvents() {
        const swiper = this;
        events(swiper, 'off');
      }
  
      var events$1 = {
        attachEvents,
        detachEvents
      };
  
      const isGridEnabled = (swiper, params) => {
        return swiper.grid && params.grid && params.grid.rows > 1;
      };
  
      function setBreakpoint() {
        const swiper = this;
        const {
          activeIndex,
          initialized,
          loopedSlides = 0,
          params,
          $el
        } = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters
  
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
  
        if (wasMultiRow && !isMultiRow) {
          $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
          swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
          $el.addClass(`${params.containerModifierClass}grid`);
  
          if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
            $el.addClass(`${params.containerModifierClass}grid-column`);
          }
  
          swiper.emitContainerClasses();
        }
  
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  
        if (directionChanged && initialized) {
          swiper.changeDirection();
        }
  
        extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
          allowTouchMove: swiper.params.allowTouchMove,
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev
        });
  
        if (wasEnabled && !isEnabled) {
          swiper.disable();
        } else if (!wasEnabled && isEnabled) {
          swiper.enable();
        }
  
        swiper.currentBreakpoint = breakpoint;
        swiper.emit('_beforeBreakpoint', breakpointParams);
  
        if (needsReLoop && initialized) {
          swiper.loopDestroy();
          swiper.loopCreate();
          swiper.updateSlides();
          swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
        }
  
        swiper.emit('breakpoint', breakpointParams);
      }
  
      function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) {
          base = 'window';
        }
  
        if (!breakpoints || base === 'container' && !containerEl) return undefined;
        let breakpoint = false;
        const window = getWindow();
        const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map(point => {
          if (typeof point === 'string' && point.indexOf('@') === 0) {
            const minRatio = parseFloat(point.substr(1));
            const value = currentHeight * minRatio;
            return {
              value,
              point
            };
          }
  
          return {
            value: point,
            point
          };
        });
        points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  
        for (let i = 0; i < points.length; i += 1) {
          const {
            point,
            value
          } = points[i];
  
          if (base === 'window') {
            if (window.matchMedia(`(min-width: ${value}px)`).matches) {
              breakpoint = point;
            }
          } else if (value <= containerEl.clientWidth) {
            breakpoint = point;
          }
        }
  
        return breakpoint || 'max';
      }
  
      var breakpoints = {
        setBreakpoint,
        getBreakpoint
      };
  
      function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach(item => {
          if (typeof item === 'object') {
            Object.keys(item).forEach(classNames => {
              if (item[classNames]) {
                resultClasses.push(prefix + classNames);
              }
            });
          } else if (typeof item === 'string') {
            resultClasses.push(prefix + item);
          }
        });
        return resultClasses;
      }
  
      function addClasses() {
        const swiper = this;
        const {
          classNames,
          params,
          rtl,
          $el,
          device,
          support
        } = swiper; // prettier-ignore
  
        const suffixes = prepareClasses(['initialized', params.direction, {
          'pointer-events': !support.touch
        }, {
          'free-mode': swiper.params.freeMode && params.freeMode.enabled
        }, {
          'autoheight': params.autoHeight
        }, {
          'rtl': rtl
        }, {
          'grid': params.grid && params.grid.rows > 1
        }, {
          'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
        }, {
          'android': device.android
        }, {
          'ios': device.ios
        }, {
          'css-mode': params.cssMode
        }, {
          'centered': params.cssMode && params.centeredSlides
        }, {
          'watch-progress': params.watchSlidesProgress
        }], params.containerModifierClass);
        classNames.push(...suffixes);
        $el.addClass([...classNames].join(' '));
        swiper.emitContainerClasses();
      }
  
      function removeClasses() {
        const swiper = this;
        const {
          $el,
          classNames
        } = swiper;
        $el.removeClass(classNames.join(' '));
        swiper.emitContainerClasses();
      }
  
      var classes = {
        addClasses,
        removeClasses
      };
  
      function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
        const window = getWindow();
        let image;
  
        function onReady() {
          if (callback) callback();
        }
  
        const isPicture = $(imageEl).parent('picture')[0];
  
        if (!isPicture && (!imageEl.complete || !checkForComplete)) {
          if (src) {
            image = new window.Image();
            image.onload = onReady;
            image.onerror = onReady;
  
            if (sizes) {
              image.sizes = sizes;
            }
  
            if (srcset) {
              image.srcset = srcset;
            }
  
            if (src) {
              image.src = src;
            }
          } else {
            onReady();
          }
        } else {
          // image already loaded...
          onReady();
        }
      }
  
      function preloadImages() {
        const swiper = this;
        swiper.imagesToLoad = swiper.$el.find('img');
  
        function onReady() {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
          if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;
  
          if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
            if (swiper.params.updateOnImagesReady) swiper.update();
            swiper.emit('imagesReady');
          }
        }
  
        for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
          const imageEl = swiper.imagesToLoad[i];
          swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
        }
      }
  
      var images = {
        loadImage,
        preloadImages
      };
  
      function checkOverflow() {
        const swiper = this;
        const {
          isLocked: wasLocked,
          params
        } = swiper;
        const {
          slidesOffsetBefore
        } = params;
  
        if (slidesOffsetBefore) {
          const lastSlideIndex = swiper.slides.length - 1;
          const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
          swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else {
          swiper.isLocked = swiper.snapGrid.length === 1;
        }
  
        if (params.allowSlideNext === true) {
          swiper.allowSlideNext = !swiper.isLocked;
        }
  
        if (params.allowSlidePrev === true) {
          swiper.allowSlidePrev = !swiper.isLocked;
        }
  
        if (wasLocked && wasLocked !== swiper.isLocked) {
          swiper.isEnd = false;
        }
  
        if (wasLocked !== swiper.isLocked) {
          swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
        }
      }
  
      var checkOverflow$1 = {
        checkOverflow
      };
  
      var defaults = {
        init: true,
        direction: 'horizontal',
        touchEventsTarget: 'wrapper',
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: 'input, select, option, textarea, button, video, label',
        // Overrides
        width: null,
        height: null,
        //
        preventInteractionOnTransition: false,
        // ssr
        userAgent: null,
        url: null,
        // To support iOS's swipe-to-go-back gesture (when being used in-app).
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        // Autoheight
        autoHeight: false,
        // Set wrapper width
        setWrapperSize: false,
        // Virtual Translate
        virtualTranslate: false,
        // Effects
        effect: 'slide',
        // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
        // Breakpoints
        breakpoints: undefined,
        breakpointsBase: 'window',
        // Slides grid
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        // in px
        slidesOffsetAfter: 0,
        // in px
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        // Disable swiper and hide navigation when container not overflow
        watchOverflow: true,
        // Round length
        roundLengths: false,
        // Touches
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 0,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        // Unique Navigation Elements
        uniqueNavElements: true,
        // Resistance
        resistance: true,
        resistanceRatio: 0.85,
        // Progress
        watchSlidesProgress: false,
        // Cursor
        grabCursor: false,
        // Clicks
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        // Images
        preloadImages: true,
        updateOnImagesReady: true,
        // loop
        loop: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: false,
        loopPreventsSlide: true,
        // rewind
        rewind: false,
        // Swiping/no swiping
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        // '.swipe-handler',
        noSwiping: true,
        noSwipingClass: 'swiper-no-swiping',
        noSwipingSelector: null,
        // Passive Listeners
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        // NS
        containerModifierClass: 'swiper-',
        // NEW
        slideClass: 'swiper-slide',
        slideBlankClass: 'swiper-slide-invisible-blank',
        slideActiveClass: 'swiper-slide-active',
        slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideNextClass: 'swiper-slide-next',
        slideDuplicateNextClass: 'swiper-slide-duplicate-next',
        slidePrevClass: 'swiper-slide-prev',
        slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
        wrapperClass: 'swiper-wrapper',
        // Callbacks
        runCallbacksOnInit: true,
        // Internals
        _emitClasses: false
      };
  
      function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
          if (obj === void 0) {
            obj = {};
          }
  
          const moduleParamName = Object.keys(obj)[0];
          const moduleParams = obj[moduleParamName];
  
          if (typeof moduleParams !== 'object' || moduleParams === null) {
            extend(allModulesParams, obj);
            return;
          }
  
          if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
            params[moduleParamName] = {
              auto: true
            };
          }
  
          if (!(moduleParamName in params && 'enabled' in moduleParams)) {
            extend(allModulesParams, obj);
            return;
          }
  
          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true
            };
          }
  
          if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }
  
          if (!params[moduleParamName]) params[moduleParamName] = {
            enabled: false
          };
          extend(allModulesParams, obj);
        };
      }
  
      /* eslint no-param-reassign: "off" */
      const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes,
        images
      };
      const extendedDefaults = {};
  
      class Swiper {
        constructor() {
          let el;
          let params;
  
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
  
          if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
            params = args[0];
          } else {
            [el, params] = args;
          }
  
          if (!params) params = {};
          params = extend({}, params);
          if (el && !params.el) params.el = el;
  
          if (params.el && $(params.el).length > 1) {
            const swipers = [];
            $(params.el).each(containerEl => {
              const newParams = extend({}, params, {
                el: containerEl
              });
              swipers.push(new Swiper(newParams));
            });
            return swipers;
          } // Swiper Instance
  
  
          const swiper = this;
          swiper.__swiper__ = true;
          swiper.support = getSupport();
          swiper.device = getDevice({
            userAgent: params.userAgent
          });
          swiper.browser = getBrowser();
          swiper.eventsListeners = {};
          swiper.eventsAnyListeners = [];
          swiper.modules = [...swiper.__modules__];
  
          if (params.modules && Array.isArray(params.modules)) {
            swiper.modules.push(...params.modules);
          }
  
          const allModulesParams = {};
          swiper.modules.forEach(mod => {
            mod({
              swiper,
              extendParams: moduleExtendParams(params, allModulesParams),
              on: swiper.on.bind(swiper),
              once: swiper.once.bind(swiper),
              off: swiper.off.bind(swiper),
              emit: swiper.emit.bind(swiper)
            });
          }); // Extend defaults with modules params
  
          const swiperParams = extend({}, defaults, allModulesParams); // Extend defaults with passed params
  
          swiper.params = extend({}, swiperParams, extendedDefaults, params);
          swiper.originalParams = extend({}, swiper.params);
          swiper.passedParams = extend({}, params); // add event listeners
  
          if (swiper.params && swiper.params.on) {
            Object.keys(swiper.params.on).forEach(eventName => {
              swiper.on(eventName, swiper.params.on[eventName]);
            });
          }
  
          if (swiper.params && swiper.params.onAny) {
            swiper.onAny(swiper.params.onAny);
          } // Save Dom lib
  
  
          swiper.$ = $; // Extend Swiper
  
          Object.assign(swiper, {
            enabled: swiper.params.enabled,
            el,
            // Classes
            classNames: [],
            // Slides
            slides: $(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
  
            // isDirection
            isHorizontal() {
              return swiper.params.direction === 'horizontal';
            },
  
            isVertical() {
              return swiper.params.direction === 'vertical';
            },
  
            // Indexes
            activeIndex: 0,
            realIndex: 0,
            //
            isBeginning: true,
            isEnd: false,
            // Props
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: false,
            // Locks
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev,
            // Touch Events
            touchEvents: function touchEvents() {
              const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
              const desktop = ['pointerdown', 'pointermove', 'pointerup'];
              swiper.touchEventsTouch = {
                start: touch[0],
                move: touch[1],
                end: touch[2],
                cancel: touch[3]
              };
              swiper.touchEventsDesktop = {
                start: desktop[0],
                move: desktop[1],
                end: desktop[2]
              };
              return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
            }(),
            touchEventsData: {
              isTouched: undefined,
              isMoved: undefined,
              allowTouchCallbacks: undefined,
              touchStartTime: undefined,
              isScrolling: undefined,
              currentTranslate: undefined,
              startTranslate: undefined,
              allowThresholdMove: undefined,
              // Form elements to match
              focusableElements: swiper.params.focusableElements,
              // Last click time
              lastClickTime: now(),
              clickTimeout: undefined,
              // Velocities
              velocities: [],
              allowMomentumBounce: undefined,
              isTouchEvent: undefined,
              startMoving: undefined
            },
            // Clicks
            allowClick: true,
            // Touches
            allowTouchMove: swiper.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0
            },
            // Images
            imagesToLoad: [],
            imagesLoaded: 0
          });
          swiper.emit('_swiper'); // Init
  
          if (swiper.params.init) {
            swiper.init();
          } // Return app instance
  
  
          return swiper;
        }
  
        enable() {
          const swiper = this;
          if (swiper.enabled) return;
          swiper.enabled = true;
  
          if (swiper.params.grabCursor) {
            swiper.setGrabCursor();
          }
  
          swiper.emit('enable');
        }
  
        disable() {
          const swiper = this;
          if (!swiper.enabled) return;
          swiper.enabled = false;
  
          if (swiper.params.grabCursor) {
            swiper.unsetGrabCursor();
          }
  
          swiper.emit('disable');
        }
  
        setProgress(progress, speed) {
          const swiper = this;
          progress = Math.min(Math.max(progress, 0), 1);
          const min = swiper.minTranslate();
          const max = swiper.maxTranslate();
          const current = (max - min) * progress + min;
          swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
  
        emitContainerClasses() {
          const swiper = this;
          if (!swiper.params._emitClasses || !swiper.el) return;
          const cls = swiper.el.className.split(' ').filter(className => {
            return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
          });
          swiper.emit('_containerClasses', cls.join(' '));
        }
  
        getSlideClasses(slideEl) {
          const swiper = this;
          if (swiper.destroyed) return '';
          return slideEl.className.split(' ').filter(className => {
            return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
          }).join(' ');
        }
  
        emitSlidesClasses() {
          const swiper = this;
          if (!swiper.params._emitClasses || !swiper.el) return;
          const updates = [];
          swiper.slides.each(slideEl => {
            const classNames = swiper.getSlideClasses(slideEl);
            updates.push({
              slideEl,
              classNames
            });
            swiper.emit('_slideClass', slideEl, classNames);
          });
          swiper.emit('_slideClasses', updates);
        }
  
        slidesPerViewDynamic(view, exact) {
          if (view === void 0) {
            view = 'current';
          }
  
          if (exact === void 0) {
            exact = false;
          }
  
          const swiper = this;
          const {
            params,
            slides,
            slidesGrid,
            slidesSizesGrid,
            size: swiperSize,
            activeIndex
          } = swiper;
          let spv = 1;
  
          if (params.centeredSlides) {
            let slideSize = slides[activeIndex].swiperSlideSize;
            let breakLoop;
  
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              if (slides[i] && !breakLoop) {
                slideSize += slides[i].swiperSlideSize;
                spv += 1;
                if (slideSize > swiperSize) breakLoop = true;
              }
            }
  
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              if (slides[i] && !breakLoop) {
                slideSize += slides[i].swiperSlideSize;
                spv += 1;
                if (slideSize > swiperSize) breakLoop = true;
              }
            }
          } else {
            // eslint-disable-next-line
            if (view === 'current') {
              for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
  
                if (slideInView) {
                  spv += 1;
                }
              }
            } else {
              // previous
              for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
  
                if (slideInView) {
                  spv += 1;
                }
              }
            }
          }
  
          return spv;
        }
  
        update() {
          const swiper = this;
          if (!swiper || swiper.destroyed) return;
          const {
            snapGrid,
            params
          } = swiper; // Breakpoints
  
          if (params.breakpoints) {
            swiper.setBreakpoint();
          }
  
          swiper.updateSize();
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();
  
          function setTranslate() {
            const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
            const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
            swiper.setTranslate(newTranslate);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          }
  
          let translated;
  
          if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
            setTranslate();
  
            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          } else {
            if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
              translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
            } else {
              translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
            }
  
            if (!translated) {
              setTranslate();
            }
          }
  
          if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
            swiper.checkOverflow();
          }
  
          swiper.emit('update');
        }
  
        changeDirection(newDirection, needUpdate) {
          if (needUpdate === void 0) {
            needUpdate = true;
          }
  
          const swiper = this;
          const currentDirection = swiper.params.direction;
  
          if (!newDirection) {
            // eslint-disable-next-line
            newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
          }
  
          if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
            return swiper;
          }
  
          swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
          swiper.emitContainerClasses();
          swiper.params.direction = newDirection;
          swiper.slides.each(slideEl => {
            if (newDirection === 'vertical') {
              slideEl.style.width = '';
            } else {
              slideEl.style.height = '';
            }
          });
          swiper.emit('changeDirection');
          if (needUpdate) swiper.update();
          return swiper;
        }
  
        mount(el) {
          const swiper = this;
          if (swiper.mounted) return true; // Find el
  
          const $el = $(el || swiper.params.el);
          el = $el[0];
  
          if (!el) {
            return false;
          }
  
          el.swiper = swiper;
  
          const getWrapperSelector = () => {
            return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
          };
  
          const getWrapper = () => {
            if (el && el.shadowRoot && el.shadowRoot.querySelector) {
              const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items
  
              res.children = options => $el.children(options);
  
              return res;
            }
  
            if (!$el.children) {
              return $($el).children(getWrapperSelector());
            }
  
            return $el.children(getWrapperSelector());
          }; // Find Wrapper
  
  
          let $wrapperEl = getWrapper();
  
          if ($wrapperEl.length === 0 && swiper.params.createElements) {
            const document = getDocument();
            const wrapper = document.createElement('div');
            $wrapperEl = $(wrapper);
            wrapper.className = swiper.params.wrapperClass;
            $el.append(wrapper);
            $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
              $wrapperEl.append(slideEl);
            });
          }
  
          Object.assign(swiper, {
            $el,
            el,
            $wrapperEl,
            wrapperEl: $wrapperEl[0],
            mounted: true,
            // RTL
            rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
            rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
            wrongRTL: $wrapperEl.css('display') === '-webkit-box'
          });
          return true;
        }
  
        init(el) {
          const swiper = this;
          if (swiper.initialized) return swiper;
          const mounted = swiper.mount(el);
          if (mounted === false) return swiper;
          swiper.emit('beforeInit'); // Set breakpoint
  
          if (swiper.params.breakpoints) {
            swiper.setBreakpoint();
          } // Add Classes
  
  
          swiper.addClasses(); // Create loop
  
          if (swiper.params.loop) {
            swiper.loopCreate();
          } // Update size
  
  
          swiper.updateSize(); // Update slides
  
          swiper.updateSlides();
  
          if (swiper.params.watchOverflow) {
            swiper.checkOverflow();
          } // Set Grab Cursor
  
  
          if (swiper.params.grabCursor && swiper.enabled) {
            swiper.setGrabCursor();
          }
  
          if (swiper.params.preloadImages) {
            swiper.preloadImages();
          } // Slide To Initial Slide
  
  
          if (swiper.params.loop) {
            swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
          } else {
            swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
          } // Attach events
  
  
          swiper.attachEvents(); // Init Flag
  
          swiper.initialized = true; // Emit
  
          swiper.emit('init');
          swiper.emit('afterInit');
          return swiper;
        }
  
        destroy(deleteInstance, cleanStyles) {
          if (deleteInstance === void 0) {
            deleteInstance = true;
          }
  
          if (cleanStyles === void 0) {
            cleanStyles = true;
          }
  
          const swiper = this;
          const {
            params,
            $el,
            $wrapperEl,
            slides
          } = swiper;
  
          if (typeof swiper.params === 'undefined' || swiper.destroyed) {
            return null;
          }
  
          swiper.emit('beforeDestroy'); // Init Flag
  
          swiper.initialized = false; // Detach events
  
          swiper.detachEvents(); // Destroy loop
  
          if (params.loop) {
            swiper.loopDestroy();
          } // Cleanup styles
  
  
          if (cleanStyles) {
            swiper.removeClasses();
            $el.removeAttr('style');
            $wrapperEl.removeAttr('style');
  
            if (slides && slides.length) {
              slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
            }
          }
  
          swiper.emit('destroy'); // Detach emitter events
  
          Object.keys(swiper.eventsListeners).forEach(eventName => {
            swiper.off(eventName);
          });
  
          if (deleteInstance !== false) {
            swiper.$el[0].swiper = null;
            deleteProps(swiper);
          }
  
          swiper.destroyed = true;
          return null;
        }
  
        static extendDefaults(newDefaults) {
          extend(extendedDefaults, newDefaults);
        }
  
        static get extendedDefaults() {
          return extendedDefaults;
        }
  
        static get defaults() {
          return defaults;
        }
  
        static installModule(mod) {
          if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
          const modules = Swiper.prototype.__modules__;
  
          if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
            modules.push(mod);
          }
        }
  
        static use(module) {
          if (Array.isArray(module)) {
            module.forEach(m => Swiper.installModule(m));
            return Swiper;
          }
  
          Swiper.installModule(module);
          return Swiper;
        }
  
      }
  
      Object.keys(prototypes).forEach(prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        });
      });
      Swiper.use([Resize, Observer]);
  
      function Virtual(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        extendParams({
          virtual: {
            enabled: false,
            slides: [],
            cache: true,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: true,
            addSlidesBefore: 0,
            addSlidesAfter: 0
          }
        });
        let cssModeTimeout;
        swiper.virtual = {
          cache: {},
          from: undefined,
          to: undefined,
          slides: [],
          offset: 0,
          slidesGrid: []
        };
  
        function renderSlide(slide, index) {
          const params = swiper.params.virtual;
  
          if (params.cache && swiper.virtual.cache[index]) {
            return swiper.virtual.cache[index];
          }
  
          const $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
          if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
          if (params.cache) swiper.virtual.cache[index] = $slideEl;
          return $slideEl;
        }
  
        function update(force) {
          const {
            slidesPerView,
            slidesPerGroup,
            centeredSlides
          } = swiper.params;
          const {
            addSlidesBefore,
            addSlidesAfter
          } = swiper.params.virtual;
          const {
            from: previousFrom,
            to: previousTo,
            slides,
            slidesGrid: previousSlidesGrid,
            offset: previousOffset
          } = swiper.virtual;
  
          if (!swiper.params.cssMode) {
            swiper.updateActiveIndex();
          }
  
          const activeIndex = swiper.activeIndex || 0;
          let offsetProp;
          if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
          let slidesAfter;
          let slidesBefore;
  
          if (centeredSlides) {
            slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
            slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
          } else {
            slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
            slidesBefore = slidesPerGroup + addSlidesBefore;
          }
  
          const from = Math.max((activeIndex || 0) - slidesBefore, 0);
          const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
          const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
          Object.assign(swiper.virtual, {
            from,
            to,
            offset,
            slidesGrid: swiper.slidesGrid
          });
  
          function onRendered() {
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
  
            if (swiper.lazy && swiper.params.lazy.enabled) {
              swiper.lazy.load();
            }
  
            emit('virtualUpdate');
          }
  
          if (previousFrom === from && previousTo === to && !force) {
            if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
              swiper.slides.css(offsetProp, `${offset}px`);
            }
  
            swiper.updateProgress();
            emit('virtualUpdate');
            return;
          }
  
          if (swiper.params.virtual.renderExternal) {
            swiper.params.virtual.renderExternal.call(swiper, {
              offset,
              from,
              to,
              slides: function getSlides() {
                const slidesToRender = [];
  
                for (let i = from; i <= to; i += 1) {
                  slidesToRender.push(slides[i]);
                }
  
                return slidesToRender;
              }()
            });
  
            if (swiper.params.virtual.renderExternalUpdate) {
              onRendered();
            } else {
              emit('virtualUpdate');
            }
  
            return;
          }
  
          const prependIndexes = [];
          const appendIndexes = [];
  
          if (force) {
            swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
          } else {
            for (let i = previousFrom; i <= previousTo; i += 1) {
              if (i < from || i > to) {
                swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
              }
            }
          }
  
          for (let i = 0; i < slides.length; i += 1) {
            if (i >= from && i <= to) {
              if (typeof previousTo === 'undefined' || force) {
                appendIndexes.push(i);
              } else {
                if (i > previousTo) appendIndexes.push(i);
                if (i < previousFrom) prependIndexes.push(i);
              }
            }
          }
  
          appendIndexes.forEach(index => {
            swiper.$wrapperEl.append(renderSlide(slides[index], index));
          });
          prependIndexes.sort((a, b) => b - a).forEach(index => {
            swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
          });
          swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
          onRendered();
        }
  
        function appendSlide(slides) {
          if (typeof slides === 'object' && 'length' in slides) {
            for (let i = 0; i < slides.length; i += 1) {
              if (slides[i]) swiper.virtual.slides.push(slides[i]);
            }
          } else {
            swiper.virtual.slides.push(slides);
          }
  
          update(true);
        }
  
        function prependSlide(slides) {
          const activeIndex = swiper.activeIndex;
          let newActiveIndex = activeIndex + 1;
          let numberOfNewSlides = 1;
  
          if (Array.isArray(slides)) {
            for (let i = 0; i < slides.length; i += 1) {
              if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
            }
  
            newActiveIndex = activeIndex + slides.length;
            numberOfNewSlides = slides.length;
          } else {
            swiper.virtual.slides.unshift(slides);
          }
  
          if (swiper.params.virtual.cache) {
            const cache = swiper.virtual.cache;
            const newCache = {};
            Object.keys(cache).forEach(cachedIndex => {
              const $cachedEl = cache[cachedIndex];
              const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
  
              if (cachedElIndex) {
                $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
              }
  
              newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
            });
            swiper.virtual.cache = newCache;
          }
  
          update(true);
          swiper.slideTo(newActiveIndex, 0);
        }
  
        function removeSlide(slidesIndexes) {
          if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
          let activeIndex = swiper.activeIndex;
  
          if (Array.isArray(slidesIndexes)) {
            for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
              swiper.virtual.slides.splice(slidesIndexes[i], 1);
  
              if (swiper.params.virtual.cache) {
                delete swiper.virtual.cache[slidesIndexes[i]];
              }
  
              if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
              activeIndex = Math.max(activeIndex, 0);
            }
          } else {
            swiper.virtual.slides.splice(slidesIndexes, 1);
  
            if (swiper.params.virtual.cache) {
              delete swiper.virtual.cache[slidesIndexes];
            }
  
            if (slidesIndexes < activeIndex) activeIndex -= 1;
            activeIndex = Math.max(activeIndex, 0);
          }
  
          update(true);
          swiper.slideTo(activeIndex, 0);
        }
  
        function removeAllSlides() {
          swiper.virtual.slides = [];
  
          if (swiper.params.virtual.cache) {
            swiper.virtual.cache = {};
          }
  
          update(true);
          swiper.slideTo(0, 0);
        }
  
        on('beforeInit', () => {
          if (!swiper.params.virtual.enabled) return;
          swiper.virtual.slides = swiper.params.virtual.slides;
          swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
  
          if (!swiper.params.initialSlide) {
            update();
          }
        });
        on('setTranslate', () => {
          if (!swiper.params.virtual.enabled) return;
  
          if (swiper.params.cssMode && !swiper._immediateVirtual) {
            clearTimeout(cssModeTimeout);
            cssModeTimeout = setTimeout(() => {
              update();
            }, 100);
          } else {
            update();
          }
        });
        on('init update resize', () => {
          if (!swiper.params.virtual.enabled) return;
  
          if (swiper.params.cssMode) {
            setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
          }
        });
        Object.assign(swiper.virtual, {
          appendSlide,
          prependSlide,
          removeSlide,
          removeAllSlides,
          update
        });
      }
  
      /* eslint-disable consistent-return */
      function Keyboard(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const document = getDocument();
        const window = getWindow();
        swiper.keyboard = {
          enabled: false
        };
        extendParams({
          keyboard: {
            enabled: false,
            onlyInViewport: true,
            pageUpDown: true
          }
        });
  
        function handle(event) {
          if (!swiper.enabled) return;
          const {
            rtlTranslate: rtl
          } = swiper;
          let e = event;
          if (e.originalEvent) e = e.originalEvent; // jquery fix
  
          const kc = e.keyCode || e.charCode;
          const pageUpDown = swiper.params.keyboard.pageUpDown;
          const isPageUp = pageUpDown && kc === 33;
          const isPageDown = pageUpDown && kc === 34;
          const isArrowLeft = kc === 37;
          const isArrowRight = kc === 39;
          const isArrowUp = kc === 38;
          const isArrowDown = kc === 40; // Directions locks
  
          if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
            return false;
          }
  
          if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
            return false;
          }
  
          if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
            return undefined;
          }
  
          if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
            return undefined;
          }
  
          if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
            let inView = false; // Check that swiper should be inside of visible area of window
  
            if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) {
              return undefined;
            }
  
            const $el = swiper.$el;
            const swiperWidth = $el[0].clientWidth;
            const swiperHeight = $el[0].clientHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const swiperOffset = swiper.$el.offset();
            if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
            const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
  
            for (let i = 0; i < swiperCoord.length; i += 1) {
              const point = swiperCoord[i];
  
              if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
  
                inView = true;
              }
            }
  
            if (!inView) return undefined;
          }
  
          if (swiper.isHorizontal()) {
            if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
              if (e.preventDefault) e.preventDefault();else e.returnValue = false;
            }
  
            if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
            if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
          } else {
            if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
              if (e.preventDefault) e.preventDefault();else e.returnValue = false;
            }
  
            if (isPageDown || isArrowDown) swiper.slideNext();
            if (isPageUp || isArrowUp) swiper.slidePrev();
          }
  
          emit('keyPress', kc);
          return undefined;
        }
  
        function enable() {
          if (swiper.keyboard.enabled) return;
          $(document).on('keydown', handle);
          swiper.keyboard.enabled = true;
        }
  
        function disable() {
          if (!swiper.keyboard.enabled) return;
          $(document).off('keydown', handle);
          swiper.keyboard.enabled = false;
        }
  
        on('init', () => {
          if (swiper.params.keyboard.enabled) {
            enable();
          }
        });
        on('destroy', () => {
          if (swiper.keyboard.enabled) {
            disable();
          }
        });
        Object.assign(swiper.keyboard, {
          enable,
          disable
        });
      }
  
      /* eslint-disable consistent-return */
      function Mousewheel(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const window = getWindow();
        extendParams({
          mousewheel: {
            enabled: false,
            releaseOnEdges: false,
            invert: false,
            forceToAxis: false,
            sensitivity: 1,
            eventsTarget: 'container',
            thresholdDelta: null,
            thresholdTime: null
          }
        });
        swiper.mousewheel = {
          enabled: false
        };
        let timeout;
        let lastScrollTime = now();
        let lastEventBeforeSnap;
        const recentWheelEvents = [];
  
        function normalize(e) {
          // Reasonable defaults
          const PIXEL_STEP = 10;
          const LINE_HEIGHT = 40;
          const PAGE_HEIGHT = 800;
          let sX = 0;
          let sY = 0; // spinX, spinY
  
          let pX = 0;
          let pY = 0; // pixelX, pixelY
          // Legacy
  
          if ('detail' in e) {
            sY = e.detail;
          }
  
          if ('wheelDelta' in e) {
            sY = -e.wheelDelta / 120;
          }
  
          if ('wheelDeltaY' in e) {
            sY = -e.wheelDeltaY / 120;
          }
  
          if ('wheelDeltaX' in e) {
            sX = -e.wheelDeltaX / 120;
          } // side scrolling on FF with DOMMouseScroll
  
  
          if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
            sX = sY;
            sY = 0;
          }
  
          pX = sX * PIXEL_STEP;
          pY = sY * PIXEL_STEP;
  
          if ('deltaY' in e) {
            pY = e.deltaY;
          }
  
          if ('deltaX' in e) {
            pX = e.deltaX;
          }
  
          if (e.shiftKey && !pX) {
            // if user scrolls with shift he wants horizontal scroll
            pX = pY;
            pY = 0;
          }
  
          if ((pX || pY) && e.deltaMode) {
            if (e.deltaMode === 1) {
              // delta in LINE units
              pX *= LINE_HEIGHT;
              pY *= LINE_HEIGHT;
            } else {
              // delta in PAGE units
              pX *= PAGE_HEIGHT;
              pY *= PAGE_HEIGHT;
            }
          } // Fall-back if spin cannot be determined
  
  
          if (pX && !sX) {
            sX = pX < 1 ? -1 : 1;
          }
  
          if (pY && !sY) {
            sY = pY < 1 ? -1 : 1;
          }
  
          return {
            spinX: sX,
            spinY: sY,
            pixelX: pX,
            pixelY: pY
          };
        }
  
        function handleMouseEnter() {
          if (!swiper.enabled) return;
          swiper.mouseEntered = true;
        }
  
        function handleMouseLeave() {
          if (!swiper.enabled) return;
          swiper.mouseEntered = false;
        }
  
        function animateSlider(newEvent) {
          if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
            // Prevent if delta of wheel scroll delta is below configured threshold
            return false;
          }
  
          if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
            // Prevent if time between scrolls is below configured threshold
            return false;
          } // If the movement is NOT big enough and
          // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
          //   Don't go any further (avoid insignificant scroll movement).
  
  
          if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
            // Return false as a default
            return true;
          } // If user is scrolling towards the end:
          //   If the slider hasn't hit the latest slide or
          //   if the slider is a loop and
          //   if the slider isn't moving right now:
          //     Go to next slide and
          //     emit a scroll event.
          // Else (the user is scrolling towards the beginning) and
          // if the slider hasn't hit the first slide or
          // if the slider is a loop and
          // if the slider isn't moving right now:
          //   Go to prev slide and
          //   emit a scroll event.
  
  
          if (newEvent.direction < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              emit('scroll', newEvent.raw);
            }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            emit('scroll', newEvent.raw);
          } // If you got here is because an animation has been triggered so store the current time
  
  
          lastScrollTime = new window.Date().getTime(); // Return false as a default
  
          return false;
        }
  
        function releaseScroll(newEvent) {
          const params = swiper.params.mousewheel;
  
          if (newEvent.direction < 0) {
            if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
              // Return true to animate scroll on edges
              return true;
            }
          } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
          }
  
          return false;
        }
  
        function handle(event) {
          let e = event;
          let disableParentSwiper = true;
          if (!swiper.enabled) return;
          const params = swiper.params.mousewheel;
  
          if (swiper.params.cssMode) {
            e.preventDefault();
          }
  
          let target = swiper.$el;
  
          if (swiper.params.mousewheel.eventsTarget !== 'container') {
            target = $(swiper.params.mousewheel.eventsTarget);
          }
  
          if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
          if (e.originalEvent) e = e.originalEvent; // jquery fix
  
          let delta = 0;
          const rtlFactor = swiper.rtlTranslate ? -1 : 1;
          const data = normalize(e);
  
          if (params.forceToAxis) {
            if (swiper.isHorizontal()) {
              if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
            } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
          } else {
            delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
          }
  
          if (delta === 0) return true;
          if (params.invert) delta = -delta; // Get the scroll positions
  
          let positions = swiper.getTranslate() + delta * params.sensitivity;
          if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
          if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
          //     the disableParentSwiper will be true.
          // When loop is false:
          //     if the scroll positions is not on edge,
          //     then the disableParentSwiper will be true.
          //     if the scroll on edge positions,
          //     then the disableParentSwiper will be false.
  
          disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
          if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
  
          if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
            // Register the new event in a variable which stores the relevant data
            const newEvent = {
              time: now(),
              delta: Math.abs(delta),
              direction: Math.sign(delta),
              raw: event
            }; // Keep the most recent events
  
            if (recentWheelEvents.length >= 2) {
              recentWheelEvents.shift(); // only store the last N events
            }
  
            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
            recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
            //   If direction has changed or
            //   if the scroll is quicker than the previous one:
            //     Animate the slider.
            // Else (this is the first time the wheel is moved):
            //     Animate the slider.
  
            if (prevEvent) {
              if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
                animateSlider(newEvent);
              }
            } else {
              animateSlider(newEvent);
            } // If it's time to release the scroll:
            //   Return now so you don't hit the preventDefault.
  
  
            if (releaseScroll(newEvent)) {
              return true;
            }
          } else {
            // Freemode or scrollContainer:
            // If we recently snapped after a momentum scroll, then ignore wheel events
            // to give time for the deceleration to finish. Stop ignoring after 500 msecs
            // or if it's a new scroll (larger delta or inverse sign as last event before
            // an end-of-momentum snap).
            const newEvent = {
              time: now(),
              delta: Math.abs(delta),
              direction: Math.sign(delta)
            };
            const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
  
            if (!ignoreWheelEvents) {
              lastEventBeforeSnap = undefined;
  
              if (swiper.params.loop) {
                swiper.loopFix();
              }
  
              let position = swiper.getTranslate() + delta * params.sensitivity;
              const wasBeginning = swiper.isBeginning;
              const wasEnd = swiper.isEnd;
              if (position >= swiper.minTranslate()) position = swiper.minTranslate();
              if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
              swiper.setTransition(0);
              swiper.setTranslate(position);
              swiper.updateProgress();
              swiper.updateActiveIndex();
              swiper.updateSlidesClasses();
  
              if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
                swiper.updateSlidesClasses();
              }
  
              if (swiper.params.freeMode.sticky) {
                // When wheel scrolling starts with sticky (aka snap) enabled, then detect
                // the end of a momentum scroll by storing recent (N=15?) wheel events.
                // 1. do all N events have decreasing or same (absolute value) delta?
                // 2. did all N events arrive in the last M (M=500?) msecs?
                // 3. does the earliest event have an (absolute value) delta that's
                //    at least P (P=1?) larger than the most recent event's delta?
                // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
                // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
                // Snap immediately and ignore remaining wheel events in this scroll.
                // See comment above for "remaining wheel events in this scroll" determination.
                // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
                clearTimeout(timeout);
                timeout = undefined;
  
                if (recentWheelEvents.length >= 15) {
                  recentWheelEvents.shift(); // only store the last N events
                }
  
                const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
                const firstEvent = recentWheelEvents[0];
                recentWheelEvents.push(newEvent);
  
                if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
                  // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                  recentWheelEvents.splice(0);
                } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                  // We're at the end of the deceleration of a momentum scroll, so there's no need
                  // to wait for more events. Snap ASAP on the next tick.
                  // Also, because there's some remaining momentum we'll bias the snap in the
                  // direction of the ongoing scroll because it's better UX for the scroll to snap
                  // in the same direction as the scroll instead of reversing to snap.  Therefore,
                  // if it's already scrolled more than 20% in the current direction, keep going.
                  const snapToThreshold = delta > 0 ? 0.8 : 0.2;
                  lastEventBeforeSnap = newEvent;
                  recentWheelEvents.splice(0);
                  timeout = nextTick(() => {
                    swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                  }, 0); // no delay; move on next tick
                }
  
                if (!timeout) {
                  // if we get here, then we haven't detected the end of a momentum scroll, so
                  // we'll consider a scroll "complete" when there haven't been any wheel events
                  // for 500ms.
                  timeout = nextTick(() => {
                    const snapToThreshold = 0.5;
                    lastEventBeforeSnap = newEvent;
                    recentWheelEvents.splice(0);
                    swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                  }, 500);
                }
              } // Emit event
  
  
              if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay
  
              if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions
  
              if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
            }
          }
  
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          return false;
        }
  
        function events(method) {
          let target = swiper.$el;
  
          if (swiper.params.mousewheel.eventsTarget !== 'container') {
            target = $(swiper.params.mousewheel.eventsTarget);
          }
  
          target[method]('mouseenter', handleMouseEnter);
          target[method]('mouseleave', handleMouseLeave);
          target[method]('wheel', handle);
        }
  
        function enable() {
          if (swiper.params.cssMode) {
            swiper.wrapperEl.removeEventListener('wheel', handle);
            return true;
          }
  
          if (swiper.mousewheel.enabled) return false;
          events('on');
          swiper.mousewheel.enabled = true;
          return true;
        }
  
        function disable() {
          if (swiper.params.cssMode) {
            swiper.wrapperEl.addEventListener(event, handle);
            return true;
          }
  
          if (!swiper.mousewheel.enabled) return false;
          events('off');
          swiper.mousewheel.enabled = false;
          return true;
        }
  
        on('init', () => {
          if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
            disable();
          }
  
          if (swiper.params.mousewheel.enabled) enable();
        });
        on('destroy', () => {
          if (swiper.params.cssMode) {
            enable();
          }
  
          if (swiper.mousewheel.enabled) disable();
        });
        Object.assign(swiper.mousewheel, {
          enable,
          disable
        });
      }
  
      function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        const document = getDocument();
  
        if (swiper.params.createElements) {
          Object.keys(checkProps).forEach(key => {
            if (!params[key] && params.auto === true) {
              let element = swiper.$el.children(`.${checkProps[key]}`)[0];
  
              if (!element) {
                element = document.createElement('div');
                element.className = checkProps[key];
                swiper.$el.append(element);
              }
  
              params[key] = element;
              originalParams[key] = element;
            }
          });
        }
  
        return params;
      }
  
      function Navigation(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        extendParams({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: false,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
            lockClass: 'swiper-button-lock'
          }
        });
        swiper.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null
        };
  
        function getEl(el) {
          let $el;
  
          if (el) {
            $el = $(el);
  
            if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {
              $el = swiper.$el.find(el);
            }
          }
  
          return $el;
        }
  
        function toggleEl($el, disabled) {
          const params = swiper.params.navigation;
  
          if ($el && $el.length > 0) {
            $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
            if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;
  
            if (swiper.params.watchOverflow && swiper.enabled) {
              $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
            }
          }
        }
  
        function update() {
          // Update Navigation Buttons
          if (swiper.params.loop) return;
          const {
            $nextEl,
            $prevEl
          } = swiper.navigation;
          toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
          toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
        }
  
        function onPrevClick(e) {
          e.preventDefault();
          if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
          swiper.slidePrev();
        }
  
        function onNextClick(e) {
          e.preventDefault();
          if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
          swiper.slideNext();
        }
  
        function init() {
          const params = swiper.params.navigation;
          swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
            nextEl: 'swiper-button-next',
            prevEl: 'swiper-button-prev'
          });
          if (!(params.nextEl || params.prevEl)) return;
          const $nextEl = getEl(params.nextEl);
          const $prevEl = getEl(params.prevEl);
  
          if ($nextEl && $nextEl.length > 0) {
            $nextEl.on('click', onNextClick);
          }
  
          if ($prevEl && $prevEl.length > 0) {
            $prevEl.on('click', onPrevClick);
          }
  
          Object.assign(swiper.navigation, {
            $nextEl,
            nextEl: $nextEl && $nextEl[0],
            $prevEl,
            prevEl: $prevEl && $prevEl[0]
          });
  
          if (!swiper.enabled) {
            if ($nextEl) $nextEl.addClass(params.lockClass);
            if ($prevEl) $prevEl.addClass(params.lockClass);
          }
        }
  
        function destroy() {
          const {
            $nextEl,
            $prevEl
          } = swiper.navigation;
  
          if ($nextEl && $nextEl.length) {
            $nextEl.off('click', onNextClick);
            $nextEl.removeClass(swiper.params.navigation.disabledClass);
          }
  
          if ($prevEl && $prevEl.length) {
            $prevEl.off('click', onPrevClick);
            $prevEl.removeClass(swiper.params.navigation.disabledClass);
          }
        }
  
        on('init', () => {
          init();
          update();
        });
        on('toEdge fromEdge lock unlock', () => {
          update();
        });
        on('destroy', () => {
          destroy();
        });
        on('enable disable', () => {
          const {
            $nextEl,
            $prevEl
          } = swiper.navigation;
  
          if ($nextEl) {
            $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
          }
  
          if ($prevEl) {
            $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
          }
        });
        on('click', (_s, e) => {
          const {
            $nextEl,
            $prevEl
          } = swiper.navigation;
          const targetEl = e.target;
  
          if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
            if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
            let isHidden;
  
            if ($nextEl) {
              isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
            } else if ($prevEl) {
              isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
            }
  
            if (isHidden === true) {
              emit('navigationShow');
            } else {
              emit('navigationHide');
            }
  
            if ($nextEl) {
              $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
  
            if ($prevEl) {
              $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
          }
        });
        Object.assign(swiper.navigation, {
          update,
          init,
          destroy
        });
      }
  
      function classesToSelector(classes) {
        if (classes === void 0) {
          classes = '';
        }
  
        return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
    .replace(/ /g, '.')}`;
      }
  
      function Pagination(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const pfx = 'swiper-pagination';
        extendParams({
          pagination: {
            el: null,
            bulletElement: 'span',
            clickable: false,
            hideOnClick: false,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: false,
            type: 'bullets',
            // 'bullets' or 'progressbar' or 'fraction' or 'custom'
            dynamicBullets: false,
            dynamicMainBullets: 1,
            formatFractionCurrent: number => number,
            formatFractionTotal: number => number,
            bulletClass: `${pfx}-bullet`,
            bulletActiveClass: `${pfx}-bullet-active`,
            modifierClass: `${pfx}-`,
            currentClass: `${pfx}-current`,
            totalClass: `${pfx}-total`,
            hiddenClass: `${pfx}-hidden`,
            progressbarFillClass: `${pfx}-progressbar-fill`,
            progressbarOppositeClass: `${pfx}-progressbar-opposite`,
            clickableClass: `${pfx}-clickable`,
            lockClass: `${pfx}-lock`,
            horizontalClass: `${pfx}-horizontal`,
            verticalClass: `${pfx}-vertical`
          }
        });
        swiper.pagination = {
          el: null,
          $el: null,
          bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
  
        function isPaginationDisabled() {
          return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
        }
  
        function setSideBullets($bulletEl, position) {
          const {
            bulletActiveClass
          } = swiper.params.pagination;
          $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
        }
  
        function update() {
          // Render || Update Pagination bullets/items
          const rtl = swiper.rtl;
          const params = swiper.params.pagination;
          if (isPaginationDisabled()) return;
          const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
          const $el = swiper.pagination.$el; // Current/Total
  
          let current;
          const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
  
          if (swiper.params.loop) {
            current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
  
            if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
              current -= slidesLength - swiper.loopedSlides * 2;
            }
  
            if (current > total - 1) current -= total;
            if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
          } else if (typeof swiper.snapIndex !== 'undefined') {
            current = swiper.snapIndex;
          } else {
            current = swiper.activeIndex || 0;
          } // Types
  
  
          if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
            const bullets = swiper.pagination.bullets;
            let firstIndex;
            let lastIndex;
            let midIndex;
  
            if (params.dynamicBullets) {
              bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
              $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);
  
              if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
                dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
  
                if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                  dynamicBulletIndex = params.dynamicMainBullets - 1;
                } else if (dynamicBulletIndex < 0) {
                  dynamicBulletIndex = 0;
                }
              }
  
              firstIndex = Math.max(current - dynamicBulletIndex, 0);
              lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
              midIndex = (lastIndex + firstIndex) / 2;
            }
  
            bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));
  
            if ($el.length > 1) {
              bullets.each(bullet => {
                const $bullet = $(bullet);
                const bulletIndex = $bullet.index();
  
                if (bulletIndex === current) {
                  $bullet.addClass(params.bulletActiveClass);
                }
  
                if (params.dynamicBullets) {
                  if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                    $bullet.addClass(`${params.bulletActiveClass}-main`);
                  }
  
                  if (bulletIndex === firstIndex) {
                    setSideBullets($bullet, 'prev');
                  }
  
                  if (bulletIndex === lastIndex) {
                    setSideBullets($bullet, 'next');
                  }
                }
              });
            } else {
              const $bullet = bullets.eq(current);
              const bulletIndex = $bullet.index();
              $bullet.addClass(params.bulletActiveClass);
  
              if (params.dynamicBullets) {
                const $firstDisplayedBullet = bullets.eq(firstIndex);
                const $lastDisplayedBullet = bullets.eq(lastIndex);
  
                for (let i = firstIndex; i <= lastIndex; i += 1) {
                  bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                }
  
                if (swiper.params.loop) {
                  if (bulletIndex >= bullets.length) {
                    for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                      bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                    }
  
                    bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                  } else {
                    setSideBullets($firstDisplayedBullet, 'prev');
                    setSideBullets($lastDisplayedBullet, 'next');
                  }
                } else {
                  setSideBullets($firstDisplayedBullet, 'prev');
                  setSideBullets($lastDisplayedBullet, 'next');
                }
              }
            }
  
            if (params.dynamicBullets) {
              const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
              const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
              const offsetProp = rtl ? 'right' : 'left';
              bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
            }
          }
  
          if (params.type === 'fraction') {
            $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
            $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
          }
  
          if (params.type === 'progressbar') {
            let progressbarDirection;
  
            if (params.progressbarOpposite) {
              progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
            } else {
              progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
            }
  
            const scale = (current + 1) / total;
            let scaleX = 1;
            let scaleY = 1;
  
            if (progressbarDirection === 'horizontal') {
              scaleX = scale;
            } else {
              scaleY = scale;
            }
  
            $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
          }
  
          if (params.type === 'custom' && params.renderCustom) {
            $el.html(params.renderCustom(swiper, current + 1, total));
            emit('paginationRender', $el[0]);
          } else {
            emit('paginationUpdate', $el[0]);
          }
  
          if (swiper.params.watchOverflow && swiper.enabled) {
            $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
          }
        }
  
        function render() {
          // Render Container
          const params = swiper.params.pagination;
          if (isPaginationDisabled()) return;
          const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
          const $el = swiper.pagination.$el;
          let paginationHTML = '';
  
          if (params.type === 'bullets') {
            let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
  
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
              numberOfBullets = slidesLength;
            }
  
            for (let i = 0; i < numberOfBullets; i += 1) {
              if (params.renderBullet) {
                paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
              } else {
                paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
              }
            }
  
            $el.html(paginationHTML);
            swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
          }
  
          if (params.type === 'fraction') {
            if (params.renderFraction) {
              paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
            } else {
              paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
            }
  
            $el.html(paginationHTML);
          }
  
          if (params.type === 'progressbar') {
            if (params.renderProgressbar) {
              paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
            } else {
              paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            }
  
            $el.html(paginationHTML);
          }
  
          if (params.type !== 'custom') {
            emit('paginationRender', swiper.pagination.$el[0]);
          }
        }
  
        function init() {
          swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
            el: 'swiper-pagination'
          });
          const params = swiper.params.pagination;
          if (!params.el) return;
          let $el = $(params.el);
          if ($el.length === 0) return;
  
          if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
            $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper
  
            if ($el.length > 1) {
              $el = $el.filter(el => {
                if ($(el).parents('.swiper')[0] !== swiper.el) return false;
                return true;
              });
            }
          }
  
          if (params.type === 'bullets' && params.clickable) {
            $el.addClass(params.clickableClass);
          }
  
          $el.addClass(params.modifierClass + params.type);
          $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
  
          if (params.type === 'bullets' && params.dynamicBullets) {
            $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
            dynamicBulletIndex = 0;
  
            if (params.dynamicMainBullets < 1) {
              params.dynamicMainBullets = 1;
            }
          }
  
          if (params.type === 'progressbar' && params.progressbarOpposite) {
            $el.addClass(params.progressbarOppositeClass);
          }
  
          if (params.clickable) {
            $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
              e.preventDefault();
              let index = $(this).index() * swiper.params.slidesPerGroup;
              if (swiper.params.loop) index += swiper.loopedSlides;
              swiper.slideTo(index);
            });
          }
  
          Object.assign(swiper.pagination, {
            $el,
            el: $el[0]
          });
  
          if (!swiper.enabled) {
            $el.addClass(params.lockClass);
          }
        }
  
        function destroy() {
          const params = swiper.params.pagination;
          if (isPaginationDisabled()) return;
          const $el = swiper.pagination.$el;
          $el.removeClass(params.hiddenClass);
          $el.removeClass(params.modifierClass + params.type);
          $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
  
          if (params.clickable) {
            $el.off('click', classesToSelector(params.bulletClass));
          }
        }
  
        on('init', () => {
          init();
          render();
          update();
        });
        on('activeIndexChange', () => {
          if (swiper.params.loop) {
            update();
          } else if (typeof swiper.snapIndex === 'undefined') {
            update();
          }
        });
        on('snapIndexChange', () => {
          if (!swiper.params.loop) {
            update();
          }
        });
        on('slidesLengthChange', () => {
          if (swiper.params.loop) {
            render();
            update();
          }
        });
        on('snapGridLengthChange', () => {
          if (!swiper.params.loop) {
            render();
            update();
          }
        });
        on('destroy', () => {
          destroy();
        });
        on('enable disable', () => {
          const {
            $el
          } = swiper.pagination;
  
          if ($el) {
            $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
          }
        });
        on('lock unlock', () => {
          update();
        });
        on('click', (_s, e) => {
          const targetEl = e.target;
          const {
            $el
          } = swiper.pagination;
  
          if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
            if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
            const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
  
            if (isHidden === true) {
              emit('paginationShow');
            } else {
              emit('paginationHide');
            }
  
            $el.toggleClass(swiper.params.pagination.hiddenClass);
          }
        });
        Object.assign(swiper.pagination, {
          render,
          update,
          init,
          destroy
        });
      }
  
      function Scrollbar(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const document = getDocument();
        let isTouched = false;
        let timeout = null;
        let dragTimeout = null;
        let dragStartPos;
        let dragSize;
        let trackSize;
        let divider;
        extendParams({
          scrollbar: {
            el: null,
            dragSize: 'auto',
            hide: false,
            draggable: false,
            snapOnRelease: true,
            lockClass: 'swiper-scrollbar-lock',
            dragClass: 'swiper-scrollbar-drag'
          }
        });
        swiper.scrollbar = {
          el: null,
          dragEl: null,
          $el: null,
          $dragEl: null
        };
  
        function setTranslate() {
          if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
          const {
            scrollbar,
            rtlTranslate: rtl,
            progress
          } = swiper;
          const {
            $dragEl,
            $el
          } = scrollbar;
          const params = swiper.params.scrollbar;
          let newSize = dragSize;
          let newPos = (trackSize - dragSize) * progress;
  
          if (rtl) {
            newPos = -newPos;
  
            if (newPos > 0) {
              newSize = dragSize - newPos;
              newPos = 0;
            } else if (-newPos + dragSize > trackSize) {
              newSize = trackSize + newPos;
            }
          } else if (newPos < 0) {
            newSize = dragSize + newPos;
            newPos = 0;
          } else if (newPos + dragSize > trackSize) {
            newSize = trackSize - newPos;
          }
  
          if (swiper.isHorizontal()) {
            $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
            $dragEl[0].style.width = `${newSize}px`;
          } else {
            $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
            $dragEl[0].style.height = `${newSize}px`;
          }
  
          if (params.hide) {
            clearTimeout(timeout);
            $el[0].style.opacity = 1;
            timeout = setTimeout(() => {
              $el[0].style.opacity = 0;
              $el.transition(400);
            }, 1000);
          }
        }
  
        function setTransition(duration) {
          if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
          swiper.scrollbar.$dragEl.transition(duration);
        }
  
        function updateSize() {
          if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
          const {
            scrollbar
          } = swiper;
          const {
            $dragEl,
            $el
          } = scrollbar;
          $dragEl[0].style.width = '';
          $dragEl[0].style.height = '';
          trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
          divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
  
          if (swiper.params.scrollbar.dragSize === 'auto') {
            dragSize = trackSize * divider;
          } else {
            dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
          }
  
          if (swiper.isHorizontal()) {
            $dragEl[0].style.width = `${dragSize}px`;
          } else {
            $dragEl[0].style.height = `${dragSize}px`;
          }
  
          if (divider >= 1) {
            $el[0].style.display = 'none';
          } else {
            $el[0].style.display = '';
          }
  
          if (swiper.params.scrollbar.hide) {
            $el[0].style.opacity = 0;
          }
  
          if (swiper.params.watchOverflow && swiper.enabled) {
            scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
          }
        }
  
        function getPointerPosition(e) {
          if (swiper.isHorizontal()) {
            return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
          }
  
          return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
        }
  
        function setDragPosition(e) {
          const {
            scrollbar,
            rtlTranslate: rtl
          } = swiper;
          const {
            $el
          } = scrollbar;
          let positionRatio;
          positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
          positionRatio = Math.max(Math.min(positionRatio, 1), 0);
  
          if (rtl) {
            positionRatio = 1 - positionRatio;
          }
  
          const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
          swiper.updateProgress(position);
          swiper.setTranslate(position);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
  
        function onDragStart(e) {
          const params = swiper.params.scrollbar;
          const {
            scrollbar,
            $wrapperEl
          } = swiper;
          const {
            $el,
            $dragEl
          } = scrollbar;
          isTouched = true;
          dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
          e.preventDefault();
          e.stopPropagation();
          $wrapperEl.transition(100);
          $dragEl.transition(100);
          setDragPosition(e);
          clearTimeout(dragTimeout);
          $el.transition(0);
  
          if (params.hide) {
            $el.css('opacity', 1);
          }
  
          if (swiper.params.cssMode) {
            swiper.$wrapperEl.css('scroll-snap-type', 'none');
          }
  
          emit('scrollbarDragStart', e);
        }
  
        function onDragMove(e) {
          const {
            scrollbar,
            $wrapperEl
          } = swiper;
          const {
            $el,
            $dragEl
          } = scrollbar;
          if (!isTouched) return;
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          setDragPosition(e);
          $wrapperEl.transition(0);
          $el.transition(0);
          $dragEl.transition(0);
          emit('scrollbarDragMove', e);
        }
  
        function onDragEnd(e) {
          const params = swiper.params.scrollbar;
          const {
            scrollbar,
            $wrapperEl
          } = swiper;
          const {
            $el
          } = scrollbar;
          if (!isTouched) return;
          isTouched = false;
  
          if (swiper.params.cssMode) {
            swiper.$wrapperEl.css('scroll-snap-type', '');
            $wrapperEl.transition('');
          }
  
          if (params.hide) {
            clearTimeout(dragTimeout);
            dragTimeout = nextTick(() => {
              $el.css('opacity', 0);
              $el.transition(400);
            }, 1000);
          }
  
          emit('scrollbarDragEnd', e);
  
          if (params.snapOnRelease) {
            swiper.slideToClosest();
          }
        }
  
        function events(method) {
          const {
            scrollbar,
            touchEventsTouch,
            touchEventsDesktop,
            params,
            support
          } = swiper;
          const $el = scrollbar.$el;
          const target = $el[0];
          const activeListener = support.passiveListener && params.passiveListeners ? {
            passive: false,
            capture: false
          } : false;
          const passiveListener = support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          if (!target) return;
          const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  
          if (!support.touch) {
            target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
            document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
            document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
          } else {
            target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
            target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
            target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
          }
        }
  
        function enableDraggable() {
          if (!swiper.params.scrollbar.el) return;
          events('on');
        }
  
        function disableDraggable() {
          if (!swiper.params.scrollbar.el) return;
          events('off');
        }
  
        function init() {
          const {
            scrollbar,
            $el: $swiperEl
          } = swiper;
          swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
            el: 'swiper-scrollbar'
          });
          const params = swiper.params.scrollbar;
          if (!params.el) return;
          let $el = $(params.el);
  
          if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
            $el = $swiperEl.find(params.el);
          }
  
          let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);
  
          if ($dragEl.length === 0) {
            $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
            $el.append($dragEl);
          }
  
          Object.assign(scrollbar, {
            $el,
            el: $el[0],
            $dragEl,
            dragEl: $dragEl[0]
          });
  
          if (params.draggable) {
            enableDraggable();
          }
  
          if ($el) {
            $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
          }
        }
  
        function destroy() {
          disableDraggable();
        }
  
        on('init', () => {
          init();
          updateSize();
          setTranslate();
        });
        on('update resize observerUpdate lock unlock', () => {
          updateSize();
        });
        on('setTranslate', () => {
          setTranslate();
        });
        on('setTransition', (_s, duration) => {
          setTransition(duration);
        });
        on('enable disable', () => {
          const {
            $el
          } = swiper.scrollbar;
  
          if ($el) {
            $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
          }
        });
        on('destroy', () => {
          destroy();
        });
        Object.assign(swiper.scrollbar, {
          updateSize,
          setTranslate,
          init,
          destroy
        });
      }
  
      function Parallax(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          parallax: {
            enabled: false
          }
        });
  
        const setTransform = (el, progress) => {
          const {
            rtl
          } = swiper;
          const $el = $(el);
          const rtlFactor = rtl ? -1 : 1;
          const p = $el.attr('data-swiper-parallax') || '0';
          let x = $el.attr('data-swiper-parallax-x');
          let y = $el.attr('data-swiper-parallax-y');
          const scale = $el.attr('data-swiper-parallax-scale');
          const opacity = $el.attr('data-swiper-parallax-opacity');
  
          if (x || y) {
            x = x || '0';
            y = y || '0';
          } else if (swiper.isHorizontal()) {
            x = p;
            y = '0';
          } else {
            y = p;
            x = '0';
          }
  
          if (x.indexOf('%') >= 0) {
            x = `${parseInt(x, 10) * progress * rtlFactor}%`;
          } else {
            x = `${x * progress * rtlFactor}px`;
          }
  
          if (y.indexOf('%') >= 0) {
            y = `${parseInt(y, 10) * progress}%`;
          } else {
            y = `${y * progress}px`;
          }
  
          if (typeof opacity !== 'undefined' && opacity !== null) {
            const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
            $el[0].style.opacity = currentOpacity;
          }
  
          if (typeof scale === 'undefined' || scale === null) {
            $el.transform(`translate3d(${x}, ${y}, 0px)`);
          } else {
            const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
            $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
          }
        };
  
        const setTranslate = () => {
          const {
            $el,
            slides,
            progress,
            snapGrid
          } = swiper;
          $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
            setTransform(el, progress);
          });
          slides.each((slideEl, slideIndex) => {
            let slideProgress = slideEl.progress;
  
            if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
              slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
            }
  
            slideProgress = Math.min(Math.max(slideProgress, -1), 1);
            $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
              setTransform(el, slideProgress);
            });
          });
        };
  
        const setTransition = function (duration) {
          if (duration === void 0) {
            duration = swiper.params.speed;
          }
  
          const {
            $el
          } = swiper;
          $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(parallaxEl => {
            const $parallaxEl = $(parallaxEl);
            let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
            if (duration === 0) parallaxDuration = 0;
            $parallaxEl.transition(parallaxDuration);
          });
        };
  
        on('beforeInit', () => {
          if (!swiper.params.parallax.enabled) return;
          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        });
        on('init', () => {
          if (!swiper.params.parallax.enabled) return;
          setTranslate();
        });
        on('setTranslate', () => {
          if (!swiper.params.parallax.enabled) return;
          setTranslate();
        });
        on('setTransition', (_swiper, duration) => {
          if (!swiper.params.parallax.enabled) return;
          setTransition(duration);
        });
      }
  
      function Zoom(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        const window = getWindow();
        extendParams({
          zoom: {
            enabled: false,
            maxRatio: 3,
            minRatio: 1,
            toggle: true,
            containerClass: 'swiper-zoom-container',
            zoomedSlideClass: 'swiper-slide-zoomed'
          }
        });
        swiper.zoom = {
          enabled: false
        };
        let currentScale = 1;
        let isScaling = false;
        let gesturesEnabled;
        let fakeGestureTouched;
        let fakeGestureMoved;
        const gesture = {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3
        };
        const image = {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {}
        };
        const velocity = {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined
        };
        let scale = 1;
        Object.defineProperty(swiper.zoom, 'scale', {
          get() {
            return scale;
          },
  
          set(value) {
            if (scale !== value) {
              const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
              const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
              emit('zoomChange', value, imageEl, slideEl);
            }
  
            scale = value;
          }
  
        });
  
        function getDistanceBetweenTouches(e) {
          if (e.targetTouches.length < 2) return 1;
          const x1 = e.targetTouches[0].pageX;
          const y1 = e.targetTouches[0].pageY;
          const x2 = e.targetTouches[1].pageX;
          const y2 = e.targetTouches[1].pageY;
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          return distance;
        } // Events
  
  
        function onGestureStart(e) {
          const support = swiper.support;
          const params = swiper.params.zoom;
          fakeGestureTouched = false;
          fakeGestureMoved = false;
  
          if (!support.gestures) {
            if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
              return;
            }
  
            fakeGestureTouched = true;
            gesture.scaleStart = getDistanceBetweenTouches(e);
          }
  
          if (!gesture.$slideEl || !gesture.$slideEl.length) {
            gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
            if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
            gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
  
            if (gesture.$imageWrapEl.length === 0) {
              gesture.$imageEl = undefined;
              return;
            }
          }
  
          if (gesture.$imageEl) {
            gesture.$imageEl.transition(0);
          }
  
          isScaling = true;
        }
  
        function onGestureChange(e) {
          const support = swiper.support;
          const params = swiper.params.zoom;
          const zoom = swiper.zoom;
  
          if (!support.gestures) {
            if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
              return;
            }
  
            fakeGestureMoved = true;
            gesture.scaleMove = getDistanceBetweenTouches(e);
          }
  
          if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
            if (e.type === 'gesturechange') onGestureStart(e);
            return;
          }
  
          if (support.gestures) {
            zoom.scale = e.scale * currentScale;
          } else {
            zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
          }
  
          if (zoom.scale > gesture.maxRatio) {
            zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
          }
  
          if (zoom.scale < params.minRatio) {
            zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
          }
  
          gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
        }
  
        function onGestureEnd(e) {
          const device = swiper.device;
          const support = swiper.support;
          const params = swiper.params.zoom;
          const zoom = swiper.zoom;
  
          if (!support.gestures) {
            if (!fakeGestureTouched || !fakeGestureMoved) {
              return;
            }
  
            if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {
              return;
            }
  
            fakeGestureTouched = false;
            fakeGestureMoved = false;
          }
  
          if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
          zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
          gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
          currentScale = zoom.scale;
          isScaling = false;
          if (zoom.scale === 1) gesture.$slideEl = undefined;
        }
  
        function onTouchStart(e) {
          const device = swiper.device;
          if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
          if (image.isTouched) return;
          if (device.android && e.cancelable) e.preventDefault();
          image.isTouched = true;
          image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
          image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        }
  
        function onTouchMove(e) {
          const zoom = swiper.zoom;
          if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
          swiper.allowClick = false;
          if (!image.isTouched || !gesture.$slideEl) return;
  
          if (!image.isMoved) {
            image.width = gesture.$imageEl[0].offsetWidth;
            image.height = gesture.$imageEl[0].offsetHeight;
            image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
            image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
            gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
            gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
            gesture.$imageWrapEl.transition(0);
          } // Define if we need image drag
  
  
          const scaledWidth = image.width * zoom.scale;
          const scaledHeight = image.height * zoom.scale;
          if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
          image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
          image.maxX = -image.minX;
          image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
          image.maxY = -image.minY;
          image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
          image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
  
          if (!image.isMoved && !isScaling) {
            if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
              image.isTouched = false;
              return;
            }
  
            if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
              image.isTouched = false;
              return;
            }
          }
  
          if (e.cancelable) {
            e.preventDefault();
          }
  
          e.stopPropagation();
          image.isMoved = true;
          image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
          image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;
  
          if (image.currentX < image.minX) {
            image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
          }
  
          if (image.currentX > image.maxX) {
            image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
          }
  
          if (image.currentY < image.minY) {
            image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
          }
  
          if (image.currentY > image.maxY) {
            image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
          } // Velocity
  
  
          if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
          if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
          if (!velocity.prevTime) velocity.prevTime = Date.now();
          velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
          velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
          if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
          if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
          velocity.prevPositionX = image.touchesCurrent.x;
          velocity.prevPositionY = image.touchesCurrent.y;
          velocity.prevTime = Date.now();
          gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
        }
  
        function onTouchEnd() {
          const zoom = swiper.zoom;
          if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
  
          if (!image.isTouched || !image.isMoved) {
            image.isTouched = false;
            image.isMoved = false;
            return;
          }
  
          image.isTouched = false;
          image.isMoved = false;
          let momentumDurationX = 300;
          let momentumDurationY = 300;
          const momentumDistanceX = velocity.x * momentumDurationX;
          const newPositionX = image.currentX + momentumDistanceX;
          const momentumDistanceY = velocity.y * momentumDurationY;
          const newPositionY = image.currentY + momentumDistanceY; // Fix duration
  
          if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
          if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
          const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
          image.currentX = newPositionX;
          image.currentY = newPositionY; // Define if we need image drag
  
          const scaledWidth = image.width * zoom.scale;
          const scaledHeight = image.height * zoom.scale;
          image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
          image.maxX = -image.minX;
          image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
          image.maxY = -image.minY;
          image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
          image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
          gesture.$imageWrapEl.transition(momentumDuration).transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
        }
  
        function onTransitionEnd() {
          const zoom = swiper.zoom;
  
          if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
            if (gesture.$imageEl) {
              gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
            }
  
            if (gesture.$imageWrapEl) {
              gesture.$imageWrapEl.transform('translate3d(0,0,0)');
            }
  
            zoom.scale = 1;
            currentScale = 1;
            gesture.$slideEl = undefined;
            gesture.$imageEl = undefined;
            gesture.$imageWrapEl = undefined;
          }
        }
  
        function zoomIn(e) {
          const zoom = swiper.zoom;
          const params = swiper.params.zoom;
  
          if (!gesture.$slideEl) {
            if (e && e.target) {
              gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
            }
  
            if (!gesture.$slideEl) {
              if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
                gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
              } else {
                gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
              }
            }
  
            gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
          }
  
          if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;
  
          if (swiper.params.cssMode) {
            swiper.wrapperEl.style.overflow = 'hidden';
            swiper.wrapperEl.style.touchAction = 'none';
          }
  
          gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
          let touchX;
          let touchY;
          let offsetX;
          let offsetY;
          let diffX;
          let diffY;
          let translateX;
          let translateY;
          let imageWidth;
          let imageHeight;
          let scaledWidth;
          let scaledHeight;
          let translateMinX;
          let translateMinY;
          let translateMaxX;
          let translateMaxY;
          let slideWidth;
          let slideHeight;
  
          if (typeof image.touchesStart.x === 'undefined' && e) {
            touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
            touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
          } else {
            touchX = image.touchesStart.x;
            touchY = image.touchesStart.y;
          }
  
          zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
          currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
  
          if (e) {
            slideWidth = gesture.$slideEl[0].offsetWidth;
            slideHeight = gesture.$slideEl[0].offsetHeight;
            offsetX = gesture.$slideEl.offset().left + window.scrollX;
            offsetY = gesture.$slideEl.offset().top + window.scrollY;
            diffX = offsetX + slideWidth / 2 - touchX;
            diffY = offsetY + slideHeight / 2 - touchY;
            imageWidth = gesture.$imageEl[0].offsetWidth;
            imageHeight = gesture.$imageEl[0].offsetHeight;
            scaledWidth = imageWidth * zoom.scale;
            scaledHeight = imageHeight * zoom.scale;
            translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
            translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
            translateMaxX = -translateMinX;
            translateMaxY = -translateMinY;
            translateX = diffX * zoom.scale;
            translateY = diffY * zoom.scale;
  
            if (translateX < translateMinX) {
              translateX = translateMinX;
            }
  
            if (translateX > translateMaxX) {
              translateX = translateMaxX;
            }
  
            if (translateY < translateMinY) {
              translateY = translateMinY;
            }
  
            if (translateY > translateMaxY) {
              translateY = translateMaxY;
            }
          } else {
            translateX = 0;
            translateY = 0;
          }
  
          gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
          gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
        }
  
        function zoomOut() {
          const zoom = swiper.zoom;
          const params = swiper.params.zoom;
  
          if (!gesture.$slideEl) {
            if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
              gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
            } else {
              gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            }
  
            gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
          }
  
          if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;
  
          if (swiper.params.cssMode) {
            swiper.wrapperEl.style.overflow = '';
            swiper.wrapperEl.style.touchAction = '';
          }
  
          zoom.scale = 1;
          currentScale = 1;
          gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
          gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
          gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
          gesture.$slideEl = undefined;
        } // Toggle Zoom
  
  
        function zoomToggle(e) {
          const zoom = swiper.zoom;
  
          if (zoom.scale && zoom.scale !== 1) {
            // Zoom Out
            zoomOut();
          } else {
            // Zoom In
            zoomIn(e);
          }
        }
  
        function getListeners() {
          const support = swiper.support;
          const passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          const activeListenerWithCapture = support.passiveListener ? {
            passive: false,
            capture: true
          } : true;
          return {
            passiveListener,
            activeListenerWithCapture
          };
        }
  
        function getSlideSelector() {
          return `.${swiper.params.slideClass}`;
        }
  
        function toggleGestures(method) {
          const {
            passiveListener
          } = getListeners();
          const slideSelector = getSlideSelector();
          swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
          swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
          swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
        }
  
        function enableGestures() {
          if (gesturesEnabled) return;
          gesturesEnabled = true;
          toggleGestures('on');
        }
  
        function disableGestures() {
          if (!gesturesEnabled) return;
          gesturesEnabled = false;
          toggleGestures('off');
        } // Attach/Detach Events
  
  
        function enable() {
          const zoom = swiper.zoom;
          if (zoom.enabled) return;
          zoom.enabled = true;
          const support = swiper.support;
          const {
            passiveListener,
            activeListenerWithCapture
          } = getListeners();
          const slideSelector = getSlideSelector(); // Scale image
  
          if (support.gestures) {
            swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
            swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
          } else if (swiper.touchEvents.start === 'touchstart') {
            swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
            swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
            swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);
  
            if (swiper.touchEvents.cancel) {
              swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
            }
          } // Move image
  
  
          swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
        }
  
        function disable() {
          const zoom = swiper.zoom;
          if (!zoom.enabled) return;
          const support = swiper.support;
          zoom.enabled = false;
          const {
            passiveListener,
            activeListenerWithCapture
          } = getListeners();
          const slideSelector = getSlideSelector(); // Scale image
  
          if (support.gestures) {
            swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
            swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
          } else if (swiper.touchEvents.start === 'touchstart') {
            swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
            swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
            swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);
  
            if (swiper.touchEvents.cancel) {
              swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
            }
          } // Move image
  
  
          swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
        }
  
        on('init', () => {
          if (swiper.params.zoom.enabled) {
            enable();
          }
        });
        on('destroy', () => {
          disable();
        });
        on('touchStart', (_s, e) => {
          if (!swiper.zoom.enabled) return;
          onTouchStart(e);
        });
        on('touchEnd', (_s, e) => {
          if (!swiper.zoom.enabled) return;
          onTouchEnd();
        });
        on('doubleTap', (_s, e) => {
          if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
            zoomToggle(e);
          }
        });
        on('transitionEnd', () => {
          if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
            onTransitionEnd();
          }
        });
        on('slideChange', () => {
          if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
            onTransitionEnd();
          }
        });
        Object.assign(swiper.zoom, {
          enable,
          disable,
          in: zoomIn,
          out: zoomOut,
          toggle: zoomToggle
        });
      }
  
      function Lazy(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        extendParams({
          lazy: {
            checkInView: false,
            enabled: false,
            loadPrevNext: false,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: false,
            scrollingElement: '',
            elementClass: 'swiper-lazy',
            loadingClass: 'swiper-lazy-loading',
            loadedClass: 'swiper-lazy-loaded',
            preloaderClass: 'swiper-lazy-preloader'
          }
        });
        swiper.lazy = {};
        let scrollHandlerAttached = false;
        let initialImageLoaded = false;
  
        function loadInSlide(index, loadInDuplicate) {
          if (loadInDuplicate === void 0) {
            loadInDuplicate = true;
          }
  
          const params = swiper.params.lazy;
          if (typeof index === 'undefined') return;
          if (swiper.slides.length === 0) return;
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`) : swiper.slides.eq(index);
          const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);
  
          if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
            $images.push($slideEl[0]);
          }
  
          if ($images.length === 0) return;
          $images.each(imageEl => {
            const $imageEl = $(imageEl);
            $imageEl.addClass(params.loadingClass);
            const background = $imageEl.attr('data-background');
            const src = $imageEl.attr('data-src');
            const srcset = $imageEl.attr('data-srcset');
            const sizes = $imageEl.attr('data-sizes');
            const $pictureEl = $imageEl.parent('picture');
            swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
              if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;
  
              if (background) {
                $imageEl.css('background-image', `url("${background}")`);
                $imageEl.removeAttr('data-background');
              } else {
                if (srcset) {
                  $imageEl.attr('srcset', srcset);
                  $imageEl.removeAttr('data-srcset');
                }
  
                if (sizes) {
                  $imageEl.attr('sizes', sizes);
                  $imageEl.removeAttr('data-sizes');
                }
  
                if ($pictureEl.length) {
                  $pictureEl.children('source').each(sourceEl => {
                    const $source = $(sourceEl);
  
                    if ($source.attr('data-srcset')) {
                      $source.attr('srcset', $source.attr('data-srcset'));
                      $source.removeAttr('data-srcset');
                    }
                  });
                }
  
                if (src) {
                  $imageEl.attr('src', src);
                  $imageEl.removeAttr('data-src');
                }
              }
  
              $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
              $slideEl.find(`.${params.preloaderClass}`).remove();
  
              if (swiper.params.loop && loadInDuplicate) {
                const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
  
                if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                  const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`);
                  loadInSlide(originalSlide.index(), false);
                } else {
                  const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`);
                  loadInSlide(duplicatedSlide.index(), false);
                }
              }
  
              emit('lazyImageReady', $slideEl[0], $imageEl[0]);
  
              if (swiper.params.autoHeight) {
                swiper.updateAutoHeight();
              }
            });
            emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
          });
        }
  
        function load() {
          const {
            $wrapperEl,
            params: swiperParams,
            slides,
            activeIndex
          } = swiper;
          const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
          const params = swiperParams.lazy;
          let slidesPerView = swiperParams.slidesPerView;
  
          if (slidesPerView === 'auto') {
            slidesPerView = 0;
          }
  
          function slideExist(index) {
            if (isVirtual) {
              if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
                return true;
              }
            } else if (slides[index]) return true;
  
            return false;
          }
  
          function slideIndex(slideEl) {
            if (isVirtual) {
              return $(slideEl).attr('data-swiper-slide-index');
            }
  
            return $(slideEl).index();
          }
  
          if (!initialImageLoaded) initialImageLoaded = true;
  
          if (swiper.params.watchSlidesProgress) {
            $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {
              const index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
              loadInSlide(index);
            });
          } else if (slidesPerView > 1) {
            for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
              if (slideExist(i)) loadInSlide(i);
            }
          } else {
            loadInSlide(activeIndex);
          }
  
          if (params.loadPrevNext) {
            if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
              const amount = params.loadPrevNextAmount;
              const spv = Math.ceil(slidesPerView);
              const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
              const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides
  
              for (let i = activeIndex + spv; i < maxIndex; i += 1) {
                if (slideExist(i)) loadInSlide(i);
              } // Prev Slides
  
  
              for (let i = minIndex; i < activeIndex; i += 1) {
                if (slideExist(i)) loadInSlide(i);
              }
            } else {
              const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
              if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
              const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
              if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
            }
          }
        }
  
        function checkInViewOnLoad() {
          const window = getWindow();
          if (!swiper || swiper.destroyed) return;
          const $scrollElement = swiper.params.lazy.scrollingElement ? $(swiper.params.lazy.scrollingElement) : $(window);
          const isWindow = $scrollElement[0] === window;
          const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
          const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
          const swiperOffset = swiper.$el.offset();
          const {
            rtlTranslate: rtl
          } = swiper;
          let inView = false;
          if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
          const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];
  
          for (let i = 0; i < swiperCoord.length; i += 1) {
            const point = swiperCoord[i];
  
            if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
              if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
  
              inView = true;
            }
          }
  
          const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
  
          if (inView) {
            load();
            $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
          } else if (!scrollHandlerAttached) {
            scrollHandlerAttached = true;
            $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
          }
        }
  
        on('beforeInit', () => {
          if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
            swiper.params.preloadImages = false;
          }
        });
        on('init', () => {
          if (swiper.params.lazy.enabled) {
            if (swiper.params.lazy.checkInView) {
              checkInViewOnLoad();
            } else {
              load();
            }
          }
        });
        on('scroll', () => {
          if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
            load();
          }
        });
        on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
          if (swiper.params.lazy.enabled) {
            if (swiper.params.lazy.checkInView) {
              checkInViewOnLoad();
            } else {
              load();
            }
          }
        });
        on('transitionStart', () => {
          if (swiper.params.lazy.enabled) {
            if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {
              if (swiper.params.lazy.checkInView) {
                checkInViewOnLoad();
              } else {
                load();
              }
            }
          }
        });
        on('transitionEnd', () => {
          if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
            if (swiper.params.lazy.checkInView) {
              checkInViewOnLoad();
            } else {
              load();
            }
          }
        });
        on('slideChange', () => {
          const {
            lazy,
            cssMode,
            watchSlidesProgress,
            touchReleaseOnEdges,
            resistanceRatio
          } = swiper.params;
  
          if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {
            load();
          }
        });
        on('destroy', () => {
          if (!swiper.$el) return;
          swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);
        });
        Object.assign(swiper.lazy, {
          load,
          loadInSlide
        });
      }
  
      /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
      function Controller(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          controller: {
            control: undefined,
            inverse: false,
            by: 'slide' // or 'container'
  
          }
        });
        swiper.controller = {
          control: undefined
        };
  
        function LinearSpline(x, y) {
          const binarySearch = function search() {
            let maxIndex;
            let minIndex;
            let guess;
            return (array, val) => {
              minIndex = -1;
              maxIndex = array.length;
  
              while (maxIndex - minIndex > 1) {
                guess = maxIndex + minIndex >> 1;
  
                if (array[guess] <= val) {
                  minIndex = guess;
                } else {
                  maxIndex = guess;
                }
              }
  
              return maxIndex;
            };
          }();
  
          this.x = x;
          this.y = y;
          this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
          // (x1,y1) is the known point before given value,
          // (x3,y3) is the known point after given value.
  
          let i1;
          let i3;
  
          this.interpolate = function interpolate(x2) {
            if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):
  
            i3 = binarySearch(this.x, x2);
            i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
            // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
  
            return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
          };
  
          return this;
        } // xxx: for now i will just save one spline function to to
  
  
        function getInterpolateFunction(c) {
          if (!swiper.controller.spline) {
            swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
          }
        }
  
        function setTranslate(_t, byController) {
          const controlled = swiper.controller.control;
          let multiplier;
          let controlledTranslate;
          const Swiper = swiper.constructor;
  
          function setControlledTranslate(c) {
            // this will create an Interpolate function based on the snapGrids
            // x is the Grid of the scrolled scroller and y will be the controlled scroller
            // it makes sense to create this only once and recall it for the interpolation
            // the function does a lot of value caching for performance
            const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
  
            if (swiper.params.controller.by === 'slide') {
              getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
              // but it did not work out
  
              controlledTranslate = -swiper.controller.spline.interpolate(-translate);
            }
  
            if (!controlledTranslate || swiper.params.controller.by === 'container') {
              multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
              controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
            }
  
            if (swiper.params.controller.inverse) {
              controlledTranslate = c.maxTranslate() - controlledTranslate;
            }
  
            c.updateProgress(controlledTranslate);
            c.setTranslate(controlledTranslate, swiper);
            c.updateActiveIndex();
            c.updateSlidesClasses();
          }
  
          if (Array.isArray(controlled)) {
            for (let i = 0; i < controlled.length; i += 1) {
              if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                setControlledTranslate(controlled[i]);
              }
            }
          } else if (controlled instanceof Swiper && byController !== controlled) {
            setControlledTranslate(controlled);
          }
        }
  
        function setTransition(duration, byController) {
          const Swiper = swiper.constructor;
          const controlled = swiper.controller.control;
          let i;
  
          function setControlledTransition(c) {
            c.setTransition(duration, swiper);
  
            if (duration !== 0) {
              c.transitionStart();
  
              if (c.params.autoHeight) {
                nextTick(() => {
                  c.updateAutoHeight();
                });
              }
  
              c.$wrapperEl.transitionEnd(() => {
                if (!controlled) return;
  
                if (c.params.loop && swiper.params.controller.by === 'slide') {
                  c.loopFix();
                }
  
                c.transitionEnd();
              });
            }
          }
  
          if (Array.isArray(controlled)) {
            for (i = 0; i < controlled.length; i += 1) {
              if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                setControlledTransition(controlled[i]);
              }
            }
          } else if (controlled instanceof Swiper && byController !== controlled) {
            setControlledTransition(controlled);
          }
        }
  
        function removeSpline() {
          if (!swiper.controller.control) return;
  
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        }
  
        on('beforeInit', () => {
          swiper.controller.control = swiper.params.controller.control;
        });
        on('update', () => {
          removeSpline();
        });
        on('resize', () => {
          removeSpline();
        });
        on('observerUpdate', () => {
          removeSpline();
        });
        on('setTranslate', (_s, translate, byController) => {
          if (!swiper.controller.control) return;
          swiper.controller.setTranslate(translate, byController);
        });
        on('setTransition', (_s, duration, byController) => {
          if (!swiper.controller.control) return;
          swiper.controller.setTransition(duration, byController);
        });
        Object.assign(swiper.controller, {
          setTranslate,
          setTransition
        });
      }
  
      function A11y(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          a11y: {
            enabled: true,
            notificationClass: 'swiper-notification',
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            slideLabelMessage: '{{index}} / {{slidesLength}}',
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            itemRoleDescriptionMessage: null,
            slideRole: 'group',
            id: null
          }
        });
        let liveRegion = null;
  
        function notify(message) {
          const notification = liveRegion;
          if (notification.length === 0) return;
          notification.html('');
          notification.html(message);
        }
  
        function getRandomNumber(size) {
          if (size === void 0) {
            size = 16;
          }
  
          const randomChar = () => Math.round(16 * Math.random()).toString(16);
  
          return 'x'.repeat(size).replace(/x/g, randomChar);
        }
  
        function makeElFocusable($el) {
          $el.attr('tabIndex', '0');
        }
  
        function makeElNotFocusable($el) {
          $el.attr('tabIndex', '-1');
        }
  
        function addElRole($el, role) {
          $el.attr('role', role);
        }
  
        function addElRoleDescription($el, description) {
          $el.attr('aria-roledescription', description);
        }
  
        function addElControls($el, controls) {
          $el.attr('aria-controls', controls);
        }
  
        function addElLabel($el, label) {
          $el.attr('aria-label', label);
        }
  
        function addElId($el, id) {
          $el.attr('id', id);
        }
  
        function addElLive($el, live) {
          $el.attr('aria-live', live);
        }
  
        function disableEl($el) {
          $el.attr('aria-disabled', true);
        }
  
        function enableEl($el) {
          $el.attr('aria-disabled', false);
        }
  
        function onEnterOrSpaceKey(e) {
          if (e.keyCode !== 13 && e.keyCode !== 32) return;
          const params = swiper.params.a11y;
          const $targetEl = $(e.target);
  
          if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
            if (!(swiper.isEnd && !swiper.params.loop)) {
              swiper.slideNext();
            }
  
            if (swiper.isEnd) {
              notify(params.lastSlideMessage);
            } else {
              notify(params.nextSlideMessage);
            }
          }
  
          if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
            if (!(swiper.isBeginning && !swiper.params.loop)) {
              swiper.slidePrev();
            }
  
            if (swiper.isBeginning) {
              notify(params.firstSlideMessage);
            } else {
              notify(params.prevSlideMessage);
            }
          }
  
          if (swiper.pagination && $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))) {
            $targetEl[0].click();
          }
        }
  
        function updateNavigation() {
          if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
          const {
            $nextEl,
            $prevEl
          } = swiper.navigation;
  
          if ($prevEl && $prevEl.length > 0) {
            if (swiper.isBeginning) {
              disableEl($prevEl);
              makeElNotFocusable($prevEl);
            } else {
              enableEl($prevEl);
              makeElFocusable($prevEl);
            }
          }
  
          if ($nextEl && $nextEl.length > 0) {
            if (swiper.isEnd) {
              disableEl($nextEl);
              makeElNotFocusable($nextEl);
            } else {
              enableEl($nextEl);
              makeElFocusable($nextEl);
            }
          }
        }
  
        function hasPagination() {
          return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
        }
  
        function hasClickablePagination() {
          return hasPagination() && swiper.params.pagination.clickable;
        }
  
        function updatePagination() {
          const params = swiper.params.a11y;
          if (!hasPagination()) return;
          swiper.pagination.bullets.each(bulletEl => {
            const $bulletEl = $(bulletEl);
  
            if (swiper.params.pagination.clickable) {
              makeElFocusable($bulletEl);
  
              if (!swiper.params.pagination.renderBullet) {
                addElRole($bulletEl, 'button');
                addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
              }
            }
  
            if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
              $bulletEl.attr('aria-current', 'true');
            } else {
              $bulletEl.removeAttr('aria-current');
            }
          });
        }
  
        const initNavEl = ($el, wrapperId, message) => {
          makeElFocusable($el);
  
          if ($el[0].tagName !== 'BUTTON') {
            addElRole($el, 'button');
            $el.on('keydown', onEnterOrSpaceKey);
          }
  
          addElLabel($el, message);
          addElControls($el, wrapperId);
        };
  
        const handleFocus = e => {
          const slideEl = e.target.closest(`.${swiper.params.slideClass}`);
          if (!slideEl || !swiper.slides.includes(slideEl)) return;
          const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
          const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
          if (isActive || isVisible) return;
          swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
        };
  
        const initSlides = () => {
          const params = swiper.params.a11y;
  
          if (params.itemRoleDescriptionMessage) {
            addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
          }
  
          addElRole($(swiper.slides), params.slideRole);
          const slidesLength = swiper.params.loop ? swiper.slides.filter(el => !el.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;
          swiper.slides.each((slideEl, index) => {
            const $slideEl = $(slideEl);
            const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;
            const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
            addElLabel($slideEl, ariaLabelMessage);
          });
        };
  
        const init = () => {
          const params = swiper.params.a11y;
          swiper.$el.append(liveRegion); // Container
  
          const $containerEl = swiper.$el;
  
          if (params.containerRoleDescriptionMessage) {
            addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
          }
  
          if (params.containerMessage) {
            addElLabel($containerEl, params.containerMessage);
          } // Wrapper
  
  
          const $wrapperEl = swiper.$wrapperEl;
          const wrapperId = params.id || $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;
          const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
          addElId($wrapperEl, wrapperId);
          addElLive($wrapperEl, live); // Slide
  
          initSlides(); // Navigation
  
          let $nextEl;
          let $prevEl;
  
          if (swiper.navigation && swiper.navigation.$nextEl) {
            $nextEl = swiper.navigation.$nextEl;
          }
  
          if (swiper.navigation && swiper.navigation.$prevEl) {
            $prevEl = swiper.navigation.$prevEl;
          }
  
          if ($nextEl && $nextEl.length) {
            initNavEl($nextEl, wrapperId, params.nextSlideMessage);
          }
  
          if ($prevEl && $prevEl.length) {
            initNavEl($prevEl, wrapperId, params.prevSlideMessage);
          } // Pagination
  
  
          if (hasClickablePagination()) {
            swiper.pagination.$el.on('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
          } // Tab focus
  
  
          swiper.$el.on('focus', handleFocus, true);
        };
  
        function destroy() {
          if (liveRegion && liveRegion.length > 0) liveRegion.remove();
          let $nextEl;
          let $prevEl;
  
          if (swiper.navigation && swiper.navigation.$nextEl) {
            $nextEl = swiper.navigation.$nextEl;
          }
  
          if (swiper.navigation && swiper.navigation.$prevEl) {
            $prevEl = swiper.navigation.$prevEl;
          }
  
          if ($nextEl) {
            $nextEl.off('keydown', onEnterOrSpaceKey);
          }
  
          if ($prevEl) {
            $prevEl.off('keydown', onEnterOrSpaceKey);
          } // Pagination
  
  
          if (hasClickablePagination()) {
            swiper.pagination.$el.off('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
          } // Tab focus
  
  
          swiper.$el.off('focus', handleFocus, true);
        }
  
        on('beforeInit', () => {
          liveRegion = $(`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
        });
        on('afterInit', () => {
          if (!swiper.params.a11y.enabled) return;
          init();
        });
        on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
          if (!swiper.params.a11y.enabled) return;
          initSlides();
        });
        on('fromEdge toEdge afterInit lock unlock', () => {
          if (!swiper.params.a11y.enabled) return;
          updateNavigation();
        });
        on('paginationUpdate', () => {
          if (!swiper.params.a11y.enabled) return;
          updatePagination();
        });
        on('destroy', () => {
          if (!swiper.params.a11y.enabled) return;
          destroy();
        });
      }
  
      function History(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          history: {
            enabled: false,
            root: '',
            replaceState: false,
            key: 'slides',
            keepQuery: false
          }
        });
        let initialized = false;
        let paths = {};
  
        const slugify = text => {
          return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
        };
  
        const getPathValues = urlOverride => {
          const window = getWindow();
          let location;
  
          if (urlOverride) {
            location = new URL(urlOverride);
          } else {
            location = window.location;
          }
  
          const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
          const total = pathArray.length;
          const key = pathArray[total - 2];
          const value = pathArray[total - 1];
          return {
            key,
            value
          };
        };
  
        const setHistory = (key, index) => {
          const window = getWindow();
          if (!initialized || !swiper.params.history.enabled) return;
          let location;
  
          if (swiper.params.url) {
            location = new URL(swiper.params.url);
          } else {
            location = window.location;
          }
  
          const slide = swiper.slides.eq(index);
          let value = slugify(slide.attr('data-history'));
  
          if (swiper.params.history.root.length > 0) {
            let root = swiper.params.history.root;
            if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
            value = `${root}/${key}/${value}`;
          } else if (!location.pathname.includes(key)) {
            value = `${key}/${value}`;
          }
  
          if (swiper.params.history.keepQuery) {
            value += location.search;
          }
  
          const currentState = window.history.state;
  
          if (currentState && currentState.value === value) {
            return;
          }
  
          if (swiper.params.history.replaceState) {
            window.history.replaceState({
              value
            }, null, value);
          } else {
            window.history.pushState({
              value
            }, null, value);
          }
        };
  
        const scrollToSlide = (speed, value, runCallbacks) => {
          if (value) {
            for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
              const slide = swiper.slides.eq(i);
              const slideHistory = slugify(slide.attr('data-history'));
  
              if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                const index = slide.index();
                swiper.slideTo(index, speed, runCallbacks);
              }
            }
          } else {
            swiper.slideTo(0, speed, runCallbacks);
          }
        };
  
        const setHistoryPopState = () => {
          paths = getPathValues(swiper.params.url);
          scrollToSlide(swiper.params.speed, paths.value, false);
        };
  
        const init = () => {
          const window = getWindow();
          if (!swiper.params.history) return;
  
          if (!window.history || !window.history.pushState) {
            swiper.params.history.enabled = false;
            swiper.params.hashNavigation.enabled = true;
            return;
          }
  
          initialized = true;
          paths = getPathValues(swiper.params.url);
          if (!paths.key && !paths.value) return;
          scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
  
          if (!swiper.params.history.replaceState) {
            window.addEventListener('popstate', setHistoryPopState);
          }
        };
  
        const destroy = () => {
          const window = getWindow();
  
          if (!swiper.params.history.replaceState) {
            window.removeEventListener('popstate', setHistoryPopState);
          }
        };
  
        on('init', () => {
          if (swiper.params.history.enabled) {
            init();
          }
        });
        on('destroy', () => {
          if (swiper.params.history.enabled) {
            destroy();
          }
        });
        on('transitionEnd _freeModeNoMomentumRelease', () => {
          if (initialized) {
            setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        });
        on('slideChange', () => {
          if (initialized && swiper.params.cssMode) {
            setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        });
      }
  
      function HashNavigation(_ref) {
        let {
          swiper,
          extendParams,
          emit,
          on
        } = _ref;
        let initialized = false;
        const document = getDocument();
        const window = getWindow();
        extendParams({
          hashNavigation: {
            enabled: false,
            replaceState: false,
            watchState: false
          }
        });
  
        const onHashChange = () => {
          emit('hashChange');
          const newHash = document.location.hash.replace('#', '');
          const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
  
          if (newHash !== activeSlideHash) {
            const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`).index();
            if (typeof newIndex === 'undefined') return;
            swiper.slideTo(newIndex);
          }
        };
  
        const setHash = () => {
          if (!initialized || !swiper.params.hashNavigation.enabled) return;
  
          if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
            window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');
            emit('hashSet');
          } else {
            const slide = swiper.slides.eq(swiper.activeIndex);
            const hash = slide.attr('data-hash') || slide.attr('data-history');
            document.location.hash = hash || '';
            emit('hashSet');
          }
        };
  
        const init = () => {
          if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
          initialized = true;
          const hash = document.location.hash.replace('#', '');
  
          if (hash) {
            const speed = 0;
  
            for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
              const slide = swiper.slides.eq(i);
              const slideHash = slide.attr('data-hash') || slide.attr('data-history');
  
              if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                const index = slide.index();
                swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
              }
            }
          }
  
          if (swiper.params.hashNavigation.watchState) {
            $(window).on('hashchange', onHashChange);
          }
        };
  
        const destroy = () => {
          if (swiper.params.hashNavigation.watchState) {
            $(window).off('hashchange', onHashChange);
          }
        };
  
        on('init', () => {
          if (swiper.params.hashNavigation.enabled) {
            init();
          }
        });
        on('destroy', () => {
          if (swiper.params.hashNavigation.enabled) {
            destroy();
          }
        });
        on('transitionEnd _freeModeNoMomentumRelease', () => {
          if (initialized) {
            setHash();
          }
        });
        on('slideChange', () => {
          if (initialized && swiper.params.cssMode) {
            setHash();
          }
        });
      }
  
      /* eslint no-underscore-dangle: "off" */
      function Autoplay(_ref) {
        let {
          swiper,
          extendParams,
          on,
          emit
        } = _ref;
        let timeout;
        swiper.autoplay = {
          running: false,
          paused: false
        };
        extendParams({
          autoplay: {
            enabled: false,
            delay: 3000,
            waitForTransition: true,
            disableOnInteraction: true,
            stopOnLastSlide: false,
            reverseDirection: false,
            pauseOnMouseEnter: false
          }
        });
  
        function run() {
          const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
          let delay = swiper.params.autoplay.delay;
  
          if ($activeSlideEl.attr('data-swiper-autoplay')) {
            delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
          }
  
          const proceed = () => {
            let autoplayResult;
  
            if (swiper.params.autoplay.reverseDirection) {
              if (swiper.params.loop) {
                swiper.loopFix();
                autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                emit('autoplay');
              } else if (!swiper.isBeginning) {
                autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                emit('autoplay');
              } else if (!swiper.params.autoplay.stopOnLastSlide) {
                autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                emit('autoplay');
              } else {
                stop();
              }
            } else if (swiper.params.loop) {
              swiper.loopFix();
              autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.isEnd) {
              autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
              emit('autoplay');
            } else {
              stop();
            }
  
            if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
              run();
            }
          };
  
          clearTimeout(timeout);
  
          if (delay === 0) {
            proceed();
            return;
          }
  
          timeout = nextTick(() => {
            proceed();
          }, delay);
        }
  
        function start() {
          if (typeof timeout !== 'undefined') return false;
          if (swiper.autoplay.running) return false;
          swiper.autoplay.running = true;
          emit('autoplayStart');
          run();
          return true;
        }
  
        function stop() {
          if (!swiper.autoplay.running) return false;
          if (typeof timeout === 'undefined') return false;
  
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
  
          swiper.autoplay.running = false;
          emit('autoplayStop');
          return true;
        }
  
        function pause(speed) {
          if (!swiper.autoplay.running) return;
          if (swiper.autoplay.paused) return;
          if (timeout) clearTimeout(timeout);
          swiper.autoplay.paused = true;
  
          if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
            swiper.autoplay.paused = false;
            run();
          } else {
            ['transitionend', 'webkitTransitionEnd'].forEach(event => {
              swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
            });
          }
        }
  
        function onVisibilityChange() {
          const document = getDocument();
  
          if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
            pause();
          }
  
          if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
            run();
            swiper.autoplay.paused = false;
          }
        }
  
        function onTransitionEnd(e) {
          if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
          if (e.target !== swiper.$wrapperEl[0]) return;
          ['transitionend', 'webkitTransitionEnd'].forEach(event => {
            swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
          });
          swiper.autoplay.paused = false;
  
          if (!swiper.autoplay.running) {
            stop();
          } else {
            run();
          }
        }
  
        function onMouseEnter() {
          if (swiper.params.autoplay.disableOnInteraction) {
            stop();
          } else {
            emit('autoplayPause');
            pause();
          }
  
          ['transitionend', 'webkitTransitionEnd'].forEach(event => {
            swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
          });
        }
  
        function onMouseLeave() {
          if (swiper.params.autoplay.disableOnInteraction) {
            return;
          }
  
          swiper.autoplay.paused = false;
          emit('autoplayResume');
          run();
        }
  
        function attachMouseEvents() {
          if (swiper.params.autoplay.pauseOnMouseEnter) {
            swiper.$el.on('mouseenter', onMouseEnter);
            swiper.$el.on('mouseleave', onMouseLeave);
          }
        }
  
        function detachMouseEvents() {
          swiper.$el.off('mouseenter', onMouseEnter);
          swiper.$el.off('mouseleave', onMouseLeave);
        }
  
        on('init', () => {
          if (swiper.params.autoplay.enabled) {
            start();
            const document = getDocument();
            document.addEventListener('visibilitychange', onVisibilityChange);
            attachMouseEvents();
          }
        });
        on('beforeTransitionStart', (_s, speed, internal) => {
          if (swiper.autoplay.running) {
            if (internal || !swiper.params.autoplay.disableOnInteraction) {
              swiper.autoplay.pause(speed);
            } else {
              stop();
            }
          }
        });
        on('sliderFirstMove', () => {
          if (swiper.autoplay.running) {
            if (swiper.params.autoplay.disableOnInteraction) {
              stop();
            } else {
              pause();
            }
          }
        });
        on('touchEnd', () => {
          if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
            run();
          }
        });
        on('destroy', () => {
          detachMouseEvents();
  
          if (swiper.autoplay.running) {
            stop();
          }
  
          const document = getDocument();
          document.removeEventListener('visibilitychange', onVisibilityChange);
        });
        Object.assign(swiper.autoplay, {
          pause,
          run,
          start,
          stop
        });
      }
  
      function Thumb(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          thumbs: {
            swiper: null,
            multipleActiveThumbs: true,
            autoScrollOffset: 0,
            slideThumbActiveClass: 'swiper-slide-thumb-active',
            thumbsContainerClass: 'swiper-thumbs'
          }
        });
        let initialized = false;
        let swiperCreated = false;
        swiper.thumbs = {
          swiper: null
        };
  
        function onThumbClick() {
          const thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper || thumbsSwiper.destroyed) return;
          const clickedIndex = thumbsSwiper.clickedIndex;
          const clickedSlide = thumbsSwiper.clickedSlide;
          if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
          if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
          let slideToIndex;
  
          if (thumbsSwiper.params.loop) {
            slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
          } else {
            slideToIndex = clickedIndex;
          }
  
          if (swiper.params.loop) {
            let currentIndex = swiper.activeIndex;
  
            if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
              swiper.loopFix(); // eslint-disable-next-line
  
              swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
              currentIndex = swiper.activeIndex;
            }
  
            const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
            const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
            if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
          }
  
          swiper.slideTo(slideToIndex);
        }
  
        function init() {
          const {
            thumbs: thumbsParams
          } = swiper.params;
          if (initialized) return false;
          initialized = true;
          const SwiperClass = swiper.constructor;
  
          if (thumbsParams.swiper instanceof SwiperClass) {
            swiper.thumbs.swiper = thumbsParams.swiper;
            Object.assign(swiper.thumbs.swiper.originalParams, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            });
            Object.assign(swiper.thumbs.swiper.params, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            });
          } else if (isObject(thumbsParams.swiper)) {
            const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
            Object.assign(thumbsSwiperParams, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            });
            swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
            swiperCreated = true;
          }
  
          swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
          swiper.thumbs.swiper.on('tap', onThumbClick);
          return true;
        }
  
        function update(initial) {
          const thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper || thumbsSwiper.destroyed) return;
          const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
          const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
          const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
  
          if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
            let currentThumbsIndex = thumbsSwiper.activeIndex;
            let newThumbsIndex;
            let direction;
  
            if (thumbsSwiper.params.loop) {
              if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
                thumbsSwiper.loopFix(); // eslint-disable-next-line
  
                thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
                currentThumbsIndex = thumbsSwiper.activeIndex;
              } // Find actual thumbs index to slide to
  
  
              const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
              const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
  
              if (typeof prevThumbsIndex === 'undefined') {
                newThumbsIndex = nextThumbsIndex;
              } else if (typeof nextThumbsIndex === 'undefined') {
                newThumbsIndex = prevThumbsIndex;
              } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
                newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
              } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
                newThumbsIndex = nextThumbsIndex;
              } else {
                newThumbsIndex = prevThumbsIndex;
              }
  
              direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
            } else {
              newThumbsIndex = swiper.realIndex;
              direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
            }
  
            if (useOffset) {
              newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
            }
  
            if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
              if (thumbsSwiper.params.centeredSlides) {
                if (newThumbsIndex > currentThumbsIndex) {
                  newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
                } else {
                  newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
                }
              } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
  
              thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
            }
          } // Activate thumbs
  
  
          let thumbsToActivate = 1;
          const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
  
          if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
            thumbsToActivate = swiper.params.slidesPerView;
          }
  
          if (!swiper.params.thumbs.multipleActiveThumbs) {
            thumbsToActivate = 1;
          }
  
          thumbsToActivate = Math.floor(thumbsToActivate);
          thumbsSwiper.slides.removeClass(thumbActiveClass);
  
          if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
            for (let i = 0; i < thumbsToActivate; i += 1) {
              thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass);
            }
          } else {
            for (let i = 0; i < thumbsToActivate; i += 1) {
              thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
            }
          }
        }
  
        on('beforeInit', () => {
          const {
            thumbs
          } = swiper.params;
          if (!thumbs || !thumbs.swiper) return;
          init();
          update(true);
        });
        on('slideChange update resize observerUpdate', () => {
          update();
        });
        on('setTransition', (_s, duration) => {
          const thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper || thumbsSwiper.destroyed) return;
          thumbsSwiper.setTransition(duration);
        });
        on('beforeDestroy', () => {
          const thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper || thumbsSwiper.destroyed) return;
  
          if (swiperCreated) {
            thumbsSwiper.destroy();
          }
        });
        Object.assign(swiper.thumbs, {
          init,
          update
        });
      }
  
      function freeMode(_ref) {
        let {
          swiper,
          extendParams,
          emit,
          once
        } = _ref;
        extendParams({
          freeMode: {
            enabled: false,
            momentum: true,
            momentumRatio: 1,
            momentumBounce: true,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: false,
            minimumVelocity: 0.02
          }
        });
  
        function onTouchStart() {
          const translate = swiper.getTranslate();
          swiper.setTranslate(translate);
          swiper.setTransition(0);
          swiper.touchEventsData.velocities.length = 0;
          swiper.freeMode.onTouchEnd({
            currentPos: swiper.rtl ? swiper.translate : -swiper.translate
          });
        }
  
        function onTouchMove() {
          const {
            touchEventsData: data,
            touches
          } = swiper; // Velocity
  
          if (data.velocities.length === 0) {
            data.velocities.push({
              position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
              time: data.touchStartTime
            });
          }
  
          data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
            time: now()
          });
        }
  
        function onTouchEnd(_ref2) {
          let {
            currentPos
          } = _ref2;
          const {
            params,
            $wrapperEl,
            rtlTranslate: rtl,
            snapGrid,
            touchEventsData: data
          } = swiper; // Time diff
  
          const touchEndTime = now();
          const timeDiff = touchEndTime - data.touchStartTime;
  
          if (currentPos < -swiper.minTranslate()) {
            swiper.slideTo(swiper.activeIndex);
            return;
          }
  
          if (currentPos > -swiper.maxTranslate()) {
            if (swiper.slides.length < snapGrid.length) {
              swiper.slideTo(snapGrid.length - 1);
            } else {
              swiper.slideTo(swiper.slides.length - 1);
            }
  
            return;
          }
  
          if (params.freeMode.momentum) {
            if (data.velocities.length > 1) {
              const lastMoveEvent = data.velocities.pop();
              const velocityEvent = data.velocities.pop();
              const distance = lastMoveEvent.position - velocityEvent.position;
              const time = lastMoveEvent.time - velocityEvent.time;
              swiper.velocity = distance / time;
              swiper.velocity /= 2;
  
              if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
                swiper.velocity = 0;
              } // this implies that the user stopped moving a finger then released.
              // There would be no events with distance zero, so the last event is stale.
  
  
              if (time > 150 || now() - lastMoveEvent.time > 300) {
                swiper.velocity = 0;
              }
            } else {
              swiper.velocity = 0;
            }
  
            swiper.velocity *= params.freeMode.momentumVelocityRatio;
            data.velocities.length = 0;
            let momentumDuration = 1000 * params.freeMode.momentumRatio;
            const momentumDistance = swiper.velocity * momentumDuration;
            let newPosition = swiper.translate + momentumDistance;
            if (rtl) newPosition = -newPosition;
            let doBounce = false;
            let afterBouncePosition;
            const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
            let needsLoopFix;
  
            if (newPosition < swiper.maxTranslate()) {
              if (params.freeMode.momentumBounce) {
                if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                  newPosition = swiper.maxTranslate() - bounceAmount;
                }
  
                afterBouncePosition = swiper.maxTranslate();
                doBounce = true;
                data.allowMomentumBounce = true;
              } else {
                newPosition = swiper.maxTranslate();
              }
  
              if (params.loop && params.centeredSlides) needsLoopFix = true;
            } else if (newPosition > swiper.minTranslate()) {
              if (params.freeMode.momentumBounce) {
                if (newPosition - swiper.minTranslate() > bounceAmount) {
                  newPosition = swiper.minTranslate() + bounceAmount;
                }
  
                afterBouncePosition = swiper.minTranslate();
                doBounce = true;
                data.allowMomentumBounce = true;
              } else {
                newPosition = swiper.minTranslate();
              }
  
              if (params.loop && params.centeredSlides) needsLoopFix = true;
            } else if (params.freeMode.sticky) {
              let nextSlide;
  
              for (let j = 0; j < snapGrid.length; j += 1) {
                if (snapGrid[j] > -newPosition) {
                  nextSlide = j;
                  break;
                }
              }
  
              if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
                newPosition = snapGrid[nextSlide];
              } else {
                newPosition = snapGrid[nextSlide - 1];
              }
  
              newPosition = -newPosition;
            }
  
            if (needsLoopFix) {
              once('transitionEnd', () => {
                swiper.loopFix();
              });
            } // Fix duration
  
  
            if (swiper.velocity !== 0) {
              if (rtl) {
                momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
              } else {
                momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
              }
  
              if (params.freeMode.sticky) {
                // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
                // event, then durations can be 20+ seconds to slide one (or zero!) slides.
                // It's easy to see this when simulating touch with mouse events. To fix this,
                // limit single-slide swipes to the default slide duration. This also has the
                // nice side effect of matching slide speed if the user stopped moving before
                // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
                // For faster swipes, also apply limits (albeit higher ones).
                const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
                const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
  
                if (moveDistance < currentSlideSize) {
                  momentumDuration = params.speed;
                } else if (moveDistance < 2 * currentSlideSize) {
                  momentumDuration = params.speed * 1.5;
                } else {
                  momentumDuration = params.speed * 2.5;
                }
              }
            } else if (params.freeMode.sticky) {
              swiper.slideToClosest();
              return;
            }
  
            if (params.freeMode.momentumBounce && doBounce) {
              swiper.updateProgress(afterBouncePosition);
              swiper.setTransition(momentumDuration);
              swiper.setTranslate(newPosition);
              swiper.transitionStart(true, swiper.swipeDirection);
              swiper.animating = true;
              $wrapperEl.transitionEnd(() => {
                if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
                emit('momentumBounce');
                swiper.setTransition(params.speed);
                setTimeout(() => {
                  swiper.setTranslate(afterBouncePosition);
                  $wrapperEl.transitionEnd(() => {
                    if (!swiper || swiper.destroyed) return;
                    swiper.transitionEnd();
                  });
                }, 0);
              });
            } else if (swiper.velocity) {
              emit('_freeModeNoMomentumRelease');
              swiper.updateProgress(newPosition);
              swiper.setTransition(momentumDuration);
              swiper.setTranslate(newPosition);
              swiper.transitionStart(true, swiper.swipeDirection);
  
              if (!swiper.animating) {
                swiper.animating = true;
                $wrapperEl.transitionEnd(() => {
                  if (!swiper || swiper.destroyed) return;
                  swiper.transitionEnd();
                });
              }
            } else {
              swiper.updateProgress(newPosition);
            }
  
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          } else if (params.freeMode.sticky) {
            swiper.slideToClosest();
            return;
          } else if (params.freeMode) {
            emit('_freeModeNoMomentumRelease');
          }
  
          if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          }
        }
  
        Object.assign(swiper, {
          freeMode: {
            onTouchStart,
            onTouchMove,
            onTouchEnd
          }
        });
      }
  
      function Grid(_ref) {
        let {
          swiper,
          extendParams
        } = _ref;
        extendParams({
          grid: {
            rows: 1,
            fill: 'column'
          }
        });
        let slidesNumberEvenToRows;
        let slidesPerRow;
        let numFullColumns;
  
        const initSlides = slidesLength => {
          const {
            slidesPerView
          } = swiper.params;
          const {
            rows,
            fill
          } = swiper.params.grid;
          slidesPerRow = slidesNumberEvenToRows / rows;
          numFullColumns = Math.floor(slidesLength / rows);
  
          if (Math.floor(slidesLength / rows) === slidesLength / rows) {
            slidesNumberEvenToRows = slidesLength;
          } else {
            slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
          }
  
          if (slidesPerView !== 'auto' && fill === 'row') {
            slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
          }
        };
  
        const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
          const {
            slidesPerGroup,
            spaceBetween
          } = swiper.params;
          const {
            rows,
            fill
          } = swiper.params.grid; // Set slides order
  
          let newSlideOrderIndex;
          let column;
          let row;
  
          if (fill === 'row' && slidesPerGroup > 1) {
            const groupIndex = Math.floor(i / (slidesPerGroup * rows));
            const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
            const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
            row = Math.floor(slideIndexInGroup / columnsInGroup);
            column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
            newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
            slide.css({
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex
            });
          } else if (fill === 'column') {
            column = Math.floor(i / rows);
            row = i - column * rows;
  
            if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
              row += 1;
  
              if (row >= rows) {
                row = 0;
                column += 1;
              }
            }
          } else {
            row = Math.floor(i / slidesPerRow);
            column = i - row * slidesPerRow;
          }
  
          slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
        };
  
        const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
          const {
            spaceBetween,
            centeredSlides,
            roundLengths
          } = swiper.params;
          const {
            rows
          } = swiper.params.grid;
          swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
          swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
          swiper.$wrapperEl.css({
            [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`
          });
  
          if (centeredSlides) {
            snapGrid.splice(0, snapGrid.length);
            const newSlidesGrid = [];
  
            for (let i = 0; i < snapGrid.length; i += 1) {
              let slidesGridItem = snapGrid[i];
              if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
              if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
            }
  
            snapGrid.push(...newSlidesGrid);
          }
        };
  
        swiper.grid = {
          initSlides,
          updateSlide,
          updateWrapperSize
        };
      }
  
      function appendSlide(slides) {
        const swiper = this;
        const {
          $wrapperEl,
          params
        } = swiper;
  
        if (params.loop) {
          swiper.loopDestroy();
        }
  
        if (typeof slides === 'object' && 'length' in slides) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) $wrapperEl.append(slides[i]);
          }
        } else {
          $wrapperEl.append(slides);
        }
  
        if (params.loop) {
          swiper.loopCreate();
        }
  
        if (!params.observer) {
          swiper.update();
        }
      }
  
      function prependSlide(slides) {
        const swiper = this;
        const {
          params,
          $wrapperEl,
          activeIndex
        } = swiper;
  
        if (params.loop) {
          swiper.loopDestroy();
        }
  
        let newActiveIndex = activeIndex + 1;
  
        if (typeof slides === 'object' && 'length' in slides) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) $wrapperEl.prepend(slides[i]);
          }
  
          newActiveIndex = activeIndex + slides.length;
        } else {
          $wrapperEl.prepend(slides);
        }
  
        if (params.loop) {
          swiper.loopCreate();
        }
  
        if (!params.observer) {
          swiper.update();
        }
  
        swiper.slideTo(newActiveIndex, 0, false);
      }
  
      function addSlide(index, slides) {
        const swiper = this;
        const {
          $wrapperEl,
          params,
          activeIndex
        } = swiper;
        let activeIndexBuffer = activeIndex;
  
        if (params.loop) {
          activeIndexBuffer -= swiper.loopedSlides;
          swiper.loopDestroy();
          swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
        }
  
        const baseLength = swiper.slides.length;
  
        if (index <= 0) {
          swiper.prependSlide(slides);
          return;
        }
  
        if (index >= baseLength) {
          swiper.appendSlide(slides);
          return;
        }
  
        let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
        const slidesBuffer = [];
  
        for (let i = baseLength - 1; i >= index; i -= 1) {
          const currentSlide = swiper.slides.eq(i);
          currentSlide.remove();
          slidesBuffer.unshift(currentSlide);
        }
  
        if (typeof slides === 'object' && 'length' in slides) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) $wrapperEl.append(slides[i]);
          }
  
          newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
        } else {
          $wrapperEl.append(slides);
        }
  
        for (let i = 0; i < slidesBuffer.length; i += 1) {
          $wrapperEl.append(slidesBuffer[i]);
        }
  
        if (params.loop) {
          swiper.loopCreate();
        }
  
        if (!params.observer) {
          swiper.update();
        }
  
        if (params.loop) {
          swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
        } else {
          swiper.slideTo(newActiveIndex, 0, false);
        }
      }
  
      function removeSlide(slidesIndexes) {
        const swiper = this;
        const {
          params,
          $wrapperEl,
          activeIndex
        } = swiper;
        let activeIndexBuffer = activeIndex;
  
        if (params.loop) {
          activeIndexBuffer -= swiper.loopedSlides;
          swiper.loopDestroy();
          swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
        }
  
        let newActiveIndex = activeIndexBuffer;
        let indexToRemove;
  
        if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
          for (let i = 0; i < slidesIndexes.length; i += 1) {
            indexToRemove = slidesIndexes[i];
            if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
            if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
          }
  
          newActiveIndex = Math.max(newActiveIndex, 0);
        } else {
          indexToRemove = slidesIndexes;
          if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
          if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
          newActiveIndex = Math.max(newActiveIndex, 0);
        }
  
        if (params.loop) {
          swiper.loopCreate();
        }
  
        if (!params.observer) {
          swiper.update();
        }
  
        if (params.loop) {
          swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
        } else {
          swiper.slideTo(newActiveIndex, 0, false);
        }
      }
  
      function removeAllSlides() {
        const swiper = this;
        const slidesIndexes = [];
  
        for (let i = 0; i < swiper.slides.length; i += 1) {
          slidesIndexes.push(i);
        }
  
        swiper.removeSlide(slidesIndexes);
      }
  
      function Manipulation(_ref) {
        let {
          swiper
        } = _ref;
        Object.assign(swiper, {
          appendSlide: appendSlide.bind(swiper),
          prependSlide: prependSlide.bind(swiper),
          addSlide: addSlide.bind(swiper),
          removeSlide: removeSlide.bind(swiper),
          removeAllSlides: removeAllSlides.bind(swiper)
        });
      }
  
      function effectInit(params) {
        const {
          effect,
          swiper,
          on,
          setTranslate,
          setTransition,
          overwriteParams,
          perspective,
          recreateShadows,
          getEffectParams
        } = params;
        on('beforeInit', () => {
          if (swiper.params.effect !== effect) return;
          swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
  
          if (perspective && perspective()) {
            swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
          }
  
          const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
          Object.assign(swiper.params, overwriteParamsResult);
          Object.assign(swiper.originalParams, overwriteParamsResult);
        });
        on('setTranslate', () => {
          if (swiper.params.effect !== effect) return;
          setTranslate();
        });
        on('setTransition', (_s, duration) => {
          if (swiper.params.effect !== effect) return;
          setTransition(duration);
        });
        on('transitionEnd', () => {
          if (swiper.params.effect !== effect) return;
  
          if (recreateShadows) {
            if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows
  
            swiper.slides.each(slideEl => {
              const $slideEl = swiper.$(slideEl);
              $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();
            }); // create new one
  
            recreateShadows();
          }
        });
        let requireUpdateOnVirtual;
        on('virtualUpdate', () => {
          if (swiper.params.effect !== effect) return;
  
          if (!swiper.slides.length) {
            requireUpdateOnVirtual = true;
          }
  
          requestAnimationFrame(() => {
            if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
              setTranslate();
              requireUpdateOnVirtual = false;
            }
          });
        });
      }
  
      function effectTarget(effectParams, $slideEl) {
        if (effectParams.transformEl) {
          return $slideEl.find(effectParams.transformEl).css({
            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden'
          });
        }
  
        return $slideEl;
      }
  
      function effectVirtualTransitionEnd(_ref) {
        let {
          swiper,
          duration,
          transformEl,
          allSlides
        } = _ref;
        const {
          slides,
          activeIndex,
          $wrapperEl
        } = swiper;
  
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          let $transitionEndTarget;
  
          if (allSlides) {
            $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
          } else {
            $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
          }
  
          $transitionEndTarget.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
  
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
  
      function EffectFade(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          fadeEffect: {
            crossFade: false,
            transformEl: null
          }
        });
  
        const setTranslate = () => {
          const {
            slides
          } = swiper;
          const params = swiper.params.fadeEffect;
  
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = swiper.slides.eq(i);
            const offset = $slideEl[0].swiperSlideOffset;
            let tx = -offset;
            if (!swiper.params.virtualTranslate) tx -= swiper.translate;
            let ty = 0;
  
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
            }
  
            const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
            const $targetEl = effectTarget(params, $slideEl);
            $targetEl.css({
              opacity: slideOpacity
            }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
          }
        };
  
        const setTransition = duration => {
          const {
            transformEl
          } = swiper.params.fadeEffect;
          const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
          $transitionElements.transition(duration);
          effectVirtualTransitionEnd({
            swiper,
            duration,
            transformEl,
            allSlides: true
          });
        };
  
        effectInit({
          effect: 'fade',
          swiper,
          on,
          setTranslate,
          setTransition,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: !swiper.params.cssMode
          })
        });
      }
  
      function EffectCube(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        });
  
        const createSlideShadows = ($slideEl, progress, isHorizontal) => {
          let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  
          if (shadowBefore.length === 0) {
            shadowBefore = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
            $slideEl.append(shadowBefore);
          }
  
          if (shadowAfter.length === 0) {
            shadowAfter = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
            $slideEl.append(shadowAfter);
          }
  
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        };
  
        const recreateShadows = () => {
          // create new ones
          const isHorizontal = swiper.isHorizontal();
          swiper.slides.each(slideEl => {
            const progress = Math.max(Math.min(slideEl.progress, 1), -1);
            createSlideShadows($(slideEl), progress, isHorizontal);
          });
        };
  
        const setTranslate = () => {
          const {
            $el,
            $wrapperEl,
            slides,
            width: swiperWidth,
            height: swiperHeight,
            rtlTranslate: rtl,
            size: swiperSize,
            browser
          } = swiper;
          const params = swiper.params.cubeEffect;
          const isHorizontal = swiper.isHorizontal();
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          let wrapperRotate = 0;
          let $cubeShadowEl;
  
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
  
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                $wrapperEl.append($cubeShadowEl);
              }
  
              $cubeShadowEl.css({
                height: `${swiperWidth}px`
              });
            } else {
              $cubeShadowEl = $el.find('.swiper-cube-shadow');
  
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                $el.append($cubeShadowEl);
              }
            }
          }
  
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let slideIndex = i;
  
            if (isVirtual) {
              slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
            }
  
            let slideAngle = slideIndex * 90;
            let round = Math.floor(slideAngle / 360);
  
            if (rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
  
            const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            let tx = 0;
            let ty = 0;
            let tz = 0;
  
            if (slideIndex % 4 === 0) {
              tx = -round * 4 * swiperSize;
              tz = 0;
            } else if ((slideIndex - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * swiperSize;
            } else if ((slideIndex - 2) % 4 === 0) {
              tx = swiperSize + round * 4 * swiperSize;
              tz = swiperSize;
            } else if ((slideIndex - 3) % 4 === 0) {
              tx = -swiperSize;
              tz = 3 * swiperSize + swiperSize * 4 * round;
            }
  
            if (rtl) {
              tx = -tx;
            }
  
            if (!isHorizontal) {
              ty = tx;
              tx = 0;
            }
  
            const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
  
            if (progress <= 1 && progress > -1) {
              wrapperRotate = slideIndex * 90 + progress * 90;
              if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
            }
  
            $slideEl.transform(transform);
  
            if (params.slideShadows) {
              createSlideShadows($slideEl, progress, isHorizontal);
            }
          }
  
          $wrapperEl.css({
            '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
            'transform-origin': `50% 50% -${swiperSize / 2}px`
          });
  
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
            } else {
              const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
              const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
              const scale1 = params.shadowScale;
              const scale2 = params.shadowScale / multiplier;
              const offset = params.shadowOffset;
              $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
            }
          }
  
          const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
          $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
          $wrapperEl[0].style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
        };
  
        const setTransition = duration => {
          const {
            $el,
            slides
          } = swiper;
          slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
  
          if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
            $el.find('.swiper-cube-shadow').transition(duration);
          }
        };
  
        effectInit({
          effect: 'cube',
          swiper,
          on,
          setTranslate,
          setTransition,
          recreateShadows,
          getEffectParams: () => swiper.params.cubeEffect,
          perspective: () => true,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true
          })
        });
      }
  
      function createShadow(params, $slideEl, side) {
        const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
        const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
        let $shadowEl = $shadowContainer.children(`.${shadowClass}`);
  
        if (!$shadowEl.length) {
          $shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
          $shadowContainer.append($shadowEl);
        }
  
        return $shadowEl;
      }
  
      function EffectFlip(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          flipEffect: {
            slideShadows: true,
            limitRotation: true,
            transformEl: null
          }
        });
  
        const createSlideShadows = ($slideEl, progress, params) => {
          let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  
          if (shadowBefore.length === 0) {
            shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
          }
  
          if (shadowAfter.length === 0) {
            shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
          }
  
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        };
  
        const recreateShadows = () => {
          // Set shadows
          const params = swiper.params.flipEffect;
          swiper.slides.each(slideEl => {
            const $slideEl = $(slideEl);
            let progress = $slideEl[0].progress;
  
            if (swiper.params.flipEffect.limitRotation) {
              progress = Math.max(Math.min(slideEl.progress, 1), -1);
            }
  
            createSlideShadows($slideEl, progress, params);
          });
        };
  
        const setTranslate = () => {
          const {
            slides,
            rtlTranslate: rtl
          } = swiper;
          const params = swiper.params.flipEffect;
  
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let progress = $slideEl[0].progress;
  
            if (swiper.params.flipEffect.limitRotation) {
              progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            }
  
            const offset = $slideEl[0].swiperSlideOffset;
            const rotate = -180 * progress;
            let rotateY = rotate;
            let rotateX = 0;
            let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
            let ty = 0;
  
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
              rotateX = -rotateY;
              rotateY = 0;
            } else if (rtl) {
              rotateY = -rotateY;
            }
  
            $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
            if (params.slideShadows) {
              createSlideShadows($slideEl, progress, params);
            }
  
            const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            const $targetEl = effectTarget(params, $slideEl);
            $targetEl.transform(transform);
          }
        };
  
        const setTransition = duration => {
          const {
            transformEl
          } = swiper.params.flipEffect;
          const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
          $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
          effectVirtualTransitionEnd({
            swiper,
            duration,
            transformEl
          });
        };
  
        effectInit({
          effect: 'flip',
          swiper,
          on,
          setTranslate,
          setTransition,
          recreateShadows,
          getEffectParams: () => swiper.params.flipEffect,
          perspective: () => true,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: !swiper.params.cssMode
          })
        });
      }
  
      function EffectCoverflow(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: true,
            transformEl: null
          }
        });
  
        const setTranslate = () => {
          const {
            width: swiperWidth,
            height: swiperHeight,
            slides,
            slidesSizesGrid
          } = swiper;
          const params = swiper.params.coverflowEffect;
          const isHorizontal = swiper.isHorizontal();
          const transform = swiper.translate;
          const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
          const rotate = isHorizontal ? params.rotate : -params.rotate;
          const translate = params.depth; // Each slide offset from center
  
          for (let i = 0, length = slides.length; i < length; i += 1) {
            const $slideEl = slides.eq(i);
            const slideSize = slidesSizesGrid[i];
            const slideOffset = $slideEl[0].swiperSlideOffset;
            const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
            const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
            let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
            let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0
  
            let translateZ = -translate * Math.abs(offsetMultiplier);
            let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders
  
            if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
              stretch = parseFloat(params.stretch) / 100 * slideSize;
            }
  
            let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
            let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
            let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values
  
            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;
            if (Math.abs(scale) < 0.001) scale = 0;
            const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
            const $targetEl = effectTarget(params, $slideEl);
            $targetEl.transform(slideTransform);
            $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
  
            if (params.slideShadows) {
              // Set shadows
              let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  
              if ($shadowBeforeEl.length === 0) {
                $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
              }
  
              if ($shadowAfterEl.length === 0) {
                $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
              }
  
              if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
              if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
            }
          }
        };
  
        const setTransition = duration => {
          const {
            transformEl
          } = swiper.params.coverflowEffect;
          const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
          $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
        };
  
        effectInit({
          effect: 'coverflow',
          swiper,
          on,
          setTranslate,
          setTransition,
          perspective: () => true,
          overwriteParams: () => ({
            watchSlidesProgress: true
          })
        });
      }
  
      function EffectCreative(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          creativeEffect: {
            transformEl: null,
            limitProgress: 1,
            shadowPerProgress: false,
            progressMultiplier: 1,
            perspective: true,
            prev: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1
            },
            next: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1
            }
          }
        });
  
        const getTranslateValue = value => {
          if (typeof value === 'string') return value;
          return `${value}px`;
        };
  
        const setTranslate = () => {
          const {
            slides,
            $wrapperEl,
            slidesSizesGrid
          } = swiper;
          const params = swiper.params.creativeEffect;
          const {
            progressMultiplier: multiplier
          } = params;
          const isCenteredSlides = swiper.params.centeredSlides;
  
          if (isCenteredSlides) {
            const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
            $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
          }
  
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            const slideProgress = $slideEl[0].progress;
            const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
            let originalProgress = progress;
  
            if (!isCenteredSlides) {
              originalProgress = Math.min(Math.max($slideEl[0].originalProgress, -params.limitProgress), params.limitProgress);
            }
  
            const offset = $slideEl[0].swiperSlideOffset;
            const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
            const r = [0, 0, 0];
            let custom = false;
  
            if (!swiper.isHorizontal()) {
              t[1] = t[0];
              t[0] = 0;
            }
  
            let data = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1
            };
  
            if (progress < 0) {
              data = params.next;
              custom = true;
            } else if (progress > 0) {
              data = params.prev;
              custom = true;
            } // set translate
  
  
            t.forEach((value, index) => {
              t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
            }); // set rotates
  
            r.forEach((value, index) => {
              r[index] = data.rotate[index] * Math.abs(progress * multiplier);
            });
            $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
            const translateString = t.join(', ');
            const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
            const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
            const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
            const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows
  
            if (custom && data.shadow || !custom) {
              let $shadowEl = $slideEl.children('.swiper-slide-shadow');
  
              if ($shadowEl.length === 0 && data.shadow) {
                $shadowEl = createShadow(params, $slideEl);
              }
  
              if ($shadowEl.length) {
                const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
                $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
              }
            }
  
            const $targetEl = effectTarget(params, $slideEl);
            $targetEl.transform(transform).css({
              opacity: opacityString
            });
  
            if (data.origin) {
              $targetEl.css('transform-origin', data.origin);
            }
          }
        };
  
        const setTransition = duration => {
          const {
            transformEl
          } = swiper.params.creativeEffect;
          const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
          $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
          effectVirtualTransitionEnd({
            swiper,
            duration,
            transformEl,
            allSlides: true
          });
        };
  
        effectInit({
          effect: 'creative',
          swiper,
          on,
          setTranslate,
          setTransition,
          perspective: () => swiper.params.creativeEffect.perspective,
          overwriteParams: () => ({
            watchSlidesProgress: true,
            virtualTranslate: !swiper.params.cssMode
          })
        });
      }
  
      function EffectCards(_ref) {
        let {
          swiper,
          extendParams,
          on
        } = _ref;
        extendParams({
          cardsEffect: {
            slideShadows: true,
            transformEl: null,
            rotate: true
          }
        });
  
        const setTranslate = () => {
          const {
            slides,
            activeIndex
          } = swiper;
          const params = swiper.params.cardsEffect;
          const {
            startTranslate,
            isTouched
          } = swiper.touchEventsData;
          const currentTranslate = swiper.translate;
  
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            const slideProgress = $slideEl[0].progress;
            const progress = Math.min(Math.max(slideProgress, -4), 4);
            let offset = $slideEl[0].swiperSlideOffset;
  
            if (swiper.params.centeredSlides && !swiper.params.cssMode) {
              swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
            }
  
            if (swiper.params.centeredSlides && swiper.params.cssMode) {
              offset -= slides[0].swiperSlideOffset;
            }
  
            let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
            let tY = 0;
            const tZ = -100 * Math.abs(progress);
            let scale = 1;
            let rotate = -2 * progress;
            let tXAdd = 8 - Math.abs(progress) * 0.75;
            const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
            const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
            const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
  
            if (isSwipeToNext || isSwipeToPrev) {
              const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
              rotate += -28 * progress * subProgress;
              scale += -0.5 * subProgress;
              tXAdd += 96 * subProgress;
              tY = `${-25 * subProgress * Math.abs(progress)}%`;
            }
  
            if (progress < 0) {
              // next
              tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
            } else if (progress > 0) {
              // prev
              tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
            } else {
              tX = `${tX}px`;
            }
  
            if (!swiper.isHorizontal()) {
              const prevY = tY;
              tY = tX;
              tX = prevY;
            }
  
            const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
            const transform = `
          translate3d(${tX}, ${tY}, ${tZ}px)
          rotateZ(${params.rotate ? rotate : 0}deg)
          scale(${scaleString})
        `;
  
            if (params.slideShadows) {
              // Set shadows
              let $shadowEl = $slideEl.find('.swiper-slide-shadow');
  
              if ($shadowEl.length === 0) {
                $shadowEl = createShadow(params, $slideEl);
              }
  
              if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
            }
  
            $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
            const $targetEl = effectTarget(params, $slideEl);
            $targetEl.transform(transform);
          }
        };
  
        const setTransition = duration => {
          const {
            transformEl
          } = swiper.params.cardsEffect;
          const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
          $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
          effectVirtualTransitionEnd({
            swiper,
            duration,
            transformEl
          });
        };
  
        effectInit({
          effect: 'cards',
          swiper,
          on,
          setTranslate,
          setTransition,
          perspective: () => true,
          overwriteParams: () => ({
            watchSlidesProgress: true,
            virtualTranslate: !swiper.params.cssMode
          })
        });
      }
  
      // Swiper Class
      const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
      Swiper.use(modules);
  
      return Swiper;
  
  }));
  //# sourceMappingURL=swiper-bundle.js.map
  /*! choices.js v10.1.0 | © 2022 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
  (function webpackUniversalModuleDefinition(root, factory) {
  	if(typeof exports === 'object' && typeof module === 'object')
  		module.exports = factory();
  	else if(typeof define === 'function' && define.amd)
  		define([], factory);
  	else if(typeof exports === 'object')
  		exports["Choices"] = factory();
  	else
  		root["Choices"] = factory();
  })(window, function() {
  return /******/ (function() { // webpackBootstrap
  /******/ 	"use strict";
  /******/ 	var __webpack_modules__ = ({
  
  /***/ 282:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.clearChoices = exports.activateChoices = exports.filterChoices = exports.addChoice = void 0;
  
  var constants_1 = __webpack_require__(883);
  
  var addChoice = function (_a) {
    var value = _a.value,
        label = _a.label,
        id = _a.id,
        groupId = _a.groupId,
        disabled = _a.disabled,
        elementId = _a.elementId,
        customProperties = _a.customProperties,
        placeholder = _a.placeholder,
        keyCode = _a.keyCode;
    return {
      type: constants_1.ACTION_TYPES.ADD_CHOICE,
      value: value,
      label: label,
      id: id,
      groupId: groupId,
      disabled: disabled,
      elementId: elementId,
      customProperties: customProperties,
      placeholder: placeholder,
      keyCode: keyCode
    };
  };
  
  exports.addChoice = addChoice;
  
  var filterChoices = function (results) {
    return {
      type: constants_1.ACTION_TYPES.FILTER_CHOICES,
      results: results
    };
  };
  
  exports.filterChoices = filterChoices;
  
  var activateChoices = function (active) {
    if (active === void 0) {
      active = true;
    }
  
    return {
      type: constants_1.ACTION_TYPES.ACTIVATE_CHOICES,
      active: active
    };
  };
  
  exports.activateChoices = activateChoices;
  
  var clearChoices = function () {
    return {
      type: constants_1.ACTION_TYPES.CLEAR_CHOICES
    };
  };
  
  exports.clearChoices = clearChoices;
  
  /***/ }),
  
  /***/ 783:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.addGroup = void 0;
  
  var constants_1 = __webpack_require__(883);
  
  var addGroup = function (_a) {
    var value = _a.value,
        id = _a.id,
        active = _a.active,
        disabled = _a.disabled;
    return {
      type: constants_1.ACTION_TYPES.ADD_GROUP,
      value: value,
      id: id,
      active: active,
      disabled: disabled
    };
  };
  
  exports.addGroup = addGroup;
  
  /***/ }),
  
  /***/ 464:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.highlightItem = exports.removeItem = exports.addItem = void 0;
  
  var constants_1 = __webpack_require__(883);
  
  var addItem = function (_a) {
    var value = _a.value,
        label = _a.label,
        id = _a.id,
        choiceId = _a.choiceId,
        groupId = _a.groupId,
        customProperties = _a.customProperties,
        placeholder = _a.placeholder,
        keyCode = _a.keyCode;
    return {
      type: constants_1.ACTION_TYPES.ADD_ITEM,
      value: value,
      label: label,
      id: id,
      choiceId: choiceId,
      groupId: groupId,
      customProperties: customProperties,
      placeholder: placeholder,
      keyCode: keyCode
    };
  };
  
  exports.addItem = addItem;
  
  var removeItem = function (id, choiceId) {
    return {
      type: constants_1.ACTION_TYPES.REMOVE_ITEM,
      id: id,
      choiceId: choiceId
    };
  };
  
  exports.removeItem = removeItem;
  
  var highlightItem = function (id, highlighted) {
    return {
      type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
      id: id,
      highlighted: highlighted
    };
  };
  
  exports.highlightItem = highlightItem;
  
  /***/ }),
  
  /***/ 137:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.setIsLoading = exports.resetTo = exports.clearAll = void 0;
  
  var constants_1 = __webpack_require__(883);
  
  var clearAll = function () {
    return {
      type: constants_1.ACTION_TYPES.CLEAR_ALL
    };
  };
  
  exports.clearAll = clearAll;
  
  var resetTo = function (state) {
    return {
      type: constants_1.ACTION_TYPES.RESET_TO,
      state: state
    };
  };
  
  exports.resetTo = resetTo;
  
  var setIsLoading = function (isLoading) {
    return {
      type: constants_1.ACTION_TYPES.SET_IS_LOADING,
      isLoading: isLoading
    };
  };
  
  exports.setIsLoading = setIsLoading;
  
  /***/ }),
  
  /***/ 373:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var deepmerge_1 = __importDefault(__webpack_require__(996));
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  
  var fuse_js_1 = __importDefault(__webpack_require__(221));
  
  var choices_1 = __webpack_require__(282);
  
  var groups_1 = __webpack_require__(783);
  
  var items_1 = __webpack_require__(464);
  
  var misc_1 = __webpack_require__(137);
  
  var components_1 = __webpack_require__(520);
  
  var constants_1 = __webpack_require__(883);
  
  var defaults_1 = __webpack_require__(789);
  
  var utils_1 = __webpack_require__(799);
  
  var reducers_1 = __webpack_require__(655);
  
  var store_1 = __importDefault(__webpack_require__(744));
  
  var templates_1 = __importDefault(__webpack_require__(686));
  /** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */
  
  
  var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
  var USER_DEFAULTS = {};
  /**
   * Choices
   * @author Josh Johnson<josh@joshuajohnson.co.uk>
   */
  
  var Choices =
  /** @class */
  function () {
    function Choices(element, userConfig) {
      var _this = this;
  
      if (element === void 0) {
        element = '[data-choice]';
      }
  
      if (userConfig === void 0) {
        userConfig = {};
      }
  
      if (userConfig.allowHTML === undefined) {
        console.warn('Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
      }
  
      this.config = deepmerge_1.default.all([defaults_1.DEFAULT_CONFIG, Choices.defaults.options, userConfig], // When merging array configs, replace with a copy of the userConfig array,
      // instead of concatenating with the default array
      {
        arrayMerge: function (_, sourceArray) {
          return __spreadArray([], sourceArray, true);
        }
      });
      var invalidConfigOptions = (0, utils_1.diff)(this.config, defaults_1.DEFAULT_CONFIG);
  
      if (invalidConfigOptions.length) {
        console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
      }
  
      var passedElement = typeof element === 'string' ? document.querySelector(element) : element;
  
      if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
        throw TypeError('Expected one of the following types text|select-one|select-multiple');
      }
  
      this._isTextElement = passedElement.type === constants_1.TEXT_TYPE;
      this._isSelectOneElement = passedElement.type === constants_1.SELECT_ONE_TYPE;
      this._isSelectMultipleElement = passedElement.type === constants_1.SELECT_MULTIPLE_TYPE;
      this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
      this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;
  
      if (!['auto', 'always'].includes("".concat(this.config.renderSelectedChoices))) {
        this.config.renderSelectedChoices = 'auto';
      }
  
      if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
        var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
        this.config.addItemFilter = re.test.bind(re);
      }
  
      if (this._isTextElement) {
        this.passedElement = new components_1.WrappedInput({
          element: passedElement,
          classNames: this.config.classNames,
          delimiter: this.config.delimiter
        });
      } else {
        this.passedElement = new components_1.WrappedSelect({
          element: passedElement,
          classNames: this.config.classNames,
          template: function (data) {
            return _this._templates.option(data);
          }
        });
      }
  
      this.initialised = false;
      this._store = new store_1.default();
      this._initialState = reducers_1.defaultState;
      this._currentState = reducers_1.defaultState;
      this._prevState = reducers_1.defaultState;
      this._currentValue = '';
      this._canSearch = !!this.config.searchEnabled;
      this._isScrollingOnIe = false;
      this._highlightPosition = 0;
      this._wasTap = true;
      this._placeholderValue = this._generatePlaceholderValue();
      this._baseId = (0, utils_1.generateId)(this.passedElement.element, 'choices-');
      /**
       * setting direction in cases where it's explicitly set on passedElement
       * or when calculated direction is different from the document
       */
  
      this._direction = this.passedElement.dir;
  
      if (!this._direction) {
        var elementDirection = window.getComputedStyle(this.passedElement.element).direction;
        var documentDirection = window.getComputedStyle(document.documentElement).direction;
  
        if (elementDirection !== documentDirection) {
          this._direction = elementDirection;
        }
      }
  
      this._idNames = {
        itemChoice: 'item-choice'
      };
  
      if (this._isSelectElement) {
        // Assign preset groups from passed element
        this._presetGroups = this.passedElement.optionGroups; // Assign preset options from passed element
  
        this._presetOptions = this.passedElement.options;
      } // Assign preset choices from passed object
  
  
      this._presetChoices = this.config.choices; // Assign preset items from passed object first
  
      this._presetItems = this.config.items; // Add any values passed from attribute
  
      if (this.passedElement.value && this._isTextElement) {
        var splitValues = this.passedElement.value.split(this.config.delimiter);
        this._presetItems = this._presetItems.concat(splitValues);
      } // Create array of choices from option elements
  
  
      if (this.passedElement.options) {
        this.passedElement.options.forEach(function (option) {
          _this._presetChoices.push({
            value: option.value,
            label: option.innerHTML,
            selected: !!option.selected,
            disabled: option.disabled || option.parentNode.disabled,
            placeholder: option.value === '' || option.hasAttribute('placeholder'),
            customProperties: option.dataset['custom-properties']
          });
        });
      }
  
      this._render = this._render.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
      this._onKeyUp = this._onKeyUp.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onClick = this._onClick.bind(this);
      this._onTouchMove = this._onTouchMove.bind(this);
      this._onTouchEnd = this._onTouchEnd.bind(this);
      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseOver = this._onMouseOver.bind(this);
      this._onFormReset = this._onFormReset.bind(this);
      this._onSelectKey = this._onSelectKey.bind(this);
      this._onEnterKey = this._onEnterKey.bind(this);
      this._onEscapeKey = this._onEscapeKey.bind(this);
      this._onDirectionKey = this._onDirectionKey.bind(this);
      this._onDeleteKey = this._onDeleteKey.bind(this); // If element has already been initialised with Choices, fail silently
  
      if (this.passedElement.isActive) {
        if (!this.config.silent) {
          console.warn('Trying to initialise Choices on element already initialised', {
            element: element
          });
        }
  
        this.initialised = true;
        return;
      } // Let's go
  
  
      this.init();
    }
  
    Object.defineProperty(Choices, "defaults", {
      get: function () {
        return Object.preventExtensions({
          get options() {
            return USER_DEFAULTS;
          },
  
          get templates() {
            return templates_1.default;
          }
  
        });
      },
      enumerable: false,
      configurable: true
    });
  
    Choices.prototype.init = function () {
      if (this.initialised) {
        return;
      }
  
      this._createTemplates();
  
      this._createElements();
  
      this._createStructure();
  
      this._store.subscribe(this._render);
  
      this._render();
  
      this._addEventListeners();
  
      var shouldDisable = !this.config.addItems || this.passedElement.element.hasAttribute('disabled');
  
      if (shouldDisable) {
        this.disable();
      }
  
      this.initialised = true;
      var callbackOnInit = this.config.callbackOnInit; // Run callback if it is a function
  
      if (callbackOnInit && typeof callbackOnInit === 'function') {
        callbackOnInit.call(this);
      }
    };
  
    Choices.prototype.destroy = function () {
      if (!this.initialised) {
        return;
      }
  
      this._removeEventListeners();
  
      this.passedElement.reveal();
      this.containerOuter.unwrap(this.passedElement.element);
      this.clearStore();
  
      if (this._isSelectElement) {
        this.passedElement.options = this._presetOptions;
      }
  
      this._templates = templates_1.default;
      this.initialised = false;
    };
  
    Choices.prototype.enable = function () {
      if (this.passedElement.isDisabled) {
        this.passedElement.enable();
      }
  
      if (this.containerOuter.isDisabled) {
        this._addEventListeners();
  
        this.input.enable();
        this.containerOuter.enable();
      }
  
      return this;
    };
  
    Choices.prototype.disable = function () {
      if (!this.passedElement.isDisabled) {
        this.passedElement.disable();
      }
  
      if (!this.containerOuter.isDisabled) {
        this._removeEventListeners();
  
        this.input.disable();
        this.containerOuter.disable();
      }
  
      return this;
    };
  
    Choices.prototype.highlightItem = function (item, runEvent) {
      if (runEvent === void 0) {
        runEvent = true;
      }
  
      if (!item || !item.id) {
        return this;
      }
  
      var id = item.id,
          _a = item.groupId,
          groupId = _a === void 0 ? -1 : _a,
          _b = item.value,
          value = _b === void 0 ? '' : _b,
          _c = item.label,
          label = _c === void 0 ? '' : _c;
      var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
  
      this._store.dispatch((0, items_1.highlightItem)(id, true));
  
      if (runEvent) {
        this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
          id: id,
          value: value,
          label: label,
          groupValue: group && group.value ? group.value : null
        });
      }
  
      return this;
    };
  
    Choices.prototype.unhighlightItem = function (item) {
      if (!item || !item.id) {
        return this;
      }
  
      var id = item.id,
          _a = item.groupId,
          groupId = _a === void 0 ? -1 : _a,
          _b = item.value,
          value = _b === void 0 ? '' : _b,
          _c = item.label,
          label = _c === void 0 ? '' : _c;
      var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
  
      this._store.dispatch((0, items_1.highlightItem)(id, false));
  
      this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
        id: id,
        value: value,
        label: label,
        groupValue: group && group.value ? group.value : null
      });
      return this;
    };
  
    Choices.prototype.highlightAll = function () {
      var _this = this;
  
      this._store.items.forEach(function (item) {
        return _this.highlightItem(item);
      });
  
      return this;
    };
  
    Choices.prototype.unhighlightAll = function () {
      var _this = this;
  
      this._store.items.forEach(function (item) {
        return _this.unhighlightItem(item);
      });
  
      return this;
    };
  
    Choices.prototype.removeActiveItemsByValue = function (value) {
      var _this = this;
  
      this._store.activeItems.filter(function (item) {
        return item.value === value;
      }).forEach(function (item) {
        return _this._removeItem(item);
      });
  
      return this;
    };
  
    Choices.prototype.removeActiveItems = function (excludedId) {
      var _this = this;
  
      this._store.activeItems.filter(function (_a) {
        var id = _a.id;
        return id !== excludedId;
      }).forEach(function (item) {
        return _this._removeItem(item);
      });
  
      return this;
    };
  
    Choices.prototype.removeHighlightedItems = function (runEvent) {
      var _this = this;
  
      if (runEvent === void 0) {
        runEvent = false;
      }
  
      this._store.highlightedActiveItems.forEach(function (item) {
        _this._removeItem(item); // If this action was performed by the user
        // trigger the event
  
  
        if (runEvent) {
          _this._triggerChange(item.value);
        }
      });
  
      return this;
    };
  
    Choices.prototype.showDropdown = function (preventInputFocus) {
      var _this = this;
  
      if (this.dropdown.isActive) {
        return this;
      }
  
      requestAnimationFrame(function () {
        _this.dropdown.show();
  
        _this.containerOuter.open(_this.dropdown.distanceFromTopWindow);
  
        if (!preventInputFocus && _this._canSearch) {
          _this.input.focus();
        }
  
        _this.passedElement.triggerEvent(constants_1.EVENTS.showDropdown, {});
      });
      return this;
    };
  
    Choices.prototype.hideDropdown = function (preventInputBlur) {
      var _this = this;
  
      if (!this.dropdown.isActive) {
        return this;
      }
  
      requestAnimationFrame(function () {
        _this.dropdown.hide();
  
        _this.containerOuter.close();
  
        if (!preventInputBlur && _this._canSearch) {
          _this.input.removeActiveDescendant();
  
          _this.input.blur();
        }
  
        _this.passedElement.triggerEvent(constants_1.EVENTS.hideDropdown, {});
      });
      return this;
    };
  
    Choices.prototype.getValue = function (valueOnly) {
      if (valueOnly === void 0) {
        valueOnly = false;
      }
  
      var values = this._store.activeItems.reduce(function (selectedItems, item) {
        var itemValue = valueOnly ? item.value : item;
        selectedItems.push(itemValue);
        return selectedItems;
      }, []);
  
      return this._isSelectOneElement ? values[0] : values;
    };
  
    Choices.prototype.setValue = function (items) {
      var _this = this;
  
      if (!this.initialised) {
        return this;
      }
  
      items.forEach(function (value) {
        return _this._setChoiceOrItem(value);
      });
      return this;
    };
  
    Choices.prototype.setChoiceByValue = function (value) {
      var _this = this;
  
      if (!this.initialised || this._isTextElement) {
        return this;
      } // If only one value has been passed, convert to array
  
  
      var choiceValue = Array.isArray(value) ? value : [value]; // Loop through each value and
  
      choiceValue.forEach(function (val) {
        return _this._findAndSelectChoiceByValue(val);
      });
      return this;
    };
    /**
     * Set choices of select input via an array of objects (or function that returns array of object or promise of it),
     * a value field name and a label field name.
     * This behaves the same as passing items via the choices option but can be called after initialising Choices.
     * This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices.
     * Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc).
     *
     * **Input types affected:** select-one, select-multiple
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices([
     *   {value: 'One', label: 'Label One', disabled: true},
     *   {value: 'Two', label: 'Label Two', selected: true},
     *   {value: 'Three', label: 'Label Three'},
     * ], 'value', 'label', false);
     * ```
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices(async () => {
     *   try {
     *      const items = await fetch('/items');
     *      return items.json()
     *   } catch(err) {
     *      console.error(err)
     *   }
     * });
     * ```
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices([{
     *   label: 'Group one',
     *   id: 1,
     *   disabled: false,
     *   choices: [
     *     {value: 'Child One', label: 'Child One', selected: true},
     *     {value: 'Child Two', label: 'Child Two',  disabled: true},
     *     {value: 'Child Three', label: 'Child Three'},
     *   ]
     * },
     * {
     *   label: 'Group two',
     *   id: 2,
     *   disabled: false,
     *   choices: [
     *     {value: 'Child Four', label: 'Child Four', disabled: true},
     *     {value: 'Child Five', label: 'Child Five'},
     *     {value: 'Child Six', label: 'Child Six', customProperties: {
     *       description: 'Custom description about child six',
     *       random: 'Another random custom property'
     *     }},
     *   ]
     * }], 'value', 'label', false);
     * ```
     */
  
  
    Choices.prototype.setChoices = function (choicesArrayOrFetcher, value, label, replaceChoices) {
      var _this = this;
  
      if (choicesArrayOrFetcher === void 0) {
        choicesArrayOrFetcher = [];
      }
  
      if (value === void 0) {
        value = 'value';
      }
  
      if (label === void 0) {
        label = 'label';
      }
  
      if (replaceChoices === void 0) {
        replaceChoices = false;
      }
  
      if (!this.initialised) {
        throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
      }
  
      if (!this._isSelectElement) {
        throw new TypeError("setChoices can't be used with INPUT based Choices");
      }
  
      if (typeof value !== 'string' || !value) {
        throw new TypeError("value parameter must be a name of 'value' field in passed objects");
      } // Clear choices if needed
  
  
      if (replaceChoices) {
        this.clearChoices();
      }
  
      if (typeof choicesArrayOrFetcher === 'function') {
        // it's a choices fetcher function
        var fetcher_1 = choicesArrayOrFetcher(this);
  
        if (typeof Promise === 'function' && fetcher_1 instanceof Promise) {
          // that's a promise
          // eslint-disable-next-line no-promise-executor-return
          return new Promise(function (resolve) {
            return requestAnimationFrame(resolve);
          }).then(function () {
            return _this._handleLoadingState(true);
          }).then(function () {
            return fetcher_1;
          }).then(function (data) {
            return _this.setChoices(data, value, label, replaceChoices);
          }).catch(function (err) {
            if (!_this.config.silent) {
              console.error(err);
            }
          }).then(function () {
            return _this._handleLoadingState(false);
          }).then(function () {
            return _this;
          });
        } // function returned something else than promise, let's check if it's an array of choices
  
  
        if (!Array.isArray(fetcher_1)) {
          throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
        } // recursion with results, it's sync and choices were cleared already
  
  
        return this.setChoices(fetcher_1, value, label, false);
      }
  
      if (!Array.isArray(choicesArrayOrFetcher)) {
        throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
      }
  
      this.containerOuter.removeLoadingState();
  
      this._startLoading();
  
      choicesArrayOrFetcher.forEach(function (groupOrChoice) {
        if (groupOrChoice.choices) {
          _this._addGroup({
            id: groupOrChoice.id ? parseInt("".concat(groupOrChoice.id), 10) : null,
            group: groupOrChoice,
            valueKey: value,
            labelKey: label
          });
        } else {
          var choice = groupOrChoice;
  
          _this._addChoice({
            value: choice[value],
            label: choice[label],
            isSelected: !!choice.selected,
            isDisabled: !!choice.disabled,
            placeholder: !!choice.placeholder,
            customProperties: choice.customProperties
          });
        }
      });
  
      this._stopLoading();
  
      return this;
    };
  
    Choices.prototype.clearChoices = function () {
      this._store.dispatch((0, choices_1.clearChoices)());
  
      return this;
    };
  
    Choices.prototype.clearStore = function () {
      this._store.dispatch((0, misc_1.clearAll)());
  
      return this;
    };
  
    Choices.prototype.clearInput = function () {
      var shouldSetInputWidth = !this._isSelectOneElement;
      this.input.clear(shouldSetInputWidth);
  
      if (!this._isTextElement && this._canSearch) {
        this._isSearching = false;
  
        this._store.dispatch((0, choices_1.activateChoices)(true));
      }
  
      return this;
    };
  
    Choices.prototype._render = function () {
      if (this._store.isLoading()) {
        return;
      }
  
      this._currentState = this._store.state;
      var stateChanged = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items;
      var shouldRenderChoices = this._isSelectElement;
      var shouldRenderItems = this._currentState.items !== this._prevState.items;
  
      if (!stateChanged) {
        return;
      }
  
      if (shouldRenderChoices) {
        this._renderChoices();
      }
  
      if (shouldRenderItems) {
        this._renderItems();
      }
  
      this._prevState = this._currentState;
    };
  
    Choices.prototype._renderChoices = function () {
      var _this = this;
  
      var _a = this._store,
          activeGroups = _a.activeGroups,
          activeChoices = _a.activeChoices;
      var choiceListFragment = document.createDocumentFragment();
      this.choiceList.clear();
  
      if (this.config.resetScrollPosition) {
        requestAnimationFrame(function () {
          return _this.choiceList.scrollToTop();
        });
      } // If we have grouped options
  
  
      if (activeGroups.length >= 1 && !this._isSearching) {
        // If we have a placeholder choice along with groups
        var activePlaceholders = activeChoices.filter(function (activeChoice) {
          return activeChoice.placeholder === true && activeChoice.groupId === -1;
        });
  
        if (activePlaceholders.length >= 1) {
          choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
        }
  
        choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
      } else if (activeChoices.length >= 1) {
        choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
      } // If we have choices to show
  
  
      if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
        var activeItems = this._store.activeItems;
  
        var canAddItem = this._canAddItem(activeItems, this.input.value); // ...and we can select them
  
  
        if (canAddItem.response) {
          // ...append them and highlight the first choice
          this.choiceList.append(choiceListFragment);
  
          this._highlightChoice();
        } else {
          var notice = this._getTemplate('notice', canAddItem.notice);
  
          this.choiceList.append(notice);
        }
      } else {
        // Otherwise show a notice
        var dropdownItem = void 0;
        var notice = void 0;
  
        if (this._isSearching) {
          notice = typeof this.config.noResultsText === 'function' ? this.config.noResultsText() : this.config.noResultsText;
          dropdownItem = this._getTemplate('notice', notice, 'no-results');
        } else {
          notice = typeof this.config.noChoicesText === 'function' ? this.config.noChoicesText() : this.config.noChoicesText;
          dropdownItem = this._getTemplate('notice', notice, 'no-choices');
        }
  
        this.choiceList.append(dropdownItem);
      }
    };
  
    Choices.prototype._renderItems = function () {
      var activeItems = this._store.activeItems || [];
      this.itemList.clear(); // Create a fragment to store our list items
      // (so we don't have to update the DOM for each item)
  
      var itemListFragment = this._createItemsFragment(activeItems); // If we have items to add, append them
  
  
      if (itemListFragment.childNodes) {
        this.itemList.append(itemListFragment);
      }
    };
  
    Choices.prototype._createGroupsFragment = function (groups, choices, fragment) {
      var _this = this;
  
      if (fragment === void 0) {
        fragment = document.createDocumentFragment();
      }
  
      var getGroupChoices = function (group) {
        return choices.filter(function (choice) {
          if (_this._isSelectOneElement) {
            return choice.groupId === group.id;
          }
  
          return choice.groupId === group.id && (_this.config.renderSelectedChoices === 'always' || !choice.selected);
        });
      }; // If sorting is enabled, filter groups
  
  
      if (this.config.shouldSort) {
        groups.sort(this.config.sorter);
      }
  
      groups.forEach(function (group) {
        var groupChoices = getGroupChoices(group);
  
        if (groupChoices.length >= 1) {
          var dropdownGroup = _this._getTemplate('choiceGroup', group);
  
          fragment.appendChild(dropdownGroup);
  
          _this._createChoicesFragment(groupChoices, fragment, true);
        }
      });
      return fragment;
    };
  
    Choices.prototype._createChoicesFragment = function (choices, fragment, withinGroup) {
      var _this = this;
  
      if (fragment === void 0) {
        fragment = document.createDocumentFragment();
      }
  
      if (withinGroup === void 0) {
        withinGroup = false;
      } // Create a fragment to store our list items (so we don't have to update the DOM for each item)
  
  
      var _a = this.config,
          renderSelectedChoices = _a.renderSelectedChoices,
          searchResultLimit = _a.searchResultLimit,
          renderChoiceLimit = _a.renderChoiceLimit;
      var filter = this._isSearching ? utils_1.sortByScore : this.config.sorter;
  
      var appendChoice = function (choice) {
        var shouldRender = renderSelectedChoices === 'auto' ? _this._isSelectOneElement || !choice.selected : true;
  
        if (shouldRender) {
          var dropdownItem = _this._getTemplate('choice', choice, _this.config.itemSelectText);
  
          fragment.appendChild(dropdownItem);
        }
      };
  
      var rendererableChoices = choices;
  
      if (renderSelectedChoices === 'auto' && !this._isSelectOneElement) {
        rendererableChoices = choices.filter(function (choice) {
          return !choice.selected;
        });
      } // Split array into placeholders and "normal" choices
  
  
      var _b = rendererableChoices.reduce(function (acc, choice) {
        if (choice.placeholder) {
          acc.placeholderChoices.push(choice);
        } else {
          acc.normalChoices.push(choice);
        }
  
        return acc;
      }, {
        placeholderChoices: [],
        normalChoices: []
      }),
          placeholderChoices = _b.placeholderChoices,
          normalChoices = _b.normalChoices; // If sorting is enabled or the user is searching, filter choices
  
  
      if (this.config.shouldSort || this._isSearching) {
        normalChoices.sort(filter);
      }
  
      var choiceLimit = rendererableChoices.length; // Prepend placeholeder
  
      var sortedChoices = this._isSelectOneElement ? __spreadArray(__spreadArray([], placeholderChoices, true), normalChoices, true) : normalChoices;
  
      if (this._isSearching) {
        choiceLimit = searchResultLimit;
      } else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
        choiceLimit = renderChoiceLimit;
      } // Add each choice to dropdown within range
  
  
      for (var i = 0; i < choiceLimit; i += 1) {
        if (sortedChoices[i]) {
          appendChoice(sortedChoices[i]);
        }
      }
  
      return fragment;
    };
  
    Choices.prototype._createItemsFragment = function (items, fragment) {
      var _this = this;
  
      if (fragment === void 0) {
        fragment = document.createDocumentFragment();
      } // Create fragment to add elements to
  
  
      var _a = this.config,
          shouldSortItems = _a.shouldSortItems,
          sorter = _a.sorter,
          removeItemButton = _a.removeItemButton; // If sorting is enabled, filter items
  
      if (shouldSortItems && !this._isSelectOneElement) {
        items.sort(sorter);
      }
  
      if (this._isTextElement) {
        // Update the value of the hidden input
        this.passedElement.value = items.map(function (_a) {
          var value = _a.value;
          return value;
        }).join(this.config.delimiter);
      } else {
        // Update the options of the hidden input
        this.passedElement.options = items;
      }
  
      var addItemToFragment = function (item) {
        // Create new list element
        var listItem = _this._getTemplate('item', item, removeItemButton); // Append it to list
  
  
        fragment.appendChild(listItem);
      }; // Add each list item to list
  
  
      items.forEach(addItemToFragment);
      return fragment;
    };
  
    Choices.prototype._triggerChange = function (value) {
      if (value === undefined || value === null) {
        return;
      }
  
      this.passedElement.triggerEvent(constants_1.EVENTS.change, {
        value: value
      });
    };
  
    Choices.prototype._selectPlaceholderChoice = function (placeholderChoice) {
      this._addItem({
        value: placeholderChoice.value,
        label: placeholderChoice.label,
        choiceId: placeholderChoice.id,
        groupId: placeholderChoice.groupId,
        placeholder: placeholderChoice.placeholder
      });
  
      this._triggerChange(placeholderChoice.value);
    };
  
    Choices.prototype._handleButtonAction = function (activeItems, element) {
      if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
        return;
      }
  
      var itemId = element.parentNode && element.parentNode.dataset.id;
      var itemToRemove = itemId && activeItems.find(function (item) {
        return item.id === parseInt(itemId, 10);
      });
  
      if (!itemToRemove) {
        return;
      } // Remove item associated with button
  
  
      this._removeItem(itemToRemove);
  
      this._triggerChange(itemToRemove.value);
  
      if (this._isSelectOneElement && this._store.placeholderChoice) {
        this._selectPlaceholderChoice(this._store.placeholderChoice);
      }
    };
  
    Choices.prototype._handleItemAction = function (activeItems, element, hasShiftKey) {
      var _this = this;
  
      if (hasShiftKey === void 0) {
        hasShiftKey = false;
      }
  
      if (!activeItems || !element || !this.config.removeItems || this._isSelectOneElement) {
        return;
      }
  
      var passedId = element.dataset.id; // We only want to select one item with a click
      // so we deselect any items that aren't the target
      // unless shift is being pressed
  
      activeItems.forEach(function (item) {
        if (item.id === parseInt("".concat(passedId), 10) && !item.highlighted) {
          _this.highlightItem(item);
        } else if (!hasShiftKey && item.highlighted) {
          _this.unhighlightItem(item);
        }
      }); // Focus input as without focus, a user cannot do anything with a
      // highlighted item
  
      this.input.focus();
    };
  
    Choices.prototype._handleChoiceAction = function (activeItems, element) {
      if (!activeItems || !element) {
        return;
      } // If we are clicking on an option
  
  
      var id = element.dataset.id;
  
      var choice = id && this._store.getChoiceById(id);
  
      if (!choice) {
        return;
      }
  
      var passedKeyCode = activeItems[0] && activeItems[0].keyCode ? activeItems[0].keyCode : undefined;
      var hasActiveDropdown = this.dropdown.isActive; // Update choice keyCode
  
      choice.keyCode = passedKeyCode;
      this.passedElement.triggerEvent(constants_1.EVENTS.choice, {
        choice: choice
      });
  
      if (!choice.selected && !choice.disabled) {
        var canAddItem = this._canAddItem(activeItems, choice.value);
  
        if (canAddItem.response) {
          this._addItem({
            value: choice.value,
            label: choice.label,
            choiceId: choice.id,
            groupId: choice.groupId,
            customProperties: choice.customProperties,
            placeholder: choice.placeholder,
            keyCode: choice.keyCode
          });
  
          this._triggerChange(choice.value);
        }
      }
  
      this.clearInput(); // We want to close the dropdown if we are dealing with a single select box
  
      if (hasActiveDropdown && this._isSelectOneElement) {
        this.hideDropdown(true);
        this.containerOuter.focus();
      }
    };
  
    Choices.prototype._handleBackspace = function (activeItems) {
      if (!this.config.removeItems || !activeItems) {
        return;
      }
  
      var lastItem = activeItems[activeItems.length - 1];
      var hasHighlightedItems = activeItems.some(function (item) {
        return item.highlighted;
      }); // If editing the last item is allowed and there are not other selected items,
      // we can edit the item value. Otherwise if we can remove items, remove all selected items
  
      if (this.config.editItems && !hasHighlightedItems && lastItem) {
        this.input.value = lastItem.value;
        this.input.setWidth();
  
        this._removeItem(lastItem);
  
        this._triggerChange(lastItem.value);
      } else {
        if (!hasHighlightedItems) {
          // Highlight last item if none already highlighted
          this.highlightItem(lastItem, false);
        }
  
        this.removeHighlightedItems(true);
      }
    };
  
    Choices.prototype._startLoading = function () {
      this._store.dispatch((0, misc_1.setIsLoading)(true));
    };
  
    Choices.prototype._stopLoading = function () {
      this._store.dispatch((0, misc_1.setIsLoading)(false));
    };
  
    Choices.prototype._handleLoadingState = function (setLoading) {
      if (setLoading === void 0) {
        setLoading = true;
      }
  
      var placeholderItem = this.itemList.getChild(".".concat(this.config.classNames.placeholder));
  
      if (setLoading) {
        this.disable();
        this.containerOuter.addLoadingState();
  
        if (this._isSelectOneElement) {
          if (!placeholderItem) {
            placeholderItem = this._getTemplate('placeholder', this.config.loadingText);
  
            if (placeholderItem) {
              this.itemList.append(placeholderItem);
            }
          } else {
            placeholderItem.innerHTML = this.config.loadingText;
          }
        } else {
          this.input.placeholder = this.config.loadingText;
        }
      } else {
        this.enable();
        this.containerOuter.removeLoadingState();
  
        if (this._isSelectOneElement) {
          if (placeholderItem) {
            placeholderItem.innerHTML = this._placeholderValue || '';
          }
        } else {
          this.input.placeholder = this._placeholderValue || '';
        }
      }
    };
  
    Choices.prototype._handleSearch = function (value) {
      if (!this.input.isFocussed) {
        return;
      }
  
      var choices = this._store.choices;
      var _a = this.config,
          searchFloor = _a.searchFloor,
          searchChoices = _a.searchChoices;
      var hasUnactiveChoices = choices.some(function (option) {
        return !option.active;
      }); // Check that we have a value to search and the input was an alphanumeric character
  
      if (value !== null && typeof value !== 'undefined' && value.length >= searchFloor) {
        var resultCount = searchChoices ? this._searchChoices(value) : 0; // Trigger search event
  
        this.passedElement.triggerEvent(constants_1.EVENTS.search, {
          value: value,
          resultCount: resultCount
        });
      } else if (hasUnactiveChoices) {
        // Otherwise reset choices to active
        this._isSearching = false;
  
        this._store.dispatch((0, choices_1.activateChoices)(true));
      }
    };
  
    Choices.prototype._canAddItem = function (activeItems, value) {
      var canAddItem = true;
      var notice = typeof this.config.addItemText === 'function' ? this.config.addItemText(value) : this.config.addItemText;
  
      if (!this._isSelectOneElement) {
        var isDuplicateValue = (0, utils_1.existsInArray)(activeItems, value);
  
        if (this.config.maxItemCount > 0 && this.config.maxItemCount <= activeItems.length) {
          // If there is a max entry limit and we have reached that limit
          // don't update
          canAddItem = false;
          notice = typeof this.config.maxItemText === 'function' ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText;
        }
  
        if (!this.config.duplicateItemsAllowed && isDuplicateValue && canAddItem) {
          canAddItem = false;
          notice = typeof this.config.uniqueItemText === 'function' ? this.config.uniqueItemText(value) : this.config.uniqueItemText;
        }
  
        if (this._isTextElement && this.config.addItems && canAddItem && typeof this.config.addItemFilter === 'function' && !this.config.addItemFilter(value)) {
          canAddItem = false;
          notice = typeof this.config.customAddItemText === 'function' ? this.config.customAddItemText(value) : this.config.customAddItemText;
        }
      }
  
      return {
        response: canAddItem,
        notice: notice
      };
    };
  
    Choices.prototype._searchChoices = function (value) {
      var newValue = typeof value === 'string' ? value.trim() : value;
      var currentValue = typeof this._currentValue === 'string' ? this._currentValue.trim() : this._currentValue;
  
      if (newValue.length < 1 && newValue === "".concat(currentValue, " ")) {
        return 0;
      } // If new value matches the desired length and is not the same as the current value with a space
  
  
      var haystack = this._store.searchableChoices;
      var needle = newValue;
      var options = Object.assign(this.config.fuseOptions, {
        keys: __spreadArray([], this.config.searchFields, true),
        includeMatches: true
      });
      var fuse = new fuse_js_1.default(haystack, options);
      var results = fuse.search(needle); // see https://github.com/krisk/Fuse/issues/303
  
      this._currentValue = newValue;
      this._highlightPosition = 0;
      this._isSearching = true;
  
      this._store.dispatch((0, choices_1.filterChoices)(results));
  
      return results.length;
    };
  
    Choices.prototype._addEventListeners = function () {
      var documentElement = document.documentElement; // capture events - can cancel event processing or propagation
  
      documentElement.addEventListener('touchend', this._onTouchEnd, true);
      this.containerOuter.element.addEventListener('keydown', this._onKeyDown, true);
      this.containerOuter.element.addEventListener('mousedown', this._onMouseDown, true); // passive events - doesn't call `preventDefault` or `stopPropagation`
  
      documentElement.addEventListener('click', this._onClick, {
        passive: true
      });
      documentElement.addEventListener('touchmove', this._onTouchMove, {
        passive: true
      });
      this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
        passive: true
      });
  
      if (this._isSelectOneElement) {
        this.containerOuter.element.addEventListener('focus', this._onFocus, {
          passive: true
        });
        this.containerOuter.element.addEventListener('blur', this._onBlur, {
          passive: true
        });
      }
  
      this.input.element.addEventListener('keyup', this._onKeyUp, {
        passive: true
      });
      this.input.element.addEventListener('focus', this._onFocus, {
        passive: true
      });
      this.input.element.addEventListener('blur', this._onBlur, {
        passive: true
      });
  
      if (this.input.element.form) {
        this.input.element.form.addEventListener('reset', this._onFormReset, {
          passive: true
        });
      }
  
      this.input.addEventListeners();
    };
  
    Choices.prototype._removeEventListeners = function () {
      var documentElement = document.documentElement;
      documentElement.removeEventListener('touchend', this._onTouchEnd, true);
      this.containerOuter.element.removeEventListener('keydown', this._onKeyDown, true);
      this.containerOuter.element.removeEventListener('mousedown', this._onMouseDown, true);
      documentElement.removeEventListener('click', this._onClick);
      documentElement.removeEventListener('touchmove', this._onTouchMove);
      this.dropdown.element.removeEventListener('mouseover', this._onMouseOver);
  
      if (this._isSelectOneElement) {
        this.containerOuter.element.removeEventListener('focus', this._onFocus);
        this.containerOuter.element.removeEventListener('blur', this._onBlur);
      }
  
      this.input.element.removeEventListener('keyup', this._onKeyUp);
      this.input.element.removeEventListener('focus', this._onFocus);
      this.input.element.removeEventListener('blur', this._onBlur);
  
      if (this.input.element.form) {
        this.input.element.form.removeEventListener('reset', this._onFormReset);
      }
  
      this.input.removeEventListeners();
    };
  
    Choices.prototype._onKeyDown = function (event) {
      var keyCode = event.keyCode;
      var activeItems = this._store.activeItems;
      var hasFocusedInput = this.input.isFocussed;
      var hasActiveDropdown = this.dropdown.isActive;
      var hasItems = this.itemList.hasChildren();
      var keyString = String.fromCharCode(keyCode);
      var wasAlphaNumericChar = /[a-zA-Z0-9-_ ]/.test(keyString);
      var BACK_KEY = constants_1.KEY_CODES.BACK_KEY,
          DELETE_KEY = constants_1.KEY_CODES.DELETE_KEY,
          ENTER_KEY = constants_1.KEY_CODES.ENTER_KEY,
          A_KEY = constants_1.KEY_CODES.A_KEY,
          ESC_KEY = constants_1.KEY_CODES.ESC_KEY,
          UP_KEY = constants_1.KEY_CODES.UP_KEY,
          DOWN_KEY = constants_1.KEY_CODES.DOWN_KEY,
          PAGE_UP_KEY = constants_1.KEY_CODES.PAGE_UP_KEY,
          PAGE_DOWN_KEY = constants_1.KEY_CODES.PAGE_DOWN_KEY;
  
      if (!this._isTextElement && !hasActiveDropdown && wasAlphaNumericChar) {
        this.showDropdown();
  
        if (!this.input.isFocussed) {
          /*
            We update the input value with the pressed key as
            the input was not focussed at the time of key press
            therefore does not have the value of the key.
          */
          this.input.value += keyString.toLowerCase();
        }
      }
  
      switch (keyCode) {
        case A_KEY:
          return this._onSelectKey(event, hasItems);
  
        case ENTER_KEY:
          return this._onEnterKey(event, activeItems, hasActiveDropdown);
  
        case ESC_KEY:
          return this._onEscapeKey(hasActiveDropdown);
  
        case UP_KEY:
        case PAGE_UP_KEY:
        case DOWN_KEY:
        case PAGE_DOWN_KEY:
          return this._onDirectionKey(event, hasActiveDropdown);
  
        case DELETE_KEY:
        case BACK_KEY:
          return this._onDeleteKey(event, activeItems, hasFocusedInput);
  
        default:
      }
    };
  
    Choices.prototype._onKeyUp = function (_a) {
      var target = _a.target,
          keyCode = _a.keyCode;
      var value = this.input.value;
      var activeItems = this._store.activeItems;
  
      var canAddItem = this._canAddItem(activeItems, value);
  
      var backKey = constants_1.KEY_CODES.BACK_KEY,
          deleteKey = constants_1.KEY_CODES.DELETE_KEY; // We are typing into a text input and have a value, we want to show a dropdown
      // notice. Otherwise hide the dropdown
  
      if (this._isTextElement) {
        var canShowDropdownNotice = canAddItem.notice && value;
  
        if (canShowDropdownNotice) {
          var dropdownItem = this._getTemplate('notice', canAddItem.notice);
  
          this.dropdown.element.innerHTML = dropdownItem.outerHTML;
          this.showDropdown(true);
        } else {
          this.hideDropdown(true);
        }
      } else {
        var wasRemovalKeyCode = keyCode === backKey || keyCode === deleteKey;
        var userHasRemovedValue = wasRemovalKeyCode && target && !target.value;
        var canReactivateChoices = !this._isTextElement && this._isSearching;
        var canSearch = this._canSearch && canAddItem.response;
  
        if (userHasRemovedValue && canReactivateChoices) {
          this._isSearching = false;
  
          this._store.dispatch((0, choices_1.activateChoices)(true));
        } else if (canSearch) {
          this._handleSearch(this.input.rawValue);
        }
      }
  
      this._canSearch = this.config.searchEnabled;
    };
  
    Choices.prototype._onSelectKey = function (event, hasItems) {
      var ctrlKey = event.ctrlKey,
          metaKey = event.metaKey;
      var hasCtrlDownKeyPressed = ctrlKey || metaKey; // If CTRL + A or CMD + A have been pressed and there are items to select
  
      if (hasCtrlDownKeyPressed && hasItems) {
        this._canSearch = false;
        var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
  
        if (shouldHightlightAll) {
          this.highlightAll();
        }
      }
    };
  
    Choices.prototype._onEnterKey = function (event, activeItems, hasActiveDropdown) {
      var target = event.target;
      var enterKey = constants_1.KEY_CODES.ENTER_KEY;
      var targetWasButton = target && target.hasAttribute('data-button');
  
      if (this._isTextElement && target && target.value) {
        var value = this.input.value;
  
        var canAddItem = this._canAddItem(activeItems, value);
  
        if (canAddItem.response) {
          this.hideDropdown(true);
  
          this._addItem({
            value: value
          });
  
          this._triggerChange(value);
  
          this.clearInput();
        }
      }
  
      if (targetWasButton) {
        this._handleButtonAction(activeItems, target);
  
        event.preventDefault();
      }
  
      if (hasActiveDropdown) {
        var highlightedChoice = this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));
  
        if (highlightedChoice) {
          // add enter keyCode value
          if (activeItems[0]) {
            activeItems[0].keyCode = enterKey; // eslint-disable-line no-param-reassign
          }
  
          this._handleChoiceAction(activeItems, highlightedChoice);
        }
  
        event.preventDefault();
      } else if (this._isSelectOneElement) {
        this.showDropdown();
        event.preventDefault();
      }
    };
  
    Choices.prototype._onEscapeKey = function (hasActiveDropdown) {
      if (hasActiveDropdown) {
        this.hideDropdown(true);
        this.containerOuter.focus();
      }
    };
  
    Choices.prototype._onDirectionKey = function (event, hasActiveDropdown) {
      var keyCode = event.keyCode,
          metaKey = event.metaKey;
      var downKey = constants_1.KEY_CODES.DOWN_KEY,
          pageUpKey = constants_1.KEY_CODES.PAGE_UP_KEY,
          pageDownKey = constants_1.KEY_CODES.PAGE_DOWN_KEY; // If up or down key is pressed, traverse through options
  
      if (hasActiveDropdown || this._isSelectOneElement) {
        this.showDropdown();
        this._canSearch = false;
        var directionInt = keyCode === downKey || keyCode === pageDownKey ? 1 : -1;
        var skipKey = metaKey || keyCode === pageDownKey || keyCode === pageUpKey;
        var selectableChoiceIdentifier = '[data-choice-selectable]';
        var nextEl = void 0;
  
        if (skipKey) {
          if (directionInt > 0) {
            nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
          } else {
            nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
          }
        } else {
          var currentEl = this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));
  
          if (currentEl) {
            nextEl = (0, utils_1.getAdjacentEl)(currentEl, selectableChoiceIdentifier, directionInt);
          } else {
            nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
          }
        }
  
        if (nextEl) {
          // We prevent default to stop the cursor moving
          // when pressing the arrow
          if (!(0, utils_1.isScrolledIntoView)(nextEl, this.choiceList.element, directionInt)) {
            this.choiceList.scrollToChildElement(nextEl, directionInt);
          }
  
          this._highlightChoice(nextEl);
        } // Prevent default to maintain cursor position whilst
        // traversing dropdown options
  
  
        event.preventDefault();
      }
    };
  
    Choices.prototype._onDeleteKey = function (event, activeItems, hasFocusedInput) {
      var target = event.target; // If backspace or delete key is pressed and the input has no value
  
      if (!this._isSelectOneElement && !target.value && hasFocusedInput) {
        this._handleBackspace(activeItems);
  
        event.preventDefault();
      }
    };
  
    Choices.prototype._onTouchMove = function () {
      if (this._wasTap) {
        this._wasTap = false;
      }
    };
  
    Choices.prototype._onTouchEnd = function (event) {
      var target = (event || event.touches[0]).target;
      var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
  
      if (touchWasWithinContainer) {
        var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
  
        if (containerWasExactTarget) {
          if (this._isTextElement) {
            this.input.focus();
          } else if (this._isSelectMultipleElement) {
            this.showDropdown();
          }
        } // Prevents focus event firing
  
  
        event.stopPropagation();
      }
  
      this._wasTap = true;
    };
    /**
     * Handles mousedown event in capture mode for containetOuter.element
     */
  
  
    Choices.prototype._onMouseDown = function (event) {
      var target = event.target;
  
      if (!(target instanceof HTMLElement)) {
        return;
      } // If we have our mouse down on the scrollbar and are on IE11...
  
  
      if (IS_IE11 && this.choiceList.element.contains(target)) {
        // check if click was on a scrollbar area
        var firstChoice = this.choiceList.element.firstElementChild;
        var isOnScrollbar = this._direction === 'ltr' ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
        this._isScrollingOnIe = isOnScrollbar;
      }
  
      if (target === this.input.element) {
        return;
      }
  
      var item = target.closest('[data-button],[data-item],[data-choice]');
  
      if (item instanceof HTMLElement) {
        var hasShiftKey = event.shiftKey;
        var activeItems = this._store.activeItems;
        var dataset = item.dataset;
  
        if ('button' in dataset) {
          this._handleButtonAction(activeItems, item);
        } else if ('item' in dataset) {
          this._handleItemAction(activeItems, item, hasShiftKey);
        } else if ('choice' in dataset) {
          this._handleChoiceAction(activeItems, item);
        }
      }
  
      event.preventDefault();
    };
    /**
     * Handles mouseover event over this.dropdown
     * @param {MouseEvent} event
     */
  
  
    Choices.prototype._onMouseOver = function (_a) {
      var target = _a.target;
  
      if (target instanceof HTMLElement && 'choice' in target.dataset) {
        this._highlightChoice(target);
      }
    };
  
    Choices.prototype._onClick = function (_a) {
      var target = _a.target;
      var clickWasWithinContainer = this.containerOuter.element.contains(target);
  
      if (clickWasWithinContainer) {
        if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
          if (this._isTextElement) {
            if (document.activeElement !== this.input.element) {
              this.input.focus();
            }
          } else {
            this.showDropdown();
            this.containerOuter.focus();
          }
        } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
          this.hideDropdown();
        }
      } else {
        var hasHighlightedItems = this._store.highlightedActiveItems.length > 0;
  
        if (hasHighlightedItems) {
          this.unhighlightAll();
        }
  
        this.containerOuter.removeFocusState();
        this.hideDropdown(true);
      }
    };
  
    Choices.prototype._onFocus = function (_a) {
      var _b;
  
      var _this = this;
  
      var target = _a.target;
      var focusWasWithinContainer = target && this.containerOuter.element.contains(target);
  
      if (!focusWasWithinContainer) {
        return;
      }
  
      var focusActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
        if (target === _this.input.element) {
          _this.containerOuter.addFocusState();
        }
      }, _b[constants_1.SELECT_ONE_TYPE] = function () {
        _this.containerOuter.addFocusState();
  
        if (target === _this.input.element) {
          _this.showDropdown(true);
        }
      }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
        if (target === _this.input.element) {
          _this.showDropdown(true); // If element is a select box, the focused element is the container and the dropdown
          // isn't already open, focus and show dropdown
  
  
          _this.containerOuter.addFocusState();
        }
      }, _b);
      focusActions[this.passedElement.element.type]();
    };
  
    Choices.prototype._onBlur = function (_a) {
      var _b;
  
      var _this = this;
  
      var target = _a.target;
      var blurWasWithinContainer = target && this.containerOuter.element.contains(target);
  
      if (blurWasWithinContainer && !this._isScrollingOnIe) {
        var activeItems = this._store.activeItems;
        var hasHighlightedItems_1 = activeItems.some(function (item) {
          return item.highlighted;
        });
        var blurActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
          if (target === _this.input.element) {
            _this.containerOuter.removeFocusState();
  
            if (hasHighlightedItems_1) {
              _this.unhighlightAll();
            }
  
            _this.hideDropdown(true);
          }
        }, _b[constants_1.SELECT_ONE_TYPE] = function () {
          _this.containerOuter.removeFocusState();
  
          if (target === _this.input.element || target === _this.containerOuter.element && !_this._canSearch) {
            _this.hideDropdown(true);
          }
        }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
          if (target === _this.input.element) {
            _this.containerOuter.removeFocusState();
  
            _this.hideDropdown(true);
  
            if (hasHighlightedItems_1) {
              _this.unhighlightAll();
            }
          }
        }, _b);
        blurActions[this.passedElement.element.type]();
      } else {
        // On IE11, clicking the scollbar blurs our input and thus
        // closes the dropdown. To stop this, we refocus our input
        // if we know we are on IE *and* are scrolling.
        this._isScrollingOnIe = false;
        this.input.element.focus();
      }
    };
  
    Choices.prototype._onFormReset = function () {
      this._store.dispatch((0, misc_1.resetTo)(this._initialState));
    };
  
    Choices.prototype._highlightChoice = function (el) {
      var _this = this;
  
      if (el === void 0) {
        el = null;
      }
  
      var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));
  
      if (!choices.length) {
        return;
      }
  
      var passedEl = el;
      var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState))); // Remove any highlighted choices
  
      highlightedChoices.forEach(function (choice) {
        choice.classList.remove(_this.config.classNames.highlightedState);
        choice.setAttribute('aria-selected', 'false');
      });
  
      if (passedEl) {
        this._highlightPosition = choices.indexOf(passedEl);
      } else {
        // Highlight choice based on last known highlight location
        if (choices.length > this._highlightPosition) {
          // If we have an option to highlight
          passedEl = choices[this._highlightPosition];
        } else {
          // Otherwise highlight the option before
          passedEl = choices[choices.length - 1];
        }
  
        if (!passedEl) {
          passedEl = choices[0];
        }
      }
  
      passedEl.classList.add(this.config.classNames.highlightedState);
      passedEl.setAttribute('aria-selected', 'true');
      this.passedElement.triggerEvent(constants_1.EVENTS.highlightChoice, {
        el: passedEl
      });
  
      if (this.dropdown.isActive) {
        // IE11 ignores aria-label and blocks virtual keyboard
        // if aria-activedescendant is set without a dropdown
        this.input.setActiveDescendant(passedEl.id);
        this.containerOuter.setActiveDescendant(passedEl.id);
      }
    };
  
    Choices.prototype._addItem = function (_a) {
      var value = _a.value,
          _b = _a.label,
          label = _b === void 0 ? null : _b,
          _c = _a.choiceId,
          choiceId = _c === void 0 ? -1 : _c,
          _d = _a.groupId,
          groupId = _d === void 0 ? -1 : _d,
          _e = _a.customProperties,
          customProperties = _e === void 0 ? {} : _e,
          _f = _a.placeholder,
          placeholder = _f === void 0 ? false : _f,
          _g = _a.keyCode,
          keyCode = _g === void 0 ? -1 : _g;
      var passedValue = typeof value === 'string' ? value.trim() : value;
      var items = this._store.items;
      var passedLabel = label || passedValue;
      var passedOptionId = choiceId || -1;
      var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
      var id = items ? items.length + 1 : 1; // If a prepended value has been passed, prepend it
  
      if (this.config.prependValue) {
        passedValue = this.config.prependValue + passedValue.toString();
      } // If an appended value has been passed, append it
  
  
      if (this.config.appendValue) {
        passedValue += this.config.appendValue.toString();
      }
  
      this._store.dispatch((0, items_1.addItem)({
        value: passedValue,
        label: passedLabel,
        id: id,
        choiceId: passedOptionId,
        groupId: groupId,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode
      }));
  
      if (this._isSelectOneElement) {
        this.removeActiveItems(id);
      } // Trigger change event
  
  
      this.passedElement.triggerEvent(constants_1.EVENTS.addItem, {
        id: id,
        value: passedValue,
        label: passedLabel,
        customProperties: customProperties,
        groupValue: group && group.value ? group.value : null,
        keyCode: keyCode
      });
    };
  
    Choices.prototype._removeItem = function (item) {
      var id = item.id,
          value = item.value,
          label = item.label,
          customProperties = item.customProperties,
          choiceId = item.choiceId,
          groupId = item.groupId;
      var group = groupId && groupId >= 0 ? this._store.getGroupById(groupId) : null;
  
      if (!id || !choiceId) {
        return;
      }
  
      this._store.dispatch((0, items_1.removeItem)(id, choiceId));
  
      this.passedElement.triggerEvent(constants_1.EVENTS.removeItem, {
        id: id,
        value: value,
        label: label,
        customProperties: customProperties,
        groupValue: group && group.value ? group.value : null
      });
    };
  
    Choices.prototype._addChoice = function (_a) {
      var value = _a.value,
          _b = _a.label,
          label = _b === void 0 ? null : _b,
          _c = _a.isSelected,
          isSelected = _c === void 0 ? false : _c,
          _d = _a.isDisabled,
          isDisabled = _d === void 0 ? false : _d,
          _e = _a.groupId,
          groupId = _e === void 0 ? -1 : _e,
          _f = _a.customProperties,
          customProperties = _f === void 0 ? {} : _f,
          _g = _a.placeholder,
          placeholder = _g === void 0 ? false : _g,
          _h = _a.keyCode,
          keyCode = _h === void 0 ? -1 : _h;
  
      if (typeof value === 'undefined' || value === null) {
        return;
      } // Generate unique id
  
  
      var choices = this._store.choices;
      var choiceLabel = label || value;
      var choiceId = choices ? choices.length + 1 : 1;
      var choiceElementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choiceId);
  
      this._store.dispatch((0, choices_1.addChoice)({
        id: choiceId,
        groupId: groupId,
        elementId: choiceElementId,
        value: value,
        label: choiceLabel,
        disabled: isDisabled,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode
      }));
  
      if (isSelected) {
        this._addItem({
          value: value,
          label: choiceLabel,
          choiceId: choiceId,
          customProperties: customProperties,
          placeholder: placeholder,
          keyCode: keyCode
        });
      }
    };
  
    Choices.prototype._addGroup = function (_a) {
      var _this = this;
  
      var group = _a.group,
          id = _a.id,
          _b = _a.valueKey,
          valueKey = _b === void 0 ? 'value' : _b,
          _c = _a.labelKey,
          labelKey = _c === void 0 ? 'label' : _c;
      var groupChoices = (0, utils_1.isType)('Object', group) ? group.choices : Array.from(group.getElementsByTagName('OPTION'));
      var groupId = id || Math.floor(new Date().valueOf() * Math.random());
      var isDisabled = group.disabled ? group.disabled : false;
  
      if (groupChoices) {
        this._store.dispatch((0, groups_1.addGroup)({
          value: group.label,
          id: groupId,
          active: true,
          disabled: isDisabled
        }));
  
        var addGroupChoices = function (choice) {
          var isOptDisabled = choice.disabled || choice.parentNode && choice.parentNode.disabled;
  
          _this._addChoice({
            value: choice[valueKey],
            label: (0, utils_1.isType)('Object', choice) ? choice[labelKey] : choice.innerHTML,
            isSelected: choice.selected,
            isDisabled: isOptDisabled,
            groupId: groupId,
            customProperties: choice.customProperties,
            placeholder: choice.placeholder
          });
        };
  
        groupChoices.forEach(addGroupChoices);
      } else {
        this._store.dispatch((0, groups_1.addGroup)({
          value: group.label,
          id: group.id,
          active: false,
          disabled: group.disabled
        }));
      }
    };
  
    Choices.prototype._getTemplate = function (template) {
      var _a;
  
      var args = [];
  
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
  
      return (_a = this._templates[template]).call.apply(_a, __spreadArray([this, this.config], args, false));
    };
  
    Choices.prototype._createTemplates = function () {
      var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
      var userTemplates = {};
  
      if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === 'function') {
        userTemplates = callbackOnCreateTemplates.call(this, utils_1.strToEl);
      }
  
      this._templates = (0, deepmerge_1.default)(templates_1.default, userTemplates);
    };
  
    Choices.prototype._createElements = function () {
      this.containerOuter = new components_1.Container({
        element: this._getTemplate('containerOuter', this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type, this.config.labelId),
        classNames: this.config.classNames,
        type: this.passedElement.element.type,
        position: this.config.position
      });
      this.containerInner = new components_1.Container({
        element: this._getTemplate('containerInner'),
        classNames: this.config.classNames,
        type: this.passedElement.element.type,
        position: this.config.position
      });
      this.input = new components_1.Input({
        element: this._getTemplate('input', this._placeholderValue),
        classNames: this.config.classNames,
        type: this.passedElement.element.type,
        preventPaste: !this.config.paste
      });
      this.choiceList = new components_1.List({
        element: this._getTemplate('choiceList', this._isSelectOneElement)
      });
      this.itemList = new components_1.List({
        element: this._getTemplate('itemList', this._isSelectOneElement)
      });
      this.dropdown = new components_1.Dropdown({
        element: this._getTemplate('dropdown'),
        classNames: this.config.classNames,
        type: this.passedElement.element.type
      });
    };
  
    Choices.prototype._createStructure = function () {
      // Hide original element
      this.passedElement.conceal(); // Wrap input in container preserving DOM ordering
  
      this.containerInner.wrap(this.passedElement.element); // Wrapper inner container with outer container
  
      this.containerOuter.wrap(this.containerInner.element);
  
      if (this._isSelectOneElement) {
        this.input.placeholder = this.config.searchPlaceholderValue || '';
      } else if (this._placeholderValue) {
        this.input.placeholder = this._placeholderValue;
        this.input.setWidth();
      }
  
      this.containerOuter.element.appendChild(this.containerInner.element);
      this.containerOuter.element.appendChild(this.dropdown.element);
      this.containerInner.element.appendChild(this.itemList.element);
  
      if (!this._isTextElement) {
        this.dropdown.element.appendChild(this.choiceList.element);
      }
  
      if (!this._isSelectOneElement) {
        this.containerInner.element.appendChild(this.input.element);
      } else if (this.config.searchEnabled) {
        this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild);
      }
  
      if (this._isSelectElement) {
        this._highlightPosition = 0;
        this._isSearching = false;
  
        this._startLoading();
  
        if (this._presetGroups.length) {
          this._addPredefinedGroups(this._presetGroups);
        } else {
          this._addPredefinedChoices(this._presetChoices);
        }
  
        this._stopLoading();
      }
  
      if (this._isTextElement) {
        this._addPredefinedItems(this._presetItems);
      }
    };
  
    Choices.prototype._addPredefinedGroups = function (groups) {
      var _this = this; // If we have a placeholder option
  
  
      var placeholderChoice = this.passedElement.placeholderOption;
  
      if (placeholderChoice && placeholderChoice.parentNode && placeholderChoice.parentNode.tagName === 'SELECT') {
        this._addChoice({
          value: placeholderChoice.value,
          label: placeholderChoice.innerHTML,
          isSelected: placeholderChoice.selected,
          isDisabled: placeholderChoice.disabled,
          placeholder: true
        });
      }
  
      groups.forEach(function (group) {
        return _this._addGroup({
          group: group,
          id: group.id || null
        });
      });
    };
  
    Choices.prototype._addPredefinedChoices = function (choices) {
      var _this = this; // If sorting is enabled or the user is searching, filter choices
  
  
      if (this.config.shouldSort) {
        choices.sort(this.config.sorter);
      }
  
      var hasSelectedChoice = choices.some(function (choice) {
        return choice.selected;
      });
      var firstEnabledChoiceIndex = choices.findIndex(function (choice) {
        return choice.disabled === undefined || !choice.disabled;
      });
      choices.forEach(function (choice, index) {
        var _a = choice.value,
            value = _a === void 0 ? '' : _a,
            label = choice.label,
            customProperties = choice.customProperties,
            placeholder = choice.placeholder;
  
        if (_this._isSelectElement) {
          // If the choice is actually a group
          if (choice.choices) {
            _this._addGroup({
              group: choice,
              id: choice.id || null
            });
          } else {
            /**
             * If there is a selected choice already or the choice is not the first in
             * the array, add each choice normally.
             *
             * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
             */
            var shouldPreselect = _this._isSelectOneElement && !hasSelectedChoice && index === firstEnabledChoiceIndex;
            var isSelected = shouldPreselect ? true : choice.selected;
            var isDisabled = choice.disabled;
  
            _this._addChoice({
              value: value,
              label: label,
              isSelected: !!isSelected,
              isDisabled: !!isDisabled,
              placeholder: !!placeholder,
              customProperties: customProperties
            });
          }
        } else {
          _this._addChoice({
            value: value,
            label: label,
            isSelected: !!choice.selected,
            isDisabled: !!choice.disabled,
            placeholder: !!choice.placeholder,
            customProperties: customProperties
          });
        }
      });
    };
  
    Choices.prototype._addPredefinedItems = function (items) {
      var _this = this;
  
      items.forEach(function (item) {
        if (typeof item === 'object' && item.value) {
          _this._addItem({
            value: item.value,
            label: item.label,
            choiceId: item.id,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        }
  
        if (typeof item === 'string') {
          _this._addItem({
            value: item
          });
        }
      });
    };
  
    Choices.prototype._setChoiceOrItem = function (item) {
      var _this = this;
  
      var itemType = (0, utils_1.getType)(item).toLowerCase();
      var handleType = {
        object: function () {
          if (!item.value) {
            return;
          } // If we are dealing with a select input, we need to create an option first
          // that is then selected. For text inputs we can just add items normally.
  
  
          if (!_this._isTextElement) {
            _this._addChoice({
              value: item.value,
              label: item.label,
              isSelected: true,
              isDisabled: false,
              customProperties: item.customProperties,
              placeholder: item.placeholder
            });
          } else {
            _this._addItem({
              value: item.value,
              label: item.label,
              choiceId: item.id,
              customProperties: item.customProperties,
              placeholder: item.placeholder
            });
          }
        },
        string: function () {
          if (!_this._isTextElement) {
            _this._addChoice({
              value: item,
              label: item,
              isSelected: true,
              isDisabled: false
            });
          } else {
            _this._addItem({
              value: item
            });
          }
        }
      };
      handleType[itemType]();
    };
  
    Choices.prototype._findAndSelectChoiceByValue = function (value) {
      var _this = this;
  
      var choices = this._store.choices; // Check 'value' property exists and the choice isn't already selected
  
      var foundChoice = choices.find(function (choice) {
        return _this.config.valueComparer(choice.value, value);
      });
  
      if (foundChoice && !foundChoice.selected) {
        this._addItem({
          value: foundChoice.value,
          label: foundChoice.label,
          choiceId: foundChoice.id,
          groupId: foundChoice.groupId,
          customProperties: foundChoice.customProperties,
          placeholder: foundChoice.placeholder,
          keyCode: foundChoice.keyCode
        });
      }
    };
  
    Choices.prototype._generatePlaceholderValue = function () {
      if (this._isSelectElement && this.passedElement.placeholderOption) {
        var placeholderOption = this.passedElement.placeholderOption;
        return placeholderOption ? placeholderOption.text : null;
      }
  
      var _a = this.config,
          placeholder = _a.placeholder,
          placeholderValue = _a.placeholderValue;
      var dataset = this.passedElement.element.dataset;
  
      if (placeholder) {
        if (placeholderValue) {
          return placeholderValue;
        }
  
        if (dataset.placeholder) {
          return dataset.placeholder;
        }
      }
  
      return null;
    };
  
    return Choices;
  }();
  
  exports["default"] = Choices;
  
  /***/ }),
  
  /***/ 613:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var utils_1 = __webpack_require__(799);
  
  var constants_1 = __webpack_require__(883);
  
  var Container =
  /** @class */
  function () {
    function Container(_a) {
      var element = _a.element,
          type = _a.type,
          classNames = _a.classNames,
          position = _a.position;
      this.element = element;
      this.classNames = classNames;
      this.type = type;
      this.position = position;
      this.isOpen = false;
      this.isFlipped = false;
      this.isFocussed = false;
      this.isDisabled = false;
      this.isLoading = false;
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
    }
  
    Container.prototype.addEventListeners = function () {
      this.element.addEventListener('focus', this._onFocus);
      this.element.addEventListener('blur', this._onBlur);
    };
  
    Container.prototype.removeEventListeners = function () {
      this.element.removeEventListener('focus', this._onFocus);
      this.element.removeEventListener('blur', this._onBlur);
    };
    /**
     * Determine whether container should be flipped based on passed
     * dropdown position
     */
  
  
    Container.prototype.shouldFlip = function (dropdownPos) {
      if (typeof dropdownPos !== 'number') {
        return false;
      } // If flip is enabled and the dropdown bottom position is
      // greater than the window height flip the dropdown.
  
  
      var shouldFlip = false;
  
      if (this.position === 'auto') {
        shouldFlip = !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
      } else if (this.position === 'top') {
        shouldFlip = true;
      }
  
      return shouldFlip;
    };
  
    Container.prototype.setActiveDescendant = function (activeDescendantID) {
      this.element.setAttribute('aria-activedescendant', activeDescendantID);
    };
  
    Container.prototype.removeActiveDescendant = function () {
      this.element.removeAttribute('aria-activedescendant');
    };
  
    Container.prototype.open = function (dropdownPos) {
      this.element.classList.add(this.classNames.openState);
      this.element.setAttribute('aria-expanded', 'true');
      this.isOpen = true;
  
      if (this.shouldFlip(dropdownPos)) {
        this.element.classList.add(this.classNames.flippedState);
        this.isFlipped = true;
      }
    };
  
    Container.prototype.close = function () {
      this.element.classList.remove(this.classNames.openState);
      this.element.setAttribute('aria-expanded', 'false');
      this.removeActiveDescendant();
      this.isOpen = false; // A dropdown flips if it does not have space within the page
  
      if (this.isFlipped) {
        this.element.classList.remove(this.classNames.flippedState);
        this.isFlipped = false;
      }
    };
  
    Container.prototype.focus = function () {
      if (!this.isFocussed) {
        this.element.focus();
      }
    };
  
    Container.prototype.addFocusState = function () {
      this.element.classList.add(this.classNames.focusState);
    };
  
    Container.prototype.removeFocusState = function () {
      this.element.classList.remove(this.classNames.focusState);
    };
  
    Container.prototype.enable = function () {
      this.element.classList.remove(this.classNames.disabledState);
      this.element.removeAttribute('aria-disabled');
  
      if (this.type === constants_1.SELECT_ONE_TYPE) {
        this.element.setAttribute('tabindex', '0');
      }
  
      this.isDisabled = false;
    };
  
    Container.prototype.disable = function () {
      this.element.classList.add(this.classNames.disabledState);
      this.element.setAttribute('aria-disabled', 'true');
  
      if (this.type === constants_1.SELECT_ONE_TYPE) {
        this.element.setAttribute('tabindex', '-1');
      }
  
      this.isDisabled = true;
    };
  
    Container.prototype.wrap = function (element) {
      (0, utils_1.wrap)(element, this.element);
    };
  
    Container.prototype.unwrap = function (element) {
      if (this.element.parentNode) {
        // Move passed element outside this element
        this.element.parentNode.insertBefore(element, this.element); // Remove this element
  
        this.element.parentNode.removeChild(this.element);
      }
    };
  
    Container.prototype.addLoadingState = function () {
      this.element.classList.add(this.classNames.loadingState);
      this.element.setAttribute('aria-busy', 'true');
      this.isLoading = true;
    };
  
    Container.prototype.removeLoadingState = function () {
      this.element.classList.remove(this.classNames.loadingState);
      this.element.removeAttribute('aria-busy');
      this.isLoading = false;
    };
  
    Container.prototype._onFocus = function () {
      this.isFocussed = true;
    };
  
    Container.prototype._onBlur = function () {
      this.isFocussed = false;
    };
  
    return Container;
  }();
  
  exports["default"] = Container;
  
  /***/ }),
  
  /***/ 217:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var Dropdown =
  /** @class */
  function () {
    function Dropdown(_a) {
      var element = _a.element,
          type = _a.type,
          classNames = _a.classNames;
      this.element = element;
      this.classNames = classNames;
      this.type = type;
      this.isActive = false;
    }
  
    Object.defineProperty(Dropdown.prototype, "distanceFromTopWindow", {
      /**
       * Bottom position of dropdown in viewport coordinates
       */
      get: function () {
        return this.element.getBoundingClientRect().bottom;
      },
      enumerable: false,
      configurable: true
    });
  
    Dropdown.prototype.getChild = function (selector) {
      return this.element.querySelector(selector);
    };
    /**
     * Show dropdown to user by adding active state class
     */
  
  
    Dropdown.prototype.show = function () {
      this.element.classList.add(this.classNames.activeState);
      this.element.setAttribute('aria-expanded', 'true');
      this.isActive = true;
      return this;
    };
    /**
     * Hide dropdown from user
     */
  
  
    Dropdown.prototype.hide = function () {
      this.element.classList.remove(this.classNames.activeState);
      this.element.setAttribute('aria-expanded', 'false');
      this.isActive = false;
      return this;
    };
  
    return Dropdown;
  }();
  
  exports["default"] = Dropdown;
  
  /***/ }),
  
  /***/ 520:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.WrappedSelect = exports.WrappedInput = exports.List = exports.Input = exports.Container = exports.Dropdown = void 0;
  
  var dropdown_1 = __importDefault(__webpack_require__(217));
  
  exports.Dropdown = dropdown_1.default;
  
  var container_1 = __importDefault(__webpack_require__(613));
  
  exports.Container = container_1.default;
  
  var input_1 = __importDefault(__webpack_require__(11));
  
  exports.Input = input_1.default;
  
  var list_1 = __importDefault(__webpack_require__(624));
  
  exports.List = list_1.default;
  
  var wrapped_input_1 = __importDefault(__webpack_require__(541));
  
  exports.WrappedInput = wrapped_input_1.default;
  
  var wrapped_select_1 = __importDefault(__webpack_require__(982));
  
  exports.WrappedSelect = wrapped_select_1.default;
  
  /***/ }),
  
  /***/ 11:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var utils_1 = __webpack_require__(799);
  
  var constants_1 = __webpack_require__(883);
  
  var Input =
  /** @class */
  function () {
    function Input(_a) {
      var element = _a.element,
          type = _a.type,
          classNames = _a.classNames,
          preventPaste = _a.preventPaste;
      this.element = element;
      this.type = type;
      this.classNames = classNames;
      this.preventPaste = preventPaste;
      this.isFocussed = this.element.isEqualNode(document.activeElement);
      this.isDisabled = element.disabled;
      this._onPaste = this._onPaste.bind(this);
      this._onInput = this._onInput.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
    }
  
    Object.defineProperty(Input.prototype, "placeholder", {
      set: function (placeholder) {
        this.element.placeholder = placeholder;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Input.prototype, "value", {
      get: function () {
        return (0, utils_1.sanitise)(this.element.value);
      },
      set: function (value) {
        this.element.value = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Input.prototype, "rawValue", {
      get: function () {
        return this.element.value;
      },
      enumerable: false,
      configurable: true
    });
  
    Input.prototype.addEventListeners = function () {
      this.element.addEventListener('paste', this._onPaste);
      this.element.addEventListener('input', this._onInput, {
        passive: true
      });
      this.element.addEventListener('focus', this._onFocus, {
        passive: true
      });
      this.element.addEventListener('blur', this._onBlur, {
        passive: true
      });
    };
  
    Input.prototype.removeEventListeners = function () {
      this.element.removeEventListener('input', this._onInput);
      this.element.removeEventListener('paste', this._onPaste);
      this.element.removeEventListener('focus', this._onFocus);
      this.element.removeEventListener('blur', this._onBlur);
    };
  
    Input.prototype.enable = function () {
      this.element.removeAttribute('disabled');
      this.isDisabled = false;
    };
  
    Input.prototype.disable = function () {
      this.element.setAttribute('disabled', '');
      this.isDisabled = true;
    };
  
    Input.prototype.focus = function () {
      if (!this.isFocussed) {
        this.element.focus();
      }
    };
  
    Input.prototype.blur = function () {
      if (this.isFocussed) {
        this.element.blur();
      }
    };
  
    Input.prototype.clear = function (setWidth) {
      if (setWidth === void 0) {
        setWidth = true;
      }
  
      if (this.element.value) {
        this.element.value = '';
      }
  
      if (setWidth) {
        this.setWidth();
      }
  
      return this;
    };
    /**
     * Set the correct input width based on placeholder
     * value or input value
     */
  
  
    Input.prototype.setWidth = function () {
      // Resize input to contents or placeholder
      var _a = this.element,
          style = _a.style,
          value = _a.value,
          placeholder = _a.placeholder;
      style.minWidth = "".concat(placeholder.length + 1, "ch");
      style.width = "".concat(value.length + 1, "ch");
    };
  
    Input.prototype.setActiveDescendant = function (activeDescendantID) {
      this.element.setAttribute('aria-activedescendant', activeDescendantID);
    };
  
    Input.prototype.removeActiveDescendant = function () {
      this.element.removeAttribute('aria-activedescendant');
    };
  
    Input.prototype._onInput = function () {
      if (this.type !== constants_1.SELECT_ONE_TYPE) {
        this.setWidth();
      }
    };
  
    Input.prototype._onPaste = function (event) {
      if (this.preventPaste) {
        event.preventDefault();
      }
    };
  
    Input.prototype._onFocus = function () {
      this.isFocussed = true;
    };
  
    Input.prototype._onBlur = function () {
      this.isFocussed = false;
    };
  
    return Input;
  }();
  
  exports["default"] = Input;
  
  /***/ }),
  
  /***/ 624:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var constants_1 = __webpack_require__(883);
  
  var List =
  /** @class */
  function () {
    function List(_a) {
      var element = _a.element;
      this.element = element;
      this.scrollPos = this.element.scrollTop;
      this.height = this.element.offsetHeight;
    }
  
    List.prototype.clear = function () {
      this.element.innerHTML = '';
    };
  
    List.prototype.append = function (node) {
      this.element.appendChild(node);
    };
  
    List.prototype.getChild = function (selector) {
      return this.element.querySelector(selector);
    };
  
    List.prototype.hasChildren = function () {
      return this.element.hasChildNodes();
    };
  
    List.prototype.scrollToTop = function () {
      this.element.scrollTop = 0;
    };
  
    List.prototype.scrollToChildElement = function (element, direction) {
      var _this = this;
  
      if (!element) {
        return;
      }
  
      var listHeight = this.element.offsetHeight; // Scroll position of dropdown
  
      var listScrollPosition = this.element.scrollTop + listHeight;
      var elementHeight = element.offsetHeight; // Distance from bottom of element to top of parent
  
      var elementPos = element.offsetTop + elementHeight; // Difference between the element and scroll position
  
      var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
      requestAnimationFrame(function () {
        _this._animateScroll(destination, direction);
      });
    };
  
    List.prototype._scrollDown = function (scrollPos, strength, destination) {
      var easing = (destination - scrollPos) / strength;
      var distance = easing > 1 ? easing : 1;
      this.element.scrollTop = scrollPos + distance;
    };
  
    List.prototype._scrollUp = function (scrollPos, strength, destination) {
      var easing = (scrollPos - destination) / strength;
      var distance = easing > 1 ? easing : 1;
      this.element.scrollTop = scrollPos - distance;
    };
  
    List.prototype._animateScroll = function (destination, direction) {
      var _this = this;
  
      var strength = constants_1.SCROLLING_SPEED;
      var choiceListScrollTop = this.element.scrollTop;
      var continueAnimation = false;
  
      if (direction > 0) {
        this._scrollDown(choiceListScrollTop, strength, destination);
  
        if (choiceListScrollTop < destination) {
          continueAnimation = true;
        }
      } else {
        this._scrollUp(choiceListScrollTop, strength, destination);
  
        if (choiceListScrollTop > destination) {
          continueAnimation = true;
        }
      }
  
      if (continueAnimation) {
        requestAnimationFrame(function () {
          _this._animateScroll(destination, direction);
        });
      }
    };
  
    return List;
  }();
  
  exports["default"] = List;
  
  /***/ }),
  
  /***/ 730:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var utils_1 = __webpack_require__(799);
  
  var WrappedElement =
  /** @class */
  function () {
    function WrappedElement(_a) {
      var element = _a.element,
          classNames = _a.classNames;
      this.element = element;
      this.classNames = classNames;
  
      if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
        throw new TypeError('Invalid element passed');
      }
  
      this.isDisabled = false;
    }
  
    Object.defineProperty(WrappedElement.prototype, "isActive", {
      get: function () {
        return this.element.dataset.choice === 'active';
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedElement.prototype, "dir", {
      get: function () {
        return this.element.dir;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedElement.prototype, "value", {
      get: function () {
        return this.element.value;
      },
      set: function (value) {
        // you must define setter here otherwise it will be readonly property
        this.element.value = value;
      },
      enumerable: false,
      configurable: true
    });
  
    WrappedElement.prototype.conceal = function () {
      // Hide passed input
      this.element.classList.add(this.classNames.input);
      this.element.hidden = true; // Remove element from tab index
  
      this.element.tabIndex = -1; // Backup original styles if any
  
      var origStyle = this.element.getAttribute('style');
  
      if (origStyle) {
        this.element.setAttribute('data-choice-orig-style', origStyle);
      }
  
      this.element.setAttribute('data-choice', 'active');
    };
  
    WrappedElement.prototype.reveal = function () {
      // Reinstate passed element
      this.element.classList.remove(this.classNames.input);
      this.element.hidden = false;
      this.element.removeAttribute('tabindex'); // Recover original styles if any
  
      var origStyle = this.element.getAttribute('data-choice-orig-style');
  
      if (origStyle) {
        this.element.removeAttribute('data-choice-orig-style');
        this.element.setAttribute('style', origStyle);
      } else {
        this.element.removeAttribute('style');
      }
  
      this.element.removeAttribute('data-choice'); // Re-assign values - this is weird, I know
      // @todo Figure out why we need to do this
  
      this.element.value = this.element.value; // eslint-disable-line no-self-assign
    };
  
    WrappedElement.prototype.enable = function () {
      this.element.removeAttribute('disabled');
      this.element.disabled = false;
      this.isDisabled = false;
    };
  
    WrappedElement.prototype.disable = function () {
      this.element.setAttribute('disabled', '');
      this.element.disabled = true;
      this.isDisabled = true;
    };
  
    WrappedElement.prototype.triggerEvent = function (eventType, data) {
      (0, utils_1.dispatchEvent)(this.element, eventType, data);
    };
  
    return WrappedElement;
  }();
  
  exports["default"] = WrappedElement;
  
  /***/ }),
  
  /***/ 541:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
  
      return extendStatics(d, b);
    };
  
    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
  
      function __() {
        this.constructor = d;
      }
  
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var wrapped_element_1 = __importDefault(__webpack_require__(730));
  
  var WrappedInput =
  /** @class */
  function (_super) {
    __extends(WrappedInput, _super);
  
    function WrappedInput(_a) {
      var element = _a.element,
          classNames = _a.classNames,
          delimiter = _a.delimiter;
  
      var _this = _super.call(this, {
        element: element,
        classNames: classNames
      }) || this;
  
      _this.delimiter = delimiter;
      return _this;
    }
  
    Object.defineProperty(WrappedInput.prototype, "value", {
      get: function () {
        return this.element.value;
      },
      set: function (value) {
        this.element.setAttribute('value', value);
        this.element.value = value;
      },
      enumerable: false,
      configurable: true
    });
    return WrappedInput;
  }(wrapped_element_1.default);
  
  exports["default"] = WrappedInput;
  
  /***/ }),
  
  /***/ 982:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
  
      return extendStatics(d, b);
    };
  
    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
  
      function __() {
        this.constructor = d;
      }
  
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  var wrapped_element_1 = __importDefault(__webpack_require__(730));
  
  var WrappedSelect =
  /** @class */
  function (_super) {
    __extends(WrappedSelect, _super);
  
    function WrappedSelect(_a) {
      var element = _a.element,
          classNames = _a.classNames,
          template = _a.template;
  
      var _this = _super.call(this, {
        element: element,
        classNames: classNames
      }) || this;
  
      _this.template = template;
      return _this;
    }
  
    Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
      get: function () {
        return this.element.querySelector('option[value=""]') || // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
        this.element.querySelector('option[placeholder]');
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedSelect.prototype, "optionGroups", {
      get: function () {
        return Array.from(this.element.getElementsByTagName('OPTGROUP'));
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(WrappedSelect.prototype, "options", {
      get: function () {
        return Array.from(this.element.options);
      },
      set: function (options) {
        var _this = this;
  
        var fragment = document.createDocumentFragment();
  
        var addOptionToFragment = function (data) {
          // Create a standard select option
          var option = _this.template(data); // Append it to fragment
  
  
          fragment.appendChild(option);
        }; // Add each list item to list
  
  
        options.forEach(function (optionData) {
          return addOptionToFragment(optionData);
        });
        this.appendDocFragment(fragment);
      },
      enumerable: false,
      configurable: true
    });
  
    WrappedSelect.prototype.appendDocFragment = function (fragment) {
      this.element.innerHTML = '';
      this.element.appendChild(fragment);
    };
  
    return WrappedSelect;
  }(wrapped_element_1.default);
  
  exports["default"] = WrappedSelect;
  
  /***/ }),
  
  /***/ 883:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.SCROLLING_SPEED = exports.SELECT_MULTIPLE_TYPE = exports.SELECT_ONE_TYPE = exports.TEXT_TYPE = exports.KEY_CODES = exports.ACTION_TYPES = exports.EVENTS = void 0;
  exports.EVENTS = {
    showDropdown: 'showDropdown',
    hideDropdown: 'hideDropdown',
    change: 'change',
    choice: 'choice',
    search: 'search',
    addItem: 'addItem',
    removeItem: 'removeItem',
    highlightItem: 'highlightItem',
    highlightChoice: 'highlightChoice',
    unhighlightItem: 'unhighlightItem'
  };
  exports.ACTION_TYPES = {
    ADD_CHOICE: 'ADD_CHOICE',
    FILTER_CHOICES: 'FILTER_CHOICES',
    ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
    CLEAR_CHOICES: 'CLEAR_CHOICES',
    ADD_GROUP: 'ADD_GROUP',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
    CLEAR_ALL: 'CLEAR_ALL',
    RESET_TO: 'RESET_TO',
    SET_IS_LOADING: 'SET_IS_LOADING'
  };
  exports.KEY_CODES = {
    BACK_KEY: 46,
    DELETE_KEY: 8,
    ENTER_KEY: 13,
    A_KEY: 65,
    ESC_KEY: 27,
    UP_KEY: 38,
    DOWN_KEY: 40,
    PAGE_UP_KEY: 33,
    PAGE_DOWN_KEY: 34
  };
  exports.TEXT_TYPE = 'text';
  exports.SELECT_ONE_TYPE = 'select-one';
  exports.SELECT_MULTIPLE_TYPE = 'select-multiple';
  exports.SCROLLING_SPEED = 4;
  
  /***/ }),
  
  /***/ 789:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.DEFAULT_CONFIG = exports.DEFAULT_CLASSNAMES = void 0;
  
  var utils_1 = __webpack_require__(799);
  
  exports.DEFAULT_CLASSNAMES = {
    containerOuter: 'choices',
    containerInner: 'choices__inner',
    input: 'choices__input',
    inputCloned: 'choices__input--cloned',
    list: 'choices__list',
    listItems: 'choices__list--multiple',
    listSingle: 'choices__list--single',
    listDropdown: 'choices__list--dropdown',
    item: 'choices__item',
    itemSelectable: 'choices__item--selectable',
    itemDisabled: 'choices__item--disabled',
    itemChoice: 'choices__item--choice',
    placeholder: 'choices__placeholder',
    group: 'choices__group',
    groupHeading: 'choices__heading',
    button: 'choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    selectedState: 'is-selected',
    flippedState: 'is-flipped',
    loadingState: 'is-loading',
    noResults: 'has-no-results',
    noChoices: 'has-no-choices'
  };
  exports.DEFAULT_CONFIG = {
    items: [],
    choices: [],
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    allowHTML: true,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: utils_1.sortByAlpha,
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Loading...',
    noResultsText: 'No results found',
    noChoicesText: 'No choices to choose from',
    itemSelectText: 'Press to select',
    uniqueItemText: 'Only unique values can be added',
    customAddItemText: 'Only values matching specific conditions can be added',
    addItemText: function (value) {
      return "Press Enter to add <b>\"".concat((0, utils_1.sanitise)(value), "\"</b>");
    },
    maxItemText: function (maxItemCount) {
      return "Only ".concat(maxItemCount, " values can be added");
    },
    valueComparer: function (value1, value2) {
      return value1 === value2;
    },
    fuseOptions: {
      includeScore: true
    },
    labelId: '',
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
    classNames: exports.DEFAULT_CLASSNAMES
  };
  
  /***/ }),
  
  /***/ 18:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 978:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 948:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 359:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 285:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 533:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 187:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function () {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });
  
  var __exportStar = this && this.__exportStar || function (m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  __exportStar(__webpack_require__(18), exports);
  
  __exportStar(__webpack_require__(978), exports);
  
  __exportStar(__webpack_require__(948), exports);
  
  __exportStar(__webpack_require__(359), exports);
  
  __exportStar(__webpack_require__(285), exports);
  
  __exportStar(__webpack_require__(533), exports);
  
  __exportStar(__webpack_require__(287), exports);
  
  __exportStar(__webpack_require__(132), exports);
  
  __exportStar(__webpack_require__(837), exports);
  
  __exportStar(__webpack_require__(598), exports);
  
  __exportStar(__webpack_require__(369), exports);
  
  __exportStar(__webpack_require__(37), exports);
  
  __exportStar(__webpack_require__(47), exports);
  
  __exportStar(__webpack_require__(923), exports);
  
  __exportStar(__webpack_require__(876), exports);
  
  /***/ }),
  
  /***/ 287:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 132:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 837:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 598:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 37:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 369:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 47:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 923:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 876:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  
  /***/ }),
  
  /***/ 799:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.diff = exports.cloneObject = exports.existsInArray = exports.dispatchEvent = exports.sortByScore = exports.sortByAlpha = exports.strToEl = exports.sanitise = exports.isScrolledIntoView = exports.getAdjacentEl = exports.wrap = exports.isType = exports.getType = exports.generateId = exports.generateChars = exports.getRandomNumber = void 0;
  
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  exports.getRandomNumber = getRandomNumber;
  
  var generateChars = function (length) {
    return Array.from({
      length: length
    }, function () {
      return (0, exports.getRandomNumber)(0, 36).toString(36);
    }).join('');
  };
  
  exports.generateChars = generateChars;
  
  var generateId = function (element, prefix) {
    var id = element.id || element.name && "".concat(element.name, "-").concat((0, exports.generateChars)(2)) || (0, exports.generateChars)(4);
    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = "".concat(prefix, "-").concat(id);
    return id;
  };
  
  exports.generateId = generateId;
  
  var getType = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  };
  
  exports.getType = getType;
  
  var isType = function (type, obj) {
    return obj !== undefined && obj !== null && (0, exports.getType)(obj) === type;
  };
  
  exports.isType = isType;
  
  var wrap = function (element, wrapper) {
    if (wrapper === void 0) {
      wrapper = document.createElement('div');
    }
  
    if (element.parentNode) {
      if (element.nextSibling) {
        element.parentNode.insertBefore(wrapper, element.nextSibling);
      } else {
        element.parentNode.appendChild(wrapper);
      }
    }
  
    return wrapper.appendChild(element);
  };
  
  exports.wrap = wrap;
  
  var getAdjacentEl = function (startEl, selector, direction) {
    if (direction === void 0) {
      direction = 1;
    }
  
    var prop = "".concat(direction > 0 ? 'next' : 'previous', "ElementSibling");
    var sibling = startEl[prop];
  
    while (sibling) {
      if (sibling.matches(selector)) {
        return sibling;
      }
  
      sibling = sibling[prop];
    }
  
    return sibling;
  };
  
  exports.getAdjacentEl = getAdjacentEl;
  
  var isScrolledIntoView = function (element, parent, direction) {
    if (direction === void 0) {
      direction = 1;
    }
  
    if (!element) {
      return false;
    }
  
    var isVisible;
  
    if (direction > 0) {
      // In view from bottom
      isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
    } else {
      // In view from top
      isVisible = element.offsetTop >= parent.scrollTop;
    }
  
    return isVisible;
  };
  
  exports.isScrolledIntoView = isScrolledIntoView;
  
  var sanitise = function (value) {
    if (typeof value !== 'string') {
      return value;
    }
  
    return value.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  };
  
  exports.sanitise = sanitise;
  
  exports.strToEl = function () {
    var tmpEl = document.createElement('div');
    return function (str) {
      var cleanedInput = str.trim();
      tmpEl.innerHTML = cleanedInput;
      var firldChild = tmpEl.children[0];
  
      while (tmpEl.firstChild) {
        tmpEl.removeChild(tmpEl.firstChild);
      }
  
      return firldChild;
    };
  }();
  
  var sortByAlpha = function (_a, _b) {
    var value = _a.value,
        _c = _a.label,
        label = _c === void 0 ? value : _c;
    var value2 = _b.value,
        _d = _b.label,
        label2 = _d === void 0 ? value2 : _d;
    return label.localeCompare(label2, [], {
      sensitivity: 'base',
      ignorePunctuation: true,
      numeric: true
    });
  };
  
  exports.sortByAlpha = sortByAlpha;
  
  var sortByScore = function (a, b) {
    var _a = a.score,
        scoreA = _a === void 0 ? 0 : _a;
    var _b = b.score,
        scoreB = _b === void 0 ? 0 : _b;
    return scoreA - scoreB;
  };
  
  exports.sortByScore = sortByScore;
  
  var dispatchEvent = function (element, type, customArgs) {
    if (customArgs === void 0) {
      customArgs = null;
    }
  
    var event = new CustomEvent(type, {
      detail: customArgs,
      bubbles: true,
      cancelable: true
    });
    return element.dispatchEvent(event);
  };
  
  exports.dispatchEvent = dispatchEvent;
  
  var existsInArray = function (array, value, key) {
    if (key === void 0) {
      key = 'value';
    }
  
    return array.some(function (item) {
      if (typeof value === 'string') {
        return item[key] === value.trim();
      }
  
      return item[key] === value;
    });
  };
  
  exports.existsInArray = existsInArray;
  
  var cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  
  exports.cloneObject = cloneObject;
  /**
   * Returns an array of keys present on the first but missing on the second object
   */
  
  var diff = function (a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return aKeys.filter(function (i) {
      return bKeys.indexOf(i) < 0;
    });
  };
  
  exports.diff = diff;
  
  /***/ }),
  
  /***/ 273:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.defaultState = void 0;
  exports.defaultState = [];
  
  function choices(state, action) {
    if (state === void 0) {
      state = exports.defaultState;
    }
  
    if (action === void 0) {
      action = {};
    }
  
    switch (action.type) {
      case 'ADD_CHOICE':
        {
          var addChoiceAction = action;
          var choice = {
            id: addChoiceAction.id,
            elementId: addChoiceAction.elementId,
            groupId: addChoiceAction.groupId,
            value: addChoiceAction.value,
            label: addChoiceAction.label || addChoiceAction.value,
            disabled: addChoiceAction.disabled || false,
            selected: false,
            active: true,
            score: 9999,
            customProperties: addChoiceAction.customProperties,
            placeholder: addChoiceAction.placeholder || false
          };
          /*
            A disabled choice appears in the choice dropdown but cannot be selected
            A selected choice has been added to the passed input's value (added as an item)
            An active choice appears within the choice dropdown
          */
  
          return __spreadArray(__spreadArray([], state, true), [choice], false);
        }
  
      case 'ADD_ITEM':
        {
          var addItemAction_1 = action; // When an item is added and it has an associated choice,
          // we want to disable it so it can't be chosen again
  
          if (addItemAction_1.choiceId > -1) {
            return state.map(function (obj) {
              var choice = obj;
  
              if (choice.id === parseInt("".concat(addItemAction_1.choiceId), 10)) {
                choice.selected = true;
              }
  
              return choice;
            });
          }
  
          return state;
        }
  
      case 'REMOVE_ITEM':
        {
          var removeItemAction_1 = action; // When an item is removed and it has an associated choice,
          // we want to re-enable it so it can be chosen again
  
          if (removeItemAction_1.choiceId && removeItemAction_1.choiceId > -1) {
            return state.map(function (obj) {
              var choice = obj;
  
              if (choice.id === parseInt("".concat(removeItemAction_1.choiceId), 10)) {
                choice.selected = false;
              }
  
              return choice;
            });
          }
  
          return state;
        }
  
      case 'FILTER_CHOICES':
        {
          var filterChoicesAction_1 = action;
          return state.map(function (obj) {
            var choice = obj; // Set active state based on whether choice is
            // within filtered results
  
            choice.active = filterChoicesAction_1.results.some(function (_a) {
              var item = _a.item,
                  score = _a.score;
  
              if (item.id === choice.id) {
                choice.score = score;
                return true;
              }
  
              return false;
            });
            return choice;
          });
        }
  
      case 'ACTIVATE_CHOICES':
        {
          var activateChoicesAction_1 = action;
          return state.map(function (obj) {
            var choice = obj;
            choice.active = activateChoicesAction_1.active;
            return choice;
          });
        }
  
      case 'CLEAR_CHOICES':
        {
          return exports.defaultState;
        }
  
      default:
        {
          return state;
        }
    }
  }
  
  exports["default"] = choices;
  
  /***/ }),
  
  /***/ 871:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.defaultState = void 0;
  exports.defaultState = [];
  
  function groups(state, action) {
    if (state === void 0) {
      state = exports.defaultState;
    }
  
    if (action === void 0) {
      action = {};
    }
  
    switch (action.type) {
      case 'ADD_GROUP':
        {
          var addGroupAction = action;
          return __spreadArray(__spreadArray([], state, true), [{
            id: addGroupAction.id,
            value: addGroupAction.value,
            active: addGroupAction.active,
            disabled: addGroupAction.disabled
          }], false);
        }
  
      case 'CLEAR_CHOICES':
        {
          return [];
        }
  
      default:
        {
          return state;
        }
    }
  }
  
  exports["default"] = groups;
  
  /***/ }),
  
  /***/ 655:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.defaultState = void 0;
  
  var redux_1 = __webpack_require__(857);
  
  var items_1 = __importDefault(__webpack_require__(52));
  
  var groups_1 = __importDefault(__webpack_require__(871));
  
  var choices_1 = __importDefault(__webpack_require__(273));
  
  var loading_1 = __importDefault(__webpack_require__(502));
  
  var utils_1 = __webpack_require__(799);
  
  exports.defaultState = {
    groups: [],
    items: [],
    choices: [],
    loading: false
  };
  var appReducer = (0, redux_1.combineReducers)({
    items: items_1.default,
    groups: groups_1.default,
    choices: choices_1.default,
    loading: loading_1.default
  });
  
  var rootReducer = function (passedState, action) {
    var state = passedState; // If we are clearing all items, groups and options we reassign
    // state and then pass that state to our proper reducer. This isn't
    // mutating our actual state
    // See: http://stackoverflow.com/a/35641992
  
    if (action.type === 'CLEAR_ALL') {
      state = exports.defaultState;
    } else if (action.type === 'RESET_TO') {
      return (0, utils_1.cloneObject)(action.state);
    }
  
    return appReducer(state, action);
  };
  
  exports["default"] = rootReducer;
  
  /***/ }),
  
  /***/ 52:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.defaultState = void 0;
  exports.defaultState = [];
  
  function items(state, action) {
    if (state === void 0) {
      state = exports.defaultState;
    }
  
    if (action === void 0) {
      action = {};
    }
  
    switch (action.type) {
      case 'ADD_ITEM':
        {
          var addItemAction = action; // Add object to items array
  
          var newState = __spreadArray(__spreadArray([], state, true), [{
            id: addItemAction.id,
            choiceId: addItemAction.choiceId,
            groupId: addItemAction.groupId,
            value: addItemAction.value,
            label: addItemAction.label,
            active: true,
            highlighted: false,
            customProperties: addItemAction.customProperties,
            placeholder: addItemAction.placeholder || false,
            keyCode: null
          }], false);
  
          return newState.map(function (obj) {
            var item = obj;
            item.highlighted = false;
            return item;
          });
        }
  
      case 'REMOVE_ITEM':
        {
          // Set item to inactive
          return state.map(function (obj) {
            var item = obj;
  
            if (item.id === action.id) {
              item.active = false;
            }
  
            return item;
          });
        }
  
      case 'HIGHLIGHT_ITEM':
        {
          var highlightItemAction_1 = action;
          return state.map(function (obj) {
            var item = obj;
  
            if (item.id === highlightItemAction_1.id) {
              item.highlighted = highlightItemAction_1.highlighted;
            }
  
            return item;
          });
        }
  
      default:
        {
          return state;
        }
    }
  }
  
  exports["default"] = items;
  
  /***/ }),
  
  /***/ 502:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.defaultState = void 0;
  exports.defaultState = false;
  
  var general = function (state, action) {
    if (state === void 0) {
      state = exports.defaultState;
    }
  
    if (action === void 0) {
      action = {};
    }
  
    switch (action.type) {
      case 'SET_IS_LOADING':
        {
          return action.isLoading;
        }
  
      default:
        {
          return state;
        }
    }
  };
  
  exports["default"] = general;
  
  /***/ }),
  
  /***/ 744:
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
  
  
  
  var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  /* eslint-disable @typescript-eslint/no-explicit-any */
  
  var redux_1 = __webpack_require__(857);
  
  var index_1 = __importDefault(__webpack_require__(655));
  
  var Store =
  /** @class */
  function () {
    function Store() {
      this._store = (0, redux_1.createStore)(index_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    /**
     * Subscribe store to function call (wrapped Redux method)
     */
  
  
    Store.prototype.subscribe = function (onChange) {
      this._store.subscribe(onChange);
    };
    /**
     * Dispatch event to store (wrapped Redux method)
     */
  
  
    Store.prototype.dispatch = function (action) {
      this._store.dispatch(action);
    };
  
    Object.defineProperty(Store.prototype, "state", {
      /**
       * Get store object (wrapping Redux method)
       */
      get: function () {
        return this._store.getState();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "items", {
      /**
       * Get items from store
       */
      get: function () {
        return this.state.items;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "activeItems", {
      /**
       * Get active items from store
       */
      get: function () {
        return this.items.filter(function (item) {
          return item.active === true;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "highlightedActiveItems", {
      /**
       * Get highlighted items from store
       */
      get: function () {
        return this.items.filter(function (item) {
          return item.active && item.highlighted;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "choices", {
      /**
       * Get choices from store
       */
      get: function () {
        return this.state.choices;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "activeChoices", {
      /**
       * Get active choices from store
       */
      get: function () {
        return this.choices.filter(function (choice) {
          return choice.active === true;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "selectableChoices", {
      /**
       * Get selectable choices from store
       */
      get: function () {
        return this.choices.filter(function (choice) {
          return choice.disabled !== true;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "searchableChoices", {
      /**
       * Get choices that can be searched (excluding placeholders)
       */
      get: function () {
        return this.selectableChoices.filter(function (choice) {
          return choice.placeholder !== true;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "placeholderChoice", {
      /**
       * Get placeholder choice from store
       */
      get: function () {
        return __spreadArray([], this.choices, true).reverse().find(function (choice) {
          return choice.placeholder === true;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "groups", {
      /**
       * Get groups from store
       */
      get: function () {
        return this.state.groups;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Store.prototype, "activeGroups", {
      /**
       * Get active groups from store
       */
      get: function () {
        var _a = this,
            groups = _a.groups,
            choices = _a.choices;
  
        return groups.filter(function (group) {
          var isActive = group.active === true && group.disabled === false;
          var hasActiveOptions = choices.some(function (choice) {
            return choice.active === true && choice.disabled === false;
          });
          return isActive && hasActiveOptions;
        }, []);
      },
      enumerable: false,
      configurable: true
    });
    /**
     * Get loading state from store
     */
  
    Store.prototype.isLoading = function () {
      return this.state.loading;
    };
    /**
     * Get single choice by it's ID
     */
  
  
    Store.prototype.getChoiceById = function (id) {
      return this.activeChoices.find(function (choice) {
        return choice.id === parseInt(id, 10);
      });
    };
    /**
     * Get group by group id
     */
  
  
    Store.prototype.getGroupById = function (id) {
      return this.groups.find(function (group) {
        return group.id === id;
      });
    };
  
    return Store;
  }();
  
  exports["default"] = Store;
  
  /***/ }),
  
  /***/ 686:
  /***/ (function(__unused_webpack_module, exports) {
  
  
  /**
   * Helpers to create HTML elements used by Choices
   * Can be overridden by providing `callbackOnCreateTemplates` option
   */
  
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  var templates = {
    containerOuter: function (_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
      var containerOuter = _a.classNames.containerOuter;
      var div = Object.assign(document.createElement('div'), {
        className: containerOuter
      });
      div.dataset.type = passedElementType;
  
      if (dir) {
        div.dir = dir;
      }
  
      if (isSelectOneElement) {
        div.tabIndex = 0;
      }
  
      if (isSelectElement) {
        div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');
  
        if (searchEnabled) {
          div.setAttribute('aria-autocomplete', 'list');
        }
      }
  
      div.setAttribute('aria-haspopup', 'true');
      div.setAttribute('aria-expanded', 'false');
  
      if (labelId) {
        div.setAttribute('aria-labeledby', labelId);
      }
  
      return div;
    },
    containerInner: function (_a) {
      var containerInner = _a.classNames.containerInner;
      return Object.assign(document.createElement('div'), {
        className: containerInner
      });
    },
    itemList: function (_a, isSelectOneElement) {
      var _b = _a.classNames,
          list = _b.list,
          listSingle = _b.listSingle,
          listItems = _b.listItems;
      return Object.assign(document.createElement('div'), {
        className: "".concat(list, " ").concat(isSelectOneElement ? listSingle : listItems)
      });
    },
    placeholder: function (_a, value) {
      var _b;
  
      var allowHTML = _a.allowHTML,
          placeholder = _a.classNames.placeholder;
      return Object.assign(document.createElement('div'), (_b = {
        className: placeholder
      }, _b[allowHTML ? 'innerHTML' : 'innerText'] = value, _b));
    },
    item: function (_a, _b, removeItemButton) {
      var _c, _d;
  
      var allowHTML = _a.allowHTML,
          _e = _a.classNames,
          item = _e.item,
          button = _e.button,
          highlightedState = _e.highlightedState,
          itemSelectable = _e.itemSelectable,
          placeholder = _e.placeholder;
      var id = _b.id,
          value = _b.value,
          label = _b.label,
          customProperties = _b.customProperties,
          active = _b.active,
          disabled = _b.disabled,
          highlighted = _b.highlighted,
          isPlaceholder = _b.placeholder;
      var div = Object.assign(document.createElement('div'), (_c = {
        className: item
      }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c));
      Object.assign(div.dataset, {
        item: '',
        id: id,
        value: value,
        customProperties: customProperties
      });
  
      if (active) {
        div.setAttribute('aria-selected', 'true');
      }
  
      if (disabled) {
        div.setAttribute('aria-disabled', 'true');
      }
  
      if (isPlaceholder) {
        div.classList.add(placeholder);
      }
  
      div.classList.add(highlighted ? highlightedState : itemSelectable);
  
      if (removeItemButton) {
        if (disabled) {
          div.classList.remove(itemSelectable);
        }
  
        div.dataset.deletable = '';
        /** @todo This MUST be localizable, not hardcoded! */
  
        var REMOVE_ITEM_TEXT = 'Remove item';
        var removeButton = Object.assign(document.createElement('button'), (_d = {
          type: 'button',
          className: button
        }, _d[allowHTML ? 'innerHTML' : 'innerText'] = REMOVE_ITEM_TEXT, _d));
        removeButton.setAttribute('aria-label', "".concat(REMOVE_ITEM_TEXT, ": '").concat(value, "'"));
        removeButton.dataset.button = '';
        div.appendChild(removeButton);
      }
  
      return div;
    },
    choiceList: function (_a, isSelectOneElement) {
      var list = _a.classNames.list;
      var div = Object.assign(document.createElement('div'), {
        className: list
      });
  
      if (!isSelectOneElement) {
        div.setAttribute('aria-multiselectable', 'true');
      }
  
      div.setAttribute('role', 'listbox');
      return div;
    },
    choiceGroup: function (_a, _b) {
      var _c;
  
      var allowHTML = _a.allowHTML,
          _d = _a.classNames,
          group = _d.group,
          groupHeading = _d.groupHeading,
          itemDisabled = _d.itemDisabled;
      var id = _b.id,
          value = _b.value,
          disabled = _b.disabled;
      var div = Object.assign(document.createElement('div'), {
        className: "".concat(group, " ").concat(disabled ? itemDisabled : '')
      });
      div.setAttribute('role', 'group');
      Object.assign(div.dataset, {
        group: '',
        id: id,
        value: value
      });
  
      if (disabled) {
        div.setAttribute('aria-disabled', 'true');
      }
  
      div.appendChild(Object.assign(document.createElement('div'), (_c = {
        className: groupHeading
      }, _c[allowHTML ? 'innerHTML' : 'innerText'] = value, _c)));
      return div;
    },
    choice: function (_a, _b, selectText) {
      var _c;
  
      var allowHTML = _a.allowHTML,
          _d = _a.classNames,
          item = _d.item,
          itemChoice = _d.itemChoice,
          itemSelectable = _d.itemSelectable,
          selectedState = _d.selectedState,
          itemDisabled = _d.itemDisabled,
          placeholder = _d.placeholder;
      var id = _b.id,
          value = _b.value,
          label = _b.label,
          groupId = _b.groupId,
          elementId = _b.elementId,
          isDisabled = _b.disabled,
          isSelected = _b.selected,
          isPlaceholder = _b.placeholder;
      var div = Object.assign(document.createElement('div'), (_c = {
        id: elementId
      }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c.className = "".concat(item, " ").concat(itemChoice), _c));
  
      if (isSelected) {
        div.classList.add(selectedState);
      }
  
      if (isPlaceholder) {
        div.classList.add(placeholder);
      }
  
      div.setAttribute('role', groupId && groupId > 0 ? 'treeitem' : 'option');
      Object.assign(div.dataset, {
        choice: '',
        id: id,
        value: value,
        selectText: selectText
      });
  
      if (isDisabled) {
        div.classList.add(itemDisabled);
        div.dataset.choiceDisabled = '';
        div.setAttribute('aria-disabled', 'true');
      } else {
        div.classList.add(itemSelectable);
        div.dataset.choiceSelectable = '';
      }
  
      return div;
    },
    input: function (_a, placeholderValue) {
      var _b = _a.classNames,
          input = _b.input,
          inputCloned = _b.inputCloned;
      var inp = Object.assign(document.createElement('input'), {
        type: 'search',
        name: 'search_terms',
        className: "".concat(input, " ").concat(inputCloned),
        autocomplete: 'off',
        autocapitalize: 'off',
        spellcheck: false
      });
      inp.setAttribute('role', 'textbox');
      inp.setAttribute('aria-autocomplete', 'list');
      inp.setAttribute('aria-label', placeholderValue);
      return inp;
    },
    dropdown: function (_a) {
      var _b = _a.classNames,
          list = _b.list,
          listDropdown = _b.listDropdown;
      var div = document.createElement('div');
      div.classList.add(list, listDropdown);
      div.setAttribute('aria-expanded', 'false');
      return div;
    },
    notice: function (_a, innerText, type) {
      var _b;
  
      var allowHTML = _a.allowHTML,
          _c = _a.classNames,
          item = _c.item,
          itemChoice = _c.itemChoice,
          noResults = _c.noResults,
          noChoices = _c.noChoices;
  
      if (type === void 0) {
        type = '';
      }
  
      var classes = [item, itemChoice];
  
      if (type === 'no-choices') {
        classes.push(noChoices);
      } else if (type === 'no-results') {
        classes.push(noResults);
      }
  
      return Object.assign(document.createElement('div'), (_b = {}, _b[allowHTML ? 'innerHTML' : 'innerText'] = innerText, _b.className = classes.join(' '), _b));
    },
    option: function (_a) {
      var label = _a.label,
          value = _a.value,
          customProperties = _a.customProperties,
          active = _a.active,
          disabled = _a.disabled;
      var opt = new Option(label, value, false, active);
  
      if (customProperties) {
        opt.dataset.customProperties = "".concat(customProperties);
      }
  
      opt.disabled = !!disabled;
      return opt;
    }
  };
  exports["default"] = templates;
  
  /***/ }),
  
  /***/ 996:
  /***/ (function(module) {
  
  
  
  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };
  
  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }
  
  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);
  
  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }
  
  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
  
  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }
  
  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }
  
  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }
  
  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }
  
  function getMergeFunction(key, options) {
  	if (!options.customMerge) {
  		return deepmerge
  	}
  	var customMerge = options.customMerge(key);
  	return typeof customMerge === 'function' ? customMerge : deepmerge
  }
  
  function getEnumerableOwnPropertySymbols(target) {
  	return Object.getOwnPropertySymbols
  		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
  			return target.propertyIsEnumerable(symbol)
  		})
  		: []
  }
  
  function getKeys(target) {
  	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  }
  
  function propertyIsOnObject(object, property) {
  	try {
  		return property in object
  	} catch(_) {
  		return false
  	}
  }
  
  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
  	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
  }
  
  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		getKeys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	getKeys(source).forEach(function(key) {
  		if (propertyIsUnsafe(target, key)) {
  			return
  		}
  
  		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
  			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  		} else {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		}
  	});
  	return destination
  }
  
  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  	// implementations can use it. The caller may not replace it.
  	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  
  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  
  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }
  
  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}
  
  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };
  
  var deepmerge_1 = deepmerge;
  
  module.exports = deepmerge_1;
  
  
  /***/ }),
  
  /***/ 221:
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ Fuse; }
  /* harmony export */ });
  /**
   * Fuse.js v6.5.3 - Lightweight fuzzy-search (http://fusejs.io)
   *
   * Copyright (c) 2021 Kiro Risk (http://kiro.me)
   * All Rights Reserved. Apache Software License 2.0
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   */
  
  function isArray(value) {
    return !Array.isArray
      ? getTag(value) === '[object Array]'
      : Array.isArray(value)
  }
  
  // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
  const INFINITY = 1 / 0;
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value
    }
    let result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result
  }
  
  function toString(value) {
    return value == null ? '' : baseToString(value)
  }
  
  function isString(value) {
    return typeof value === 'string'
  }
  
  function isNumber(value) {
    return typeof value === 'number'
  }
  
  // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
  function isBoolean(value) {
    return (
      value === true ||
      value === false ||
      (isObjectLike(value) && getTag(value) == '[object Boolean]')
    )
  }
  
  function isObject(value) {
    return typeof value === 'object'
  }
  
  // Checks if `value` is object-like.
  function isObjectLike(value) {
    return isObject(value) && value !== null
  }
  
  function isDefined(value) {
    return value !== undefined && value !== null
  }
  
  function isBlank(value) {
    return !value.trim().length
  }
  
  // Gets the `toStringTag` of `value`.
  // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
  function getTag(value) {
    return value == null
      ? value === undefined
        ? '[object Undefined]'
        : '[object Null]'
      : Object.prototype.toString.call(value)
  }
  
  const EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';
  
  const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  
  const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) =>
    `Invalid value for key ${key}`;
  
  const PATTERN_LENGTH_TOO_LARGE = (max) =>
    `Pattern length exceeds max of ${max}.`;
  
  const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
  
  const INVALID_KEY_WEIGHT_VALUE = (key) =>
    `Property 'weight' in key '${key}' must be a positive integer`;
  
  const hasOwn = Object.prototype.hasOwnProperty;
  
  class KeyStore {
    constructor(keys) {
      this._keys = [];
      this._keyMap = {};
  
      let totalWeight = 0;
  
      keys.forEach((key) => {
        let obj = createKey(key);
  
        totalWeight += obj.weight;
  
        this._keys.push(obj);
        this._keyMap[obj.id] = obj;
  
        totalWeight += obj.weight;
      });
  
      // Normalize weights so that their sum is equal to 1
      this._keys.forEach((key) => {
        key.weight /= totalWeight;
      });
    }
    get(keyId) {
      return this._keyMap[keyId]
    }
    keys() {
      return this._keys
    }
    toJSON() {
      return JSON.stringify(this._keys)
    }
  }
  
  function createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
  
    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, 'name')) {
        throw new Error(MISSING_KEY_PROPERTY('name'))
      }
  
      const name = key.name;
      src = name;
  
      if (hasOwn.call(key, 'weight')) {
        weight = key.weight;
  
        if (weight <= 0) {
          throw new Error(INVALID_KEY_WEIGHT_VALUE(name))
        }
      }
  
      path = createKeyPath(name);
      id = createKeyId(name);
    }
  
    return { path, id, weight, src }
  }
  
  function createKeyPath(key) {
    return isArray(key) ? key : key.split('.')
  }
  
  function createKeyId(key) {
    return isArray(key) ? key.join('.') : key
  }
  
  function get(obj, path) {
    let list = [];
    let arr = false;
  
    const deepGet = (obj, path, index) => {
      if (!isDefined(obj)) {
        return
      }
      if (!path[index]) {
        // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
      } else {
        let key = path[index];
  
        const value = obj[key];
  
        if (!isDefined(value)) {
          return
        }
  
        // If we're at the last value in the path, and if it's a string/number/bool,
        // add it to the list
        if (
          index === path.length - 1 &&
          (isString(value) || isNumber(value) || isBoolean(value))
        ) {
          list.push(toString(value));
        } else if (isArray(value)) {
          arr = true;
          // Search each item in the array.
          for (let i = 0, len = value.length; i < len; i += 1) {
            deepGet(value[i], path, index + 1);
          }
        } else if (path.length) {
          // An object. Recurse further.
          deepGet(value, path, index + 1);
        }
      }
    };
  
    // Backwards compatibility (since path used to be a string)
    deepGet(obj, isString(path) ? path.split('.') : path, 0);
  
    return arr ? list : list[0]
  }
  
  const MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
  };
  
  const BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: (a, b) =>
      a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
  };
  
  const FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
  };
  
  const AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
  };
  
  var Config = {
    ...BasicOptions,
    ...MatchOptions,
    ...FuzzyOptions,
    ...AdvancedOptions
  };
  
  const SPACE = /[^ ]+/g;
  
  // Field-length norm: the shorter the field, the higher the weight.
  // Set to 3 decimals to reduce index size.
  function norm(weight = 1, mantissa = 3) {
    const cache = new Map();
    const m = Math.pow(10, mantissa);
  
    return {
      get(value) {
        const numTokens = value.match(SPACE).length;
  
        if (cache.has(numTokens)) {
          return cache.get(numTokens)
        }
  
        // Default function is 1/sqrt(x), weight makes that variable
        const norm = 1 / Math.pow(numTokens, 0.5 * weight);
  
        // In place of `toFixed(mantissa)`, for faster computation
        const n = parseFloat(Math.round(norm * m) / m);
  
        cache.set(numTokens, n);
  
        return n
      },
      clear() {
        cache.clear();
      }
    }
  }
  
  class FuseIndex {
    constructor({
      getFn = Config.getFn,
      fieldNormWeight = Config.fieldNormWeight
    } = {}) {
      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
  
      this.setIndexRecords();
    }
    setSources(docs = []) {
      this.docs = docs;
    }
    setIndexRecords(records = []) {
      this.records = records;
    }
    setKeys(keys = []) {
      this.keys = keys;
      this._keysMap = {};
      keys.forEach((key, idx) => {
        this._keysMap[key.id] = idx;
      });
    }
    create() {
      if (this.isCreated || !this.docs.length) {
        return
      }
  
      this.isCreated = true;
  
      // List is Array<String>
      if (isString(this.docs[0])) {
        this.docs.forEach((doc, docIndex) => {
          this._addString(doc, docIndex);
        });
      } else {
        // List is Array<Object>
        this.docs.forEach((doc, docIndex) => {
          this._addObject(doc, docIndex);
        });
      }
  
      this.norm.clear();
    }
    // Adds a doc to the end of the index
    add(doc) {
      const idx = this.size();
  
      if (isString(doc)) {
        this._addString(doc, idx);
      } else {
        this._addObject(doc, idx);
      }
    }
    // Removes the doc at the specified index of the index
    removeAt(idx) {
      this.records.splice(idx, 1);
  
      // Change ref index of every subsquent doc
      for (let i = idx, len = this.size(); i < len; i += 1) {
        this.records[i].i -= 1;
      }
    }
    getValueForItemAtKeyId(item, keyId) {
      return item[this._keysMap[keyId]]
    }
    size() {
      return this.records.length
    }
    _addString(doc, docIndex) {
      if (!isDefined(doc) || isBlank(doc)) {
        return
      }
  
      let record = {
        v: doc,
        i: docIndex,
        n: this.norm.get(doc)
      };
  
      this.records.push(record);
    }
    _addObject(doc, docIndex) {
      let record = { i: docIndex, $: {} };
  
      // Iterate over every key (i.e, path), and fetch the value at that key
      this.keys.forEach((key, keyIndex) => {
        // console.log(key)
        let value = this.getFn(doc, key.path);
  
        if (!isDefined(value)) {
          return
        }
  
        if (isArray(value)) {
          let subRecords = [];
          const stack = [{ nestedArrIndex: -1, value }];
  
          while (stack.length) {
            const { nestedArrIndex, value } = stack.pop();
  
            if (!isDefined(value)) {
              continue
            }
  
            if (isString(value) && !isBlank(value)) {
              let subRecord = {
                v: value,
                i: nestedArrIndex,
                n: this.norm.get(value)
              };
  
              subRecords.push(subRecord);
            } else if (isArray(value)) {
              value.forEach((item, k) => {
                stack.push({
                  nestedArrIndex: k,
                  value: item
                });
              });
            } else ;
          }
          record.$[keyIndex] = subRecords;
        } else if (!isBlank(value)) {
          let subRecord = {
            v: value,
            n: this.norm.get(value)
          };
  
          record.$[keyIndex] = subRecord;
        }
      });
  
      this.records.push(record);
    }
    toJSON() {
      return {
        keys: this.keys,
        records: this.records
      }
    }
  }
  
  function createIndex(
    keys,
    docs,
    { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
  ) {
    const myIndex = new FuseIndex({ getFn, fieldNormWeight });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex
  }
  
  function parseIndex(
    data,
    { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
  ) {
    const { keys, records } = data;
    const myIndex = new FuseIndex({ getFn, fieldNormWeight });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex
  }
  
  function computeScore$1(
    pattern,
    {
      errors = 0,
      currentLocation = 0,
      expectedLocation = 0,
      distance = Config.distance,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    const accuracy = errors / pattern.length;
  
    if (ignoreLocation) {
      return accuracy
    }
  
    const proximity = Math.abs(expectedLocation - currentLocation);
  
    if (!distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy
    }
  
    return accuracy + proximity / distance
  }
  
  function convertMaskToIndices(
    matchmask = [],
    minMatchCharLength = Config.minMatchCharLength
  ) {
    let indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
  
    for (let len = matchmask.length; i < len; i += 1) {
      let match = matchmask[i];
      if (match && start === -1) {
        start = i;
      } else if (!match && start !== -1) {
        end = i - 1;
        if (end - start + 1 >= minMatchCharLength) {
          indices.push([start, end]);
        }
        start = -1;
      }
    }
  
    // (i-1 - start) + 1 => i - start
    if (matchmask[i - 1] && i - start >= minMatchCharLength) {
      indices.push([start, i - 1]);
    }
  
    return indices
  }
  
  // Machine word size
  const MAX_BITS = 32;
  
  function search(
    text,
    pattern,
    patternAlphabet,
    {
      location = Config.location,
      distance = Config.distance,
      threshold = Config.threshold,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      includeMatches = Config.includeMatches,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    if (pattern.length > MAX_BITS) {
      throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS))
    }
  
    const patternLen = pattern.length;
    // Set starting location at beginning text and initialize the alphabet.
    const textLen = text.length;
    // Handle the case when location > text.length
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    // Highest score beyond which we give up.
    let currentThreshold = threshold;
    // Is there a nearby exact match? (speedup)
    let bestLocation = expectedLocation;
  
    // Performance: only computer matches when the minMatchCharLength > 1
    // OR if `includeMatches` is true.
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    // A mask of the matches, used for building the indices
    const matchMask = computeMatches ? Array(textLen) : [];
  
    let index;
  
    // Get all exact matches, here for speed up
    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      let score = computeScore$1(pattern, {
        currentLocation: index,
        expectedLocation,
        distance,
        ignoreLocation
      });
  
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;
  
      if (computeMatches) {
        let i = 0;
        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    }
  
    // Reset the best location
    bestLocation = -1;
  
    let lastBitArr = [];
    let finalScore = 1;
    let binMax = patternLen + textLen;
  
    const mask = 1 << (patternLen - 1);
  
    for (let i = 0; i < patternLen; i += 1) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from the match location we can stray
      // at this error level.
      let binMin = 0;
      let binMid = binMax;
  
      while (binMin < binMid) {
        const score = computeScore$1(pattern, {
          errors: i,
          currentLocation: expectedLocation + binMid,
          expectedLocation,
          distance,
          ignoreLocation
        });
  
        if (score <= currentThreshold) {
          binMin = binMid;
        } else {
          binMax = binMid;
        }
  
        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      }
  
      // Use the result from this iteration as the maximum for the next.
      binMax = binMid;
  
      let start = Math.max(1, expectedLocation - binMid + 1);
      let finish = findAllMatches
        ? textLen
        : Math.min(expectedLocation + binMid, textLen) + patternLen;
  
      // Initialize the bit array
      let bitArr = Array(finish + 2);
  
      bitArr[finish + 1] = (1 << i) - 1;
  
      for (let j = finish; j >= start; j -= 1) {
        let currentLocation = j - 1;
        let charMatch = patternAlphabet[text.charAt(currentLocation)];
  
        if (computeMatches) {
          // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
          matchMask[currentLocation] = +!!charMatch;
        }
  
        // First pass: exact match
        bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;
  
        // Subsequent passes: fuzzy match
        if (i) {
          bitArr[j] |=
            ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
        }
  
        if (bitArr[j] & mask) {
          finalScore = computeScore$1(pattern, {
            errors: i,
            currentLocation,
            expectedLocation,
            distance,
            ignoreLocation
          });
  
          // This match will almost certainly be better than any existing match.
          // But check anyway.
          if (finalScore <= currentThreshold) {
            // Indeed it is
            currentThreshold = finalScore;
            bestLocation = currentLocation;
  
            // Already passed `loc`, downhill from here on in.
            if (bestLocation <= expectedLocation) {
              break
            }
  
            // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      }
  
      // No hope for a (better) match at greater error levels.
      const score = computeScore$1(pattern, {
        errors: i + 1,
        currentLocation: expectedLocation,
        expectedLocation,
        distance,
        ignoreLocation
      });
  
      if (score > currentThreshold) {
        break
      }
  
      lastBitArr = bitArr;
    }
  
    const result = {
      isMatch: bestLocation >= 0,
      // Count exact matches (those with a score of 0) to be "almost" exact
      score: Math.max(0.001, finalScore)
    };
  
    if (computeMatches) {
      const indices = convertMaskToIndices(matchMask, minMatchCharLength);
      if (!indices.length) {
        result.isMatch = false;
      } else if (includeMatches) {
        result.indices = indices;
      }
    }
  
    return result
  }
  
  function createPatternAlphabet(pattern) {
    let mask = {};
  
    for (let i = 0, len = pattern.length; i < len; i += 1) {
      const char = pattern.charAt(i);
      mask[char] = (mask[char] || 0) | (1 << (len - i - 1));
    }
  
    return mask
  }
  
  class BitapSearch {
    constructor(
      pattern,
      {
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance,
        includeMatches = Config.includeMatches,
        findAllMatches = Config.findAllMatches,
        minMatchCharLength = Config.minMatchCharLength,
        isCaseSensitive = Config.isCaseSensitive,
        ignoreLocation = Config.ignoreLocation
      } = {}
    ) {
      this.options = {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreLocation
      };
  
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
  
      this.chunks = [];
  
      if (!this.pattern.length) {
        return
      }
  
      const addChunk = (pattern, startIndex) => {
        this.chunks.push({
          pattern,
          alphabet: createPatternAlphabet(pattern),
          startIndex
        });
      };
  
      const len = this.pattern.length;
  
      if (len > MAX_BITS) {
        let i = 0;
        const remainder = len % MAX_BITS;
        const end = len - remainder;
  
        while (i < end) {
          addChunk(this.pattern.substr(i, MAX_BITS), i);
          i += MAX_BITS;
        }
  
        if (remainder) {
          const startIndex = len - MAX_BITS;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else {
        addChunk(this.pattern, 0);
      }
    }
  
    searchIn(text) {
      const { isCaseSensitive, includeMatches } = this.options;
  
      if (!isCaseSensitive) {
        text = text.toLowerCase();
      }
  
      // Exact match
      if (this.pattern === text) {
        let result = {
          isMatch: true,
          score: 0
        };
  
        if (includeMatches) {
          result.indices = [[0, text.length - 1]];
        }
  
        return result
      }
  
      // Otherwise, use Bitap algorithm
      const {
        location,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        ignoreLocation
      } = this.options;
  
      let allIndices = [];
      let totalScore = 0;
      let hasMatches = false;
  
      this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
        const { isMatch, score, indices } = search(text, pattern, alphabet, {
          location: location + startIndex,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength,
          includeMatches,
          ignoreLocation
        });
  
        if (isMatch) {
          hasMatches = true;
        }
  
        totalScore += score;
  
        if (isMatch && indices) {
          allIndices = [...allIndices, ...indices];
        }
      });
  
      let result = {
        isMatch: hasMatches,
        score: hasMatches ? totalScore / this.chunks.length : 1
      };
  
      if (hasMatches && includeMatches) {
        result.indices = allIndices;
      }
  
      return result
    }
  }
  
  class BaseMatch {
    constructor(pattern) {
      this.pattern = pattern;
    }
    static isMultiMatch(pattern) {
      return getMatch(pattern, this.multiRegex)
    }
    static isSingleMatch(pattern) {
      return getMatch(pattern, this.singleRegex)
    }
    search(/*text*/) {}
  }
  
  function getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null
  }
  
  // Token: 'file
  
  class ExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'exact'
    }
    static get multiRegex() {
      return /^="(.*)"$/
    }
    static get singleRegex() {
      return /^=(.*)$/
    }
    search(text) {
      const isMatch = text === this.pattern;
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      }
    }
  }
  
  // Token: !fire
  
  class InverseExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'inverse-exact'
    }
    static get multiRegex() {
      return /^!"(.*)"$/
    }
    static get singleRegex() {
      return /^!(.*)$/
    }
    search(text) {
      const index = text.indexOf(this.pattern);
      const isMatch = index === -1;
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      }
    }
  }
  
  // Token: ^file
  
  class PrefixExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'prefix-exact'
    }
    static get multiRegex() {
      return /^\^"(.*)"$/
    }
    static get singleRegex() {
      return /^\^(.*)$/
    }
    search(text) {
      const isMatch = text.startsWith(this.pattern);
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      }
    }
  }
  
  // Token: !^fire
  
  class InversePrefixExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'inverse-prefix-exact'
    }
    static get multiRegex() {
      return /^!\^"(.*)"$/
    }
    static get singleRegex() {
      return /^!\^(.*)$/
    }
    search(text) {
      const isMatch = !text.startsWith(this.pattern);
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      }
    }
  }
  
  // Token: .file$
  
  class SuffixExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'suffix-exact'
    }
    static get multiRegex() {
      return /^"(.*)"\$$/
    }
    static get singleRegex() {
      return /^(.*)\$$/
    }
    search(text) {
      const isMatch = text.endsWith(this.pattern);
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [text.length - this.pattern.length, text.length - 1]
      }
    }
  }
  
  // Token: !.file$
  
  class InverseSuffixExactMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'inverse-suffix-exact'
    }
    static get multiRegex() {
      return /^!"(.*)"\$$/
    }
    static get singleRegex() {
      return /^!(.*)\$$/
    }
    search(text) {
      const isMatch = !text.endsWith(this.pattern);
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      }
    }
  }
  
  class FuzzyMatch extends BaseMatch {
    constructor(
      pattern,
      {
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance,
        includeMatches = Config.includeMatches,
        findAllMatches = Config.findAllMatches,
        minMatchCharLength = Config.minMatchCharLength,
        isCaseSensitive = Config.isCaseSensitive,
        ignoreLocation = Config.ignoreLocation
      } = {}
    ) {
      super(pattern);
      this._bitapSearch = new BitapSearch(pattern, {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreLocation
      });
    }
    static get type() {
      return 'fuzzy'
    }
    static get multiRegex() {
      return /^"(.*)"$/
    }
    static get singleRegex() {
      return /^(.*)$/
    }
    search(text) {
      return this._bitapSearch.searchIn(text)
    }
  }
  
  // Token: 'file
  
  class IncludeMatch extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return 'include'
    }
    static get multiRegex() {
      return /^'"(.*)"$/
    }
    static get singleRegex() {
      return /^'(.*)$/
    }
    search(text) {
      let location = 0;
      let index;
  
      const indices = [];
      const patternLen = this.pattern.length;
  
      // Get all exact matches
      while ((index = text.indexOf(this.pattern, location)) > -1) {
        location = index + patternLen;
        indices.push([index, location - 1]);
      }
  
      const isMatch = !!indices.length;
  
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices
      }
    }
  }
  
  // ❗Order is important. DO NOT CHANGE.
  const searchers = [
    ExactMatch,
    IncludeMatch,
    PrefixExactMatch,
    InversePrefixExactMatch,
    InverseSuffixExactMatch,
    SuffixExactMatch,
    InverseExactMatch,
    FuzzyMatch
  ];
  
  const searchersLen = searchers.length;
  
  // Regex to split by spaces, but keep anything in quotes together
  const SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
  const OR_TOKEN = '|';
  
  // Return a 2D array representation of the query, for simpler parsing.
  // Example:
  // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
  function parseQuery(pattern, options = {}) {
    return pattern.split(OR_TOKEN).map((item) => {
      let query = item
        .trim()
        .split(SPACE_RE)
        .filter((item) => item && !!item.trim());
  
      let results = [];
      for (let i = 0, len = query.length; i < len; i += 1) {
        const queryItem = query[i];
  
        // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
        let found = false;
        let idx = -1;
        while (!found && ++idx < searchersLen) {
          const searcher = searchers[idx];
          let token = searcher.isMultiMatch(queryItem);
          if (token) {
            results.push(new searcher(token, options));
            found = true;
          }
        }
  
        if (found) {
          continue
        }
  
        // 2. Handle single query matches (i.e, once that are *not* quoted)
        idx = -1;
        while (++idx < searchersLen) {
          const searcher = searchers[idx];
          let token = searcher.isSingleMatch(queryItem);
          if (token) {
            results.push(new searcher(token, options));
            break
          }
        }
      }
  
      return results
    })
  }
  
  // These extended matchers can return an array of matches, as opposed
  // to a singl match
  const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);
  
  /**
   * Command-like searching
   * ======================
   *
   * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
   * search in a given text.
   *
   * Search syntax:
   *
   * | Token       | Match type                 | Description                            |
   * | ----------- | -------------------------- | -------------------------------------- |
   * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
   * | `=scheme`   | exact-match                | Items that are `scheme`                |
   * | `'python`   | include-match              | Items that include `python`            |
   * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
   * | `^java`     | prefix-exact-match         | Items that start with `java`           |
   * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
   * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
   * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
   *
   * A single pipe character acts as an OR operator. For example, the following
   * query matches entries that start with `core` and end with either`go`, `rb`,
   * or`py`.
   *
   * ```
   * ^core go$ | rb$ | py$
   * ```
   */
  class ExtendedSearch {
    constructor(
      pattern,
      {
        isCaseSensitive = Config.isCaseSensitive,
        includeMatches = Config.includeMatches,
        minMatchCharLength = Config.minMatchCharLength,
        ignoreLocation = Config.ignoreLocation,
        findAllMatches = Config.findAllMatches,
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance
      } = {}
    ) {
      this.query = null;
      this.options = {
        isCaseSensitive,
        includeMatches,
        minMatchCharLength,
        findAllMatches,
        ignoreLocation,
        location,
        threshold,
        distance
      };
  
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.query = parseQuery(this.pattern, this.options);
    }
  
    static condition(_, options) {
      return options.useExtendedSearch
    }
  
    searchIn(text) {
      const query = this.query;
  
      if (!query) {
        return {
          isMatch: false,
          score: 1
        }
      }
  
      const { includeMatches, isCaseSensitive } = this.options;
  
      text = isCaseSensitive ? text : text.toLowerCase();
  
      let numMatches = 0;
      let allIndices = [];
      let totalScore = 0;
  
      // ORs
      for (let i = 0, qLen = query.length; i < qLen; i += 1) {
        const searchers = query[i];
  
        // Reset indices
        allIndices.length = 0;
        numMatches = 0;
  
        // ANDs
        for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
          const searcher = searchers[j];
          const { isMatch, indices, score } = searcher.search(text);
  
          if (isMatch) {
            numMatches += 1;
            totalScore += score;
            if (includeMatches) {
              const type = searcher.constructor.type;
              if (MultiMatchSet.has(type)) {
                allIndices = [...allIndices, ...indices];
              } else {
                allIndices.push(indices);
              }
            }
          } else {
            totalScore = 0;
            numMatches = 0;
            allIndices.length = 0;
            break
          }
        }
  
        // OR condition, so if TRUE, return
        if (numMatches) {
          let result = {
            isMatch: true,
            score: totalScore / numMatches
          };
  
          if (includeMatches) {
            result.indices = allIndices;
          }
  
          return result
        }
      }
  
      // Nothing was matched
      return {
        isMatch: false,
        score: 1
      }
    }
  }
  
  const registeredSearchers = [];
  
  function register(...args) {
    registeredSearchers.push(...args);
  }
  
  function createSearcher(pattern, options) {
    for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
      let searcherClass = registeredSearchers[i];
      if (searcherClass.condition(pattern, options)) {
        return new searcherClass(pattern, options)
      }
    }
  
    return new BitapSearch(pattern, options)
  }
  
  const LogicalOperator = {
    AND: '$and',
    OR: '$or'
  };
  
  const KeyType = {
    PATH: '$path',
    PATTERN: '$val'
  };
  
  const isExpression = (query) =>
    !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  
  const isPath = (query) => !!query[KeyType.PATH];
  
  const isLeaf = (query) =>
    !isArray(query) && isObject(query) && !isExpression(query);
  
  const convertToExplicit = (query) => ({
    [LogicalOperator.AND]: Object.keys(query).map((key) => ({
      [key]: query[key]
    }))
  });
  
  // When `auto` is `true`, the parse function will infer and initialize and add
  // the appropriate `Searcher` instance
  function parse(query, options, { auto = true } = {}) {
    const next = (query) => {
      let keys = Object.keys(query);
  
      const isQueryPath = isPath(query);
  
      if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
        return next(convertToExplicit(query))
      }
  
      if (isLeaf(query)) {
        const key = isQueryPath ? query[KeyType.PATH] : keys[0];
  
        const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
  
        if (!isString(pattern)) {
          throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key))
        }
  
        const obj = {
          keyId: createKeyId(key),
          pattern
        };
  
        if (auto) {
          obj.searcher = createSearcher(pattern, options);
        }
  
        return obj
      }
  
      let node = {
        children: [],
        operator: keys[0]
      };
  
      keys.forEach((key) => {
        const value = query[key];
  
        if (isArray(value)) {
          value.forEach((item) => {
            node.children.push(next(item));
          });
        }
      });
  
      return node
    };
  
    if (!isExpression(query)) {
      query = convertToExplicit(query);
    }
  
    return next(query)
  }
  
  // Practical scoring function
  function computeScore(
    results,
    { ignoreFieldNorm = Config.ignoreFieldNorm }
  ) {
    results.forEach((result) => {
      let totalScore = 1;
  
      result.matches.forEach(({ key, norm, score }) => {
        const weight = key ? key.weight : null;
  
        totalScore *= Math.pow(
          score === 0 && weight ? Number.EPSILON : score,
          (weight || 1) * (ignoreFieldNorm ? 1 : norm)
        );
      });
  
      result.score = totalScore;
    });
  }
  
  function transformMatches(result, data) {
    const matches = result.matches;
    data.matches = [];
  
    if (!isDefined(matches)) {
      return
    }
  
    matches.forEach((match) => {
      if (!isDefined(match.indices) || !match.indices.length) {
        return
      }
  
      const { indices, value } = match;
  
      let obj = {
        indices,
        value
      };
  
      if (match.key) {
        obj.key = match.key.src;
      }
  
      if (match.idx > -1) {
        obj.refIndex = match.idx;
      }
  
      data.matches.push(obj);
    });
  }
  
  function transformScore(result, data) {
    data.score = result.score;
  }
  
  function format(
    results,
    docs,
    {
      includeMatches = Config.includeMatches,
      includeScore = Config.includeScore
    } = {}
  ) {
    const transformers = [];
  
    if (includeMatches) transformers.push(transformMatches);
    if (includeScore) transformers.push(transformScore);
  
    return results.map((result) => {
      const { idx } = result;
  
      const data = {
        item: docs[idx],
        refIndex: idx
      };
  
      if (transformers.length) {
        transformers.forEach((transformer) => {
          transformer(result, data);
        });
      }
  
      return data
    })
  }
  
  class Fuse {
    constructor(docs, options = {}, index) {
      this.options = { ...Config, ...options };
  
      if (
        this.options.useExtendedSearch &&
        !true
      ) {}
  
      this._keyStore = new KeyStore(this.options.keys);
  
      this.setCollection(docs, index);
    }
  
    setCollection(docs, index) {
      this._docs = docs;
  
      if (index && !(index instanceof FuseIndex)) {
        throw new Error(INCORRECT_INDEX_TYPE)
      }
  
      this._myIndex =
        index ||
        createIndex(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight
        });
    }
  
    add(doc) {
      if (!isDefined(doc)) {
        return
      }
  
      this._docs.push(doc);
      this._myIndex.add(doc);
    }
  
    remove(predicate = (/* doc, idx */) => false) {
      const results = [];
  
      for (let i = 0, len = this._docs.length; i < len; i += 1) {
        const doc = this._docs[i];
        if (predicate(doc, i)) {
          this.removeAt(i);
          i -= 1;
          len -= 1;
  
          results.push(doc);
        }
      }
  
      return results
    }
  
    removeAt(idx) {
      this._docs.splice(idx, 1);
      this._myIndex.removeAt(idx);
    }
  
    getIndex() {
      return this._myIndex
    }
  
    search(query, { limit = -1 } = {}) {
      const {
        includeMatches,
        includeScore,
        shouldSort,
        sortFn,
        ignoreFieldNorm
      } = this.options;
  
      let results = isString(query)
        ? isString(this._docs[0])
          ? this._searchStringList(query)
          : this._searchObjectList(query)
        : this._searchLogical(query);
  
      computeScore(results, { ignoreFieldNorm });
  
      if (shouldSort) {
        results.sort(sortFn);
      }
  
      if (isNumber(limit) && limit > -1) {
        results = results.slice(0, limit);
      }
  
      return format(results, this._docs, {
        includeMatches,
        includeScore
      })
    }
  
    _searchStringList(query) {
      const searcher = createSearcher(query, this.options);
      const { records } = this._myIndex;
      const results = [];
  
      // Iterate over every string in the index
      records.forEach(({ v: text, i: idx, n: norm }) => {
        if (!isDefined(text)) {
          return
        }
  
        const { isMatch, score, indices } = searcher.searchIn(text);
  
        if (isMatch) {
          results.push({
            item: text,
            idx,
            matches: [{ score, value: text, norm, indices }]
          });
        }
      });
  
      return results
    }
  
    _searchLogical(query) {
  
      const expression = parse(query, this.options);
  
      const evaluate = (node, item, idx) => {
        if (!node.children) {
          const { keyId, searcher } = node;
  
          const matches = this._findMatches({
            key: this._keyStore.get(keyId),
            value: this._myIndex.getValueForItemAtKeyId(item, keyId),
            searcher
          });
  
          if (matches && matches.length) {
            return [
              {
                idx,
                item,
                matches
              }
            ]
          }
  
          return []
        }
  
        const res = [];
        for (let i = 0, len = node.children.length; i < len; i += 1) {
          const child = node.children[i];
          const result = evaluate(child, item, idx);
          if (result.length) {
            res.push(...result);
          } else if (node.operator === LogicalOperator.AND) {
            return []
          }
        }
        return res
      };
  
      const records = this._myIndex.records;
      const resultMap = {};
      const results = [];
  
      records.forEach(({ $: item, i: idx }) => {
        if (isDefined(item)) {
          let expResults = evaluate(expression, item, idx);
  
          if (expResults.length) {
            // Dedupe when adding
            if (!resultMap[idx]) {
              resultMap[idx] = { idx, item, matches: [] };
              results.push(resultMap[idx]);
            }
            expResults.forEach(({ matches }) => {
              resultMap[idx].matches.push(...matches);
            });
          }
        }
      });
  
      return results
    }
  
    _searchObjectList(query) {
      const searcher = createSearcher(query, this.options);
      const { keys, records } = this._myIndex;
      const results = [];
  
      // List is Array<Object>
      records.forEach(({ $: item, i: idx }) => {
        if (!isDefined(item)) {
          return
        }
  
        let matches = [];
  
        // Iterate over every key (i.e, path), and fetch the value at that key
        keys.forEach((key, keyIndex) => {
          matches.push(
            ...this._findMatches({
              key,
              value: item[keyIndex],
              searcher
            })
          );
        });
  
        if (matches.length) {
          results.push({
            idx,
            item,
            matches
          });
        }
      });
  
      return results
    }
    _findMatches({ key, value, searcher }) {
      if (!isDefined(value)) {
        return []
      }
  
      let matches = [];
  
      if (isArray(value)) {
        value.forEach(({ v: text, i: idx, n: norm }) => {
          if (!isDefined(text)) {
            return
          }
  
          const { isMatch, score, indices } = searcher.searchIn(text);
  
          if (isMatch) {
            matches.push({
              score,
              key,
              value: text,
              idx,
              norm,
              indices
            });
          }
        });
      } else {
        const { v: text, n: norm } = value;
  
        const { isMatch, score, indices } = searcher.searchIn(text);
  
        if (isMatch) {
          matches.push({ score, key, value: text, norm, indices });
        }
      }
  
      return matches
    }
  }
  
  Fuse.version = '6.5.3';
  Fuse.createIndex = createIndex;
  Fuse.parseIndex = parseIndex;
  Fuse.config = Config;
  
  {
    Fuse.parseQuery = parse;
  }
  
  {
    register(ExtendedSearch);
  }
  
  
  
  
  /***/ }),
  
  /***/ 857:
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);
  
  // EXPORTS
  __webpack_require__.d(__webpack_exports__, {
    "__DO_NOT_USE__ActionTypes": function() { return /* binding */ ActionTypes; },
    "applyMiddleware": function() { return /* binding */ applyMiddleware; },
    "bindActionCreators": function() { return /* binding */ bindActionCreators; },
    "combineReducers": function() { return /* binding */ combineReducers; },
    "compose": function() { return /* binding */ compose; },
    "createStore": function() { return /* binding */ createStore; }
  });
  
  ;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
  
    return obj;
  }
  ;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
  
  
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
  
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
  
    return keys;
  }
  
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  
    return target;
  }
  ;// CONCATENATED MODULE: ./node_modules/redux/es/redux.js
  
  
  /**
   * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
   *
   * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
   * during build.
   * @param {number} code
   */
  function formatProdErrorMessage(code) {
    return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
  }
  
  // Inlined version of the `symbol-observable` polyfill
  var $$observable = (function () {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
  })();
  
  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  var randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
  };
  
  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };
  
  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
  
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
  
    return Object.getPrototypeOf(obj) === proto;
  }
  
  // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
  function miniKindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    var type = typeof val;
  
    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'symbol':
      case 'function':
        {
          return type;
        }
    }
  
    if (Array.isArray(val)) return 'array';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    var constructorName = ctorName(val);
  
    switch (constructorName) {
      case 'Symbol':
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return constructorName;
    } // other
  
  
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
  }
  
  function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
  }
  
  function isError(val) {
    return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
  }
  
  function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
  }
  
  function kindOf(val) {
    var typeOfVal = typeof val;
  
    if (false) {}
  
    return typeOfVal;
  }
  
  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
  
  function createStore(reducer, preloadedState, enhancer) {
    var _ref2;
  
    if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
      throw new Error( true ? formatProdErrorMessage(0) : 0);
    }
  
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
      enhancer = preloadedState;
      preloadedState = undefined;
    }
  
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error( true ? formatProdErrorMessage(1) : 0);
      }
  
      return enhancer(createStore)(reducer, preloadedState);
    }
  
    if (typeof reducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(2) : 0);
    }
  
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    /**
     * This makes a shallow copy of currentListeners so we can use
     * nextListeners as a temporary list while dispatching.
     *
     * This prevents any bugs around consumers calling
     * subscribe/unsubscribe in the middle of a dispatch.
     */
  
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */
  
  
    function getState() {
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(3) : 0);
      }
  
      return currentState;
    }
    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all state changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */
  
  
    function subscribe(listener) {
      if (typeof listener !== 'function') {
        throw new Error( true ? formatProdErrorMessage(4) : 0);
      }
  
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(5) : 0);
      }
  
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
  
        if (isDispatching) {
          throw new Error( true ? formatProdErrorMessage(6) : 0);
        }
  
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */
  
  
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error( true ? formatProdErrorMessage(7) : 0);
      }
  
      if (typeof action.type === 'undefined') {
        throw new Error( true ? formatProdErrorMessage(8) : 0);
      }
  
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(9) : 0);
      }
  
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
  
      var listeners = currentListeners = nextListeners;
  
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
      }
  
      return action;
    }
    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */
  
  
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error( true ? formatProdErrorMessage(10) : 0);
      }
  
      currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
      // Any reducers that existed in both the new and old rootReducer
      // will receive the previous state. This effectively populates
      // the new state tree with any relevant data from the old one.
  
      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    /**
     * Interoperability point for observable/reactive libraries.
     * @returns {observable} A minimal observable of state changes.
     * For more information, see the observable proposal:
     * https://github.com/tc39/proposal-observable
     */
  
  
    function observable() {
      var _ref;
  
      var outerSubscribe = subscribe;
      return _ref = {
        /**
         * The minimal observable subscription method.
         * @param {Object} observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns {subscription} An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe: function subscribe(observer) {
          if (typeof observer !== 'object' || observer === null) {
            throw new Error( true ? formatProdErrorMessage(11) : 0);
          }
  
          function observeState() {
            if (observer.next) {
              observer.next(getState());
            }
          }
  
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe: unsubscribe
          };
        }
      }, _ref[$$observable] = function () {
        return this;
      }, _ref;
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
  
  
    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    }, _ref2[$$observable] = observable, _ref2;
  }
  
  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */
  
  
    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
    } catch (e) {} // eslint-disable-line no-empty
  
  }
  
  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  
    if (reducerKeys.length === 0) {
      return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
    }
  
    if (!isPlainObject(inputState)) {
      return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
    }
  
    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function (key) {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE) return;
  
    if (unexpectedKeys.length > 0) {
      return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
    }
  }
  
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function (key) {
      var reducer = reducers[key];
      var initialState = reducer(undefined, {
        type: ActionTypes.INIT
      });
  
      if (typeof initialState === 'undefined') {
        throw new Error( true ? formatProdErrorMessage(12) : 0);
      }
  
      if (typeof reducer(undefined, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === 'undefined') {
        throw new Error( true ? formatProdErrorMessage(13) : 0);
      }
    });
  }
  /**
   * Turns an object whose values are different reducer functions, into a single
   * reducer function. It will call every child reducer, and gather their results
   * into a single state object, whose keys correspond to the keys of the passed
   * reducer functions.
   *
   * @param {Object} reducers An object whose values correspond to different
   * reducer functions that need to be combined into one. One handy way to obtain
   * it is to use ES6 `import * as reducers` syntax. The reducers may never return
   * undefined for any action. Instead, they should return their initial state
   * if the state passed to them was undefined, and the current state for any
   * unrecognized action.
   *
   * @returns {Function} A reducer function that invokes every reducer inside the
   * passed object, and builds a state object with the same shape.
   */
  
  
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
  
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i];
  
      if (false) {}
  
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key];
      }
    }
  
    var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
    // keys multiple times.
  
    var unexpectedKeyCache;
  
    if (false) {}
  
    var shapeAssertionError;
  
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
  
    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }
  
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
  
      if (false) { var warningMessage; }
  
      var hasChanged = false;
      var nextState = {};
  
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer = finalReducers[_key];
        var previousStateForKey = state[_key];
        var nextStateForKey = reducer(previousStateForKey, action);
  
        if (typeof nextStateForKey === 'undefined') {
          var actionType = action && action.type;
          throw new Error( true ? formatProdErrorMessage(14) : 0);
        }
  
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
  
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  
  function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(this, arguments));
    };
  }
  /**
   * Turns an object whose values are action creators, into an object with the
   * same keys, but with every function wrapped into a `dispatch` call so they
   * may be invoked directly. This is just a convenience method, as you can call
   * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
   *
   * For convenience, you can also pass an action creator as the first argument,
   * and get a dispatch wrapped function in return.
   *
   * @param {Function|Object} actionCreators An object whose values are action
   * creator functions. One handy way to obtain it is to use ES6 `import * as`
   * syntax. You may also pass a single function.
   *
   * @param {Function} dispatch The `dispatch` function available on your Redux
   * store.
   *
   * @returns {Function|Object} The object mimicking the original object, but with
   * every action creator wrapped into the `dispatch` call. If you passed a
   * function as `actionCreators`, the return value will also be a single
   * function.
   */
  
  
  function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch);
    }
  
    if (typeof actionCreators !== 'object' || actionCreators === null) {
      throw new Error( true ? formatProdErrorMessage(16) : 0);
    }
  
    var boundActionCreators = {};
  
    for (var key in actionCreators) {
      var actionCreator = actionCreators[key];
  
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
  
    return boundActionCreators;
  }
  
  /**
   * Composes single-argument functions from right to left. The rightmost
   * function can take multiple arguments as it provides the signature for
   * the resulting composite function.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing the argument functions
   * from right to left. For example, compose(f, g, h) is identical to doing
   * (...args) => f(g(h(...args))).
   */
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
  
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }
  
    if (funcs.length === 1) {
      return funcs[0];
    }
  
    return funcs.reduce(function (a, b) {
      return function () {
        return a(b.apply(void 0, arguments));
      };
    });
  }
  
  /**
   * Creates a store enhancer that applies middleware to the dispatch method
   * of the Redux store. This is handy for a variety of tasks, such as expressing
   * asynchronous actions in a concise manner, or logging every action payload.
   *
   * See `redux-thunk` package as an example of the Redux middleware.
   *
   * Because middleware is potentially asynchronous, this should be the first
   * store enhancer in the composition chain.
   *
   * Note that each middleware will be given the `dispatch` and `getState` functions
   * as named arguments.
   *
   * @param {...Function} middlewares The middleware chain to be applied.
   * @returns {Function} A store enhancer applying the middleware.
   */
  
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
  
    return function (createStore) {
      return function () {
        var store = createStore.apply(void 0, arguments);
  
        var _dispatch = function dispatch() {
          throw new Error( true ? formatProdErrorMessage(15) : 0);
        };
  
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          }
        };
        var chain = middlewares.map(function (middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store.dispatch);
        return _objectSpread2(_objectSpread2({}, store), {}, {
          dispatch: _dispatch
        });
      };
    };
  }
  
  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */
  
  function isCrushed() {}
  
  if (false) {}
  
  
  
  
  /***/ })
  
  /******/ 	});
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	var __webpack_module_cache__ = {};
  /******/ 	
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/ 		// Check if module is in cache
  /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 		if (cachedModule !== undefined) {
  /******/ 			return cachedModule.exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = __webpack_module_cache__[moduleId] = {
  /******/ 			// no module.id needed
  /******/ 			// no module.loaded needed
  /******/ 			exports: {}
  /******/ 		};
  /******/ 	
  /******/ 		// Execute the module function
  /******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/ 	
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/ 	
  /************************************************************************/
  /******/ 	/* webpack/runtime/compat get default export */
  /******/ 	!function() {
  /******/ 		// getDefaultExport function for compatibility with non-harmony modules
  /******/ 		__webpack_require__.n = function(module) {
  /******/ 			var getter = module && module.__esModule ?
  /******/ 				function() { return module['default']; } :
  /******/ 				function() { return module; };
  /******/ 			__webpack_require__.d(getter, { a: getter });
  /******/ 			return getter;
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	!function() {
  /******/ 		// define getter functions for harmony exports
  /******/ 		__webpack_require__.d = function(exports, definition) {
  /******/ 			for(var key in definition) {
  /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
  /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 				}
  /******/ 			}
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	!function() {
  /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	!function() {
  /******/ 		// define __esModule on exports
  /******/ 		__webpack_require__.r = function(exports) {
  /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 			}
  /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  !function() {
  /* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(373);
  /* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_choices__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(187);
  /* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _scripts_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(883);
  /* harmony import */ var _scripts_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(789);
  /* harmony import */ var _scripts_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(686);
  
  
  
  
  
  
  
  /* harmony default export */ __webpack_exports__["default"] = ((_scripts_choices__WEBPACK_IMPORTED_MODULE_0___default()));
  
  }();
  __webpack_exports__ = __webpack_exports__["default"];
  /******/ 	return __webpack_exports__;
  /******/ })()
  ;
  });
  const compareSectTitle = document.querySelectorAll(
      ".compare-info__section-heading"
    ),
    compareSectContent = document.querySelectorAll(
      ".compare-info__section-content"
    );
  
  if (compareSectTitle.length > 0) {
    for (let i = 0; i < compareSectTitle.length; i++) {
      compareSectContent[0].style.maxHeight = compareSectContent[0].scrollHeight + "px";
      compareSectTitle[0].classList.add("active");
  
      compareSectTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");
  
        let panel = compareSectContent[i];
  
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
  // contacts page
  
  const contactsSectTitle = document.querySelectorAll(".contacts-req__heading"),
    contactsSectContent = document.querySelectorAll(".contacts-req__inner");
  
  if (contactsSectTitle.length > 0) {
    for (let i = 0; i < contactsSectTitle.length; i++) {
      contactsSectTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");
  
        let panel = contactsSectContent[i];
  
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
  // menuTabs
  
  
  const menuTabsBtn = document.querySelectorAll(".menuControlTitle");
  const menuTabsItems = document.querySelectorAll(".menuContentContainer");
  const headerButton = document.querySelector('.headerButton')
  const menuContainer = document.querySelector('.menuContainer')
  console.log(menuContainer)
  
  
  
  
  if (menuTabsBtn.length > 0 && menuTabsItems.length > 0 && headerButton != null) {
  
    // headerButton.addEventListener('mouseover', function() {
    //   console.log('dvizhenie')
    //   menuContainer.classList.add('slickyMenuContainer')
    // })
  
    menuTabsBtn.forEach(menuOnTabClick);
  
  function menuOnTabClick(item) {
    item.addEventListener('click', function() {
      let menuCurrentBtn = item;
      let menuTabId = menuCurrentBtn.getAttribute("data-tab")
  
      let menuCurrentTab = document.querySelector(menuTabId)
  
      if( !menuCurrentBtn.classList.contains('activeMenuTabBtn') ) {
        menuTabsBtn.forEach(function(item) {
          item.classList.remove('activeMenuTabBtn')
        })
    
        menuTabsItems.forEach(function(item) {
          item.classList.remove('contentActive')
        })
    
        menuCurrentBtn.classList.add('activeMenuTabBtn');
    
        menuCurrentTab.classList.add('contentActive')
      }
  
    });
  }
  
  document.querySelector('.menuControlTitle').click();
  
  const changeTabsBtn = document.querySelectorAll(".changeCategory");
  const menuTabs = document.querySelectorAll(".menuTabs");
  
  
    changeTabsBtn.forEach(changeOnTabClick);
  
  function changeOnTabClick(item) {
    item.addEventListener('click', function() {
      let changeCurrentBtn = item;
      let changeTabId = changeCurrentBtn.getAttribute("data-tab")
  
      let changeCurrentTab = document.querySelector(changeTabId)
  
      if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
        changeTabsBtn.forEach(function(item) {
          item.classList.remove('changeCategoryActive')
        })
    
        menuTabs.forEach(function(item) {
          item.classList.remove('menuTabsActive')
        })
    
        changeCurrentBtn.classList.add('changeCategoryActive');
    
        changeCurrentTab.classList.add('menuTabsActive')
      }
  
    });
  }
  
  document.querySelector('.changeCategory').click();
  
  }
  
  
  
  // const burgerButton = document.querySelector(".burgerIcon")
  
  // const containerMenu = document.querySelector('.menuContainer')
  
  
  
  // if (burgerButton != null) {
  //   burgerButton.addEventListener('click', function() {
  //     containerMenu.classList.add('burgerMenuContainer')
  //   })
  // }
  
  
  
  
  // const menuTabsBtn2 = document.querySelectorAll(".menuControlTitle2");
  // const menuTabsItems2 = document.querySelectorAll(".menuContentContainer2");
  
  // if (menuTabsBtn2.length > 0 && menuTabsItems2.length > 0) {
  
  
  // menuTabsBtn2.forEach(menuOnTabClick2);
  
  // function menuOnTabClick2(item) {
  //   item.addEventListener('click', function() {
  //     let menuCurrentBtn = item;
  //     let menuTabId = menuCurrentBtn.getAttribute("data-tab")
  
  //     let menuCurrentTab = document.querySelector(menuTabId)
  
  //     if( !menuCurrentBtn.classList.contains('activeMenuTabBtn') ) {
  //       menuTabsBtn2.forEach(function(item) {
  //         item.classList.remove('activeMenuTabBtn')
  //       })
    
  //       menuTabsItems2.forEach(function(item) {
  //         item.classList.remove('contentActive')
  //       })
    
  //       menuCurrentBtn.classList.add('activeMenuTabBtn');
    
  //       menuCurrentTab.classList.add('contentActive')
  //     }
  
  //   });
  // }
  
  // document.querySelector('.menuControlTitle2').click();
  
  
  
  // const changeTabsBtn2 = document.querySelectorAll(".changeCategory2");
  // const menuTabs2 = document.querySelectorAll(".menuTabs2");
  
  // changeTabsBtn2.forEach(changeOnTabClick2);
  
  // function changeOnTabClick2(item) {
  //   item.addEventListener('click', function() {
  //     let changeCurrentBtn = item;
  //     let changeTabId = changeCurrentBtn.getAttribute("data-tab")
  
  //     let changeCurrentTab = document.querySelector(changeTabId)
  
  //     if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
  //       changeTabsBtn2.forEach(function(item) {
  //         item.classList.remove('changeCategoryActive')
  //       })
    
  //       menuTabs2.forEach(function(item) {
  //         item.classList.remove('menuTabsActive')
  //       })
    
  //       changeCurrentBtn.classList.add('changeCategoryActive');
    
  //       changeCurrentTab.classList.add('menuTabsActive')
  //     }
  
  //   });
  // }
  
  // document.querySelector('.changeCategory2').click();
  // }
  const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file
  
  $("#attachment-files").on("change", function (e) {
    for (var i = 0; i < this.files.length; i++) {
      let fileBloc = $("<li/>", { class: "attach__item" }),
        fileName = $("<span/>", {
          class: "attach__name",
          text: this.files.item(i).name,
        });
      let fileContent = $("<span/>", { class: "attach__item-content" });
      fileContent
        .append(
          '<span class="attach__folder"><svg><use href="#folder"></use></svg></span>'
        )
        .append(fileName)
        .append(
          '<span class="attach__delete"><svg><use href="#close-btn"></use></svg></span>'
        );
      fileBloc.append(fileContent);
  
      $("#filesList > #files-names").append(fileBloc);
    }
    for (let file of this.files) {
      dt.items.add(file);
    }
    this.files = dt.files;
  
    $("span.attach__delete").click(function () {
      let name = $(this).prev("span.attach__name").text();
      $(this).parent().parent().remove();
      for (let i = 0; i < dt.items.length; i++) {
        if (name === dt.items[i].getAsFile().name) {
          dt.items.remove(i);
          continue;
        }
      }
      document.getElementById("attachment-files").files = dt.files;
    });
  });
  // intro slider
  
  // intro slider
  
  let introFractCurrent = document.querySelector(".intro-fraction-current");
  let introFractTotal = document.querySelector(".intro-fraction-total");
  let introSlidesAmount = document.querySelectorAll(
    ".intro-slider__slide"
  ).length;
  
  let introSlider = new Swiper(".intro-slider", {
    slidesPerView: 1,
    loop: true,
    loopedSlides: 0,
  
    pagination: {
      el: ".intro-pagination",
      clickable: true,
    },
  
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
  });
  
  introSlider.on("slideChange", function () {
    setIntroFraction(
      introFractCurrent,
      introFractTotal,
      introSlidesAmount,
      introSlider.realIndex
    );
  });
  
  function setIntroFraction(curEl, totalEl, slidesAmount, currentSlide) {
    totalEl.innerText = String(slidesAmount).padStart(2, "0");
    curEl.innerText = String(currentSlide + 1).padStart(2, "0");
  }
  
  if (introFractCurrent) {
    setIntroFraction(
      introFractCurrent,
      introFractTotal,
      introSlidesAmount,
      introSlider.realIndex
    );
  }
  
  //producers slider
  
  let prodThumbsAmount =
    document.querySelectorAll(".prod-thumb__item").length - 1;
  let prodMainAmount = document.querySelectorAll(".prod-main__item").length - 1;
  
  let prodSliderThumbs = new Swiper(".producers-slider-thumbs", {
    spaceBetween: 90,
    centeredSlides: true,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    touchRatio: 0.2,
    loop: true,
    loopedSlides: prodThumbsAmount,
    breakpoints: {
      320: {
        spaceBetween: 15,
      },
      500: {
        spaceBetween: 90,
      },
    },
  });
  let prodSliderMain = new Swiper(".producers-slider-main", {
    loop: true,
    loopedSlides: prodMainAmount,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  prodSliderMain.controller.control = prodSliderThumbs;
  prodSliderThumbs.controller.control = prodSliderMain;
  
  // popular slider
  
  let popSliders = document.querySelectorAll(".popular-tab__slider");
  
  popSliders.forEach((el) => {
    new Swiper(el, {
      spaceBetween: 21,
      slidesPerView: 4,
      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.7,
        },
        500: {
          slidesPerView: 3,
        },
        921: {
          slidesPerView: 4,
        },
      },
    });
  });
  
  // clients slider
  
  let clientsThumbsAmount =
    document.querySelectorAll(".clients-thumb__item").length - 1;
  let clientsMainAmount =
    document.querySelectorAll(".clients-main__item").length - 1;
  
  let clientsSliderThumbs = new Swiper(".clients-slider-thumbs", {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    touchRatio: 0.2,
    loop: true,
    loopedSlides: prodThumbsAmount,
    breakpoints: {
      320: {
        spaceBetween: 21,
      },
      921: {
        spaceBetween: 10,
      },
    },
  });
  let clientsSliderMain = new Swiper(".clients-slider-main", {
    loop: true,
    loopedSlides: prodMainAmount,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
      },
      921: {
        spaceBetween: 0,
      },
    },
  });
  
  clientsSliderMain.controller.control = clientsSliderThumbs;
  clientsSliderThumbs.controller.control = clientsSliderMain;
  
  let aboutBlogSlider = new Swiper(".about-blog__slider", {
    direction: "vertical",
    slidesPerView: 3.4,
    mousewheel: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        direction: "horizontal",
        slidesPerView: 1,
        mousewheel: false,
      },
      501: {
        spaceBetween: 0,
        mousewheel: true,
        slidesPerView: 3.4,
        direction: "vertical",
      },
      921: {
        slidesPerView: 3.4,
      },
    },
  });
  
  // product slider
  
  let productSliderThumbs = new Swiper(".product-slider-thumbs", {
    slidesPerView: 6,
    spaceBetween: 24,
    slideToClickedSlide: true,
    touchRatio: 0.2,
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 8,
      },
      500: {
        spaceBetween: 24,
      },
    },
  });
  
  let productSliderMain = new Swiper(".product-slider-main", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
  
    thumbs: {
      swiper: productSliderThumbs,
    },
  });
  
  //accessories slider
  
  let accessoriesSlider = new Swiper(".product-acc__slider", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 16,
        pagination: {
          type: "bullets",
        },
      },
      501: {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
          type: "bullets",
        },
      },
      920: {
        slidesPerView: 4,
        pagination: {
          type: "fraction",
        },
      },
    },
  });
  
  //about page benefits slider
  
  let apBenefitsSlider = new Swiper(".aboutPage-benefits", {
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
    grabCursor: true,
  });
  
  
  //article slider
  
  const articleSlider = new Swiper(".mySwiper", {
    
    
    breakpoints: {
  
      375: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        spaceBetween: 30,
        // navigation: {
        //   nextEl: ".arrowNext",
        //   prevEl: ".arrowPrev",
        // },
      },
  
      920: {
        spaceBetween: 30,
        navigation: {
          nextEl: ".arrowNext",
          prevEl: ".arrowPrev",
        },
      },
  
      
    }
    
  });
  
  //article slider mobile
  
  // const articleSliderMobile = new Swiper(".mySwiperMobile", {
  
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: 'bullets',
  //     clickable: true,
  //   }, 
    
  // });
  
  // brands slider
  
  const brandsSwiper = new Swiper(".brandsSwiper", {
    slidesPerView: 5,
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.arrowNextcontainer',
      prevEl: '.arrowPrevContainer',
    },
  
    breakpoints: {
  
      1550: {
        slidesPerView: 8,
        loop: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.arrowNextcontainer',
          prevEl: '.arrowPrevContainer',
        },
      },
  
      
    }
  });

  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs-btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs-pane");
      this._eventShow = new Event("tab.itc.change");
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs-btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs-pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove("tabs-btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs-pane_show") : null;
      elLinkTarget.classList.add("tabs-btn_active");
      elPaneTarget.classList.add("tabs-pane_show");
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs-btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  if (document.querySelector(".popular")) {
    new ItcTabs(".popular");
  }

  if (document.querySelector(".product-info")) {
    new ItcTabs(".product-info");
  }

  // prdouct navs

  const productNavs = document.querySelector(".product-info__navs");
  const initPosElem =
    productNavs && productNavs.getBoundingClientRect().top + window.pageYOffset;

  const productNavslinks = document.querySelectorAll(".product-info__navs-btn"),
    productSections = document.querySelectorAll(".product-section");

  function fixedProductNavs() {
    let curPosElem = productNavs.getBoundingClientRect().top;

    if (curPosElem <= 0 && initPosElem < window.pageYOffset) {
      productNavs.classList.add("fixed");
    } else if (initPosElem >= window.pageYOffset) {
      productNavs.classList.remove("fixed");
    }
  }
  if (productNavs) {
    fixedProductNavs();
  }

  function setProdActiveNavEl() {
    let scrollDistance = window.scrollY;

    productSections.forEach((el, index) => {
      if (scrollDistance >= el.offsetTop - 250) {
        productNavslinks.forEach((elem) => {
          if (elem.classList.contains("active")) {
            elem.classList.remove("active");
          }
        });

        productNavslinks[index].classList.add("active");
      } else if (scrollDistance < 300) {
        productNavslinks[index].classList.remove("active");
      }
    });
  }

  // product accordion

  const prodAccTitle = document.querySelectorAll(".product-section__heading"),
    prodAccContent = document.querySelectorAll(".product-section__content");

  if (prodAccTitle.length > 0) {
    for (let i = 0; i < prodAccTitle.length; i++) {
      prodAccContent[0].style.maxHeight = prodAccContent[0].scrollHeight + "px";
      prodAccTitle[0].classList.add("active");

      prodAccTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let panel = prodAccContent[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // catalog & filter

  const filterPrices = document.querySelectorAll(".filter-price__input");

  if (filterPrices.length > 0) {
    filterPrices.forEach((el) => {
      el.addEventListener("input", () => {
        el.value = el.value.replace(/[^0-9]/g, "");
        el.value = Number(el.value).toLocaleString();
      });
    });
  
    const filterTitle = document.querySelectorAll(".filter-item__heading"),
      filterItemContent = document.querySelectorAll(".filter-item__content");
  
    if (filterTitle.length > 0) {
      for (let i = 0; i < filterTitle.length; i++) {
        filterItemContent[0].style.maxHeight =
          filterItemContent[0].scrollHeight + "px";
        filterTitle[0].classList.add("active");
  
        filterTitle[i].addEventListener("click", function () {
          this.classList.toggle("active");
  
          let panel = filterItemContent[i];
  
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    }
  
    const catalogHorBtn = document.getElementById("catalog-hor");
    const catalogVertBtn = document.getElementById("catalog-vert");
    const catalogContent = document.querySelector(".catalog-content");
  
    const filterHeading = document.querySelector(".filter-heading");
    const filterContent = document.querySelector(".filter__content");
  
    if (catalogContent) {
      catalogHorBtn.addEventListener("click", function () {
        catalogContent.classList.add("horizontal");
  
        this.classList.add("active");
        catalogVertBtn.classList.remove("active");
      });
  
      catalogVertBtn.addEventListener("click", function () {
        catalogContent.classList.remove("horizontal");
  
        this.classList.add("active");
        catalogHorBtn.classList.remove("active");
      });
  
      filterHeading.addEventListener("click", () => {
        filterHeading.classList.toggle("active");
  
        filterContent.classList.toggle("active");
      });
    }
  }

  

  // questnry selects

  const questnryDefSelects = document.querySelectorAll(".questnry-def-select");

  if (questnryDefSelects.length > 0) {
    questnryDefSelects.forEach((el) => {
      new Choices(el, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: "",
      });
    });
  }

  //questnry switch

  let questnrySwitchsPar = document.querySelectorAll(
    ".questnry-switch__wrapper"
  );

 if (questnrySwitchsPar != null) {
  questnrySwitchsPar.forEach((el) => {
    el.addEventListener("click", (e) => {
      let target = e.target;
      let firstElem = el.querySelector(".questnry-switch-first");
      let secondElem = el.querySelector(".questnry-switch-second");

      if (target && target.tagName == "INPUT") {
        firstElem.classList.toggle("active");
        secondElem.classList.toggle("active");
      }
    });
  });

  const questnryNavTitle = document.querySelector(".questnry-nav__mob-heading"),
    questnryNavContent = document.querySelector(".questnry-nav__content");

  if (questnryNavTitle) {
    questnryNavTitle.addEventListener("click", function () {
      this.classList.toggle("active");

      let panel = questnryNavContent;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

 }

  
  // throttleScroll

  // let isScrolling = false;

  // window.addEventListener("scroll", throttleScroll, false);

  // function throttleScroll(e) {
  //   if (isScrolling == false) {
  //     window.requestAnimationFrame(function () {
  //       if (productNavs) {
  //         fixedProductNavs();
  //         setProdActiveNavEl();
  //       }
  //       isScrolling = false;
  //     });
  //   }
  //   isScrolling = true;
  // }








  let header = document.querySelector('.header')
  let page = document.querySelector('.page')
  
  if (header != null) {

    scrollHidden()
    scrollTrue ()

    function scrollTrue () {
      window.onscroll = function() {
        scrollFunction()
        // console.log(document.documentElement.scrollTop)
      };
    }
    
      
    
    function scrollFunction() {
      if (document.body.scrollTop > 430 || document.documentElement.scrollTop > 430) {
        header.classList.remove('header')
        header.classList.add('headerTransform')
        // page.classList.add('pageMargin')
      }else if (document.body.scrollTop < 430 || document.documentElement.scrollTop < 430) {
        header.classList.remove('headerTransform')
        header.classList.add('header')
        // page.classList.remove('pageMargin')
      }
    }
    
  
      function scrollHidden() {
            let lastScroll = 0;
          const defaultOffset = 0;
          const scrollPosition = () =>document.documentElement.scrollTop
          const containHide = () => header.classList.contains('hiddenHeader');

          window.addEventListener('scroll', () => {
          
          if (scrollPosition() > lastScroll && !containHide()) {
            // if (document.documentElement.scrollTop = 430) {
            //   header.classList.remove('showHeader')
            //   header.classList.add('hiddenHeader');
            // }

            if (document.documentElement.scrollTop > 460) {
              // header.classList.remove('showHeader')
              header.classList.add('hiddenHeader');
              // console.log('down');
            }
            
          }
          else if (scrollPosition() < lastScroll && containHide() ) {
            header.classList.remove('hiddenHeader')
            // header.classList.add('showHeader')
            
            // console.log('up')
          }
          
          
          lastScroll = scrollPosition();
        })
      }
      
      //   let lastScroll = 0;
      //   const defaultOffset = 0;
      //   const scrollPosition = () =>document.documentElement.scrollTop
      //   const containHide = () => header.classList.contains('hiddenHeader');

      //   window.addEventListener('scroll', () => {
        
      //   if (scrollPosition() > lastScroll && !containHide()) {
          
      //     header.classList.add('hiddenHeader');
      //     console.log('down');
      //   }
      //   else if (scrollPosition() < lastScroll && containHide() ) {
          
      //     header.classList.remove('hiddenHeader')
      //     console.log('up')
      //   }
        
        
      //   lastScroll = scrollPosition();
      // })
    


  }
  


      //   let lastScroll = 430;
      //   const defaultOffset = 0;
      //   const scrollPosition = () =>document.documentElement.scrollTop
      //   const containHide = () => header.classList.contains('hiddenHeader');

      //   window.addEventListener('scroll', () => {
      //   if (scrollPosition() > lastScroll && !containHide()) {
          
      //     header.classList.add('hiddenHeader');
      //     console.log('down');
      //   }
      //   else if (scrollPosition() < lastScroll && containHide() ) {
          
      //     header.classList.remove('hiddenHeader')
      //     console.log('up')
      //   }
        
        
      //   lastScroll = 430;
      // })
  
  
  
  
  //brandsSecondLevel tabs 
  
  const tabsBtn = document.querySelectorAll(".controlTitle");
  const tabsItems = document.querySelectorAll(".radioCotainer");
  
  if (tabsBtn.length > 0 && tabsItems.length > 0) {
    tabsBtn.forEach(onTabClick);
  
  function onTabClick(item) {
    item.addEventListener('click', function() {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
  
      if( !currentBtn.classList.contains('activeTabBtn')) {
        tabsBtn.forEach(function(item) {
          item.classList.remove('activeTabBtn')
        })
    
        tabsItems.forEach(function(item) {
          item.classList.remove('radioContainerActive')
        })
    
        currentBtn.classList.add('activeTabBtn')
        currentTab.classList.add('radioContainerActive')
      }
    })
  };
  
  
  document.querySelector('.controlTitle').click();
  }








});


//headerMobile scroll

// const header = document.querySelector(".headerMob");
// if (header != null) {
//   let lastScroll = 0;

// const throttle = (func, time = 20) => {
//   let lastTime = 0;
//   return () => {
//     const now = new Date();
//     if (now - lastTime >= time) {
//       func();
//       time = now;
//     }
//   };
// };

// const validateHeader = () => {
//   const windowY = window.scrollY;
//   const windowH = 108;
//   if (windowY > windowH) {
//     header.classList.add("is-fixed");
//     if (windowY > windowH + 40) {
//       header.classList.add("can-animate");
//       if (windowY < lastScroll) {
//         header.classList.add("scroll-up");
//       } else {
//         header.classList.remove("scroll-up");
//       }
//     } else {
//       header.classList.remove("scroll-up");
//     }
//   } else {
//     header.classList.remove("is-fixed", "can-animate");
//   }
//   lastScroll = windowY;
// };

// window.addEventListener("scroll", throttle(validateHeader, 20));
// }



//header desctop scroll

// const headerDesctop = document.querySelector(".slickyContainer");

// if (headerDesctop != null) {
//   let lastScrollDesctop = 0;

// const throttleFunction = (func, time = 20) => {
//   let lastTime = 0;
//   return () => {
//     const now = new Date();
//     if (now - lastTime >= time) {
//       func();
//       time = now;
//     }
//   };
// };

// const validateHeaderFunction = () => {
//   const windowY = window.scrollY;
//   const windowH = 430;
//   if (windowY > windowH) {
//     headerDesctop.classList.add("is-fixed");
//     if (windowY > windowH + 40) {
//       headerDesctop.classList.add("can-animate");
//       if (windowY < lastScrollDesctop) {
//         headerDesctop.classList.add("scroll-up");
//       } else {
//         headerDesctop.classList.remove("scroll-up");
//       }
//     } else {
//       headerDesctop.classList.remove("scroll-up");
//     }
//   } else {
//     headerDesctop.classList.remove("is-fixed", "can-animate");
//   }
//   lastScrollDesctop = windowY;
// };

// window.addEventListener("scroll", throttleFunction(validateHeaderFunction, 20));
// }
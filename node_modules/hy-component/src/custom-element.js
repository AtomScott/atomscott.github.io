// # src / custom-element.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

// import 'core-js/fn/array/for-each';
// import 'core-js/fn/array/from';
// import 'core-js/fn/array/map';
// import 'core-js/fn/number/constructor';
// import 'core-js/fn/object/keys';
// import 'core-js/fn/object/set-prototype-of';
// import 'core-js/fn/reflect/construct';
// import 'core-js/fn/string/trim'; // used by camelcase

import { Set } from "qd-set";

import { parseType, camelCase, decamelize } from "./common";
import { COMPONENT_FEATURE_TESTS } from "./component";

export { Set };

export const CUSTOM_ELEMENT_FEATURE_TESTS = new Set([
  ...COMPONENT_FEATURE_TESTS,
  "template",
  "customelements",
]);

let circutBreaker = null;

export const customElementMixin = C =>
  class extends C {
    static getObservedAttributes() {
      const { types } = this;
      return Object.keys(types).map(x => decamelize(x));
    }

    constructor(...args) {
      super(...args);
      this.setupComponent(this, this.getStateFromAttributes());
    }

    reflectAttribute(key, val, silent = false) {
      const attrName = decamelize(key);

      if (silent) circutBreaker = attrName;

      const { types } = this.constructor;
      const type = types[key];

      if (process.env.DEBUG && (!type || !type.stringify)) {
        console.warn(`No type provided for key '${key}'`);
      }

      const attr = type.stringify(val);

      if (attr == null) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, attr);
      }
    }

    /*
    reflectAttributes() {
      const { types } = this.constructor;
      Object.keys(types).forEach(key => this.reflectAttribute(key, this[key], true));
    }
    */

    getStateFromAttributes() {
      const { types } = this.constructor;

      const state = {};
      Object.keys(types).forEach(key => {
        const attrName = decamelize(key);
        const attr = this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
        const value = parseType(types[key], attr);
        if (value != null) state[key] = value;
      });

      return state;
    }

    get template() {
      return this.getTemplate();
    }

    connectedCallback() {
      /* this.reflectAttributes(); */
      this.connectComponent();
    }

    disconnectedCallback() {
      this.disconnectComponent();
    }

    adoptedCallback() {
      this.adoptComponent();
    }

    attributeChangedCallback(attrName, oldAttr, attr) {
      if (circutBreaker === attrName) circutBreaker = null;
      else if (oldAttr !== attr) {
        const { types } = this.constructor;

        const key = camelCase(attrName);
        const value = parseType(types[key], attr);

        this[key] = value != null ? value : this.constructor.defaults[key];
      }
    }

    setInternalState(key, value) {
      super.setInternalState(key, value);
      this.reflectAttribute(key, value, true);
    }

    setupShadowDOM(el) {
      const instance = this.getTemplate();
      if (instance) {
        if ("attachShadow" in Element.prototype) {
          el.attachShadow({ mode: "open" });
          el.shadowRoot.appendChild(instance);
          return el.shadowRoot;
        }
        if (process.env.DEBUG) console.warn("Component doesnt define a template. Intentional?");
        throw Error("ShadowDOM API not supported");
      }
      return el;
    }

    getEl() {
      return this;
    }

    getTemplate() {
      const { componentName } = this.constructor;
      return document
        .querySelector(`link[href*="${componentName}"]`)
        .import.querySelector(`#${componentName}-template`)
        .content.cloneNode(true);
    }
  };

// This is a drop-in replacement for `HTMLElement` which is compatible with babel.
export function CustomElement() {
  const HTMLElement = typeof window.HTMLElement === "function" ? window.HTMLElement : () => {};
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor); // eslint-disable-line
}

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(CustomElement, HTMLElement);
}

// TODO
export function fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}

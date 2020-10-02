// # src / define-jquery-compnent.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

// jQuery predates arrow functions and makes use of binding a functions's `this`,
// so that passing arrow functions results in errors in many cases.
// We modify eslint to allow passing anonymous `function`s:
/* eslint-disable func-names, consistent-return */

// import 'core-js/fn/array/for-each';
// import 'core-js/fn/object/keys';

// jQuery is an optional dependency
import $ from "jquery"; // eslint-disable-line import/no-extraneous-dependencies

import { Set } from "qd-set";

import { parseType } from "./common";
import { VanillaComponent } from "./vanilla";

export { Set };

export const JQueryComponent = VanillaComponent;

export function defineJQueryComponent(name, Component) {
  const ns = name.toLowerCase();

  const Constructor = class extends Component {
    setupShadowDOM(el) {
      this.$element = super.setupShadowDOM($(el));
      return this.$element[0];
    }

    fireEvent(eventName, data) {
      const event = $.Event(`${eventName}.${ns}`, data);
      this.$element.trigger(event);
    }
  };

  function plugin(option, arg, ...args) {
    const key = typeof option === "string" ? option : null;

    return this.each(function() {
      const $this = $(this);
      const data = $this.data(ns);

      if (!data) {
        const { defaults, types } = Component;
        const dataProps = $this.data();

        Object.keys(defaults).forEach(dft => {
          if (dataProps[dft]) {
            const value = parseType(types[dft], dataProps[dft]);
            dataProps[dft] = value != null ? value : Component.defaults[dft];
          }
        });
        const props = $.extend({}, dataProps, typeof option === "object" && option);

        $this.data(ns, new Constructor(this, props));
      } else if (key && typeof data[key] === "function") {
        data[key](arg, ...args);
      } else if (typeof option === "object" && option) {
        $.extend(data, option);
      }
    });
  }

  const fName = ns.split(".").pop();

  const old = $.fn[fName];

  $.fn[fName] = plugin;
  $.fn[fName].Constructor = Constructor;

  $.fn[fName].noConflict = function() {
    $.fn[fName] = old;
    return this;
  };
}

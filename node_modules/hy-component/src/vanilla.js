// # src / vanilla.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

import { Set } from "qd-set";

export { Set };

export class VanillaComponent {
  constructor(el, props) {
    this.setupComponent(el, props);
    this.connectComponent();
  }
}

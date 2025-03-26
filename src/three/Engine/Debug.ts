import { Pane } from "tweakpane";

export class Debug extends Pane {
  constructor() {
    const active = location.hash.indexOf("debug") !== -1;
    super();
    this.hidden = !active;
  }
}

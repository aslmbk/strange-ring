import { Events } from "./utils/Events";

export class Viewport {
  private domElement: HTMLElement;
  public width = 0;
  public height = 0;
  public ratio = 0;
  public pixelRatio = 0;
  public readonly events = new Events<{
    trigger: "change";
    args: {
      width: number;
      height: number;
      ratio: number;
      pixelRatio: number;
    }[];
  }>();
  private onResizeCb = this.onResize.bind(this);

  constructor(domElement: HTMLElement) {
    this.domElement = domElement;
    window.addEventListener("resize", this.onResizeCb);
    setTimeout(this.onResizeCb, 1);
  }

  private measure() {
    this.width = this.domElement.clientWidth;
    this.height = this.domElement.clientHeight;
    this.ratio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  private onResize() {
    this.measure();
    this.events.trigger("change", {
      width: this.width,
      height: this.height,
      ratio: this.ratio,
      pixelRatio: this.pixelRatio,
    });
  }
}

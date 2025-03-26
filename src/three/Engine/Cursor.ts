import { Events } from "./utils/Events";

export class Cursor {
  public x = Infinity;
  public y = Infinity;
  public readonly events = new Events<{
    trigger: "movement";
    args: { x: number; y: number }[];
  }>();

  private sizes = {
    width: 0,
    height: 0,
  };

  constructor(domElement: HTMLElement, width: number, height: number) {
    this.sizes.width = width;
    this.sizes.height = height;

    domElement.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  public resize(width: number, height: number) {
    this.sizes.width = width;
    this.sizes.height = height;
  }

  private onMouseMove(event: MouseEvent) {
    this.x = event.clientX / this.sizes.width - 0.5;
    this.y = -(event.clientY / this.sizes.height - 0.5);
    this.events.trigger("movement", { x: this.x, y: this.y });
  }
}

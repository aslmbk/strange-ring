import { Events } from "./utils/Events";
import { Timer } from "three/addons/misc/Timer.js";

export class Time extends Timer {
  public readonly events = new Events<{
    trigger: "tick";
    args: [{ elapsed: number; delta: number }];
  }>();

  private running: boolean = false;
  private animationFrameId: number | null = null;

  constructor() {
    super();
    this.start();
  }

  public start() {
    if (!this.running) {
      this.running = true;
      this.tick();
    }
  }

  public stop() {
    this.running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private tick() {
    if (!this.running) return;

    this.update();
    this.events.trigger("tick", {
      elapsed: this.getElapsed(),
      delta: this.getDelta(),
    });

    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }
}

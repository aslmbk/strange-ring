import StatsJS from "stats.js";
import StatsGL from "stats-gl";

type StatsType = "1" | "2";

export class Stats {
  private statsJS: StatsJS;
  private statsGL: StatsGL;
  private active = true;
  private type: StatsType = "1";

  constructor() {
    this.statsJS = new StatsJS();
    this.statsGL = new StatsGL({
      horizontal: false,
      trackCPT: true,
      trackGPU: true,
      trackHz: true,
    });
  }

  private get isDebugMode() {
    return location.hash.indexOf("debug") !== -1;
  }

  public update() {
    if (!this.isDebugMode || !this.active) return;
    if (this.type === "1") {
      this.statsJS.update();
    } else {
      this.statsGL.update();
    }
  }

  public activate(type: StatsType = "1") {
    if (!this.isDebugMode) return;
    this.active = true;
    this.type = type;
    if (this.type === "1") {
      document.body.appendChild(this.statsJS.dom);
    } else {
      document.body.appendChild(this.statsGL.dom);
    }
  }

  public deactivate() {
    if (!this.isDebugMode) return;
    this.active = false;
    if (this.type === "1") {
      document.body.removeChild(this.statsJS.dom);
    } else {
      document.body.removeChild(this.statsGL.dom);
    }
  }
}

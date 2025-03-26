import "./style.css";
import { Experience } from "./three/Experience";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const experience = new Experience(app);
  (window as any).experience = experience;
});

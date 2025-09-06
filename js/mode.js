import { elModeChangerBtn, elModeWrapper } from "./html-elements.js";

export let mode = elModeWrapper.dataset.mode;

export function modeChanger(value) {
  elModeChangerBtn.innerText = value;
  mode = value;
  elModeWrapper.dataset.mode = value;
}

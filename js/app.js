import { aiChoose } from "./ai-choose.js";
import {
  elAi,
  elHands,
  elPlayer,
  elRefreshGame,
  elResult,
  elRules,
  elCloseModal,
  elModal,
} from "./html-elements.js";
import { refreshGame } from "./refresh-game.js";
import { switchZone } from "./switch-zone.js";
import { mode } from "./mode.js";
import { checkWinner } from "./check-winner.js";

elHands.forEach((hand) => {
  hand.addEventListener("click", (evt) => {
    const player = evt.target.alt;
    const playerSrc = evt.target.src;
    switchZone(true);
    elPlayer.src = playerSrc;

    setTimeout(() => {
      const ai = aiChoose(mode);
      elAi.src = `/images/${ai}.svg`;
      const winner = checkWinner(ai, player);
      elResult.innerText = winner;
    }, 200);
  });
});

elRefreshGame.addEventListener("click", refreshGame);

elRules.addEventListener("click", () => {
  elModal.classList.remove("hidden");
});

elCloseModal.addEventListener("click", () => {
  elModal.classList.add("hidden");
});

if () {
}

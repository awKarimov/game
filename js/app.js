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
  elModeChangerBtn,
  elModeWrapper,
  rulesImg,
  hardRulesImg,
  elScore,
} from "./html-elements.js";
import { refreshGame } from "./refresh-game.js";
import { switchZone } from "./switch-zone.js";
import { mode, modeChanger } from "./mode.js";
import { checkWinner } from "./check-winner.js";
import {
  channel1,
  channel2,
  channel3,
  channel4,
  channel5,
} from "./synchronize.js";

elHands.forEach((hand) => {
  hand.addEventListener("click", (evt) => {
    const player = evt.target.alt;
    const playerSrc = evt.target.src;
    switchZone(true);
    elPlayer.src = playerSrc;
    channel3.postMessage({
      data: "player",
      player,
      playerSrc,
    });

    setTimeout(() => {
      const ai = aiChoose(mode);
      elAi.src = `./images/${ai}.svg`;
      const winner = checkWinner(ai, player);
      elResult.innerText = winner;

      channel3.postMessage({
        data: "ai",
        ai,
        winner,
      });
    }, 200);
  });
});

channel3.addEventListener("message", (evt) => {
  const msg = evt.data;

  if (msg.data === "player") {
    switchZone(true);
    elPlayer.src = msg.playerSrc; // Tanlangan rasmni o‘rnatish
  }

  if (msg.data === "ai") {
    elAi.src = `./images/${msg.ai}.svg`;
    elResult.innerText = msg.winner;
  }
});

elModeChangerBtn.addEventListener("click", (evt) => {
  if (mode === "easy") {
    modeChanger("hard");
    elModeWrapper.style.backgroundImage = "url('./images/polygon.svg')";
    rulesImg.classList.add("hidden");
    hardRulesImg.classList.remove("hidden");
    channel2.postMessage("hard");
  } else {
    modeChanger("easy");
    elModeWrapper.style.backgroundImage = "url('./images/path.svg')";
    hardRulesImg.classList.add("hidden");
    rulesImg.classList.remove("hidden");
    channel2.postMessage("easy");
  }
});

channel2.addEventListener("message", (evt) => {
  if (evt.data === "hard") {
    modeChanger("hard");
    elModeWrapper.style.backgroundImage = "url('./images/polygon.svg')";
    rulesImg.classList.add("hidden");
    hardRulesImg.classList.remove("hidden");
  } else {
    modeChanger("easy");
    elModeWrapper.style.backgroundImage = "url('./images/path.svg')";
    hardRulesImg.classList.add("hidden");
    rulesImg.classList.remove("hidden");
  }
});

elRefreshGame.addEventListener("click", () => {
  refreshGame();
  channel4.postMessage("refresh");
});

channel4.addEventListener("message", (evt) => {
  if (evt.data === "refresh") {
    refreshGame();
  }
});

elRules.addEventListener("click", () => {
  if (elModal.classList.contains("hidden")) {
    elModal.classList.remove("hidden");
    channel1.postMessage("show");
  }
});

elCloseModal.addEventListener("click", () => {
  elModal.classList.add("hidden");
  channel1.postMessage("hide");
});

channel1.addEventListener("message", (evt) => {
  if (evt.data === "show") {
    elModal.classList.remove("hidden");
  }
  if (evt.data === "hide") {
    elModal.classList.add("hidden");
  }
});

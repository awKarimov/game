import { aiChoose } from "./ai-choose.js";
import { paper, rock, scissors, spock, lizard } from "./constant.js";
import { elScore } from "./html-elements.js";
import { mode } from "./mode.js";

let score = 0;

export function checkWinner(ai, player) {
  let result;

  if (ai === player) {
    result = "draw";
  } else if (ai === paper && player === rock) {
    result = "You lose";
  } else if (ai === rock && player === scissors) {
    result = "You lose";
  } else if (ai === scissors && player === paper) {
    result = "You lose";
  } else if (ai === spock && player === rock) {
    result = "You lose";
  } else if (ai === lizard && player === paper) {
    result = "You lose";
  } else if (ai === spock && player === lizard) {
    result = "You lose";
  } else {
    result = "You win";
  }

  if (result === "You win") {
    score++;
  } else if (result === "You lose" && score > 0) {
    score--;
  }

  elScore.textContent = score;

  return result;
}

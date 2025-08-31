import { aiChoose } from "./ai-choose.js";
import { paper, rock, scissors } from "./constant.js";
import { mode } from "./mode.js";

export function checkWinner(ai, player) {
  if (ai === player) {
    return "draw";
  } else if (ai === paper && player === rock) {
    return "You lose";
  } else if (ai === rock && player === scissors) {
    return "You lose";
  } else if (ai === scissors && player === paper) {
    return "You lose";
  } else {
    return "You win";
  }
}

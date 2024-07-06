import "./style.css";
// import { init } from "./ts/games/reaction_game";
import { init } from "./ts/games/reaction_game_socket";
import { initHttpUpgradeRequest } from "./ts/games/socket_test";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="wrapper">
    <canvas id="myCanvas"></canvas>
    <button class="gameButton"> Play </button>
    <div class="result"></div>
    <div>
`;

// document.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", initHttpUpgradeRequest);
document.addEventListener("DOMContentLoaded", init);

import "./style.css";
import { init } from "./ts/games/reaction_game_socket";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="wrapper">
    <canvas id="myCanvas"></canvas>
    <button class="gameButton"> Play </button>
    <div class="result"></div>
    <div>
`;
document.addEventListener("DOMContentLoaded", init);

import "./style.css";
import { init } from "./ts/games/reaction_game";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="wrapper">
    <canvas id="myCanvas"></canvas>
    <div>
`;

init()

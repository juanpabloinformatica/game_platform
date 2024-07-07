import { getRelativeCoords, randomInteger } from "../utils";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
// import { getCirclesPositions, initHttpUpgradeRequest } from "./socket_test.ts";
//this should be global but somehow doesn't work
// const CANVAS = document?.querySelector<HTMLCanvasElement>("#myCanvas");
const CIRCLE_POSITIONS: Circle[] = [];
const HEIGHT = 500;
const WIDTH = 500;
const BALLNUMBER = 10;
const BALLLIFE = 600;
const SLEEPFORGAMEOVER = BALLLIFE * BALLNUMBER + 1000;
let correctClicks = 0;
// const resultDiv = document.querySelector(".result")

function cleanCanvas(canvas: HTMLCanvasElement) {
  let context = canvas.getContext("2d");
  context?.clearRect(0, 0, canvas.width, canvas.height);
}
function setCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas) {
    canvas.width = width;
    canvas.height = height;
  }
}
let listener: (e: event) => void;
function removeEventListener(canvas: HTMLCanvasElement) {
  if (listener) {
    canvas.removeEventListener("click", listener, true);
  }
}
function getClickListener(e: Event, selectedCircle: Circle, socket: WebSocket) {
  let mouseX = getRelativeCoords(e).x;
  let mouseY = getRelativeCoords(e).y;
  let point: Point = { x: mouseX, y: mouseY };
  if (pointInCircle(point, selectedCircle)) {
    console.log(correctClicks);
    socket.send(correctClicks.toString());
    // socket.send("entro y mando numero de clicks");
    correctClicks++;
  }
}
function assignEventListener(
  canvas: HTMLCanvasElement,
  selectedCircle: Circle,
  socket: WebSocket,
) {
  listener = (e: Event) => {
    getClickListener(e, selectedCircle, socket);
  };
  canvas.addEventListener("click", listener, true);
}

function drawRandomCircle(canvas: HTMLCanvasElement, selectedCircle: Circle) {
  if (canvas) {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.arc(
      selectedCircle.posX,
      selectedCircle.posY,
      selectedCircle.r,
      selectedCircle.sAngle,
      selectedCircle.endAngle,
    );
    context.fillStyle = "red";
    context.fill();
    context.stroke();
  }
}
function getCircle(): Circle {
  let min = 0;
  let max = CIRCLE_POSITIONS.length - 1;
  let randomIndex = randomInteger(min, max);
  let selectedCircle = CIRCLE_POSITIONS[randomIndex];
  return selectedCircle;
}
function resetVariables() {
  correctClicks = 0;
  let resultDiv = document.querySelector<HTMLDivElement>(".result");
  if (resultDiv) {
    resultDiv.style.display = "none";
  }
}
function finishSetup(): void {
  let resultDiv = document.querySelector<HTMLDivElement>(".result");
  if (resultDiv) {
    resultDiv.style.display = "flex";
    resultDiv.innerHTML = `finish Result  = ${correctClicks} `;
    console.log(resultDiv.style);
  }
}
function isFinish(ballNumber: number) {
  return ballNumber == 1;
}
async function startGame(canvas: HTMLCanvasElement, ballNumber: number) {
  let init = setInterval(async () => {
    if (isFinish(ballNumber)) {
      clearInterval(init);
    }
    cleanCanvas(canvas);
    removeEventListener(canvas);
    let selectedCircle = getCircle();
    assignEventListener(canvas, selectedCircle);
    drawRandomCircle(canvas, selectedCircle);
    ballNumber--;
  }, BALLLIFE);
}
async function controlGame(canvas: HTMLCanvasElement, ballNumber: number) {
  await startGame(canvas, ballNumber);
  await new Promise((r) => setTimeout(r, SLEEPFORGAMEOVER));
  finishSetup();
}
async function getButtonListener(canvas: HTMLCanvasElement) {
  resetVariables();
  await controlGame(canvas, BALLNUMBER);
}
// This funciton is created because if later we want to delete
// the listener we would need it
let buttonListener: () => void;
// function setButton(button: HTMLButtonElement, canvas: HTMLCanvasElement) {
//   buttonListener = async () => {
//     getButtonListener(canvas);
//   };
//   button.addEventListener("click", buttonListener);
// }

function initHttpUpgradeRequest(): WebSocket {
  let socket;
  if (window["WebSocket"]) {
    socket = new WebSocket("ws://localhost:7777/ws");
  }
  return socket;
}
function createCircle(circle: Circle) {
  let newCircle: Circle = {
    posX: circle.posX,
    posY: circle.posY,
    r: circle.r,
    sAngle: circle.sAngle,
    endAngle: circle.endAngle,
  };
  return newCircle;
}
function handleCircles(canvas: HTMLCanvasElement, socket: WebSocket): void {
  if (socket) {
    socket.addEventListener("message", (e) => {
      console.log(JSON.parse(e.data));
      if (JSON.parse(e.data).player_1>=0) {
        console.log(JSON.parse(e.data));
        let info = JSON.parse(e.data);
        let resultDiv = document.querySelector<HTMLDivElement>(".result");
        if (resultDiv) {
          resultDiv.style.display = "flex";
          resultDiv.innerHTML = `finish Result </br>Jugador_1: ${info.player_1}</br>Jugador_2: ${info.player_2}`;
          console.log(resultDiv.style);
        }
      }
      cleanCanvas(canvas);
      removeEventListener(canvas);
      let receivedCircle = JSON.parse(e.data);
      let circle = createCircle(receivedCircle);
      drawRandomCircle(canvas, circle);
      assignEventListener(canvas, circle, socket);
    });
  }
}
function setButton(button: HTMLButtonElement, canvas: HTMLCanvasElement) {
  buttonListener = () => {
    let socket = initHttpUpgradeRequest();
    handleCircles(canvas, socket);
  };
  button.addEventListener("click", buttonListener);
}
function init() {
  const CANVAS = document?.querySelector<HTMLCanvasElement>("#myCanvas");
  const BUTTON = document?.querySelector<HTMLButtonElement>(".gameButton");
  if (BUTTON && CANVAS) {
    // setCirclePositions(WIDTH, HEIGHT);
    setCanvas(CANVAS, WIDTH, HEIGHT);
    //button start the game
    // setButton(BUTTON, CANVAS);
    setButton(BUTTON, CANVAS);
  }
}
export { init };

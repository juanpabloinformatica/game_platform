import { getRelativeCoords } from "../utils";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
const SERVER_SOCKET_ENDPOINT = "ws://localhost:7777/ws";
const HEIGHT = 500;
const WIDTH = 500;
// let correctClicks = 0;
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
let listener: (e: Event) => void;
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
    socket.send("");
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
function ResultMessageSetup(message: string): void {
  let resultDiv = document.querySelector<HTMLDivElement>(".result");
  if (resultDiv) {
    resultDiv.style.display = "flex";
    resultDiv.innerHTML = `<h1 style="color:white;">${message}</h1> `;
    console.log(resultDiv.style);
  }
}
function hideResult() {
  let resultDiv = document.querySelector<HTMLDivElement>(".result");
  if (resultDiv) {
    resultDiv.style.display = "none";
  }
}
// This funciton is created because if later we want to delete
// the listener we would need it
let buttonListener: () => void;
function initHttpUpgradeRequest(): WebSocket | null {
  let socket: WebSocket | null = null;
  if (window["WebSocket"]) {
    socket = new WebSocket(SERVER_SOCKET_ENDPOINT);
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
function handleCircles(
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  receivedCircle: Circle,
) {
  cleanCanvas(canvas);
  removeEventListener(canvas);
  let circle = createCircle(receivedCircle);
  drawRandomCircle(canvas, circle);
  assignEventListener(canvas, circle, socket);
}
// function beforeStart
function drawCounter(canvas: HTMLCanvasElement, counter: number) {
  const context = canvas.getContext("2d");
  if (context) {
    context.font = "63px serif";
    context.fillStyle = "white";
    context?.fillText(counter.toString(), WIDTH / 2, HEIGHT / 2);
  }
}
function generateBeforeStartSignal(
  canvas: HTMLCanvasElement,
  counter: number = 0,
) {
  let signal = setInterval(() => {
    cleanCanvas(canvas);
    if (counter == 2) {
      clearInterval(signal);
    }
    drawCounter(canvas, counter + 1);
    counter += 1;
  }, 1000);
}
function handleMessages(canvas: HTMLCanvasElement, socket: WebSocket): void {
  if (socket) {
    socket.addEventListener("message", async (e) => {
      let message = JSON.parse(e.data);
      if (message) {
        if (message.missingPlayerMessage) {
          console.log(message.missingPlayerMessage);
        } else if (message.beforeStartSignalMessage) {
          generateBeforeStartSignal(canvas);
          // sleep for waiting signal setInterval
          await new Promise((r) => setTimeout(r, 3000));
        } else if (message.circleMessage) {
          handleCircles(canvas, socket, message.circleMessage);
          console.log(message.circleMessage);
        } else if (message.resultMessage) {
          console.log(message.resultMessage);
          ResultMessageSetup(message.resultMessage);
        } else {
          console.log(message.gameFinishMessage);
        }
      }
    });
  }
}
function setButton(button: HTMLButtonElement, canvas: HTMLCanvasElement) {
  buttonListener = () => {
    let socket: WebSocket = initHttpUpgradeRequest();
    if (socket) {
      hideResult();
      handleMessages(canvas, socket);
    }
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

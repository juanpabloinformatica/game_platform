import { getRelativeCoords, randomInteger } from "../utils";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
const SERVER_SOCKET_ENDPOINT = "ws://localhost:7777/ws";
const HEIGHT = 500;
const WIDTH = 500;
let correctClicks = 0;
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
function finishSetup(): void {
    let resultDiv = document.querySelector<HTMLDivElement>(".result");
    if (resultDiv) {
        resultDiv.style.display = "flex";
        resultDiv.innerHTML = `finish Result  = ${correctClicks} `;
        console.log(resultDiv.style);
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
function handleMessages(canvas: HTMLCanvasElement, socket: WebSocket): void {
    if (socket) {
        socket.addEventListener("message", (e) => {
            let message = JSON.parse(e.data);
            if (message && message.message.includes("winner")) {
                console.log(message.message);
            } else if (message && message.circle) {
                handleCircles(canvas, socket, message.circle);
                console.log(message.circle);
            } else {
                console.log(message.message);
            }
        });
    }
}
function setButton(button: HTMLButtonElement, canvas: HTMLCanvasElement) {
    buttonListener = () => {
        let socket: WebSocket = initHttpUpgradeRequest();
        if (socket) {
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

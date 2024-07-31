import { getRelativeCoords, initHttpUpgradeRequest, setSocketConnection } from "../../utils.ts";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
let SOCKET: WebSocket | null = null
const HEIGHT = 500;
const WIDTH = 500;
function cleanCanvas(canvas: HTMLCanvasElement) {
    let context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
}
function setCanvas(canvas: HTMLCanvasElement) {
    if (canvas) {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
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
        if (context) {
            context.beginPath();
            context.arc(
                selectedCircle.posX,
                selectedCircle.posY,
                selectedCircle.r,
                selectedCircle.sAngle,
                selectedCircle.endAngle,
            );
            context.fillStyle = "black";
            context.fill();
            context.stroke();
        }
    }
}
function ResultMessageSetup(resultDiv: HTMLDivElement, message: string): void {
    // let resultDiv = document.querySelector<HTMLDivElement>(".result");
    if (resultDiv) {
        resultDiv.style.display = "flex";
        resultDiv.innerHTML = `<h1 style="color:white;">${message}</h1> `;
        console.log(resultDiv.style);
    }
}
function hideResult(resultDiv: HTMLDivElement) {
    // let resultDiv = document.querySelector<HTMLDivElement>(".result");
    if (resultDiv) {
        resultDiv.style.display = "none";
    }
}
let buttonListener: () => void;
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
        context.fillStyle = "black";
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
function handleMessages(canvas: HTMLCanvasElement, socket: WebSocket, result: HTMLDivElement): void {
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
                    ResultMessageSetup(result, message.resultMessage);
                } else {
                    console.log(message.gameFinishMessage);
                }
            }
        });
    }
}
function setButton(button: HTMLButtonElement, socket: WebSocket) {
    console.log("inside setButton")
    console.log(socket)
    buttonListener = () => {
        console.log("he dado click")
        if (socket) {
            socket.send("ready")
        }
    };
    button.addEventListener("click", buttonListener);
}
function init(canvas: HTMLCanvasElement, button: HTMLButtonElement, result: HTMLDivElement) {
    if (canvas && result) {
        if (!SOCKET) {
            let socketConnection = setSocketConnection()
            SOCKET = initHttpUpgradeRequest(socketConnection)
        }
        setButton(button, SOCKET!);
        handleMessages(canvas, SOCKET!, result)
    }
}

export { setButton, init, setCanvas };

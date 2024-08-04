import { getRelativeCoords, initHttpUpgradeRequest, setSocketConnection } from "../../utils.ts";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
let SOCKET: WebSocket | null = null
// change all of this buggy code
let flag = 0
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
function getClickListener(e: Event, selectedCircle: Circle) {
    let mouseX = getRelativeCoords(e).x;
    let mouseY = getRelativeCoords(e).y;
    let point: Point = { x: mouseX, y: mouseY };
    if (pointInCircle(point, selectedCircle)) {
        SOCKET!.send("");
    }
}
function assignEventListener(
    canvas: HTMLCanvasElement,
    selectedCircle: Circle,
    // socket: WebSocket,
) {
    listener = (e: Event) => {
        getClickListener(e, selectedCircle);
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
let  buttonListener:   () => Promise<WebSocket>;
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
    // socket: WebSocket,
    receivedCircle: Circle,
) {
    cleanCanvas(canvas);
    removeEventListener(canvas);
    let circle = createCircle(receivedCircle);
    drawRandomCircle(canvas, circle);
    assignEventListener(canvas, circle);
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
function handleMessages(socket: WebSocket, canvas: HTMLCanvasElement, result: HTMLDivElement): void {
    console.log(SOCKET)
    console.log("entre acaaaaaaa")
    if (SOCKET) {
        console.log("entre acaaaaaaa")
        SOCKET.addEventListener("message", async (e) => {
            let message = JSON.parse(e.data);
            if (message) {
                if (message.missingPlayerMessage) {
                    console.log(message.missingPlayerMessage);
                } else if (message.beforeStartSignalMessage) {
                    generateBeforeStartSignal(canvas);
                    // sleep for waiting signal setInterval
                    await new Promise((r) => setTimeout(r, 3000));
                } else if (message.circleMessage) {
                    handleCircles(canvas, SOCKET, message.circleMessage);
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
async function setButton(button: HTMLButtonElement, canvas: HTMLCanvasElement, result: HTMLDivElement, playerId: number) {
    let socket: any = null
    // console.log(socket)
    let counter = 0
    console.log("counter outside")
    console.log(counter)
    console.log("inside setButton")
    buttonListener = (): Promise<WebSocket> => {
        console.log("volvi a entrar")
        console.log(counter)
        if (counter == 0) {
            console.log("in condition")
            let socketConnection = setSocketConnection(playerId)
            socket = initHttpUpgradeRequest(socketConnection)
            counter++
        }
        return new Promise((resolve, _) => {
            if (socket) {
                resolve(socket)
            }
        })
        // console.log(socket)
        // if (!SOCKET) {
        //     console.log("entre cuando el socket no existe")
        //     let socketConnection = setSocketConnection(playerId)
        //     socket = initHttpUpgradeRequest(socketConnection)
        //     console.log(SOCKET)
        // }
        // console.log("he dado click")
        // if (SOCKET) {
        //     SOCKET!.addEventListener("open", (_) => {
        //         SOCKET!.send("ready")
        //     })
        //     if (flag == 0) {
        //         handleMessages(canvas, result)
        //         flag += 1
        //     }
        // }
    };
    // return buttonListener
    // return button.addEventListener("click", buttonListener);
    await button.addEventListener("click", async () => { await buttonListener() });
}
async function init(canvas: HTMLCanvasElement, button: HTMLButtonElement, result: HTMLDivElement, playerId: number) {
    console.log("here,jajajajajaja")
    if (canvas && result) {
        // setButton(button, SOCKET!);
        await setButton(button, canvas, result, playerId)
        console.log("1000")
        handleMessages(socket, canvas, result)
    }
}

export { setButton, init, setCanvas };

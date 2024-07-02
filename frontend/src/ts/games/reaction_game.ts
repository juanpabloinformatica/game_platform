import {
    getMousePositionRelativeOnElement,
    getRelativeCoords,
    randomInteger,
} from "../utils";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";

// function drawGrid(canvas: HTMLCanvasElement, width: number, height: number) {
//     if (canvas) {
//         let size = width;
//         let context = canvas.getContext("2d");
//         for (let y = 1; y < size / 100; y += 1) {
//             context.beginPath();
//             context.moveTo(0, y * 100);
//             context.lineTo(size, y * 100);
//             context.stroke();
//         }
//         for (let x = 1; x < size / 100; x += 1) {
//             context.beginPath();
//             context.moveTo(x * 100, 0);
//             context.lineTo(x * 100, size);
//             context.stroke();
//         }
//         context?.fillRect(0, 0, 100, 100);
//         context.beginPath();
//         context.arc(50, 50, 50, 0, 2 * Math.PI);
//         context.fillStyle = "red";
//         context.fill();
//         context.stroke();
//     }
// }
function cleanCanvas(canvas: HTMLCanvasElement) {
    let context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
}
function removeEventCanvas(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("click", getClickListener);
    // console.log(canvas)
}

function setCanvas(
    canvas: HTMLCanvasElement | null,
    width: number,
    height: number,
) {
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
    }
}
function setCirclePositions(
    circlesPositions: Circle[],
    width: number,
    height: number,
) {
    let size = width;
    for (let y = 0; y < size / 100; y += 1) {
        for (let x = 0; x < size / 100; x += 1) {
            let newCircle: Circle = {
                posX: x * 100 + 100 / 2,
                posY: y * 100 + 100 / 2,
                r: 100 / 2,
                sAngle: 0,
                endAngle: 2 * Math.PI,
            };
            circlesPositions.push(newCircle);
        }
    }
}
function getClickListener(
    e: Event,
    canvas: HTMLCanvasElement,
    selectedCircle: Circle,
) {
    let mouseX = getRelativeCoords(e).x;
    let mouseY = getRelativeCoords(e).y;
    let point: Point = { x: mouseX, y: mouseY };
    if (pointInCircle(point, selectedCircle)) {
        console.log("correct click");
    } else {
        console.log("incorrect click");
    }
}
function assignEventListener(
    canvas: HTMLCanvasElement,
    selectedCircle: Circle,
) {
    canvas.addEventListener("click", (e: Event) => {
        getClickListener(e, canvas, selectedCircle);
    });
}
// function testAssignEventListener(canvas: HTMLCanvasElement) {
//     canvas.addEventListener("click", (e: Event) => {
//         let mouseX = getRelativeCoords(e).x;
//         let mouseY = getRelativeCoords(e).y;
//         if (mouseX <= 100 && mouseY <= 100) {
//             console.log("click inside");
//         } else {
//             console.log("click outside");
//         }
//     });
// }

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
function getCircle(circlesPositions: Circle[]): Circle {
    let min = 0;
    let max = circlesPositions.length - 1;
    let randomIndex = randomInteger(min, max);
    let selectedCircle = circlesPositions[randomIndex];
    return selectedCircle;
}
function startGame(canvas: HTMLCanvasElement, circlesPositions: Circle[]) {
    let init = setInterval(() => {
        cleanCanvas(canvas);
        removeEventCanvas(canvas);
        console.log(canvas)
        let selectedCircle = getCircle(circlesPositions);
        assignEventListener(canvas, selectedCircle);
        drawRandomCircle(canvas, selectedCircle);
    }, 1000);
}
function init() {
    //Initializing variables

    let canvas = document?.querySelector<HTMLCanvasElement>("#myCanvas");
    let HEIGHT = 500;
    let WIDTH = 500;

    const circlesPositions: Circle[] = [];
    setCirclePositions(circlesPositions, WIDTH, HEIGHT);
    setCanvas(canvas, WIDTH, HEIGHT);
    // drawGrid(canvas, WIDTH, HEIGHT);
    // assignEventListener(canvas, circlesPositions[0]);
    // getMousePositionRelativeOnElement(canvas);
    // testAssignEventListener(canvas);
    startGame(canvas, circlesPositions);
    // circleGenerator(canvas, circlesPositions);
    // drawRandomCircle(canvas, circlesPositions);
    // drawGrid(canvas, WIDTH, HEIGHT);
    // drawCircles(canvas, WIDTH, HEIGHT);
}
export { init };

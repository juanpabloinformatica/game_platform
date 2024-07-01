function drawGrid(
    canvas: HTMLCanvasElement | null,
    width: number,
    height?: number,
) {
    let size = width;
    if (canvas) {
        let context = canvas.getContext("2d");
        for (let i = 1; i < size / 100; i += 1) {
            context?.beginPath();
            context?.moveTo(i * 100, 0); // Move the pen to (30, 50)
            context?.lineTo(i * 100, size); // Draw a line to (150, 100)
            context?.stroke(); // Render the path
        }
        for (let y = 1; y < size / 100; y += 1) {
            context?.beginPath();
            context?.moveTo(0, y * 100); // Move the pen to (30, 50)
            context?.lineTo(size, y * 100); // Draw a line to (150, 100)
            context?.stroke(); // Render the path
        }
    }
}
function drawCircles(
    canvas: HTMLCanvasElement | null,
    width: number,
    height?: number,
) {
    if (canvas) {
        let context = canvas.getContext("2d");
        let size = width;
        for (let x = 0; x < size / 100; x += 1) {
            for (let y = 0; y < size / 100; y += 1) {
                context.beginPath();
                context.arc(
                    100 * y + 100 / 2,
                    100 * x + 100 / 2,
                    100 / 2,
                    0,
                    2 * Math.PI,
                );
                context.stroke();
            }
        }
    }
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
function init() {
    //Initializing variables
    let canvas = document?.querySelector<HTMLCanvasElement>("#myCanvas");
    let HEIGHT = 500;
    let WIDTH = 500;
    setCanvas(canvas, WIDTH, HEIGHT);
    drawGrid(canvas, WIDTH, HEIGHT);
    drawCircles(canvas, WIDTH, HEIGHT);
}
export { init };

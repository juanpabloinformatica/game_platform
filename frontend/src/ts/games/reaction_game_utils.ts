import { Point, Circle } from "./reaction_game_types.ts";
function pointInCircle(point: Point, circle: Circle) {
  return (
    Math.pow(point.x - circle.posX, 2) + Math.pow(point.y - circle.posY, 2) <
    Math.pow(circle.r, 2)
  );
}
function drawGrid(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas) {
    let size = width;
    let context = canvas.getContext("2d");
    if (context) {
      for (let y = 1; y < size / 100; y += 1) {
        context.beginPath();
        context.moveTo(0, y * 100);
        context.lineTo(size, y * 100);
        context.stroke();
      }
      for (let x = 1; x < size / 100; x += 1) {
        context.beginPath();
        context.moveTo(x * 100, 0);
        context.lineTo(x * 100, size);
        context.stroke();
      }
      context?.fillRect(0, 0, 100, 100);
      context.beginPath();
      context.arc(50, 50, 50, 0, 2 * Math.PI);
      context.fillStyle = "red";
      context.fill();
      context.stroke();
    }
  }
}
export { pointInCircle, drawGrid };

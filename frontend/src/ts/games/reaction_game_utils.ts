import { Point, Circle } from "./reaction_game_types.ts";
function pointInCircle(point: Point, circle: Circle) {
    console.log(circle)
    return Math.pow((point.x - circle.posX), 2) + Math.pow((point.y - circle.posY), 2) < Math.pow(circle.r, 2)
}
export {
    pointInCircle,
}

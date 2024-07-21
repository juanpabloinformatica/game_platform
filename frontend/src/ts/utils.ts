function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRelativeCoords(event: Event) {
  return { x: event.offsetX || event.layerX, y: event.offsetY || event.layerY };
}
function getMousePositionRelativeOnElement(element: HTMLElement) {
  element.addEventListener("mousemove", (e: Event) => {
    console.log(getRelativeCoords(e));
  });
}
function generateId() {
  let id = randomInteger(0, 10000);
  return id
}
export {
  randomInteger,
  getMousePositionRelativeOnElement,
  getRelativeCoords,
  generateId,
};

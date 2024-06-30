
function drawCircle(canvas: HTMLCanvasElement, width: number = 500, height: number = 500) {
    console.log("in here")
    //  as width == height
    let size = width;
    for (let i = 0; i < (size / 100); i += 1) {
        console.log("aa")
        for (let j = 0; j < size / 100; j += 1) {
            let x = (100 * j) + 100 / 2;
            let y = (i * 100) + 100 / 2;
            let r = 50 / 2;
            console.log(x,y,r)
            let ctx = canvas.getContext("2d");
            ctx?.beginPath();
            ctx?.arc(x, y, r, 0, 2 * Math.PI)
            ctx?.stroke();
        }

    }


}

// function drawGrid(x: number, y: number, r: number) {
//
// }
// function drawCircle() {
//
// }
function init() {
    const canvas = document?.querySelector<HTMLCanvasElement>("#myCanvas")
    console.log(canvas)
    const width = (canvas?.clientWidth);
    const height = (canvas?.clientHeight);
    drawCircle(canvas, width, height)
    // drawGrid(width, height)
}
export {
    init,
}

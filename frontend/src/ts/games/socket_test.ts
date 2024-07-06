// import { Circle } from "./reaction_game_types";
//
// let socket: WebSocket | null = null;
// function initHttpUpgradeRequest() {
//   if (window["WebSocket"]) {
//     socket = new WebSocket("ws://localhost:7777/ws");
//     //   socket.addEventListener("open", (e: Event) => {
//     //     console.log("holaaaaaaaa");
//     //     // socket.send("hello server")
//     //     setInterval(() => {
//     //       socket.send("hello server");
//     //     }, 1000);
//     //     // socket.send("hello server");
//     //   });
//     //   socket.addEventListener("message", (e) => {
//     //     console.log(JSON.parse(e.data));
//     //   });
//   }
// }
// function getCirclesPositions(): Circle {
//   if (socket) {
//     socket.addEventListener("message", (e) => {
//       // console.log(JSON.parse(e.data));
//       let receivedCircle = JSON.parse(e.data);
//       let newCircle: Circle = {
//         posX: receivedCircle.posX,
//         posY: receivedCircle.posY,
//         r: receivedCircle.r,
//         sAngle: receivedCircle.Sangle,
//         endAngle: receivedCircle.endAngle,
//       };
//     });
//   }
// }
// export { initHttpUpgradeRequest,getCirclesPositions };

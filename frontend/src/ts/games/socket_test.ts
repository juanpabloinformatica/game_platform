function initHttpUpgradeRequest() {
  if (window["WebSocket"]) {
    const socket = new WebSocket("ws://localhost:7777/ws");
    socket.addEventListener("open", (e: Event) => {
      console.log("holaaaaaaaa")
      // socket.send("hello server")
      setInterval(()=>{
          socket.send("hello server")
      },1000)
      // socket.send("hello server");
    });
    socket.addEventListener("message",(e)=>{
        console.log(e.data)
    })
  }
}
export { initHttpUpgradeRequest };

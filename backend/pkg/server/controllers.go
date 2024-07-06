package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

func handler(writter http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writter, "time to play", request.URL.Path[1:])
}

func handlerWs(writter http.ResponseWriter, request *http.Request) {
	//   upgrade server
	fmt.Println("aqui-------")
	conn, err := server.upgrader.Upgrade(writter, request, nil)
	if err != nil {
		fmt.Println(err)
	}
	handleSocketConnection(conn)
}

func handleSocketConnection(conn *websocket.Conn) {
	server.showClients()
	client := server.newClient(conn)
	server.addClient(client)
	for {
		server.sendToClients()
		time.Sleep(4 * time.Second)
	}

	// for {
	// 	messageType, payload, err := conn.ReadMessage()
	// 	if err != nil {
	// 		if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
	// 			fmt.Printf("error reading message: %v", err)
	// 		}
	// 		break // Break the loop to close conn & Cleanup
	// 	}
	// 	fmt.Println("MessageType: ", messageType)
	// 	fmt.Println("Payload: ", string(payload))
	// }
}

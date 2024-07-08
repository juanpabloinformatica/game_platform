package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

func handler(writter http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writter, "time to play", request.URL.Path[1:])
}

func handlerWs(writter http.ResponseWriter, request *http.Request) {
	//   upgrade server
	conn, err := server.upgrader.Upgrade(writter, request, nil)
	if err != nil {
		fmt.Println(err)
	}
	handleSocketConnection(conn, writter, request)
}

func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	client := server.newClient(conn)
	server.addClient(client)
	go hearMessage(client)
	server.handleGame()
}

func hearMessage(client *Client) {
	for {
		_, _, err := client.connection.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		client.counter += 1
	}
}

package server

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
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
	handleSocketConnection(conn, writter, request)
}

func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	server.ShowClients()
	client := server.newClient(conn)
	server.addClient(client)
	go hearMessage(client)
	count := 0
	for {
		if count == game.BALLNUMBER {
			break
		}
		count += 1
		server.sendToClients()
		time.Sleep(1 * time.Second)
	}
    server.ShowClients()

	result := &game.Result{
		Player_1: server.clients[0].counter,
		Player_2: server.clients[1].counter,
	}

	client.connection.WriteJSON(result)

	// http.Redirect(writter, request, "http://localhost:7777/winner", http.StatusSeeOther)
	// server.ShowClients()
}

func hearMessage(client *Client) {
	for {
		messageType, p, err := client.connection.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(messageType)
		counter, err := strconv.Atoi(string(p))
		if err != nil {
			panic(err.Error())
		}
		client.counter = counter
	}
}

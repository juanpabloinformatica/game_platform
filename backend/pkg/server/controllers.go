package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
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

func handleReactionGameConfig(writter http.ResponseWriter, request *http.Request) {
	gameConfig := &game.GameConfig{}
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		panic(err.Error())
	}
	if len(body) <= 0 {
		panic(errors.New("empty body"))
	}
	json.Unmarshal(body, gameConfig)
	server.setGame(gameConfig)
}

func getClientId(request *http.Request) string {
	clientId := request.URL.Query().Get("token")
	fmt.Println("line [25]----- here the client id-----")
	fmt.Println(clientId)
	fmt.Println("----------")
	return clientId
}

func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	clientId := getClientId(request)
	client := server.newClient(conn, clientId)
	server.addClient(client)
	go hearMessage(client)
	server.handleGame()
}

func hearMessage(client *Client) {
	// defer client.connection.Close()
	for {
		_, p, err := client.connection.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(p))
		if string(p) == "ready" {
			server.clientsReady += 1
		} else {
			client.counter += 1
		}
	}
}

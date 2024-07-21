package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
)

type Client struct {
	id         string
	connection *websocket.Conn
	counter    int
}

type (
	endpoint func()
	Server   struct {
		capacity     int
		httpServer   *http.Server
		upgrader     *websocket.Upgrader
		clients      map[string]*Client
		clientsReady int
	}
)

var (
	server   *Server
	clientId = 0
)

func (server *Server) newClient(connection *websocket.Conn, clientId string) *Client {
	return &Client{connection: connection, counter: 0, id: clientId}
}

func (server *Server) missingPlayerGame() {
	message := &game.MissingPlayerMessage{
		MissingPlayerMessage: "second player missing",
	}
	server.sendToClients(message)
	// server.clients[0].connection.WriteJSON(message)
}

func (server *Server) sendBeforeStartSignal() {
	beforeStartSignal := &game.BeforeStartSignalMessage{
		BeforeStartSignalMessage: "signal",
	}
	fmt.Println("sending signal")
	server.sendToClients(beforeStartSignal)
	time.Sleep(4 * time.Second)
}

func (server *Server) readyToPlay() bool {
    fmt.Println(server.clientsReady)
	return server.clientsReady == len(server.clients)
}

func (server *Server) handleGame() {
	if server.gameIsReady() {
		for {
            if server.readyToPlay(){
                break
            }
        }
		server.sendBeforeStartSignal()
		server.initGame()
		server.setResult()
		server.finishGame()
		server.resetGame()
	} else {
		server.missingPlayerGame()
	}
}

func (server *Server) resetGame() {
	for _, client := range server.clients {
		client.counter = 0
	}
}

func (server *Server) gameIsReady() bool {
	fmt.Println(len(server.clients))
	return len(server.clients) == 2
}

func (server *Server) getResult() *Client {
	winner := &Client{}
	max := -1
	id := ""
	for clientId, client := range server.clients {
		if client.counter > max {
			max = client.counter
			id = clientId
		}
	}
	return server.clients[id]
	// if server.clients[0].counter > server.clients[1].counter {
	// 	winner = server.clients[0]
	// } else if server.clients[1].counter > server.clients[0].counter {
	// 	winner = server.clients[1]
	// } else {
	// 	winner = nil
	// }
	return winner
}

func (server *Server) setResult() {
	winner := server.getResult()
	resultMessage := &game.ResultMessage{}
	if winner != nil {
		resultMessage = &game.ResultMessage{
			ResultMessage: fmt.Sprintf("Winner player %d, with %d correct clicks", winner.id, winner.counter),
		}
	} else {
		resultMessage = &game.ResultMessage{
			ResultMessage: fmt.Sprintf("tie"),
		}
	}
	server.sendToClients(resultMessage)
}

func (server *Server) finishGame() {
	gameFinishMessage := &game.GameFinishMessage{GameFinishMessage: "Game has finished\nthanks for playing"}
	server.sendToClients(gameFinishMessage)
}

func (server *Server) initGame() {
	count := 0
	for {
		if count == game.BALLNUMBER-1 {
			break
		}
		count += 1
		circle := game.GetCircle()
		circleMessage := &game.CircleMessage{
			CircleInstance: circle,
		}
		server.sendToClients(circleMessage)
		time.Sleep(time.Duration(game.BALLSPEED) * time.Millisecond)
	}
}

func (server *Server) addClient(client *Client) {
	// server.clients = append(server.clients, client)
	// fmt.Println(client.id)
	// fmt.Println(client)
	server.clients[client.id] = client
}

func (server *Server) ShowClients() {
	// fmt.Println(server.clients)
	// for i := 0; i < len(server.clients); i++ {
	// 	fmt.Println(server.clients[i])
	// }
	for clientId, client := range server.clients {
		fmt.Printf("client with id: %s and connection %+v", clientId, client.connection)
	}
}

func (server *Server) sendToClients(message interface{}) {
	// for i := 0; i < len(server.clients); i++ {
	// 	// fmt.Println(server.clients[i].connection)
	// 	server.clients[i].connection.WriteJSON(message)
	// }
	for _, client := range server.clients {
		client.connection.WriteJSON(message)
	}
}

func NewServer(capacity int, httpServer *http.Server, upgrader *websocket.Upgrader) *Server {
	newServer := &Server{
		capacity:     capacity,
		httpServer:   httpServer,
		upgrader:     upgrader,
		clients:      make(map[string]*Client),
		clientsReady: 0,
	}
	// do this better
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

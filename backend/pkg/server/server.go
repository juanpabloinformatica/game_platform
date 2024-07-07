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
	id         int
	connection *websocket.Conn
	counter    int
}

type (
	endpoint func()
	Server   struct {
		capacity   int
		httpServer *http.Server
		upgrader   *websocket.Upgrader
		clients    []*Client
	}
)

var (
	server   *Server
	clientId = 0
)

func (server *Server) newClient(connection *websocket.Conn) *Client {
	clientId += 1
	return &Client{connection: connection, counter: 0, id: clientId}
}

func (server *Server) missingPlayerGame() {
	message := &game.MissingPlayerMessage{
		Message: "second player missing",
	}
	server.clients[0].connection.WriteJSON(message)
}

func (server *Server) handleGame() {
	if server.gameIsReady() {
		server.initGame()
		server.setWinner()
		server.finishGame()
	} else {
		server.missingPlayerGame()
	}
}

func (server *Server) gameIsReady() bool {
	return len(server.clients) == 2
}

func (server *Server) getWinner() *Client {
	winner := &Client{}
	if server.clients[0].counter > server.clients[1].counter {
		winner = server.clients[0]
	} else {
		winner = server.clients[1]
	}
	return winner
}

func (server *Server) setWinner() {
	winner := server.getWinner()
	resultMessage := &game.ResultMessage{
		Message: fmt.Sprintf("Winner player %d, with %d correct clicks", winner.id, winner.counter),
	}
	server.sendToClients(resultMessage)
}

func (server *Server) finishGame() {
	gameFinishMessage := &game.GameFinishMessage{Message: "Game has finished\nthanks for playing"}
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
	server.clients = append(server.clients, client)
}

func (server *Server) ShowClients() {
	for i := 0; i < len(server.clients); i++ {
		fmt.Println(server.clients[i])
	}
}

func (server *Server) sendToClients(message interface{}) {
	for i := 0; i < len(server.clients); i++ {
		fmt.Println(server.clients[i].connection)
		server.clients[i].connection.WriteJSON(message)
	}
}

func NewServer(capacity int, httpServer *http.Server, upgrader *websocket.Upgrader) *Server {
	newServer := &Server{
		capacity:   capacity,
		httpServer: httpServer,
		upgrader:   upgrader,
		clients:    make([]*Client, 0, capacity),
	}
	// do this better
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

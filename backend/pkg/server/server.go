package server

import (
	"errors"
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
		game         *game.Game
	}
)

var (
	server   *Server
	clientId = 0
)

func (server *Server) newClient(connection *websocket.Conn, clientId string) *Client {
	return &Client{connection: connection, counter: 0, id: clientId}
}

func (server *Server) setGame(gameConfig *game.GameConfig) {
	server.game = game.NewGame(gameConfig)
	server.game.SetCirclePositions()
	fmt.Println("ball speed")
	fmt.Println(server.game.GameConfigI.BallSpeed)
	fmt.Println("ball number")
	fmt.Println(server.game.GameConfigI.BallNumber)
	fmt.Println(len(server.game.CirclePositions))
}

func (server *Server) missingPlayerGame() {
	message := &game.MissingPlayerMessage{
		MissingPlayerMessage: "second player missing",
	}
	server.sendToClients(message)
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
	for {
		if server.clientsReady == len(server.clients) {
			return true
		}
	}
}

func (server *Server) handleGame() {
	if server.gameIsReady() == false {
		server.missingPlayerGame()
		return
	}
	server.readyToPlay()
	// server.game is been writting twice that's the reason only a player can put the settings
	if server.game == nil {
		panic(errors.New("not game configuration yet"))
	}
	server.sendBeforeStartSignal()
	server.initGame()
	server.setResult()
	server.finishGame()
	server.resetGame()
	server.handleGame()
}

func (server *Server) resetGame() {
	for _, client := range server.clients {
		client.counter = 0
	}
	server.clientsReady = 0
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
	winner = server.clients[id]
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
        fmt.Println(count)
		if count > server.game.GameConfigI.BallNumber-1 {
			break
		}
		count += 1
		circle := server.game.GetCircle()
		circleMessage := &game.CircleMessage{
			CircleInstance: circle,
		}
		server.sendToClients(circleMessage)
		millisecond := int(server.game.GameConfigI.BallSpeed * 1000)
		time.Sleep(time.Duration(millisecond) * time.Millisecond)
	}
}

func (server *Server) addClient(client *Client) {
	server.clients[client.id] = client
}

func (server *Server) ShowClients() {
	for clientId, client := range server.clients {
		fmt.Printf("client with id: %s and connection %+v", clientId, client.connection)
	}
}

func (server *Server) sendToClients(message interface{}) {
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
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

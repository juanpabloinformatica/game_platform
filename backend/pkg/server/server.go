package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game/reactionGame"
)

type Client struct {
	id         int
	connection *websocket.Conn
}

type (
	endpoint func()
	Server   struct {
		capacity   int
		httpServer *http.Server
		upgrader   *websocket.Upgrader
		clients    map[int]*Client
		// games      []*game.Game
		reactionGames []*reactionGame.ReactionGame
	}
)

var server *Server

func (server *Server) newClient(connection *websocket.Conn, clientId int) *Client {
	return &Client{connection: connection}
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

// this should be the correct one need to check polymorphism in greater detail in goolang
// func (server *Server) AddGame(game *game.Game) {
// 	server.games = append(server.games, game)
// }

// this should be the correct one need to check polymorphism in greater detail in goolang
func (server *Server) AddGame(reactionGame *reactionGame.ReactionGame) {
    fmt.Println("here in addgame")
	server.reactionGames = append(server.reactionGames, reactionGame)
	fmt.Printf("%+v\n", server.reactionGames[0])
	fmt.Printf("%+v\n", server.reactionGames[0].GameConfig)
    fmt.Print(len(server.reactionGames))
}

func NewServer(capacity int, httpServer *http.Server, upgrader *websocket.Upgrader) *Server {
	newServer := &Server{
		capacity:      capacity,
		httpServer:    httpServer,
		upgrader:      upgrader,
		clients:       make(map[int]*Client),
		reactionGames: make([]*reactionGame.ReactionGame, 0, 0),
	}
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

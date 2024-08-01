package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
	"github.com/juanpabloinformatica/game_platform/pkg/game/reactionGame"
)

type Client struct {
	id         string
	connection *websocket.Conn
}

type (
	endpoint func()
	Server   struct {
		capacity   int
		httpServer *http.Server
		upgrader   *websocket.Upgrader
		clients    map[string]*Client
		// games      []*game.Game
		games []*reactionGame.ReactionGame
	}
)

var server *Server

func (server *Server) newClient(connection *websocket.Conn, clientId string) *Client {
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

func (server *Server) addGame(game *game.Game) {
	server.games = append(server.games, game)
}

func NewServer(capacity int, httpServer *http.Server, upgrader *websocket.Upgrader) *Server {
	newServer := &Server{
		capacity:   capacity,
		httpServer: httpServer,
		upgrader:   upgrader,
		clients:    make(map[string]*Client),
	}
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

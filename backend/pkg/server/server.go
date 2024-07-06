package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
)

type Client struct {
	connection *websocket.Conn
}
type (
	endpoint func()
	Server   struct {
		capacity   int
		httpServer *http.Server
		upgrader   *websocket.Upgrader
		clients    []*Client
		// websocketHandler *WebsocketHandler
	}
)

var server *Server

func (server *Server) newClient(connection *websocket.Conn) *Client {
	return &Client{connection: connection}
}

func (server *Server) addClient(client *Client) {
	fmt.Println("hereeee")
	fmt.Println(client)
	fmt.Println(client.connection)
	server.clients = append(server.clients, client)
	fmt.Println(len(server.clients))
}

func (server *Server) showClients() {
	// for client := range server.clients {
	// 	fmt.Println(client)
	// }
	fmt.Println("show client # clients")
	fmt.Print(len(server.clients))
	for i := 0; i < len(server.clients); i++ {
		fmt.Println("sstart connection")
		fmt.Println(server.clients[i].connection)
		fmt.Println("end connection")
		// if err := server.clients[i].connection.WriteMessage(websocket.TextMessage, message); err != nil {
		// 	log.Println(err)
		// }
		// log.Println("sent message")
	}
}

func (server *Server) sendToClients() {
	circle := game.GetCircle()
	for i := 0; i < len(server.clients); i++ {
		fmt.Println(server.clients[i].connection)
		server.clients[i].connection.WriteJSON(circle)
	}
}

func NewServer(capacity int, httpServer *http.Server, upgrader *websocket.Upgrader) *Server {
	newServer := &Server{
		capacity:   capacity,
		httpServer: httpServer,
		upgrader:   upgrader,
		clients:    make([]*Client, 0, capacity),
	}
	//  how to do this better
	server = newServer
	return newServer
}

func (server *Server) Run() {
	log.Fatal(server.httpServer.ListenAndServe())
}

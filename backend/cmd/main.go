package main

import (
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/server"
)

func main() {
	capacity := 2
	myMux := server.NewMux()
	httpServer := &http.Server{
		Addr:    "frontend",
		Handler: myMux,
	}
	upgrader := &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// to change
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	improvedServer := server.NewServer(capacity, httpServer, upgrader)
	improvedServer.Run()
}

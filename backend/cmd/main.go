package main

import (
	// "fmt"
	"net/http"

	"github.com/gorilla/websocket"

	// "github.com/juanpabloinformatica/game_platform/pkg/game"
//	"github.com/juanpabloinformatica/game_platform/pkg/database"
	"github.com/juanpabloinformatica/game_platform/pkg/server"
)

func main() {
	// game.Init()
	capacity := 2
	myMux := server.NewMux()
	httpServer := &http.Server{
		Addr:    ":7777",
		Handler: myMux,
	}
	// fmt.Println(httpServer)
	upgrader := &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// to change
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	// game.Init()
	improvedServer := server.NewServer(capacity, httpServer, upgrader)
	improvedServer.Run()
    // database.Init()
}

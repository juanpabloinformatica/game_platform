package server

import (
	// "net/http"

	"github.com/gorilla/mux"
)

func setMux(mux *mux.Router) {
	mux.HandleFunc("/", handler)
	mux.HandleFunc("/ws", handlerWs)
	mux.HandleFunc("/joinreactiongame", handleJoinReactionGame)
	mux.HandleFunc("/reactiongameconfig", handleReactionGameConfig)
	// mux.HandleFunc("/userchart/{playerId}/{ballSpeed}/{ballNumber}",handleUserChart)
	mux.HandleFunc("/userchart",handleUserChart).Methods("GET")
}

func NewMux() *mux.Router {
	// mux := http.NewServeMux()

	r := mux.NewRouter()
	setMux(r)
	return r
}

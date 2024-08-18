package server

import (
	// "net/http"

	"github.com/gorilla/mux"
)

func setMux(mux *mux.Router) {
	mux.HandleFunc("/ws", handlerWs)
	mux.HandleFunc("/joinreactiongame", handleJoinReactionGame)
	mux.HandleFunc("/reactiongameconfig", handleReactionGameConfig)
	mux.HandleFunc("/userchart",handleUserChart).Methods("GET")
}

func NewMux() *mux.Router {
	r := mux.NewRouter()
	setMux(r)
	return r
}

package server

import (
	"net/http"
)

func setMux(mux *http.ServeMux) {
	mux.HandleFunc("/", handler)
	mux.HandleFunc("/ws", handlerWs)
	mux.HandleFunc("/createreactiongame", handleCreateReactionGame)
	mux.HandleFunc("/createreactiongame", handleCreateReactionGame)
}

func NewMux() *http.ServeMux {
	mux := http.NewServeMux()
	setMux(mux)
	return mux
}

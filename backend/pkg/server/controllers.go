package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game/reactionGame"
)

func handler(writter http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writter, "time to play", request.URL.Path[1:])
}

func handlerWs(writter http.ResponseWriter, request *http.Request) {
	//   upgrade server
	conn, err := server.upgrader.Upgrade(writter, request, nil)
	if err != nil {
		fmt.Println(err)
	}
	handleSocketConnection(conn, writter, request)
}

func handleReactionGameConfig(writter http.ResponseWriter, request *http.Request) {
	playGame := &reactionGame.PlayGame{}
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		panic(err.Error())
	}
	if len(body) <= 0 {
		panic(errors.New("empty body"))
	}
	json.Unmarshal(body, playGame)
	modality := playGame.GameModality
	playerId := playGame.PlayerId
	roomId := playGame.RoomId
	reactionGameConfig := playGame.GameConfig
	// This database driver has to be better handle, maybe check connection pool or something to improve it
	reactionGame := reactionGame.NewReactionGame(modality, playerId, reactionGameConfig, roomId, server.dbDriver)
	server.AddGame(reactionGame)
}

func handleJoinReactionGame(writter http.ResponseWriter, request *http.Request) {
	joinGame := &reactionGame.JoinGame{}
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		panic(err.Error())
	}
	if len(body) <= 0 {
		panic(errors.New("empty body"))
	}
	json.Unmarshal(body, joinGame)
	fmt.Println(joinGame)
	player := reactionGame.NewPlayer(joinGame.PlayerId)
	server.reactionGames[0].AddPlayer(player)
	if joinGame.RoomId == server.reactionGames[0].Room.RoomId {
		fmt.Println("entre aqui por que ambos tienen el mismo room id")
		fmt.Println("hereeeeee when 2 players same room before adding new")
		fmt.Println(len(server.reactionGames[0].Room.Players))
		fmt.Println(len(server.reactionGames[0].Players))
		server.reactionGames[0].Room.AddPlayer(player)
		fmt.Println("hereeeeee when 2 players same room")
		fmt.Println(len(server.reactionGames[0].Room.Players))
		fmt.Println(len(server.reactionGames[0].Players))
	} else {
		fmt.Println("this player is not in the same created room")
	}
}

func getClientId(request *http.Request) int {
	clientId, err := strconv.Atoi(request.URL.Query().Get("clientId"))
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("line [25]----- here the client id-----")
	fmt.Println(clientId)
	fmt.Println("----------")
	return clientId
}

// just for initializing the game once
var count = 0

func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	fmt.Println("hellloooooo in handleConnection")
	clientId := getClientId(request)
	client := server.newClient(conn, clientId)
	server.addClient(client)
	// how to handle multiple connections to different games
	fmt.Printf("%+v\n", server.reactionGames[0].Players[clientId])
	server.reactionGames[0].SetPlayerConnection(clientId, conn)
	go hearMessage(server.reactionGames[0].Players[clientId])
	if count == 0 {
		server.reactionGames[0].HandleGame()
		count++
	}
}

func hearMessage(player *reactionGame.Player) {
	// defer client.connection.Close()
	for {
		// _, p, err := client.connection.ReadMessage()
		_, p, err := player.Connection.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(p))
		if string(p) == "ready" {
			// server.clientsReady += 1
			// server.game.PlayerReady += 1
			server.reactionGames[0].PlayersReady += 1
			fmt.Println("player: ")
			fmt.Println(player)
			fmt.Println(server.reactionGames[0].PlayersReady)
		} else {
			// client.counter += 1
			// server.reactionGames[0].Players[player.PlayerId].Counter += 1
			player.Counter += 1
		}
	}
}

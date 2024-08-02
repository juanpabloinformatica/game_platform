package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
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

// func handleCreateReactionGame(writter http.ResponseWriter, request *http.Request) {
// 	gameConfig := &game.GameConfig{}
// 	body, err := ioutil.ReadAll(request.Body)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	if len(body) <= 0 {
// 		panic(errors.New("empty body"))
// 	}
// 	json.Unmarshal(body, gameConfig)
// 	server.setGame(gameConfig)
// }
//
// func handleJoinReactionGame(writter http.ResponseWriter, request *http.Request) {
// 	joinGame := &game.JoinGame{}
// 	body, err := ioutil.ReadAll(request.Body)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	if len(body) <= 0 {
// 		panic(errors.New("empty body"))
// 	}
// 	json.Unmarshal(body, joinGame)
// 	fmt.Println(joinGame)
// 	// server.game.AddPlayer(joinGame.PlayerId)
// 	// server.addClient()
// }

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
	reactionGameConfig := playGame.GameConfig
	reactionGame := reactionGame.NewReactionGame(modality, playerId, reactionGameConfig)
	// fmt.Printf("%+v\n",playGame.GameConfig)
	// fmt.Println(playGame.PlayerId)
	// fmt.Println(playGame.GameModality)
	server.AddGame(reactionGame)
	// game := game.NewGame(playGame.GameModality)
	// player := game.NewPlayer(playGame.PlayerId,)
	// game.AddPlayer(player)
	// reactionGame := reactionGame.NewReactionGame()
	// server.addGame(reactionGame)
	// fmt.Println(joinGame)
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

func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	clientId := getClientId(request)
	client := server.newClient(conn, clientId)
	server.addClient(client)
	// how to handle multiple connections to different games
	server.reactionGames[0].SetPlayerConnection(clientId, conn)
	go hearMessage(server.reactionGames[0].Players[clientId])
	// go hearMessage(client)
	// server.handleGame()
}

// func hearMessage(client *Client) {
// 	// defer client.connection.Close()
// 	for {
// 		// _, p, err := client.connection.ReadMessage()
// 		_, p, err := client.connection.ReadMessage()
//
// 		if err != nil {
// 			fmt.Println(err)
// 			return
// 		}
// 		fmt.Println(string(p))
// 		if string(p) == "ready" {
// 			// server.clientsReady += 1
// 			// server.game.PlayerReady += 1
// 		} else {
// 			// client.counter += 1
// 		}
// 	}
// }

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
		} else {
			// client.counter += 1
			// server.reactionGames[0].Players[player.PlayerId].Counter += 1
			player.Counter += 1
		}
	}
}

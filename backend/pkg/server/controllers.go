package server

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/database"
	"github.com/juanpabloinformatica/game_platform/pkg/game/reactionGame"
)


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

func getPorcentages(ballNumber int,resultsPerDay map[time.Time][]int)map[time.Time]float32{
    fmt.Println("i get in here")
    resultsPorcentage:= make(map[time.Time]float32)
     // ballNumber = 100 
     // ballClicked = %
     // %*ballNumber = ballClicked*100
     // % = ballClicked*100 / ballNumber
     for key,value := range resultsPerDay{
         fmt.Println(key,"value is ",value)
         resultsPorcentage[key]=0
         for _,valueT := range value{
             fmt.Println(valueT)
             resultsPorcentage[key]+=float32(valueT)
         }
         fmt.Println("printing key and date ")
         fmt.Println(key)
         fmt.Println("========printing key and date======= ")
         resultsPorcentage[key]=(resultsPorcentage[key] / float32(len(resultsPerDay[key])))
         resultsPorcentage[key]=resultsPorcentage[key]*100/float32(ballNumber)
         fmt.Println(resultsPorcentage[key])
     }
     // fmt.Println(len(resultsPorcentage))
     // for key,value := range resultsPorcentage{
     //     fmt.Println(key, "value is ",value)
     // }
     return resultsPorcentage
}

func handleSelectedResults(ballNumber int,rows*sql.Rows) map[time.Time]float32{
    resultsPerDay:= make(map[time.Time][]int)
	defer rows.Close()
	for rows.Next() {
		fmt.Println("here insdie")
		var r database.Results
		server.dbDriver.ScanRows(rows, &r)
        fmt.Println("day format to discover")
        fmt.Println(resultsPerDay[r.Day])
        fmt.Println("======day format to discover=====")
        resultsPerDay[r.Day] = append(resultsPerDay[r.Day],r.BallsClicked)
		fmt.Printf("%+v\n", r)
	}
    porcentages:= getPorcentages(ballNumber,resultsPerDay)
    return porcentages

}

func handleUserChart(writter http.ResponseWriter, request *http.Request) {
	// params := mux.Vars(request)
    // getParams()
    // get params
    writter.Header().Add("Access-Control-Allow-Origin", "*")
	playerId, err := strconv.Atoi(request.URL.Query().Get("playerId"))
	ballSpeed, err := strconv.ParseFloat(request.URL.Query().Get("ballSpeed"), 32)
	ballNumber, err := strconv.Atoi(request.URL.Query().Get("ballNumber"))
	if err != nil {
		panic(err.Error())
	}

	results := make([]*database.Results, 0, 0)
	result := server.dbDriver.Where("userId = ? AND ballSpeed = ? AND ballNumber = ?", playerId, ballSpeed, ballNumber).Order("day").Find(&results)
    rows, err:= result.Rows()
    if err!=nil{
        panic(err.Error())
    }
    porcentages:= handleSelectedResults(ballNumber,rows)
    jsonString,err := json.Marshal(porcentages)
    fmt.Println(jsonString)
    fmt.Fprintf(writter,string(jsonString))
	// fmt.Printf("%+v\n", result.RowsAffected)
	// rows, err := result.Rows()
	// defer rows.Close()
	// for rows.Next() {
	// 	fmt.Println("here insdie")
	// 	var r database.Results
	// 	server.dbDriver.ScanRows(rows, &r)
	// 	fmt.Printf("%+v\n", r)
	// }
	// fmt.Println("printing here")
}
var countP = 0
func getClientId(request *http.Request) int {
	clientId, err := strconv.Atoi(request.URL.Query().Get("clientId"))
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("line [25]----- here the client id-----")
	fmt.Println(clientId)
	fmt.Println("----------")
    return clientId
 //    clientIdt := countP
 //    countP++
	// return clientIdt
}

// just for initializing the game once
var count = 0
func handleSocketConnection(conn *websocket.Conn, writter http.ResponseWriter, request *http.Request) {
	clientId := getClientId(request)
	client := server.newClient(conn)
	server.addClient(client)
	// how to handle multiple connections to different games
	fmt.Printf("%+v\n", server.reactionGames[0].Players[clientId])
	server.reactionGames[0].SetPlayerConnection(clientId, conn)
	go hearMessage(server.reactionGames[0].Players[clientId])
    // wait group or something, need to think this part well
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
			server.reactionGames[0].PlayersReady += 1
		} else {
			player.Counter += 1
			fmt.Println(player.Counter)
		}
	}
}

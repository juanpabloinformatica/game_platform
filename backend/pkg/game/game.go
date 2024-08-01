package game

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type Player struct {
	PlayerId   int `json:"playerId"`
	Connection *websocket.Conn
}
type PlayGame struct {
	PlayerId     int  `json:"playerId"`
	GameModality bool `json:"gameModality"`
}
type Games interface {
	handleGame()
	resetGame()
	addPlayer()
	readyToPlay()
}
type Game struct {
	// GameConfig      *GameConfig
	// CirclePositions []*Circle
	Players      []*Player
	GameModality bool
	// I should add this part
	// MissingPlayerMessage     string  `json:"missingPlayerMessage"`
	// ResultMessage            string  `json:"resultMessage"`
	// CircleInstance           *Circle `json:"circleMessage"`
	// GameFinishMessage        string  `json:"gameFinishMessage"`
	// BeforeStartSignalMessage string  `json:"beforeStartSignalMessage"`
}

func (game *Game) AddPlayer(player *Player) {
	game.Players = append(game.Players, player)
}

func (game *Game) NewPlayer(playerId int, connection *websocket.Conn) *Player {
	return &Player{
		PlayerId: playerId,
		// Connection: connection,
	}
}

func (game *Game) SetPlayerConnection(playerId int, connection *websocket.Conn) {
    game.Players[]
}

func NewGame(gameModality bool) *Game {
	return &Game{
		GameModality: gameModality,
		// Players:
	}
}

// type Point struct {
// 	x int
// 	y int
// }

// var (
// 	WIDTH            = 500
// 	HEIGHT           = 500
// 	CIRCLE_POSITIONS []*Circle
// 	BALLNUMBER       = 10
// 	BALLSPEED        = 600
// )

// func (game *Game) SetCirclePositions() {
// 	// size := WIDTH
// 	size := game.GameConfig.Width
// 	for y := 0; y < size/100; y += 1 {
// 		for x := 0; x < size/100; x += 1 {
// 			newCircle := &Circle{
// 				PosX:     x*100 + 100/2,
// 				PosY:     y*100 + 100/2,
// 				R:        100 / 2,
// 				SAngle:   0,
// 				EndAngle: 2 * math.Pi,
// 			}
// 			game.CirclePositions = append(game.CirclePositions, newCircle)
// 		}
// 	}
// }

// func (game *Game) GetCircle() *Circle {
// 	min := 0
// 	max := len(game.CirclePositions) - 1
// 	randomIndex := randomInteger(min, max)
// 	selectedCircle := game.CirclePositions[randomIndex]
// 	return selectedCircle
// }

// func (game *Game) sendBeforeStartSignal() {
// 	// beforeStartSignal := &game.BeforeStartSignalMessage{
// 	// 	BeforeStartSignalMessage: "signal",
// 	// }
// 	// fmt.Println("sending signal")
// 	// server.sendToClients(beforeStartSignal)
// 	// time.Sleep(4 * time.Second)
// }

func (game *Game) readyToPlay() bool {
	// for {
	// 	if server.game.PlayerReady == len(server.game.Players) {
	// 		return true
	// 	}
	// }
	// for {
	// 	if server.clientsReady == len(server.clients) {
	// 		return true
	// 	}
	// }
	return true
}

func (game *Game) handleGame() {
	// if server.gameIsReady() == false {
	// 	server.missingPlayerGame()
	// 	return
	// }
	// server.readyToPlay()
	// // server.game is been writting twice that's the reason only a player can put the settings
	// if server.game == nil {
	// 	panic(errors.New("not game configuration yet"))
	// }
	// server.sendBeforeStartSignal()
	// server.initGame()
	// server.setResult()
	// server.finishGame()
	// server.resetGame()
	// server.handleGame()
}

func (game *Game) resetGame() {
	// for _, client := range server.clients {
	// 	client.counter = 0
	// }
	// // for _, client := range server.game.Players {
	// // 	client.Counter = 0
	// // }
	// server.clientsReady = 0
	// // server.game.PlayerReady = 0
}

func (game *Game) getResult() *Player {
	// winner := &Client{}
	// max := -1
	// id := ""
	// for clientId, client := range server.clients {
	// 	if client.counter > max {
	// 		max = client.counter
	// 		id = clientId
	// 	}
	// }
	// winner = server.clients[id]
	// return winner
	return &Player{}
}

// func (game *Game) missingPlayerGame() {
// 	// message := &game.MissingPlayerMessage{
// 	// 	MissingPlayerMessage: "second player missing",
// 	// }
// 	// server.sendToClients(message)
// }

func (game *Game) sendToPlayers(message interface{}) {
	for _, player := range game.Players {
		player.Connection.WriteJSON(message)
	}
}

func (game *Game) ShowPlayers() {
	for playerId, player := range game.Players {
		fmt.Printf("client with id: %s and connection %+v", playerId, player.Connection)
	}
}

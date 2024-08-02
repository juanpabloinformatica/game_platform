package reactionGame

import (
	"fmt"
	"math"

	"github.com/gorilla/websocket"

	"github.com/juanpabloinformatica/game_platform/pkg/game"
)

type Circle struct {
	PosX     int     `json:"posX"`
	PosY     int     `json:"posY"`
	R        int     `json:"r"`
	SAngle   float32 `json:"sAngle"`
	EndAngle float32 `json:"endAngle"`
}

type Point struct {
	x int
	y int
}

type GameConfig struct {
	BallNumber int     `json:"ballNumber"`
	BallSpeed  float32 `json:"ballSpeed"`
	Height     int     `json:"height,omitempty"`
	Width      int     `json:"width,omitempty"`
}
type PlayGame struct {
	GameConfig *GameConfig `json:"gameConfig"`
	// PlayerId     int         `json:"playerId"`
	// GameModality bool        `json:"gameModality"`
	game.PlayGame
}
type Player struct {
	game.Player
	Counter int
}

type ReactionGame struct {
	// game.Game
	GameConfig      *GameConfig
	CirclePositions []*Circle
	// should be in game parent class
	Players      map[int]*Player
	GameModality bool
	PlayersReady int
}

func NewPlayer(playerId int) *Player {
	return &Player{
		Player: game.Player{
			PlayerId: playerId,
		},
		Counter: 0,
	}
}

func (reactionGame *ReactionGame) AddPlayer(player *Player) {
	reactionGame.Players[player.PlayerId] = player
}

// func (reactionGame *ReactionGame) NewPlayer(playerId int) *Player {
// 	return &Player{
// 		PlayerId: playerId,
// 		// Connection: connection,
// 	}
// }

func (reactionGame *ReactionGame) SetPlayerConnection(playerId int, connection *websocket.Conn) {
	reactionGame.Players[playerId].Connection = connection
}

func NewReactionGame(gameModality bool, playerId int, gameConfig *GameConfig) *ReactionGame {
	reactionGame := &ReactionGame{
		GameModality: gameModality,
		Players:      make(map[int]*Player),
		GameConfig:   gameConfig,
	}
	player := NewPlayer(playerId)
	reactionGame.AddPlayer(player)
	return reactionGame
}

func (reactionGame *ReactionGame) sendBeforeStartSignal() {
	beforeStartSignal := &BeforeStartSignalMessage{
		BeforeStartSignalMessage: "signal",
	}
	fmt.Println("sending signal")
	reactionGame.sendToPlayers(beforeStartSignal)
	time.Sleep(4 * time.Second)
}

func (reactionGame *ReactionGame) SetCirclePositions() {
	// size := WIDTH
	size := reactionGame.GameConfig.Width
	for y := 0; y < size/100; y += 1 {
		for x := 0; x < size/100; x += 1 {
			newCircle := &Circle{
				PosX:     x*100 + 100/2,
				PosY:     y*100 + 100/2,
				R:        100 / 2,
				SAngle:   0,
				EndAngle: 2 * math.Pi,
			}
			reactionGame.CirclePositions = append(reactionGame.CirclePositions, newCircle)
		}
	}
}

//	func (reactionGame *ReactionGame) finishGame() {
//		gameFinishMessage := &game.GameFinishMessage{GameFinishMessage: "Game has finished\nthanks for playing"}
//		reactionGame.sendToClients(gameFinishMessage)
//	}
//
//	func (ReactionGame *ReactionGame) initGame() {
//		count := 0
//		for {
//			fmt.Println(count)
//			if count > reactionGame.game.GameConfigI.BallNumber-1 {
//				break
//			}
//			count += 1
//			circle := reactionGame.game.GetCircle()
//			circleMessage := &game.CircleMessage{
//				CircleInstance: circle,
//			}
//			reactionGame.sendToClients(circleMessage)
//			millisecond := int(reactionGame.game.GameConfigI.BallSpeed * 1000)
//			time.Sleep(time.Duration(millisecond) * time.Millisecond)
//		}
//	}
//
//	func (reactionGame *ReactionGame) missingPlayerGame() {
//		// message := &game.MissingPlayerMessage{
//		// 	MissingPlayerMessage: "second player missing",
//		// }
//		// reactionGame.sendToClients(message)
//	}
//
//	func (reactionGame *ReactionGame) getResult() *Player {
//		// winner := &Client{}
//		// max := -1
//		// id := ""
//		// for clientId, client := range reactionGame.clients {
//		// 	if client.counter > max {
//		// 		max = client.counter
//		// 		id = clientId
//		// 	}
//		// }
//		// winner = reactionGame.clients[id]
//		// return winner
//		return &game.Player{}
//	}

func (reactionGame *ReactionGame) sendToPlayers(message interface{}) {
	for _, player := range reactionGame.Players {
		player.Connection.WriteJSON(message)
	}
}

func (reactionGame *ReactionGame) ShowPlayers() {
	for playerId, player := range reactionGame.Players {
		fmt.Printf("client with id: %s and connection %+v", playerId, player.Connection)
	}
}

func (reactionGame *ReactionGame) handleGame() {
	if reactionGame.gameIsReady() == false {
		reactionGame.missingPlayerGame()
		return
	}
	reactionGame.readyToPlay()
	// reactionGame.game is been writting twice that's the reason only a player can put the settings
	if reactionGame.game == nil {
		panic(errors.New("not game configuration yet"))
	}
	reactionGame.sendBeforeStartSignal()
	reactionGame.initGame()
	reactionGame.setResult()
	reactionGame.finishGame()
	reactionGame.resetGame()
	reactionGame.handleGame()
}

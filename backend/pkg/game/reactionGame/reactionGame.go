package reactionGame

import (
	"fmt"

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

type ReactionGame struct {
	game            game.Game
	GameConfig      *GameConfig
	CirclePositions []*Circle
}

func newReactionGame(game *game.Game) *ReactionGame {
	return &ReactionGame{}
}

func (reactionGame *ReactionGame) sendBeforeStartSignal() {
	// beforeStartSignal := &game.BeforeStartSignalMessage{
	// 	BeforeStartSignalMessage: "signal",
	// }
	// fmt.Println("sending signal")
	// server.sendToClients(beforeStartSignal)
	// time.Sleep(4 * time.Second)
}

func (reactionGame *ReactionGame) SetCirclePositions() {
	// size := WIDTH
	size := game.GameConfig.Width
	for y := 0; y < size/100; y += 1 {
		for x := 0; x < size/100; x += 1 {
			newCircle := &Circle{
				PosX:     x*100 + 100/2,
				PosY:     y*100 + 100/2,
				R:        100 / 2,
				SAngle:   0,
				EndAngle: 2 * math.Pi,
			}
			game.CirclePositions = append(game.CirclePositions, newCircle)
		}
	}
}

func (reactionGame *ReactionGame) finishGame() {
	gameFinishMessage := &game.GameFinishMessage{GameFinishMessage: "Game has finished\nthanks for playing"}
	server.sendToClients(gameFinishMessage)
}

func (ReactionGame *ReactionGame) initGame() {
	count := 0
	for {
		fmt.Println(count)
		if count > server.game.GameConfigI.BallNumber-1 {
			break
		}
		count += 1
		circle := server.game.GetCircle()
		circleMessage := &game.CircleMessage{
			CircleInstance: circle,
		}
		server.sendToClients(circleMessage)
		millisecond := int(server.game.GameConfigI.BallSpeed * 1000)
		time.Sleep(time.Duration(millisecond) * time.Millisecond)
	}
}

func (game *Game) missingPlayerGame() {
	// message := &game.MissingPlayerMessage{
	// 	MissingPlayerMessage: "second player missing",
	// }
	// server.sendToClients(message)
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

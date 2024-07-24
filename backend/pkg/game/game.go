package game

import (
	"math"
)

type Circle struct {
	PosX     int     `json:"posX"`
	PosY     int     `json:"posY"`
	R        int     `json:"r"`
	SAngle   float32 `json:"sAngle"`
	EndAngle float32 `json:"endAngle"`
}

type GameConfig struct {
	BallNumber    int     `json:"ballNumber"`
	BallSpeed     float32 `json:"ballSpeed"`
	CreatorGameId int     `json:"creatorGameId"`
	Id            int     `json:"id,omitempty"`
}

type Player struct {
	PlayerId int `json:"playerId"`
}

type Game struct {
	Id              int
	Width           int `json:"width"`
	Height          int `json:"height"`
	GameConfigI     *GameConfig
	CirclePositions []*Circle
	Players         []*Player
	// I should add this part
	// MissingPlayerMessage     string  `json:"missingPlayerMessage"`
	// ResultMessage            string  `json:"resultMessage"`
	// CircleInstance           *Circle `json:"circleMessage"`
	// GameFinishMessage        string  `json:"gameFinishMessage"`
	// BeforeStartSignalMessage string  `json:"beforeStartSignalMessage"`
}

func (game *Game) addPlayer(player *Player) {
	game.Players = append(game.Players, player)
}

func NewGame(gameConfig *GameConfig) *Game {
	return &Game{
		Width:       500,
		Height:      500,
		GameConfigI: gameConfig,
	}
}

// type GameConfig struct {
// 	BallNumber float32
// 	BallSpeed  int
// }

type Point struct {
	x int
	y int
}

var (
	WIDTH            = 500
	HEIGHT           = 500
	CIRCLE_POSITIONS []*Circle
	BALLNUMBER       = 10
	BALLSPEED        = 600
)

func (game *Game) SetCirclePositions() {
	// size := WIDTH
	size := game.Width
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

func (game *Game) GetCircle() *Circle {
	min := 0
	max := len(game.CirclePositions) - 1
	randomIndex := randomInteger(min, max)
	selectedCircle := game.CirclePositions[randomIndex]
	return selectedCircle
}

// func Init() {
// 	setCirclePositions()
// }

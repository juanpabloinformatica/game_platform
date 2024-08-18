package reactionGame

import (
	"errors"
	"fmt"
	"math"
	"time"

	"github.com/gorilla/websocket"
	"gorm.io/gorm"

	"github.com/juanpabloinformatica/game_platform/pkg/database"
	"github.com/juanpabloinformatica/game_platform/pkg/game"
)

type Room struct {
	RoomId  int `json:"roomId,omitempty"`
	Players map[int]*Player
}
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
	game.PlayGame
}
type Player struct {
	game.Player
	Counter int
}
type JoinGame struct {
	PlayerId int `json:"playerId"`
	RoomId   int `json:"roomId"`
}

type ReactionGame struct {
	// game.Game
	Room            *Room
	GameConfig      *GameConfig
	CirclePositions []*Circle
	// should be in game parent class
	Players      map[int]*Player
	GameModality bool
	PlayersReady int
	// this will be improved consistenly
	sameRoom bool
	DbDriver *gorm.DB
}

func (reactionGame *ReactionGame) generateRoomId() int {
	return 1
}

func (room *Room) AddPlayer(player *Player) {
	fmt.Println("printing player")
	fmt.Printf("%+v\n", player)
	room.Players[player.PlayerId] = player
}

func (room *Room) RoomReady() bool {
	if len(room.Players) == 2 {
		return true
	} else {
		return false
	}
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

func (reactionGame *ReactionGame) SetPlayerConnection(playerId int, connection *websocket.Conn) {
	reactionGame.Players[playerId].Connection = connection
	fmt.Println("player after pushing play button")
	fmt.Printf("%+v\n", reactionGame.Players[playerId])
}

func NewReactionGame(gameModality bool, playerId int, gameConfig *GameConfig, roomId int, dbDriver *gorm.DB) *ReactionGame {
	reactionGame := &ReactionGame{
		GameModality: gameModality,
		Players:      make(map[int]*Player),
		GameConfig:   gameConfig,
		DbDriver:     dbDriver,
	}
	// this has to be better done
	player := NewPlayer(playerId)
	if reactionGame.GameModality {
		reactionGame.Room = &Room{
			RoomId:  roomId,
			Players: make(map[int]*Player),
		}
		reactionGame.Room.AddPlayer(player)
	}
	reactionGame.AddPlayer(player)
	reactionGame.SetCirclePositions()
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

func (reactionGame *ReactionGame) finishGame() {
	gameFinishMessage := &GameFinishMessage{GameFinishMessage: "Game has finished\nthanks for playing"}
	reactionGame.sendToPlayers(gameFinishMessage)
}

func (reactionGame *ReactionGame) sendToPlayers(message interface{}) {
	for _, player := range reactionGame.Players {
		player.Connection.WriteJSON(message)
	}
}

func (reactionGame *ReactionGame) ShowPlayers() {
	for playerId, player := range reactionGame.Players {
		fmt.Printf("client with id: %d and connection %+v", playerId, player.Connection)
	}
}

func (reactionGame *ReactionGame) goodToPlay() bool {
	for _, player := range reactionGame.Players {
		if player.Connection != nil {
			return true
		}
	}
	return false
}

func (reactionGame *ReactionGame) GetCircle() *Circle {
	min := 0
	max := len(reactionGame.CirclePositions) - 1
	randomIndex := game.RandomInteger(min, max)
	selectedCircle := reactionGame.CirclePositions[randomIndex]
	return selectedCircle
}

func (reactionGame *ReactionGame) initGame() {
	count := 0
	for {
		fmt.Println(count)
		if count > reactionGame.GameConfig.BallNumber-1 {
			break
		}
		count += 1
		circle := reactionGame.GetCircle()
		circleMessage := &CircleMessage{
			CircleInstance: circle,
		}
		reactionGame.sendToPlayers(circleMessage)
		millisecond := int(reactionGame.GameConfig.BallSpeed * 1000)
		time.Sleep(time.Duration(millisecond) * time.Millisecond)
	}
}

func (reactionGame *ReactionGame) getResult() *Player {
	winner := &Player{}
	max := -1
	id := -1
	for playerId, player := range reactionGame.Players {
		if player.Counter > max {
			max = player.Counter
			id = playerId
		}
	}
	winner = reactionGame.Players[id]
	return winner
}

func (reactionGame *ReactionGame) resetGame() {
	for _, player := range reactionGame.Players {
		player.Counter = 0
	}
	reactionGame.PlayersReady = 0
}

func (reactionGame *ReactionGame) setResult() {
	winner := reactionGame.getResult()
	resultMessage := &ResultMessage{}
	if winner != nil {
		resultMessage.ResultMessage = fmt.Sprintf("Winner player %d, with %d correct clicks", winner.PlayerId, winner.Counter)
	} else {
		resultMessage.ResultMessage = fmt.Sprintf("tie")
	}
	reactionGame.sendToPlayers(resultMessage)
}

func (reactionGame *ReactionGame) readyToPlay() {
	for {
		if reactionGame.PlayersReady == len(reactionGame.Players) {
			break
		}
	}
}

func (reactionGame *ReactionGame) writeResultToDatabase() {
	for playerId, player := range reactionGame.Players {
		result := &database.Results{
			UserId:       playerId,
			Day:          time.Now(),
			BallNumber:   reactionGame.GameConfig.BallNumber,
			BallSpeed:    reactionGame.GameConfig.BallSpeed,
			BallsClicked: player.Counter,
			GameType:     "reactiongame",
		}
		reactionGame.DbDriver.Create(result)
	}
}

func (reactionGame *ReactionGame) HandleGame() {
	fmt.Printf("%+v\n", reactionGame)
	if reactionGame.GameModality {
		// wait for players the keep going
		for len(reactionGame.Room.Players) < 2 {
			fmt.Println("room has only ")
			fmt.Println(len(reactionGame.Room.Players))
		}
	}
	reactionGame.readyToPlay()
	reactionGame.goodToPlay()
	if reactionGame.GameConfig == nil {
		panic(errors.New("not game configuration yet"))
	}
	reactionGame.sendBeforeStartSignal()
	reactionGame.initGame()
	reactionGame.setResult()
	reactionGame.finishGame()
	reactionGame.writeResultToDatabase()
	reactionGame.resetGame()
	reactionGame.HandleGame()
}

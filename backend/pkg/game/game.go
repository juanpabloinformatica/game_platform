package game

import (
	"github.com/gorilla/websocket"
)
type Player struct {
	PlayerId   int `json:"playerId"`
	Connection *websocket.Conn
}

type PlayGame struct {
	PlayerId     int  `json:"playerId"`
	GameModality bool `json:"gameModality"`
	RoomId       int  `json:"roomId"`
}
type Game struct {
	// *Room
	// GameConfig      *GameConfig
	// CirclePositions []*Circle
	// Players      map[int]*Player
	// GameModality bool
	// I should add this part
	// MissingPlayerMessage     string  `json:"missingPlayerMessage"`
	// ResultMessage            string  `json:"resultMessage"`
	// CircleInstance           *Circle `json:"circleMessage"`
	// GameFinishMessage        string  `json:"gameFinishMessage"`
	// BeforeStartSignalMessage string  `json:"beforeStartSignalMessage"`
}
type Room struct {
	roomId  int
	Players map[int]*Player
}

// func (game *Game) sendToPlayers(message interface{}) {
// 	for _, player := range game.Players {
// 		player.Connection.WriteJSON(message)
// 	}
// }
//
// func (game *Game) ShowPlayers() {
// 	for playerId, player := range game.Players {
// 		fmt.Printf("client with id: %s and connection %+v", playerId, player.Connection)
// 	}
// }

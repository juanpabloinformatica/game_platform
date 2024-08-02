package game

type MissingPlayerMessage struct {
	MissingPlayerMessage string `json:"missingPlayerMessage"`
}
type ResultMessage struct {
	ResultMessage string `json:"resultMessage"`
}
type CircleMessage struct {
	CircleInstance *Circle `json:"circleMessage"`
}
type GameFinishMessage struct {
	GameFinishMessage string `json:"gameFinishMessage"`
}
type BeforeStartSignalMessage struct {
	BeforeStartSignalMessage string `json:"beforeStartSignalMessage"`
}

type Circle struct {
	PosX     int     `json:"posX"`
	PosY     int     `json:"posY"`
	R        int     `json:"r"`
	SAngle   float32 `json:"sAngle"`
	EndAngle float32 `json:"endAngle"`
}

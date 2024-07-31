package reactionGame

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

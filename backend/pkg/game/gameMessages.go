package game

type MissingPlayerMessage struct {
	Message string `json:"message"`
}
type ResultMessage struct {
	Message string `json:"message"`
}
type CircleMessage struct {
	CircleInstance *Circle `json:"circle"`
}
type GameFinishMessage struct {
	Message string `json:"message"`
}

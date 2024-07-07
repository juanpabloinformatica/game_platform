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
type Result struct {
	Player_1 int `json:"player_1"`
	Player_2 int `json:"player_2"`
}

type Point struct {
	x int
	y int
}

var (
	WIDTH            = 500
	HEIGHT           = 500
	CIRCLE_POSITIONS []*Circle
	BALLNUMBER       = 10
)

func setCirclePositions() {
	size := WIDTH
	for y := 0; y < size/100; y += 1 {
		for x := 0; x < size/100; x += 1 {
			newCircle := &Circle{
				PosX:     x*100 + 100/2,
				PosY:     y*100 + 100/2,
				R:        100 / 2,
				SAngle:   0,
				EndAngle: 2 * math.Pi,
			}
			CIRCLE_POSITIONS = append(CIRCLE_POSITIONS, newCircle)
		}
	}
}

func GetCircle() *Circle {
	min := 0
	max := len(CIRCLE_POSITIONS) - 1
	randomIndex := randomInteger(min, max)
	selectedCircle := CIRCLE_POSITIONS[randomIndex]
	return selectedCircle
}

func Init() {
	setCirclePositions()
	// for {
	//     fmt.Println(getCircle())
	//     time.Sleep(1*time.Second)
	// }
	// for _, value := range CIRCLE_POSITIONS {
	// 	fmt.Println(value)
	// }
}

// func Run(){
//     getCircle()
// }

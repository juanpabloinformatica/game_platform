package game

import (
	"fmt"
	"math/rand"
)

func showCircles() {
	for _, value := range CIRCLE_POSITIONS {
		fmt.Println(value)
	}
}

func randomInteger(min, max int) int {
	return rand.Intn(max+1-min) + min
}

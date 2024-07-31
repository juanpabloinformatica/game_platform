package game

import (
	"math/rand"
)

func randomInteger(min, max int) int {
	return rand.Intn(max+1-min) + min
}

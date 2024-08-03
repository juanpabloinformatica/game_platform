package game

import (
	"math/rand"
)

func RandomInteger(min, max int) int {
	return rand.Intn(max+1-min) + min
}

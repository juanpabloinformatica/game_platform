package reactionGame

import (
	"fmt"
)

func showCircles(reactionGame *ReactionGame) {
	for _, value := range reactionGame.CirclePositions {
		fmt.Println(value)
	}
}

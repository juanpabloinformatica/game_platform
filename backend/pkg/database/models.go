package database

import (
	"time"
)

type Users struct {
	// gorm.Model
	Id       int    `gorm:"column:id"`
	Username string `gorm:"column:username"`
	Password string `gorm:"column:password"`
	// CreatedAt time.Time `gorm:"autoCreateTime:false"`
}

// type GamePlatformTime time.Time
var TimeFormat = "2006-01-02"

type Results struct {
	// gorm.Model
	Id     int
	UserId int   `gorm:"column:userId"`
	Users  Users `gorm:"foreignKey:UserId"`
	// Users      Users `gorm:"references:Id"`
	// Day        GamePlatformTime `gorm:"column:day"`
	Day          time.Time `sql:"type:timestamp without time zone"`
	BallNumber   int       `gorm:"column:ballNumber"`
	BallSpeed    float32       `gorm:"column:ballSpeed"`
	BallsClicked int       `gorm:"column:ballsClicked"`
	GameType     string    `gorm:"column:gameType"`
	// CreatedAt  time.Time `gorm:"autoCreateTime:false"`
}

type Tabler interface {
	TableName() string
}

// TableName overrides the table name used by User to `profiles`
func (Users) TableName() string {
	return "Users"
}

func (Results) TableName() string {
	return "Results"
}

// defining our custom time
// func (gamePlatformTime *GamePlatformTime) MarshalJSON() ([]byte, error) {
// 	tempGamePlatformTime := time.Time(*gamePlatformTime)
// 	fmt.Sprintf("\"%v\"", tempGamePlatformTime.Format("2006-01-02"))
// 	return []byte(fmt.Sprintf("%s", tempGamePlatformTime.Format("2006-01-02"))), nil
// }

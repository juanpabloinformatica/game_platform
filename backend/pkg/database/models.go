package database

import (
	"time"

	// "gorm.io/gorm"
)

type Users struct {
	// gorm.Model
	Id       int
	Username string
	Password string
	// CreatedAt time.Time `gorm:"autoCreateTime:false"`
}
type Results struct {
	// gorm.Model
	ResultId int
	UserId     int 
	Users      Users `gorm:"foreignKey:UserId"`
	// Users      Users `gorm:"references:Id"`
	Day        time.Time
    BallNumber int `json:"ballNumber"`
	BallSpeed  int
	GameType   string
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

package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDbDriver() *gorm.DB {
	// dsn := "root:root@tcp(database:3306)/gamePlatform?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := "host=database user=root password=user dbname=gamePlatform port=3306 sslmode=disable"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}

func Init() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	// dsn := "root:root@tcp(127.0.0.1:3306)/gamePlatform?charset=utf8mb4&parseTime=True&loc=Local"
	// db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// if err != nil {
	// 	panic("failed to connect database")
	// }

	// fmt.Printf("%+v\n", db.DB)
	// var user Users
	// var user1 Users
	// var user2 Users
	// var result Results
	// db.Find(&user, "id=?", 1)
	// db.Find(&user1, "id=?", 2)
	// db.Fin(&user2, "id=?", 3)
	// fmt.Printf("%+v\n", user)
	// fmt.Printf("%+v\n", user1)
	// fmt.Printf("%+v\n", user2)
	// // db.Find(&result,"ResultId=?",2)
	// // db.Preload("Users").Find(&result)
	// data := db.Find(&result)
	// fmt.Println(data.RowsAffected)
	// fmt.Printf("%+v\n", result.Day.Format(TimeFormat))
}

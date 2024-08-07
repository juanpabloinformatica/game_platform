package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Init() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:root@tcp(127.0.0.1:3306)/gamePlatform?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// fmt.Printf("%+v\n", db.DB)
	var user Users
	var result Results
	db.Find(&user, "id=?", 1)
	fmt.Printf("%+v\n", user)
	db.Find(&result,"ResultId=?",2)
	fmt.Printf("%+v\n", result)
}

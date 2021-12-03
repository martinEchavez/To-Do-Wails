package main

import (
	"database/sql"
	_ "embed"
	"encoding/json"
	"to-do-app/platform/newtask"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wailsapp/wails"
)

type Serve struct {
}

func GetDB() (db *sql.DB, task *newtask.SQLite, err error) {
	db, err = sql.Open("sqlite3", "./to-do.db")
	task = newtask.CreateTable(db)
	return
}

func (Serve) GetTask() []newtask.Task {
	_, task, _ := GetDB()
	tasks, _ := task.Get()
	return tasks
}

func (Serve) CreateTask(data string) {
	_, task, _ := GetDB()
	var new newtask.Task
	json.Unmarshal([]byte(data), &new)
	task.Add(new)
}

func (Serve) DeleteTask(id int) {
	_, task, _ := GetDB()
	task.Delete(id)
}

func (Serve) EditTask(data string) {
	_, task, _ := GetDB()
	var new newtask.Task
	json.Unmarshal([]byte(data), &new)
	task.Edit(new)
}

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

func main() {
	serve := &Serve{}
	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "TO-DO APP",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	app.Bind(serve)
	app.Run()
}

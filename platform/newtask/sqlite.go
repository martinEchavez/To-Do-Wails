package newtask

import (
	"database/sql"
)

type SQLite struct {
	DB *sql.DB
}

func (s *SQLite) Get() ([]Task, error) {
	rows, err := s.DB.Query("SELECT * FROM task")
	if err != nil {
		return nil, err
	} else {
		var tasks []Task
		for rows.Next() {
			var task Task
			rows.Scan(&task.ID, &task.Name, &task.Description, &task.Status)
			tasks = append(tasks, task)
		}
		return tasks, nil
	}
}

func (s *SQLite) Add(task Task) {
	createTask, _ := s.DB.Prepare(`INSERT INTO task (name, description, status) values (?, ?, ?)`)
	createTask.Exec(task.Name, task.Description, task.Status)
}

func (s *SQLite) Delete(id int) {
	deleteTask, _ := s.DB.Prepare(`DELETE FROM task WHERE id=?`)
	deleteTask.Exec(id)
}

func (s *SQLite) Edit(task Task) {
	updateNote, _ := s.DB.Prepare(`UPDATE task SET name=?, description=?, status=? WHERE id =?`)
	updateNote.Exec(task.Name, task.Description, task.Status, task.ID)
}

func CreateTable(conn *sql.DB) *SQLite {
	createTable, _ := conn.Prepare(`CREATE TABLE IF NOT EXISTS "task" (
    "id"	INTEGER NOT NULL UNIQUE,
    "name"	TEXT NOT NULL,
    "description"	TEXT,
		"status" INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
  )`)

	createTable.Exec()
	return &SQLite{
		DB: conn,
	}
}

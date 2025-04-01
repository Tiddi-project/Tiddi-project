create database  tiddi_db;
use tiddi_db;

-- TABLA DE TAREAS
create table tasks (
	id INT auto_increment primary key,
	-- user_id INT not null,
	title VARCHAR(255) not null default 'Sin titulo',
	description TEXT,
	complete BOOLEAN default FALSE, 
	created_t TIMESTAMP default CURRENT_TIMESTAMP,
	updated_t TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
	-- foreign key (user_id) references users(id) on delete cascade
)

-- TABLA DE USUARIOS
create table users (
	id INT auto_increment primary key,
	name varchar(100) not null,
	email varchar(100) unique not null,
	password varchar(255) not null,
	created_u TIMESTAMP default CURRENT_TIMESTAMP
);
-- añadir clave foranea en db tiddi / tasks
ALTER TABLE tasks ADD COLUMN user_id INT NOT NULL;
ALTER TABLE tasks ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


-- prioridad en la tarea
ALTER TABLE tasks ADD COLUMN priority ENUM('baja', 'media', 'alta') NOT NULL DEFAULT 'baja';

-- creacion de tabla para subtareas
CREATE TABLE subtasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);


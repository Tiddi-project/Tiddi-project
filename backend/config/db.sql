create database  tiddi_db;

use tiddi_db;

-- TABLA DE USUARIOS


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


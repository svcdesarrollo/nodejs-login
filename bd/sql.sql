CREATE DATABASE IF NOT EXISTS `ejemplo-login-api` /*!40100 COLLATE 'utf8mb4_spanish_ci' */;
USE `ejemplo-login-api`;
DROP TABLE usuarios;
CREATE TABLE usuarios
(
	id BIGINT(20) AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(120) DEFAULT NULL,
	apellidos VARCHAR(120) DEFAULT NULL,
	usuario VARCHAR(50) NOT NULL,
	email VARCHAR(120) NOT NULL,
	password VARCHAR(120) NOT NULL,
	nivelPermiso INT DEFAULT NULL,
	PRIMARY KEY(id)
);
-- INSERT INTO usuarios (nombre,apellidos,usuario,nivelPermiso,email) VALUES
-- ('Administrador del Sistema','','Administrador',5,'admin@example.com');

SELECT id,usuario,email,nombre,apellidos,password,nivelPermiso FROM usuarios ORDER BY Nombre DESC LIMIT 2 OFFSET 2
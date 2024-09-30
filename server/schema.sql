CREATE DATABASE studysync;
use studysync;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  usertype integer NOT NULL
);

INSERT INTO users (email, user, pass, usertype)
VALUES
('admin@test.com', 'admin', 'admin', 2),
('user@test.com', 'user', 'asdf', 1);


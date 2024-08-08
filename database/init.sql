

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE Results (
    resultId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    day DATE NOT NULL,
    ballNumber INT NOT NULL,
    ballSpeed INT NOT NULL,
    ballsClicked INT NOT NULL,
    gameType VARCHAR(255) NOT NULL, 
    FOREIGN KEY (userId) REFERENCES Users(id)
);

INSERT INTO Users (username,password) VALUES ('juanpablo', 'PradaMejia');
INSERT INTO Users (username,password) VALUES ('miguel', 'quintero');
INSERT INTO Users (username,password) VALUES ('carlos', 'gomelo');
INSERT INTO Results (userId,day,ballNumber,ballSpeed,ballsClicked,gameType) VALUES (1,'2024-08-07',10,1,5,'reactiongame');
INSERT INTO Results (userId,day,ballNumber,ballSpeed,ballsClicked,gameType) VALUES (1,'2024-08-07',20,1,7,'reactiongame');
--
-- base_container  | 2024-08-08 14:15:37+00:00 [Note] [Entrypoint]: /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/init.sql
-- database_container  | ERROR 1364 (HY000) at line 22: Field 'ballsClicked' doesn't have a default value


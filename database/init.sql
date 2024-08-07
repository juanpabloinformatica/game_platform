

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
    gameType VARCHAR(255) NOT NULL, 
    FOREIGN KEY (userId) REFERENCES Users(id)
);

INSERT INTO Users (username,password) VALUES ('juanpablo', 'PradaMejia');
INSERT INTO Results (userId,day,ballNumber,ballSpeed,gameType) VALUES (1,'2024-08-07',10,1,'reactiongame')

-- base_container  | ERROR 1064 (42000) at line 8: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'INSERT INTO Users (username,password) VALUES ('juanpablo', 'PradaMejia')' at line 11
-- '

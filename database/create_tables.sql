CREATE TABLE IF NOT EXISTS Users (
  user_id UUID PRIMARY KEY,
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  age INT,
  gender CHAR(1),
  strikes INT
); 

CREATE TABLE IF NOT EXISTS Events (
    event_id UUID PRIMARY KEY,
    name VARCHAR(128),
    location VARCHAR(128),
    event_time TIMESTAMP,
    curr_capacity INT,
    max_capacity INT,
    owner_id UUID,
    category VARCHAR(64),
    description VARCHAR(256),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Attending (
    event_id UUID,
    user_id UUID,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS CheckIn (
    event_id UUID,
    user_id UUID,
    check_in_time TIMESTAMP,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS BanList (
    event_id UUID,
    user_id UUID,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


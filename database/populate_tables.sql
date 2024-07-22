COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'C:\dev\348-copy\sample_data\users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, city, address, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'C:\dev\348-copy\sample_data\events.txt'
    DELIMITER ','
    HEADER;

COPY Attending (event_id, user_id)
    FROM 'C:\dev\348-copy\sample_data\attendees.txt'
    DELIMITER ','
    HEADER;

COPY CheckIn (event_id, user_id)
    FROM 'C:\dev\348-copy\sample_data\check-in.txt'
    DELIMITER ','
    HEADER;

COPY BanList (user_id)
    FROM 'C:\dev\348-copy\sample_data\banlist.txt'
    DELIMITER ','
    HEADER;

COPY Credentials(username, password, user_id)
    FROM 'C:\dev\348-copy\sample_data\credentials.txt'
    DELIMITER ','
    HEADER;
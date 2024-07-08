COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'local/path/to/users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, city, address, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'local/path/to/events.txt'
    DELIMITER ','
    HEADER;

COPY Attending (event_id, user_id)
    FROM 'local/path/to/attendees.txt'
    DELIMITER ','
    HEADER;

COPY CheckIn (event_id, user_id)
    FROM 'local/path/to/check-in.txt'
    DELIMITER ','
    HEADER;

COPY BanList (user_id)
    FROM 'local/path/to/banlist.txt'
    DELIMITER ','
    HEADER;
COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'Local path of users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, location, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'Local path of events.txt'
    DELIMITER ','
    HEADER;

COPY Attending (event_id, user_id)
    FROM 'Local path of attendees.txt'
    DELIMITER ','
    HEADER;

COPY CheckIn (event_id, user_id)
    FROM 'Local path of check_in.txt'
    DELIMITER ','
    HEADER;

COPY BanList (user_id)
    FROM 'Local path of banlist.txt'
    DELIMITER ','
    HEADER;
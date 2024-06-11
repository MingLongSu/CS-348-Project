COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'Absolute path to user.txt on your local machine'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, location, event_time, curr_capacity, max_capacity, owner_id, category, description)
    FROM 'Absolute path to events.txt on your local machine'
    DELIMITER ','
    HEADER;
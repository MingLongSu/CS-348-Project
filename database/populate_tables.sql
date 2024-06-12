COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'Add absolute path of users.txt on your machine'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, location, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'Add absolute path of events.txt on your machine'
    DELIMITER ','
    HEADER;
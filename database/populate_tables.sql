COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'C:\dev\CS-348-Project\sample_data\users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, location, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'C:\dev\CS-348-Project\sample_data\events.txt'
    DELIMITER ','
    HEADER;
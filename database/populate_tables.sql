COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'C:\Users\bw09\Dropbox\PC\Desktop\YEAR 3\CS348\Project\CS-348-Project\sample_data\users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, location, event_time, curr_capacity, max_capacity, owner_id, category, description)
    FROM 'C:\Users\bw09\Dropbox\PC\Desktop\YEAR 3\CS348\Project\CS-348-Project\sample_data\events.txt'
    DELIMITER ','
    HEADER;
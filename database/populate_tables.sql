COPY Users (user_id, first_name, last_name, age, gender, strikes)
    FROM 'M:\School\Spring_2024\CS 348\group_project\CS-348-Project\prod_data\users.txt'
    DELIMITER ','
    HEADER;

COPY Events (event_id, name, city, address, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active)
    FROM 'M:\School\Spring_2024\CS 348\group_project\CS-348-Project\prod_data\events.txt'
    DELIMITER ','
    HEADER;

COPY Attending (event_id, user_id)
    FROM 'M:\School\Spring_2024\CS 348\group_project\CS-348-Project\prod_data\attendees.txt'
    DELIMITER ','
    HEADER;

COPY CheckIn (event_id, user_id)
    FROM 'M:\School\Spring_2024\CS 348\group_project\CS-348-Project\prod_data\check-in.txt'
    DELIMITER ','
    HEADER;

COPY BanList (user_id)
    FROM 'M:\School\Spring_2024\CS 348\group_project\CS-348-Project\prod_data\banlist.txt'
    DELIMITER ','
    HEADER;
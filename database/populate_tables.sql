\copy Users (user_id, first_name, last_name, age, gender, strikes) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/users.txt' DELIMITER ',' CSV HEADER;

\copy Events (event_id, name, city, address, start_time, end_time, curr_capacity, max_capacity, owner_id, category, description, active) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/events.txt' DELIMITER ',' CSV HEADER;

\copy Attending (event_id, user_id) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/attendees.txt' DELIMITER ',' CSV HEADER;

\copy CheckIn (event_id, user_id) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/check-in.txt' DELIMITER ',' CSV HEADER;

\copy BanList (user_id) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/banlist.txt' DELIMITER ',' CSV HEADER;

\copy Credentials (username, password, user_id) FROM '/Users/ernestwong/Documents/CS-348-Project/sample_data/credentials.txt' DELIMITER ',' CSV HEADER;
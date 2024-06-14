-- 2. list all events created by a specific user 

SELECT 
	event_id, 
	name,
	location, 
	start_time, 
	end_time,
	curr_capacity, 
	max_capacity, 
	category, 
	owner_id, 
	description
FROM Events e
WHERE e.owner_id = 'b815b2f7-e4df-425d-ab49-bac3c8cdee88'
;

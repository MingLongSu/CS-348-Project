-- 3. search events by category 

SELECT
	name,
	event_id,
	owner_id, 
	location, 
	start_time, 
	end_time, 
	curr_capacity, 
	max_capacity, 
	description,
	category
FROM Events 
WHERE category = __EVENT_ID__
;

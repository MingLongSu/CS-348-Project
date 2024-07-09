-- 4. see all users attending an event

SELECT 
	first_name,
	last_name
FROM Users u
LEFT JOIN Attending a
ON u.user_id = a.user_id
LEFT JOIN Events e
ON a.event_id = e.event_id
WHERE e.event_id = '704ba16d-507b-4f96-a0ec-2a08146910a0'
;


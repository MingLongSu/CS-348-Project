-- 4. see all users attending an event

SELECT 
	first_name,
	last_name
FROM Users u
LEFT JOIN Attending a
ON u.user_id = a.user_id
LEFT JOIN Events e
ON a.event_id = e.event_id
WHERE e.event_id = '40b1ead1-f086-4be4-a6b3-d54d0803898e'
;

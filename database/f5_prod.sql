-- 5. Owner can delete user from any of their events

DELETE FROM Attending
WHERE event_id IN (
    SELECT e.event_id
    FROM Events e
    WHERE e.owner_id = 'a7877f5a-c7a4-489d-a8a2-e15f9c4604b9'
    AND NOW() < e.start_time
) AND user_id = 'a7877f5a-c7a4-489d-a8a2-e15f9c4604b9';

SELECT 
    *
FROM Attending;

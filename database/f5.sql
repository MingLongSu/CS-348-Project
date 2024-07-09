-- 5. Owner can delete user from any of their events

DELETE FROM Attending
WHERE event_id IN (
    SELECT e.event_id
    FROM Events e
    WHERE e.owner_id = '9b5ee7b9-7ca4-4a51-b22b-e4b933a3fe2b'
    AND NOW() < e.start_time
) AND user_id = '9b5ee7b9-7ca4-4a51-b22b-e4b933a3fe2b';


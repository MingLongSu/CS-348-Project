CREATE OR REPLACE FUNCTION update_strikes_on_event_end()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.active = false THEN
        UPDATE Users u
        SET strikes = strikes + 1
        FROM Attending a
        WHERE u.user_id = a.user_id
        AND a.event_id = NEW.event_id
        AND NOT EXISTS (
            SELECT 1 FROM CheckIn c
            WHERE c.user_id = a.user_id AND c.event_id = a.event_id
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER event_end_strike_trigger
AFTER UPDATE OF active ON Events
FOR EACH ROW
WHEN (OLD.active = true AND NEW.active = false)
EXECUTE FUNCTION update_strikes_on_event_end();
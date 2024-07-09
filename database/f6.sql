-- 6. Trigger that adds users to BanList, and removes from Attending/CheckIn tables if they get 3 strikes

-- Step 1: Create the function
CREATE OR REPLACE FUNCTION user_strikes_update_function()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.strikes = 3 THEN
        -- Insert into BanList
        INSERT INTO BanList (user_id)
        VALUES (NEW.user_id);
        
        -- Delete from Attending
        DELETE FROM Attending
        WHERE user_id = NEW.user_id;
        
        -- Delete from CheckIn
        DELETE FROM CheckIn
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
CREATE TRIGGER user_strikes_update
AFTER UPDATE ON Users
FOR EACH ROW
WHEN (NEW.strikes = 3)
EXECUTE FUNCTION user_strikes_update_function();

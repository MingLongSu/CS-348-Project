-- Step 1: Create the Trigger Function
CREATE OR REPLACE FUNCTION decrement_event_curr_capacity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the curr_capacity in the Events table
  UPDATE Events
  SET curr_capacity = curr_capacity - 1
  WHERE event_id = OLD.event_id;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the Trigger
CREATE TRIGGER trg_decrement_event_curr_capacity
AFTER DELETE ON Attending
FOR EACH ROW
EXECUTE FUNCTION decrement_event_curr_capacity();

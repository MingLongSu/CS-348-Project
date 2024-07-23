-- Step 1: Create the Trigger Function
CREATE OR REPLACE FUNCTION update_event_curr_capacity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the curr_capacity in the Events table
  UPDATE Events
  SET curr_capacity = curr_capacity + 1
  WHERE event_id = NEW.event_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the Trigger
CREATE TRIGGER trg_update_event_curr_capacity
AFTER INSERT ON Attending
FOR EACH ROW
EXECUTE FUNCTION update_event_curr_capacity();
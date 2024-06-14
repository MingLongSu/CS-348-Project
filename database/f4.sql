-- 4. trigger (better to not be a trigger) that flushes active tag 

UPDATE Events
    SET active = FALSE
WHERE active = TRUE AND end_time < NOW()

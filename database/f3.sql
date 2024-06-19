-- 3. Updates active field to false once end_time has passed

UPDATE Events 
	SET active = FALSE
  	WHERE active = TRUE AND end_time < NOW();

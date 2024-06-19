-- 1. Insert newly created event into Events Table

    INSERT INTO events (
        event_id,
        name,
        location,
        curr_capacity,
        max_capacity,
        owner_id,
        category,
        description,
        start_time,
        end_time,
        active
    ) VALUES (
        '8dcd3c5f-0e37-4269-a648-b00c262db04d','Bar meetup','Toronto',0,100,'5c44446c-a1c8-4158-b55c-12c4526b7434','Adult','Fun times','2024-08-15 00:34:25','2024-08-15 03:18:03',True
    );


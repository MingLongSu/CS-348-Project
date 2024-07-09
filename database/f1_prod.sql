-- 1. Insert newly created event into Events Table

    INSERT INTO events (
        event_id,
        name,
        city,
        address,
        curr_capacity,
        max_capacity,
        owner_id,
        category,
        description,
        start_time,
        end_time,
        active
    ) VALUES (
        '8dcd3c5f-0e37-4269-a648-b00c262db04d','Bar meetup','Toronto','444 hello drive',0,100,'29a6cd80-abaf-4964-a787-d05e245081b4','Adult','Fun times','2024-08-15 00:34:25','2024-08-15 03:18:03',True
    );

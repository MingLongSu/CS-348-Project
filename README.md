# 🕺 CS-348-Project

## Database Setup Instructions
1. Install postgreSQL 16.3 using the following link 'https://www.enterprisedb.com/downloads/postgres-postgresql-downloads'
2. You will be asked during installation to specify the port, use 5432 (Should be the default that is listed on the installer)
3. Add bin directory from postgreSQL to your PATH environment variable
4. In your terminal, run 'createdb -U postgres NAME_OF_YOUR_DB'
5. Run 'psql -U postgres -d NAME_OF_YOUR_DB -f .\database\create_tables.sql'
6. Run 'psql -U postgres -d NAME_OF_YOUR_DB -f .\database\populate_tables.sql'
7. Run 'psql -U postgres -d NAME_OF_YOUR_DB' to connect to your local DB. Check that your DB was populated properly by running 'SELECT * Users'

## Next.js
1. Install Next.js from https://nextjs.org/docs/getting-started/installation
2. Change the db connection options in CS-348-Project/cs-348-project/.env
3. Install required dependancies using npm install
4. Navigate to the "cs-348-project" directory
5. Use npm run dev to run the project locally

## Production Data
To generate production data for the application, use the prod_generate_data.py file found in the prod_data folder. The data can then be loaded into the database using the populate_tables.sql script mentionned in the Database Setup Instructions.

**NOTE: PRODUCTION DATA HAS ALREADY BEEN GENERATED AND CAN BE FOUND IN THE SAME FOLDER. GENERATION IS NOT REQUIRED**

## Features Implemented
1. Create Event Feature 
    Files: \cs-348-project\src\app\events\create\page.tsx
           \cs-348-project\src\app\lib\events\createEvent.ts
           \cs-348-project\src\app\lib\events\event.ts
2. Display All Events Feature ()
    Files: \cs-348-project\src\app\lib\events\listEvent.ts
           \cs-348-project\src\app\events\page.tsx
           \cs-348-project\src\app\lib\events\event.ts
3. Update active tag on events ()
    Files: \cs-348-project\src\app\lib\events\updateEventStatus.ts
           \cs-348-project\src\app\events\page.tsx
           \cs-348-project\src\app\lib\events\event.ts
4. List User details for those that have signed up to a particular event ()
    Files: \cs-348-project\src\app\lib\users\user.ts
           \cs-348-project\src\app\lib\events\getAttendees.ts
           \cs-348-project\src\app\events\EventDetailsModal.tsx

## Additional Setup Notes
1. DO NOT REGENERATE OUR SAMPLE DATA OR THE SAMPLE TESTS AND EXPECTED OUTPUT WILL BE DIFFERENT THAN WHAT WE HAVE WRITTEN OUT
2. DO NOT REGENERATE OUR PRODUCTION DATA OR THE PRODUCTION TESTS AND EXPECTED OUTPUT WILL BE DIFFERENT THAN WHAT WE HAVE WRITTEN OUT
3. Ensure to change certain details in the .env file and populate_tables.sql
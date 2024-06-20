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

## Additional Setup Notes
1. DO NOT REGENERATE OUR SAMPLE DATA OR THE SAMPLE TESTS AND EXPECTED OUTPUT WILL BE DIFFERENT THAN WHAT WE HAVE WRITTEN OUT
2. Ensure to change certain details in the .env file and populate_tables.sql
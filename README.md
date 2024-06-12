# 🕺 CS-348-Project

## Database Setup Instructions
1. Install postgreSQL 16.3 using the following link 'https://www.enterprisedb.com/downloads/postgres-postgresql-downloads'
2. Add bin directory from postgreSQL to your PATH environment variable
3. In your terminal, run 'createdb -U postgres NAME_OF_YOUR_DB'
4. Run 'psql -U postgres -d NAME_OF_YOUR_DB -f .\database\create_tables.sql'
5. Run 'psql -U postgres -d NAME_OF_YOUR_DB -f .\database\populate_tables.sql'
6. Run 'psql -U postgres -d NAME_OF_YOUR_DB' to connect to your local DB. Check that your DB was populated properly by running 'SELECT * Users'
7. If you want to create different sample data for the tables, run 'python .\generate_data.py'
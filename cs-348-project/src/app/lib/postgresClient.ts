import { connect } from 'ts-postgres';
require('dotenv').config();
async function getPostgresClient() {

    return connect({
        "host":process.env.DB_HOST,
        "port":Number(process.env.DB_PORT),
        "user":process.env.DB_USER,
        "database":process.env.DB_NAME,
        "password": process.env.DB_PASSWORD
    })
}

export default getPostgresClient;
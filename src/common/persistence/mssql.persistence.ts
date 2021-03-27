import { ConnectionPool, config } from 'mssql';

let conf: config = {
    server: process.env.DB_MSSQL_SERVER as string,
    database: process.env.DB_MSSQL_DATABASE as string,
    user: process.env.DB_MSSQL_USER as string,
    password: process.env.DB_MSSQL_PASSWORD as string,
    options: {
        enableArithAbort: true
    }
};

export default new ConnectionPool(conf).connect();
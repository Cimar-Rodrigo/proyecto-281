import { createPool } from "mysql2";

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    port: 3306,
});


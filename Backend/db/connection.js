import pkg from "pg"; 
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres", 
  database: "likeMe",
  password: "1107",
  port: 5432,
  allowExitOnIdle: true,
});

export { pool as Pool };
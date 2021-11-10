// Update with your config settings.
require('dotenv').config();
module.exports = {
    client: 'mysql2',
    connection: {
      
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASS,
      database : process.env.MYSQL_DB,
      // uncomment below when deploying to app engine
      // socketPath : process.env.MYSQL_HOST,
      host : process.env.MYSQL_HOST
    },
    pool: {
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 1000,
      idleTimeoutMillis: 10000,
      min: 0,
      max: 10
    },
    // connectionTimeout: 15000,
    
};

const { Pool } = require('pg');

const pool = new Pool({ 
	user: 'postgres',
	host: 'localhost',
	database: 'gigsdb',
	port: 5432
});

module.exports = pool;

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: {
//     minVersion: 'TLSv1.2',
//     rejectUnauthorized: false
//   }
// });

// module.exports = pool;

const mysql = require('mysql2/promise');
require('dotenv').config();

console.log("--- INICIANDO DIAGNÓSTICO DE CONEXÃO ---");
console.log("Host encontrado?:", process.env.DB_HOST ? "✅ SIM" : "❌ NÃO (O arquivo .env não foi lido)");
console.log("Banco alvo:", process.env.DB_DATABASE || "❌ NÃO DEFINIDO");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  }
});

// Força uma tentativa de conexão imediata para pegar o erro
pool.getConnection()
  .then(conn => {
    console.log("✅ SUCESSO: Conectado ao TiDB perfeitamente!");
    conn.release();
  })
  .catch(err => {
    console.log("❌ FALHA NA CONEXÃO. Motivo:");
    console.log(err.message);
    
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log("👉 DICA: O banco de dados 'mapjourney' ainda não existe no TiDB. Vá no painel do TiDB (Chat2Query) e rode: CREATE DATABASE mapjourney;");
    } else if (err.code === 'ENOTFOUND') {
      console.log("👉 DICA: O Node não achou o arquivo .env ou o Host está digitado errado.");
    }
  });

module.exports = pool;
const mysql = require("mysql");

// Konfigurasi koneksi ke MySQL
const db = mysql.createConnection({
  host: "localhost", // Ganti dengan host database Anda
  user: "root", // Ganti dengan username database Anda
  password: "", // Ganti dengan password database Anda
  database: "db_cek_app", // Nama database
});

// Membuka koneksi
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = db;

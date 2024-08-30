const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Đường dẫn tới file cơ sở dữ liệu SQLite
const dbPath = path.resolve(__dirname, 'config.db');

// Tạo kết nối tới SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Lỗi khi mở cơ sở dữ liệu:', err.message);
    } else {
        console.log('Đã kết nối đến SQLite database.');
    }
});

// Tạo bảng `configs` nếu chưa tồn tại
db.run(`
    CREATE TABLE IF NOT EXISTS configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        config_name TEXT NOT NULL,
        config_value TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Lỗi khi tạo bảng:', err.message);
    } else {
        console.log('Bảng `configs` đã được tạo hoặc đã tồn tại.');
    }
});

// Xóa bảng `configs`
// db.run('DROP TABLE IF EXISTS configs', (err) => {
//     if (err) {
//         console.error('Lỗi khi xóa bảng:', err.message);
//     } else {
//         console.log('Bảng `configs` đã bị xóa.');
//     }
// });

module.exports = db;

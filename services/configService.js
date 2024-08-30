const db = require('../config/db');

const getConfigs = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM configs', [], (err, rows) => {
            if (err) {
                reject({ success: false, message: 'Lỗi khi lấy cấu hình', error: err.message });
            } else {
                resolve({ success: true, data: rows });
            }
        });
    });
};

const getConfigById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM configs WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject({ success: false, message: `Lỗi khi lấy cấu hình với ID ${id}`, error: err.message });
            } else if (!row) {
                reject({ success: false, message: `Không tìm thấy cấu hình với ID ${id}` });
            } else {
                resolve({ success: true, data: row });
            }
        });
    });
};

const insertConfig = (newConfig) => {
    return new Promise((resolve, reject) => {
        const {  config_name, config_value } = newConfig;
        db.run(
            'INSERT INTO configs ( config_name, config_value) VALUES (?, ?)',
            [ config_name, config_value],
            function(err) {
                if (err) {
                    reject({ success: false, message: 'Lỗi khi chèn cấu hình mới', error: err.message });
                } else {
                    resolve({ success: true, data: { id: this.lastID, config_name, config_value } });
                }
            }
        );
    });
};

const updateConfig = (id, updatedConfig) => {
    return new Promise((resolve, reject) => {
        const { config_name, config_value } = updatedConfig;

        // Chuẩn bị mảng cho các phần của câu SQL cần cập nhật
        const updates = [];
        const params = [];

        if (config_name) {
            updates.push('config_name = ?');
            params.push(config_name);
        }

        if (config_value) {
            updates.push('config_value = ?');
            params.push(config_value);
        }

        // Thêm ID vào mảng params cho điều kiện WHERE
        params.push(id);

        if (updates.length === 0) {
            return reject({ success: false, message: 'Không có dữ liệu nào để cập nhật' });
        }

        const sql = `UPDATE configs SET ${updates.join(', ')} WHERE id = ?`;

        db.run(sql, params, function(err) {
            if (err) {
                reject({ success: false, message: `Lỗi khi cập nhật cấu hình với ID ${id}`, error: err.message });
            } else if (this.changes === 0) {
                reject({ success: false, message: `Không tìm thấy cấu hình với ID ${id}` });
            } else {
                resolve({ success: true, data: { id, config_name, config_value } });
            }
        });
    });
};


const deleteConfig = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM configs WHERE id = ?', [id], function(err) {
            if (err) {
                reject({ success: false, message: `Lỗi khi xóa cấu hình với ID ${id}`, error: err.message });
            } else if (this.changes === 0) {
                reject({ success: false, message: `Không tìm thấy cấu hình với ID ${id}` });
            } else {
                resolve({ success: true, message: 'Cấu hình đã bị xóa', data: { id } });
            }
        });
    });
};

const deleteAllConfigs = () => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM configs', function(err) {
            if (err) {
                reject({ success: false, message: 'Lỗi khi xóa tất cả cấu hình', error: err.message });
            } else {
                resolve({ success: true, message: 'Tất cả cấu hình đã bị xóa' });
            }
        });
    });
};

module.exports = {
    getConfigs,
    getConfigById,
    insertConfig,
    updateConfig,
    deleteConfig,
    deleteAllConfigs
};

const configService = require('../services/configService');
const io = require('../server');
const socketService = require('../services/socketService');

const getAllConfigs = async (req, res) => {
    try {
        const result = await configService.getConfigs();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getConfig = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await configService.getConfigById(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const createConfig = async (req, res) => {
    try {
       
        const result = await configService.insertConfig(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateConfig = async (req, res) => {
    try {
        const configArray = req.body; // Mảng cấu hình được gửi từ client

        const updatePromises = configArray.map((config) => {
            const updateData = {};

            // Nếu có `config_name`, thêm nó vào dữ liệu cập nhật
            if (config.config_name) {
                updateData.config_name = config.config_name;
            }

            // Nếu có `config_value`, thêm nó vào dữ liệu cập nhật
            if (config.config_value) {
                updateData.config_value = config.config_value;
            }

            return configService.updateConfig(config.id, updateData);
        });

        // Chờ tất cả các cập nhật hoàn thành
        await Promise.all(updatePromises);

        // Phát event thông báo config đã thay đổi sau khi cập nhật thành công
        socketService.emitConfigUpdated(configArray);

        res.json({ success: true, message: 'Tất cả cấu hình đã được cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteConfig = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await configService.deleteConfig(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteAllConfigs = async (req, res) => {
    try {
        const result = await configService.deleteAllConfigs();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    getAllConfigs,
    getConfig,
    createConfig,
    updateConfig,
    deleteConfig,
    deleteAllConfigs
};

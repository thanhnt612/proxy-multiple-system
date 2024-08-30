const express = require('express');
const configController = require('../controllers/configController');
const router = express.Router();

router.get('/', configController.getAllConfigs);
router.get('/:id', configController.getConfig);
router.post('/', configController.createConfig);
router.put('/', configController.updateConfig);
router.delete('/:id', configController.deleteConfig);
router.delete('/', configController.deleteAllConfigs);

module.exports = router;

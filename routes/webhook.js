const express = require('express');
const webhookController = require('../controllers/webhookController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get("/", (req,res) => {
  res.json({message:"Welcome to Muha Server"})
})
router.post('/webhook-endpoint', webhookController.handleWebhook);
router.post('/woocommerce_new_order', orderController.handleNewOrder);

module.exports = router;

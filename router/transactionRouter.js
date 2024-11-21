const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

// POST /api/transactions/ - Create a new transaction
router.post('/transactions', transactionController.createTransaction);

// GET /api/transactions/ - Retrieve all transactions for a specific user
router.get('/transactions', transactionController.getTransactionsByUser);

// PUT /api/transactions/:transaction_id - Update the status of an existing transaction
router.put('/transactions/:transaction_id', transactionController.updateTransactionStatus);

// GET /api/transactions/:transaction_id - Retrieve the details of a specific transaction
router.get('/transactions/:transaction_id', transactionController.getTransactionById);

module.exports = router;

const Transaction = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, transaction_type, user } = req.body;

    if (!amount || !transaction_type || !user) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTransaction = new Transaction({
        amount: mongoose.Types.Decimal128.fromString(amount), // Correct usage of mongoose
        transaction_type,
        user,
      });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Error creating transaction.', details: error.message });
  }
};

// Retrieve all transactions for a specific user
exports.getTransactionsByUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const transactions = await Transaction.find({ user: user_id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions.' });
  }
};

// Update the status of an existing transaction
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;

    if (!['COMPLETED', 'FAILED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    transaction.status = status;
    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error updating transaction status.' });
  }
};

// Retrieve the details of a specific transaction
exports.getTransactionById = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transaction.' });
  }
};

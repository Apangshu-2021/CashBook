import express from 'express'
import Transaction from '../models/Transaction.js'
const router = express.Router()
import moment from 'moment'

// For posting/creating/saving a new transaction
router.post('/add-transaction', async (req, res) => {
  try {
    const newtransaction = new Transaction(req.body)
    await newtransaction.save()

    res.send('Transaction Added successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

// For editing a transaction
router.post('/edit-transaction', async (req, res) => {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    )
    res.send('Transaction Updated successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

// For getting all the transactions.
router.post('/get-all-transactions', async (req, res) => {
  try {
    const { frequency, type } = req.body
    let { selectedRange } = req.body
    selectedRange =
      frequency === 'custom' && selectedRange === null ? [] : selectedRange

    const transactions = await Transaction.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== 'all' && { type }),
    })

    res.json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

// For deleting a transaction
router.post('/delete-transaction', async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId })
    res.send('Transaction Deleted successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router

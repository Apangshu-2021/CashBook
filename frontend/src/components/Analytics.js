import { Progress } from 'antd'
import React from 'react'
import '../resources/analytics.css'

const Analytics = ({ transactions }) => {
  let totalTransactions = transactions.length
  let totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income'
  )
  let totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  )
  let totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100

  let totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100
  let totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  )
  let totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
  let totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
  let totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100
  let totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100
  let categories = [
    'salary',
    'self-employment',
    'investment',
    'food',
    'entertainment',
    'travel',
    'education',
    'medical',
    'tax',
  ]

  totalIncomeTransactionsPercentage = Number.isNaN(
    totalIncomeTransactionsPercentage
  )
    ? 0
    : totalIncomeTransactionsPercentage

  totalExpenseTransactionsPercentage = Number.isNaN(
    totalExpenseTransactionsPercentage
  )
    ? 0
    : totalExpenseTransactionsPercentage

  totalIncomeTurnoverPercentage = Number.isNaN(totalIncomeTurnoverPercentage)
    ? 0
    : totalIncomeTurnoverPercentage

  totalExpenseTurnoverPercentage = Number.isNaN(totalExpenseTurnoverPercentage)
    ? 0
    : totalExpenseTurnoverPercentage

  return (
    <div className='analytics'>
      {/* Total Transactions and Total Turnover */}
      <div className='row mt-3'>
        <div className='col-md-4'>
          <div className='transactions-count'>
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expense : {totalExpenseTransactions.length}</h5>

            <div className='progress-bars'>
              <Progress
                className='mx-5'
                type='circle'
                strokeColor='green'
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />

              <Progress
                type='circle'
                strokeColor='red'
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='transactions-count'>
            <h4>Total Turnover : {totalTurnover}</h4>
            <hr />
            <h5>Income : {totalIncomeTurnover}</h5>
            <h5>Expense : {totalExpenseTurnover}</h5>

            <div className='progress-bars'>
              <Progress
                className='mx-5'
                type='circle'
                strokeColor='green'
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />

              <Progress
                type='circle'
                strokeColor='red'
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Category-wise income and expense */}
      <div className='row mt-3'>
        <div className='col-md-6'>
          <div className='income-category-analysis'>
            <h4>Income - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter(
                  (transaction) =>
                    transaction.type === 'income' &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0)

              return (
                amount > 0 && (
                  <div className='category-card' key={category}>
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              )
            })}
          </div>
        </div>

        <div className='col-md-6'>
          <div className='expense-category-analysis'>
            <h4>Expense - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter(
                  (transaction) =>
                    transaction.type === 'expense' &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0)

              return (
                amount > 0 && (
                  <div className='category-card' key={category}>
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

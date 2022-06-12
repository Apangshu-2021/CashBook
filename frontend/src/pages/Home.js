import { DatePicker, message, Select, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AddEditTransactions from '../components/AddEditTransactions'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import '../resources/transaction.css'
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import Analytics from '../components/Analytics'

const Home = () => {
  const [showAndEditTransactionModal, setShowAndEditTransactionModal] =
    useState(false)
  const host = 'http://localhost:5000'
  const [loading, setLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])
  const [frequency, setFrequency] = useState('7')
  const { RangePicker } = DatePicker
  const [selectedRange, setSelectedRange] = useState([])
  const [type, setType] = useState('all')
  const [viewType, setViewType] = useState('table')
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)

  // Replacing the tag '_id' with 'key' otherwise it gives error
  const renameKey = (transactions) => {
    transactions = transactions.map(function (obj) {
      obj['key'] = obj['_id']
      delete obj['_id']
      return obj
    })
  }
  // Request for getting all the transactions.Here we're fetching the transactions of a user via the user id.So we're passing the same in the axios request.We can get the user's credentials from localStorage.
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('Cashbook-User'))
      setLoading(true)
      const response = await axios.post(
        `${host}/api/transactions/get-all-transactions`,
        {
          userid: user._id,
          frequency,
          ...(frequency === 'custom' && { selectedRange }),
          type,
        }
      )
      renameKey(response.data)
      setTransactionsData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  // Request for deleting the user's transaction with the help of transaction id.
  const deleteTransactions = async (record) => {
    try {
      setLoading(true)
      await axios.post(`${host}/api/transactions/delete-transaction`, {
        transactionId: record.key,
      })
      message.success('Transaction deleted successfully')
      getTransactions()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record)
                setShowAndEditTransactionModal(true)
              }}
            />
            <DeleteOutlined
              className='mx-3'
              onClick={() => deleteTransactions(record)}
            />
          </div>
        )
      },
    },
  ]

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      {/* Whatever is written in defaultlayout component will be passed as props it and will be put in the 
    'content' sub-component through props.children */}
      {/* For the filters and Add new */}
      <div className='filter d-flex justify-content-between align-items-center'>
        {/* For the filters */}
        <div className='d-flex'>
          {/* For Selecting the date range */}
          <div className='d-flex flex-column'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>

            {frequency === 'custom' && (
              <div className='mt-2'>
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => {
                    setSelectedRange(values)
                  }}
                ></RangePicker>
              </div>
            )}
          </div>

          {/* For Selecting the type of expense */}
          <div className='d-flex flex-column mx-5'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </div>
        </div>

        {/* For Add New */}
        <div className='d-flex'>
          <div>
            <div className='view-switch mx-3'>
              <UnorderedListOutlined
                className={`mx-2 ${
                  viewType === 'table' ? 'active-icon' : 'inactive-icon'
                }`}
                onClick={() => setViewType('table')}
              />
              <AreaChartOutlined
                className={`mx-2 ${
                  viewType === 'analytics' ? 'active-icon' : 'inactive-icon'
                }`}
                onClick={() => setViewType('analytics')}
              />
            </div>
          </div>
          <button
            className='transaction-primary'
            onClick={() => {
              setShowAndEditTransactionModal(true)
            }}
          >
            ADD NEW
          </button>
        </div>
      </div>

      {/* For the transaction table and analytics page*/}
      <div className='table-analytics'>
        {viewType === 'table' ? (
          <div className='table'>
            <Table dataSource={transactionsData} columns={columns} />;
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>

      {showAndEditTransactionModal && (
        <AddEditTransactions
          showAndEditTransactionModal={showAndEditTransactionModal}
          setShowAndEditTransactionModal={setShowAndEditTransactionModal}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
          selectedItemForEdit={selectedItemForEdit}
        />
      )}
    </DefaultLayout>
  )
}

export default Home

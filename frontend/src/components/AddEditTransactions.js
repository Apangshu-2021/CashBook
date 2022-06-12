import React, { useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios'
import Spinner from './Spinner'

const AddEditTransactions = (props) => {
  const {
    showAndEditTransactionModal,
    setShowAndEditTransactionModal,
    getTransactions,
    selectedItemForEdit,
    setSelectedItemForEdit,
  } = props
  
  const host =
  process.env.NODE_ENV === 'production'
    ? 'https://cashbook19765.herokuapp.com'
    : 'http://localhost:5000'
  
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('Cashbook-User'))
      setLoading(true)

      if (selectedItemForEdit) {
        await axios.post(`${host}/api/transactions/edit-transaction`, {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: selectedItemForEdit.key,
        })

        message.success('Transaction updated successfully')
      } else {
        await axios.post(`${host}/api/transactions/add-transaction`, {
          ...values,
          userid: user._id,
        })

        message.success('Transaction added successfully')
      }
      getTransactions()
      // If a transaction is added successfully then we are going to call the getTransactions() function which will fetch all the transactions from the backend.
      setLoading(false)
      setSelectedItemForEdit(null)
      setShowAndEditTransactionModal(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  return (
    <div>
      <Modal
        title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
        visible={showAndEditTransactionModal}
        onCancel={() => {
          setShowAndEditTransactionModal(false)
        }}
        footer={false}
      >
        {loading && <Spinner />}
        <Form
          layout='vertical'
          className='transaction-form'
          onFinish={onFinish}
          initialValues={selectedItemForEdit}
        >
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>

          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='self-employment'>
                Self-employment
              </Select.Option>
              <Select.Option value='investment'>Investment</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='entertainment'>Entertainment</Select.Option>
              <Select.Option value='travel'>Travel</Select.Option>
              <Select.Option value='education'>Education</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Date' name='date'>
            <input type='date' />
          </Form.Item>

          {/* Who paid to you or Whom you paid */}
          <Form.Item label='Reference' name='reference'>
            <Input type='text' />
          </Form.Item>

          {/* Why you are giving or why you are taking */}
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>

          <div className='d-flex justify-content-end'>
            <button
              className='primary'
              type='submit'
              style={{ backgroundColor: 'chartreuse', color: 'black' }}
            >
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AddEditTransactions

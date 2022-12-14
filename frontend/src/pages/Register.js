import React, { useState } from 'react'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'

const Register = () => {
  // const host =
  // process.env.NODE_ENV === 'production'
  //   ? 'https://cashbook19765.herokuapp.com'
  //   : 'http://localhost:5000'

  const host = 'http://localhost:5000'

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      await axios.post(`${host}/api/users/register`, values)
      setLoading(false)
      message.success(
        'Registration successful.Kindly Login with the correct credentials'
      )
      navigate('/login')
    } catch (error) {
      setLoading(false)
      message.error(
        'Something went wrong/A user with this email already exists'
      )
    }
  }

  useEffect(() => {
    if (localStorage.getItem('Cashbook-User')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className='register'>
      {loading && <Spinner />}
      <div className='row justify-content-center align-items-center w-100 h-100'>
        {/* For the input form */}
        <div className='credentials-form col-md-4'>
          <Form layout='vertical' onFinish={onFinish}>
            <div className='d-flex justify-content-center'>
              <h1>REGISTER</h1>
            </div>

            <Form.Item label='Name' name='name'>
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Already Registered , Click Here to Login</Link>
              <button className='secondary' type='submit'>
                REGISTER
              </button>
            </div>
          </Form>
        </div>

        {/* For the animation */}
        <div className='col-md-5'>
          <div className='lottie'>
            <lottie-player
              src='https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json'
              background='transparent'
              speed='1'
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

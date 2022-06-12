import React, { useState } from 'react'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'

const Login = () => {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://cashbook19765.herokuapp.com'
      : 'http://localhost:5000'

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post(`${host}/api/users/login`, values)
      localStorage.setItem('Cashbook-User', JSON.stringify(response.data))
      setLoading(false)
      message.success('Login Successful')
      navigate('/')
    } catch (error) {
      setLoading(false)
      message.error('Login Failed')
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
              <h1>LOGIN</h1>
            </div>

            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/register'>
                Not Registered yet,Click Here To Register
              </Link>
              <button className='secondary' type='submit'>
                LOGIN
              </button>
            </div>
          </Form>
        </div>

        {/* For the animation*/}
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

export default Login

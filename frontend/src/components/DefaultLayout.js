import React from 'react'
import '../resources/default-layout.css'
import { Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = (props) => {
  const username = JSON.parse(localStorage.getItem('Cashbook-User'))
  const navigate = useNavigate()

  const menu = (
    <Menu
      items={[
        {
          label: (
            <li
              onClick={() => {
                localStorage.removeItem('Cashbook-User')
                navigate('/login')
              }}
            >
              {' '}
              Logout{' '}
            </li>
          ),
        },
      ]}
    />
  )

  return (
    <div className='layout'>
      <div className='header d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>CashBook</h1>
        </div>
        <div className='username'>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <button
              className='primary'
              style={{ backgroundColor: 'transparent', color: 'black' }}
            >
              {username.name.charAt(0).toUpperCase() +
                username.name.substring(1)}
            </button>
          </Dropdown>
        </div>
      </div>

      <div className='content'>{props.children}</div>
    </div>
  )
}

export default DefaultLayout

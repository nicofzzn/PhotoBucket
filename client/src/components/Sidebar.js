import React from 'react'
import { BiImages, BiFolder } from 'react-icons/bi'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Sidebar = () => {
  const { height } = useWindowDimensions()

  return (
    <div
      className='sidebar bg-light'
      style={{
        height: height - 59,
      }}
    >
      <li className='active nav-item'>
        <a className='nav-link ml-2' href='/'>
          <BiImages size='1.5rem' className='mr-3' /> All Photos
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link ml-2' href='/'>
          <BiFolder size='1.5rem' className='mr-3' /> Albums
        </a>
      </li>
    </div>
  )
}

export default Sidebar

import React from 'react'
import Mainpage from './Component/Mainpage'
import { ToastContainer } from 'react-toastify';
import "./global.css"
const App = () => {
  return (
    <div className='mainpage'>
      <ToastContainer/>
      <Mainpage/>
    </div>
  )
}

export default App
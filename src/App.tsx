import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './page/Cart'
import Main from './page/Main'
import { fetchMerchantInfo } from './store/appSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMerchantInfo())
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App

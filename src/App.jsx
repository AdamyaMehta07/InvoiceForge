import React from 'react'
import Dashboard from './pages/Dashboard'
import CreateInvoice from './pages/CreateInvoice'
import ViewInvoice from "./pages/ViewInvoice";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path='/create' element={<CreateInvoice/>} />
      <Route path="/invoice/:id" element={<ViewInvoice />} />
      
      
      
    </Routes>
      
    </BrowserRouter>
    
  )
}

export default App

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import "./index.css";
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateInvoice />} />
        <Route path="/edit/:id" element={<CreateInvoice />} />
        <Route path="/invoice/:id" element={<ViewInvoice />} />
      </Routes>
    </BrowserRouter>
  );
};
 
export default App;
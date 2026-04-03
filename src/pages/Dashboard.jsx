import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([
    { id: "INV-001", client: "Rahul Sharma", amount: 5000 },
    { id: "INV-002", client: "Ankit Verma", amount: 1200 },
  ]);

  const handleDelete = (id) => {
    const filteredInvoices = invoices.filter(
      (invoice) => invoice.id !== id
    );
    setInvoices(filteredInvoices);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          + New Invoice
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search invoices..."
        className="w-full p-3 mb-6 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* List */}
      <div className="space-y-4">
        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-4 text-gray-500">
            No invoices yet.
          </div>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white rounded-2xl shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{invoice.id}</p>
                <p className="text-gray-500 text-sm">{invoice.client}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-blue-500">
                  ₹{invoice.amount}
                </p>

                <button
                  onClick={() => handleDelete(invoice.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;
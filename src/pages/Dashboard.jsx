import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(storedInvoices);
  }, []);

  const handleDelete = (id) => {
    const updated = invoices.filter((inv) => inv.id !== id);
    setInvoices(updated);
    localStorage.setItem("invoices", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          InvoicePro 
        </h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-xl shadow"
        >
          + New Invoice
        </button>
      </div>

      {/* Empty State */}
      {invoices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
          <p className="text-lg font-medium">No invoices yet</p>
          <p className="text-sm">Create your first invoice </p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white rounded-2xl shadow p-4 flex justify-between items-center hover:shadow-lg transition"
            >
              {/* Left */}
              <div>
                <p className="font-semibold">{invoice.id}</p>
                <p className="text-gray-500 text-sm">
                  {invoice.client}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-6">
                <p className="font-bold text-blue-500 text-lg">
                  ₹{invoice.total || 0}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${invoice.id}`)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/invoice/${invoice.id}`)}
                    className="text-green-500 hover:text-green-700 font-medium"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-gray-400 mt-10">
        Built by Adamya Mehta
      </p>
    </div>
  );
};

export default Dashboard;
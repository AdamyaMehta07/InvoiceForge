import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  // Add item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  // Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Handle change
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // Calculate total
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // SAVE INVOICE
  const handleSave = () => {
    const newInvoice = {
      id: "INV-" + Date.now(),
      client,
      amount: total,
      items,
    };

    const existingInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const updatedInvoices = [...existingInvoices, newInvoice];

    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      {/* Client */}
      <input
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client Name"
        className="w-full p-3 mb-6 rounded-xl border"
      />

      {/* Items */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Item"
              value={item.name}
              onChange={(e) =>
                handleItemChange(index, "name", e.target.value)
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", Number(e.target.value))
              }
              className="p-2 border rounded"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          + Add Item
        </button>
      </div>

      {/* Total */}
      <div className="mb-6 font-bold text-lg">
        Total: ₹{total}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-6 py-3 rounded-xl"
      >
        Save Invoice
      </button>
    </div>
  );
};

export default CreateInvoice;
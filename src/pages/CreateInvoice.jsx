import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState("");
  const [tax, setTax] = useState(0);
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

  // Subtotal
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Tax amount
  const taxAmount = (subtotal * tax) / 100;

  // Final total
  const total = subtotal + taxAmount;

  // Save
  const handleSave = () => {
    const newInvoice = {
      id: "INV-" + Date.now(),
      client,
      items,
      subtotal,
      tax,
      taxAmount,
      total,
    };

    const existing =
      JSON.parse(localStorage.getItem("invoices")) || [];

    localStorage.setItem(
      "invoices",
      JSON.stringify([...existing, newInvoice])
    );

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

      {/* Tax Input */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Tax (%)</label>
        <input
          type="number"
          value={tax}
          onChange={(e) => setTax(Number(e.target.value))}
          className="w-full p-3 rounded-xl border"
        />
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-2">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax: ₹{taxAmount}</p>
        <p className="font-bold text-lg">Total: ₹{total}</p>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl"
      >
        Save Invoice
      </button>
    </div>
  );
};

export default CreateInvoice;
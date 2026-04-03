import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [client, setClient] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  // Add new item row
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  // Remove item row
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Calculate total
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
    <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500"
        >
        ← Back
    </button>
      
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      {/* Client Input */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Client Name</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter client name"
        />
      </div>

      {/* Items Section */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6">
        <h2 className="font-semibold mb-4">Items</h2>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4">
            
            <input
              type="text"
              placeholder="Item name"
              value={item.name}
              onChange={(e) =>
                handleItemChange(index, "name", e.target.value)
              }
              className="p-2 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              className="p-2 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", Number(e.target.value))
              }
              className="p-2 border rounded-lg"
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
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold">
          Total: ₹{total}
        </h2>
      </div>

    </div>
  );
};

export default CreateInvoice;
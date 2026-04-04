import React, { useState, useEffect } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { useNavigate, useParams } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [client, setClient] = useState("");
  const [tax, setTax] = useState(0);
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  // Load existing invoice (edit mode)
  useEffect(() => {
    if (id) {
      const storedInvoices =
        JSON.parse(localStorage.getItem("invoices")) || [];

      const existing = storedInvoices.find(
        (inv) => inv.id === id
      );

      if (existing) {
        setClient(existing.client);
        setItems(existing.items);
        setTax(existing.tax || 0);
      }
    }
  }, [id]);

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

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount;

  // Save
  const handleSave = () => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    if (id) {
      // Update
      const updatedInvoices = storedInvoices.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              client,
              items,
              subtotal,
              tax,
              taxAmount,
              total,
            }
          : inv
      );

      localStorage.setItem(
        "invoices",
        JSON.stringify(updatedInvoices)
      );
    } else {
      // Create
      const newInvoice = {
        id: "INV-" + Date.now(),
        client,
        items,
        subtotal,
        tax,
        taxAmount,
        total,
      };

      localStorage.setItem(
        "invoices",
        JSON.stringify([...storedInvoices, newInvoice])
      );
    }

    navigate("/");
  };

  const previewInvoice = {
    id: id || "Preview",
    client,
    items,
    subtotal,
    taxAmount,
    total,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Invoice" : "Create Invoice"}
      </h1>

      {/* Client */}
      <input
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client Name"
        className="w-full p-3 mb-6 rounded-xl border shadow-sm"
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
                handleItemChange(
                  index,
                  "quantity",
                  Number(e.target.value)
                )
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "price",
                  Number(e.target.value)
                )
              }
              className="p-2 border rounded"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-xl shadow"
        >
          + Add Item
        </button>
      </div>

      {/* Tax */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Tax (%)
        </label>
        <input
          type="number"
          value={tax}
          onChange={(e) => setTax(Number(e.target.value))}
          className="w-full p-3 rounded-xl border shadow-sm"
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
        className="mt-6 bg-green-500 hover:bg-green-600 transition text-white px-6 py-3 rounded-xl shadow"
      >
        {id ? "Update Invoice" : "Save Invoice"}
      </button>

      {/* Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <InvoicePreview invoice={previewInvoice} />
      </div>
    </div>
  );
};

export default CreateInvoice;
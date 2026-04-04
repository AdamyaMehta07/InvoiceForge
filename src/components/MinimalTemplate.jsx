import React from "react";

const MinimalTemplate = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div
      id="invoice-preview"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
      className="p-8 max-w-[800px] mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>

      <p className="mb-2"><strong>ID:</strong> {invoice.id}</p>
      <p className="mb-6"><strong>Client:</strong> {invoice.client}</p>

      <table className="w-full mb-6">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <p>Subtotal: ₹{invoice.subtotal}</p>
        <p>Tax: ₹{invoice.taxAmount}</p>
        <p className="font-bold">Total: ₹{invoice.total}</p>
      </div>
    </div>
  );
};

export default MinimalTemplate;
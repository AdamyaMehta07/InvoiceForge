import React from "react";

const ModernTemplate = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div
      id="invoice-preview"
      className="max-w-[800px] mx-auto overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p>{invoice.id}</p>
      </div>

      <div className="p-6">
        <p className="mb-4"><strong>Client:</strong> {invoice.client}</p>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="p-2">{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p>Subtotal: ₹{invoice.subtotal}</p>
          <p>Tax: ₹{invoice.taxAmount}</p>
          <p className="text-xl font-bold text-blue-500">
            Total: ₹{invoice.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
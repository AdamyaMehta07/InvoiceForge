import React from "react";

const InvoicePreview = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div
      id="invoice-preview"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
      className="p-8 max-w-[800px] mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <div style={{ textAlign: "right" }}>
          <p className="font-semibold">{invoice.id}</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Client */}
      <div className="mb-6">
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Bill To:
        </p>
        <p className="font-semibold text-lg">{invoice.client}</p>
      </div>

      {/* Table */}
      <table className="w-full mb-6 border-collapse">
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Qty</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">₹{item.price}</td>
              <td className="p-2">
                ₹{item.quantity * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div style={{ textAlign: "right" }}>
        <p>Subtotal: ₹{invoice.subtotal}</p>
        <p>Tax: ₹{invoice.taxAmount}</p>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          Total: ₹{invoice.total}
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;
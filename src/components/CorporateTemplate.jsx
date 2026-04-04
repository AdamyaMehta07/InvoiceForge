import React from "react";

const CorporateTemplate = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div
      id="invoice-preview"
      className="max-w-[800px] mx-auto border p-8"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Company Name</h1>
          <p>company@email.com</p>
        </div>

        <div className="text-right">
          <h2 className="text-lg font-semibold">INVOICE</h2>
          <p>{invoice.id}</p>
        </div>
      </div>

      <p className="mb-6"><strong>Client:</strong> {invoice.client}</p>

      <table className="w-full mb-6 border">
        <thead>
          <tr className="border-b">
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} className="border-b">
              <td>{item.name}</td>
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
        <p className="font-bold text-lg">Total: ₹{invoice.total}</p>
      </div>
    </div>
  );
};

export default CorporateTemplate;
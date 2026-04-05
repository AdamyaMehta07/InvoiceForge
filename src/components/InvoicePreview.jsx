import React from "react";
 
const InvoicePreview = ({ invoice }) => {
  if (!invoice) return null;
 
  const fmt = (n) =>
    Number(n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
 
  return (
    <div
      id="invoice-preview"
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "40px",
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 800,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-0.5px" }}>
            {invoice.yourName || "Your Company"}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
            {invoice.yourEmail || ""}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af" }}>
            Invoice
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginTop: 4 }}>
            {invoice.id}
          </div>
          {invoice.date && (
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              {new Date(invoice.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
          {invoice.dueDate && (
            <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 2 }}>
              Due: {new Date(invoice.dueDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
 
      {/* Bill To */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
          Bill To
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
          {invoice.client || "Client Name"}
        </div>
        {invoice.clientEmail && (
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            {invoice.clientEmail}
          </div>
        )}
      </div>
 
      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "1px solid #e5e7eb" }}>
              Description
            </th>
            <th style={{ padding: "10px 12px", textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "1px solid #e5e7eb", width: 60 }}>
              Qty
            </th>
            <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "1px solid #e5e7eb", width: 100 }}>
              Rate
            </th>
            <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "1px solid #e5e7eb", width: 110 }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {(invoice.items || []).map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px", fontSize: 13, color: "#111827" }}>{item.name || "—"}</td>
              <td style={{ padding: "12px", fontSize: 13, color: "#374151", textAlign: "center" }}>{item.quantity}</td>
              <td style={{ padding: "12px", fontSize: 13, color: "#374151", textAlign: "right" }}>₹{fmt(item.price)}</td>
              <td style={{ padding: "12px", fontSize: 13, fontWeight: 500, color: "#111827", textAlign: "right" }}>
                ₹{fmt(Number(item.quantity) * Number(item.price))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* Summary */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: 220 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#6b7280" }}>
            <span>Subtotal</span>
            <span>₹{fmt(invoice.subtotal || 0)}</span>
          </div>
          {Number(invoice.tax) > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "#6b7280" }}>
              <span>Tax ({invoice.tax}%)</span>
              <span>₹{fmt(invoice.taxAmount || 0)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16, fontWeight: 700, color: "#111827", borderTop: "2px solid #111827", marginTop: 4 }}>
            <span>Total</span>
            <span>₹{fmt(invoice.total || 0)}</span>
          </div>
        </div>
      </div>
 
      {/* Notes */}
      {invoice.notes && (
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
            Notes
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{invoice.notes}</div>
        </div>
      )}
    </div>
  );
};
 
export default InvoicePreview;
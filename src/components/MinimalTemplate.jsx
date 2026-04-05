import React from "react";
 
const MinimalTemplate = ({ invoice }) => {
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
        padding: "48px 52px",
        fontFamily: "'DM Sans', Arial, sans-serif",
        maxWidth: 800,
        minHeight: 900,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#111827", letterSpacing: "-0.5px" }}>
            {invoice.yourName || "Your Company"}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
            {invoice.yourEmail}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 300, color: "#111827", letterSpacing: "-1px" }}>
            INVOICE
          </div>
          <div style={{ fontSize: 14, fontFamily: "monospace", color: "#6b7280", marginTop: 4 }}>
            #{invoice.id}
          </div>
        </div>
      </div>
 
      {/* Meta row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          padding: "20px 0",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: 40,
        }}
      >
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
            Billed To
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{invoice.client || "—"}</div>
          {invoice.clientEmail && (
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{invoice.clientEmail}</div>
          )}
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
            Date
          </div>
          <div style={{ fontSize: 13, color: "#374151" }}>
            {invoice.date
              ? new Date(invoice.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
              : "—"}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
            Due Date
          </div>
          <div style={{ fontSize: 13, color: invoice.dueDate ? "#374151" : "#9ca3af" }}>
            {invoice.dueDate
              ? new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
              : "On receipt"}
          </div>
        </div>
      </div>
 
      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 0", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "2px solid #111827" }}>
              Description
            </th>
            <th style={{ textAlign: "center", padding: "8px 0", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "2px solid #111827", width: 60 }}>
              Qty
            </th>
            <th style={{ textAlign: "right", padding: "8px 0", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "2px solid #111827", width: 100 }}>
              Unit Price
            </th>
            <th style={{ textAlign: "right", padding: "8px 0", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", borderBottom: "2px solid #111827", width: 110 }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {(invoice.items || []).map((item, i) => (
            <tr key={i}>
              <td style={{ padding: "14px 0", fontSize: 14, color: "#111827", borderBottom: "1px solid #f3f4f6" }}>
                {item.name || "—"}
              </td>
              <td style={{ padding: "14px 0", fontSize: 14, color: "#374151", textAlign: "center", borderBottom: "1px solid #f3f4f6" }}>
                {item.quantity}
              </td>
              <td style={{ padding: "14px 0", fontSize: 14, color: "#374151", textAlign: "right", borderBottom: "1px solid #f3f4f6" }}>
                ₹{fmt(item.price)}
              </td>
              <td style={{ padding: "14px 0", fontSize: 14, fontWeight: 600, color: "#111827", textAlign: "right", borderBottom: "1px solid #f3f4f6" }}>
                ₹{fmt(Number(item.quantity) * Number(item.price))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 40 }}>
        <div style={{ width: 240 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, color: "#6b7280" }}>
            <span>Subtotal</span>
            <span>₹{fmt(invoice.subtotal || 0)}</span>
          </div>
          {Number(invoice.tax) > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, color: "#6b7280" }}>
              <span>Tax ({invoice.tax}%)</span>
              <span>₹{fmt(invoice.taxAmount || 0)}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
              borderTop: "2px solid #111827",
              marginTop: 6,
            }}
          >
            <span>Total Due</span>
            <span>₹{fmt(invoice.total || 0)}</span>
          </div>
        </div>
      </div>
 
      {/* Notes */}
      {invoice.notes && (
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
            Notes
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{invoice.notes}</div>
        </div>
      )}
 
      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: "center", fontSize: 11, color: "#d1d5db" }}>
        Thank you for your business.
      </div>
    </div>
  );
};
 
export default MinimalTemplate;
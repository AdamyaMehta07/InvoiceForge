import React from "react";
 
const CorporateTemplate = ({ invoice }) => {
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
        color: "#1f2937",
        fontFamily: "'DM Sans', Arial, sans-serif",
        maxWidth: 800,
        minHeight: 900,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 6, background: "linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa)" }} />
 
      <div style={{ padding: "40px 52px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#1e40af",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              {invoice.yourName || "Your Company"}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
              {invoice.yourEmail}
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              padding: "14px 20px",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#3b82f6", marginBottom: 4 }}>
              Tax Invoice
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1e40af", fontFamily: "monospace" }}>
              {invoice.id}
            </div>
            {invoice.date && (
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                {new Date(invoice.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            )}
          </div>
        </div>
 
        {/* Divider */}
        <div style={{ height: 1, background: "#e5e7eb", marginBottom: 28 }} />
 
        {/* From / To grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginBottom: 36,
            padding: "20px",
            background: "#f9fafb",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
              Invoice From
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{invoice.yourName || "Your Company"}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{invoice.yourEmail}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
              Invoice To
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{invoice.client || "—"}</div>
            {invoice.clientEmail && (
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{invoice.clientEmail}</div>
            )}
          </div>
          {invoice.dueDate && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
                Due Date
              </div>
              <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
                {new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          )}
        </div>
 
        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, marginBottom: 28, border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#1e40af" }}>
              {["Description", "Qty", "Unit Price", "Total"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 14px",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                    textAlign: i === 0 ? "left" : "right",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).map((item, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#1f2937", borderBottom: "1px solid #e5e7eb" }}>
                  {item.name || "—"}
                </td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>
                  ₹{fmt(item.price)}
                </td>
                <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 700, color: "#1f2937", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>
                  ₹{fmt(Number(item.quantity) * Number(item.price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 36 }}>
          <div style={{ width: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, color: "#6b7280", borderBottom: "1px solid #f3f4f6" }}>
              <span>Subtotal</span>
              <span>₹{fmt(invoice.subtotal || 0)}</span>
            </div>
            {Number(invoice.tax) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, color: "#6b7280", borderBottom: "1px solid #f3f4f6" }}>
                <span>GST / Tax ({invoice.tax}%)</span>
                <span>₹{fmt(invoice.taxAmount || 0)}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 16px",
                fontSize: 16,
                fontWeight: 800,
                color: "#ffffff",
                background: "#1e40af",
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <span>Amount Due</span>
              <span>₹{fmt(invoice.total || 0)}</span>
            </div>
          </div>
        </div>
 
        {/* Notes */}
        {invoice.notes && (
          <div style={{ padding: "16px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#92400e", marginBottom: 6 }}>
              Notes
            </div>
            <div style={{ fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>{invoice.notes}</div>
          </div>
        )}
 
        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            This is a computer-generated invoice.
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>
            Generated by InvoiceForge
            Built by Adamya
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default CorporateTemplate;
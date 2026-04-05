import React from "react";
 
const ModernTemplate = ({ invoice }) => {
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
        fontFamily: "'DM Sans', Arial, sans-serif",
        maxWidth: 800,
        minHeight: 900,
        overflow: "hidden",
      }}
    >
      {/* Dark header band */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          padding: "40px 48px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.3px" }}>
              {invoice.yourName || "Your Company"}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
              {invoice.yourEmail}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
              Invoice
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#7c6dfa", letterSpacing: "-0.5px" }}>
              {invoice.id}
            </div>
          </div>
        </div>
 
        {/* Meta chips */}
        <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
          {[
            { label: "Billed To", value: invoice.client || "—" },
            {
              label: "Date",
              value: invoice.date
                ? new Date(invoice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                : "—",
            },
            {
              label: "Due",
              value: invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                : "On receipt",
            },
          ].map((m, i) => (
            <div key={i} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.07)", borderRadius: 8, minWidth: 120 }}>
              <div style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 5 }}>
                {m.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Body */}
      <div style={{ padding: "36px 48px" }}>
        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28 }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Description", "Qty", "Rate", "Amount"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 12px",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    textAlign: i === 0 ? "left" : "right",
                    borderBottom: "2px solid #e5e7eb",
                    width: i === 0 ? "auto" : i === 1 ? 60 : 110,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).map((item, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? "#ffffff" : "#fafafa" }}
              >
                <td style={{ padding: "13px 12px", fontSize: 14, color: "#111827", borderBottom: "1px solid #f3f4f6" }}>
                  {item.name || "—"}
                </td>
                <td style={{ padding: "13px 12px", fontSize: 13, color: "#374151", textAlign: "right", borderBottom: "1px solid #f3f4f6" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "13px 12px", fontSize: 13, color: "#374151", textAlign: "right", borderBottom: "1px solid #f3f4f6" }}>
                  ₹{fmt(item.price)}
                </td>
                <td style={{ padding: "13px 12px", fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "right", borderBottom: "1px solid #f3f4f6" }}>
                  ₹{fmt(Number(item.quantity) * Number(item.price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {/* Totals + accent */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              width: 260,
              background: "#f9fafb",
              borderRadius: 10,
              padding: "18px 20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>₹{fmt(invoice.subtotal || 0)}</span>
            </div>
            {Number(invoice.tax) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
                <span>Tax ({invoice.tax}%)</span>
                <span>₹{fmt(invoice.taxAmount || 0)}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 17,
                fontWeight: 700,
                color: "#ffffff",
                background: "#1a1a2e",
                borderRadius: 7,
                padding: "12px 16px",
                marginTop: 10,
              }}
            >
              <span>Total</span>
              <span style={{ color: "#7c6dfa" }}>₹{fmt(invoice.total || 0)}</span>
            </div>
          </div>
        </div>
 
        {/* Notes */}
        {invoice.notes && (
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
              Notes
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{invoice.notes}</div>
          </div>
        )}
 
        {/* Footer bar */}
        <div
          style={{
            marginTop: 40,
            background: "#7c6dfa",
            borderRadius: 8,
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Thank you for your business</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>{invoice.yourName}</span>
        </div>
      </div>
    </div>
  );
};
 
export default ModernTemplate;
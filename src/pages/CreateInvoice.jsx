import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import InvoicePreview from "../components/InvoicePreview";
 
const CreateInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [yourName, setYourName] = useState("Your Company");
  const [yourEmail, setYourEmail] = useState("hello@yourco.com");
  const [tax, setTax] = useState(0);
  const [status, setStatus] = useState("draft");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
 
  useEffect(() => {
    const savedBiz = JSON.parse(localStorage.getItem("bizInfo")) || {};
    if (savedBiz.yourName) setYourName(savedBiz.yourName);
    if (savedBiz.yourEmail) setYourEmail(savedBiz.yourEmail);
 
    if (id) {
      const stored = JSON.parse(localStorage.getItem("invoices")) || [];
      const existing = stored.find((inv) => inv.id === id);
      if (existing) {
        setClient(existing.client || "");
        setClientEmail(existing.clientEmail || "");
        setYourName(existing.yourName || savedBiz.yourName || "Your Company");
        setYourEmail(existing.yourEmail || savedBiz.yourEmail || "hello@yourco.com");
        setItems(existing.items || [{ name: "", quantity: 1, price: 0 }]);
        setTax(existing.tax || 0);
        setStatus(existing.status || "draft");
        setDate(existing.date || new Date().toISOString().split("T")[0]);
        setDueDate(existing.dueDate || "");
        setNotes(existing.notes || "");
      }
    }
  }, [id]);
 
  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
 
  const removeItem = (i) =>
    setItems(items.filter((_, idx) => idx !== i));
 
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
 
  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.price),
    0
  );
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount;
 
  const handleSave = () => {
    // Save biz info
    localStorage.setItem("bizInfo", JSON.stringify({ yourName, yourEmail }));
 
    const stored = JSON.parse(localStorage.getItem("invoices")) || [];
    const invoiceData = {
      client,
      clientEmail,
      yourName,
      yourEmail,
      items,
      subtotal,
      tax,
      taxAmount,
      total,
      status,
      date,
      dueDate,
      notes,
    };
 
    if (id) {
      const updated = stored.map((inv) =>
        inv.id === id ? { ...inv, ...invoiceData } : inv
      );
      localStorage.setItem("invoices", JSON.stringify(updated));
    } else {
      const newInvoice = {
        id: "INV-" + Date.now(),
        ...invoiceData,
      };
      localStorage.setItem("invoices", JSON.stringify([...stored, newInvoice]));
    }
    navigate("/");
  };
 
  const previewInvoice = {
    id: id || "INV-PREVIEW",
    client,
    clientEmail,
    yourName,
    yourEmail,
    items,
    subtotal,
    taxAmount,
    tax,
    total,
    status,
    date,
    dueDate,
    notes,
  };
 
  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border2)",
    borderRadius: "var(--radius-sm)",
    padding: "9px 13px",
    fontSize: 13,
    color: "var(--text)",
    fontFamily: "DM Sans, sans-serif",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
  };
 
  const labelStyle = {
    fontSize: 11,
    fontWeight: 500,
    color: "var(--text3)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: 5,
    display: "block",
  };
 
  const sectionStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    marginBottom: 14,
  };
 
  const sectionTitle = {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text2)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: 16,
  };
 
  return (
    <div className="app-layout">
      <Sidebar />
      <main
        className="main-content fade-in"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "20px 32px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--surface)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontFamily: "DM Sans, sans-serif",
                padding: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <div
              style={{
                width: 1,
                height: 18,
                background: "var(--border2)",
              }}
            />
            <h1
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              {id ? "Edit Invoice" : "New Invoice"}
            </h1>
          </div>
 
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                ...inputStyle,
                width: "auto",
                padding: "8px 32px 8px 12px",
                fontSize: 12,
                appearance: "none",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238888a8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button className="btn btn-primary" onClick={handleSave}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <path d="M17 21v-8H7v8M7 3v5h8" strokeLinecap="round" />
              </svg>
              {id ? "Update" : "Save Invoice"}
            </button>
          </div>
        </div>
 
        {/* Split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Left: Form */}
          <div
            style={{
              padding: "24px",
              overflowY: "auto",
              borderRight: "1px solid var(--border)",
            }}
          >
            {/* From / To */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>From & To</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Your Name / Company</label>
                  <input
                    style={inputStyle}
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="Your Company"
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input
                    style={inputStyle}
                    value={yourEmail}
                    onChange={(e) => setYourEmail(e.target.value)}
                    placeholder="hello@yourco.com"
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Client Name</label>
                  <input
                    style={inputStyle}
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Client or Company"
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Client Email</label>
                  <input
                    style={inputStyle}
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
              </div>
            </div>
 
            {/* Dates */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Dates</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Invoice Date</label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Due Date</label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
              </div>
            </div>
 
            {/* Line Items */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Line Items</div>
 
              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 70px 90px 24px",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ ...labelStyle, marginBottom: 0 }}>Item</span>
                <span style={{ ...labelStyle, marginBottom: 0 }}>Qty</span>
                <span style={{ ...labelStyle, marginBottom: 0 }}>Price (₹)</span>
                <span />
              </div>
 
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 70px 90px 24px",
                    gap: 8,
                    marginBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <input
                    style={inputStyle}
                    placeholder="Description"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                  <input
                    type="number"
                    style={{ ...inputStyle, textAlign: "center" }}
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleItemChange(index, "quantity", Number(e.target.value))
                    }
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                  <input
                    type="number"
                    style={inputStyle}
                    value={item.price}
                    min="0"
                    onChange={(e) =>
                      handleItemChange(index, "price", Number(e.target.value))
                    }
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
                    title="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
 
              <button
                onClick={addItem}
                style={{
                  marginTop: 4,
                  background: "var(--accent-dim)",
                  border: "1px dashed rgba(124,109,250,0.35)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--accent2)",
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "background 0.15s",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                Add Line Item
              </button>
            </div>
 
            {/* Tax & Summary */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Summary</div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tax (%)</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={tax}
                    min="0"
                    max="100"
                    onChange={(e) => setTax(Number(e.target.value))}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
                  />
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text2)" }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text2)" }}>
                  <span>Tax ({tax}%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--text)",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 10,
                    marginTop: 4,
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: "var(--accent2)" }}>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
 
            {/* Notes */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Notes</div>
              <textarea
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 80,
                  lineHeight: 1.6,
                }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, bank details, thank-you note..."
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
              />
            </div>
          </div>
 
          {/* Right: Live Preview */}
          <div
            style={{
              overflowY: "auto",
              background: "var(--bg)",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: "DM Mono, monospace",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 16,
              }}
            >
              Live Preview
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.3)",
                transform: "scale(0.85)",
                transformOrigin: "top center",
                marginBottom: -80,
              }}
            >
              <InvoicePreview invoice={previewInvoice} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
 
export default CreateInvoice;
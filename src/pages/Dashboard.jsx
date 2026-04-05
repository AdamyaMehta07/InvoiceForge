import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
 
const STATUS_CYCLE = ["draft", "sent", "paid", "overdue"];
 
const Dashboard = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("invoices")) || [];
    // Ensure every invoice has a status and date
    const normalized = stored.map((inv) => ({
      ...inv,
      status: inv.status || "draft",
      date: inv.date || new Date().toISOString().split("T")[0],
    }));
    setInvoices(normalized);
  }, []);
 
  const save = (updated) => {
    setInvoices(updated);
    localStorage.setItem("invoices", JSON.stringify(updated));
  };
 
  const handleDelete = (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    save(invoices.filter((inv) => inv.id !== id));
  };
 
  const cycleStatus = (e, id) => {
    e.stopPropagation();
    const updated = invoices.map((inv) => {
      if (inv.id !== id) return inv;
      const idx = STATUS_CYCLE.indexOf(inv.status || "draft");
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return { ...inv, status: next };
    });
    save(updated);
  };
 
  const filtered =
    filter === "all" ? invoices : invoices.filter((inv) => inv.status === filter);
 
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, inv) => acc + (inv.total || 0), 0);
 
  const outstanding = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((acc, inv) => acc + (inv.total || 0), 0);
 
  const fmt = (n) =>
    "₹" +
    Number(n).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
 
  const statusBadge = (status) => {
    const map = {
      paid: "badge-paid",
      draft: "badge-draft",
      sent: "badge-sent",
      overdue: "badge-overdue",
    };
    return (
      <span className={`badge ${map[status] || "badge-draft"}`}>
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "currentColor",
            display: "inline-block",
          }}
        />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
 
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content fade-in">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
              {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create")}
            style={{ marginTop: 2 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            New Invoice
          </button>
        </div>
 
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            padding: "24px 32px 0",
          }}
        >
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">{fmt(totalRevenue)}</div>
            <div className="stat-sub">from paid invoices</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Outstanding</div>
            <div className="stat-value" style={{ color: "var(--amber)" }}>
              {fmt(outstanding)}
            </div>
            <div className="stat-sub">sent + overdue</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Invoices</div>
            <div className="stat-value">{invoices.length}</div>
            <div className="stat-sub">all time</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Paid</div>
            <div className="stat-value" style={{ color: "var(--green)" }}>
              {invoices.filter((i) => i.status === "paid").length}
            </div>
            <div className="stat-sub">invoices</div>
          </div>
        </div>
 
        {/* Filter tabs + Table */}
        <div style={{ padding: "24px 32px" }}>
          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: 4,
              width: "fit-content",
            }}
          >
            {["all", "draft", "sent", "paid", "overdue"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "DM Sans, sans-serif",
                  background: filter === f ? "var(--accent)" : "transparent",
                  color: filter === f ? "#fff" : "var(--text2)",
                  transition: "all 0.15s",
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
 
          {/* Table */}
          <div className="card">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="empty-title">No invoices here</div>
                <div className="empty-sub" style={{ marginBottom: 20 }}>
                  {filter === "all"
                    ? "Create your first invoice to get started"
                    : `No ${filter} invoices`}
                </div>
                {filter === "all" && (
                  <button className="btn btn-primary btn-sm" onClick={() => navigate("/create")}>
                    Create Invoice
                  </button>
                )}
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((invoice) => (
                    <tr
                      key={invoice.id}
                      onClick={() => navigate(`/invoice/${invoice.id}`)}
                    >
                      <td>
                        <span
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: 12,
                            color: "var(--accent2)",
                          }}
                        >
                          {invoice.id}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{invoice.client || "—"}</td>
                      <td style={{ color: "var(--text2)" }}>
                        {invoice.date
                          ? new Date(invoice.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{fmt(invoice.total || 0)}</span>
                      </td>
                      <td>
                        <span
                          onClick={(e) => cycleStatus(e, invoice.id)}
                          title="Click to change status"
                          style={{ cursor: "pointer" }}
                        >
                          {statusBadge(invoice.status || "draft")}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate(`/invoice/${invoice.id}`)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => navigate(`/edit/${invoice.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* footer */}

      <div>
         <span
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: 12,
                            color: "var(--accent2)",
                          }}
                        >Built by Adamya</span>
      </div>

    </div>
  );
};
 
export default Dashboard;
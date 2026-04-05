import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MinimalTemplate from "../components/MinimalTemplate";
import ModernTemplate from "../components/ModernTemplate";
import CorporateTemplate from "../components/CorporateTemplate";
 
const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [template, setTemplate] = useState("minimal");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef(null);
 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("invoices")) || [];
    const found = stored.find((inv) => inv.id === id);
    setInvoice(found || null);
  }, [id]);
 
  if (!invoice) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="empty-state">
            <div className="empty-title">Invoice not found</div>
            <div className="empty-sub" style={{ marginBottom: 20 }}>
              This invoice may have been deleted
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/")}>
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }
 
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById("invoice-preview");
      if (!element) throw new Error("Preview not found");
 
      // Wait a tick to ensure render
      await new Promise((r) => setTimeout(r, 300));
 
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
 
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
 
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
 
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice.id}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };
 
  const renderTemplate = () => {
    const props = { invoice };
    switch (template) {
      case "modern": return <ModernTemplate {...props} />;
      case "corporate": return <CorporateTemplate {...props} />;
      default: return <MinimalTemplate {...props} />;
    }
  };
 
  const templates = [
    { id: "minimal", label: "Minimal" },
    { id: "modern", label: "Modern" },
    { id: "corporate", label: "Corporate" },
  ];
 
  const statusColors = {
    paid: "var(--green)",
    draft: "var(--text2)",
    sent: "var(--accent2)",
    overdue: "var(--red)",
  };
 
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content fade-in" style={{ display: "flex", flexDirection: "column" }}>
        {/* Toolbar */}
        <div
          style={{
            padding: "16px 32px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            <div style={{ width: 1, height: 18, background: "var(--border2)" }} />
            <div>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: 13,
                  color: "var(--accent2)",
                  fontWeight: 500,
                }}
              >
                {invoice.id}
              </span>
              {invoice.client && (
                <span style={{ fontSize: 13, color: "var(--text2)", marginLeft: 10 }}>
                  · {invoice.client}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                padding: "2px 10px",
                borderRadius: 100,
                background: "var(--surface3)",
                color: statusColors[invoice.status] || "var(--text2)",
                fontWeight: 500,
                border: `1px solid ${statusColors[invoice.status] || "var(--border2)"}22`,
                textTransform: "capitalize",
              }}
            >
              {invoice.status || "draft"}
            </span>
          </div>
 
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Template switcher */}
            <div
              style={{
                display: "flex",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: 3,
                gap: 2,
              }}
            >
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "DM Sans, sans-serif",
                    background: template === t.id ? "var(--accent)" : "transparent",
                    color: template === t.id ? "#fff" : "var(--text2)",
                    transition: "all 0.15s",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
 
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate(`/edit/${invoice.id}`)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
 
            <button
              className="btn btn-green"
              onClick={handleDownload}
              disabled={downloading}
              style={{ opacity: downloading ? 0.7 : 1 }}
            >
              {downloading ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
                    <path d="M7 10l5 5 5-5M12 15V3" strokeLinecap="round" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
 
        {/* Invoice Preview Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--bg)",
            padding: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            ref={previewRef}
            style={{
              width: "100%",
              maxWidth: 800,
              background: "#fff",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {renderTemplate()}
          </div>
        </div>
 
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </main>
    </div>
  );
};
 
export default ViewInvoice;
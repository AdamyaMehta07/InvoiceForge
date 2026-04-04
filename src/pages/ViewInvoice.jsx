import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import MinimalTemplate from "../components/MinimalTemplate";
import ModernTemplate from "../components/ModernTemplate";
import CorporateTemplate from "../components/CorporateTemplate";

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [template, setTemplate] = useState("minimal"); 

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    const foundInvoice = storedInvoices.find(
      (inv) => inv.id === id
    );

    setInvoice(foundInvoice);
  }, [id]);

  if (!invoice) {
    return <p className="p-6">Loading...</p>;
  }

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate invoice={invoice} />;
      case "corporate":
        return <CorporateTemplate invoice={invoice} />;
      default:
        return <MinimalTemplate invoice={invoice} />;
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("invoice-preview");

    if (!element) {
      alert("Invoice preview not found!");
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 500));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${invoice.id}.pdf`);
    } catch (error) {
      console.error("PDF ERROR:", error);
      alert("Failed to generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice Preview</h1>

        <div className="flex gap-4 items-center">
          
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="minimal">Minimal</option>
            <option value="modern">Modern</option>
            <option value="corporate">Corporate</option>
          </select>

          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            Download PDF
          </button>

        </div>
      </div>

      {renderTemplate()}
    </div>
  );
};

export default ViewInvoice;
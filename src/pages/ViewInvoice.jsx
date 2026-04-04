import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);

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

  const handleDownload = async () => {
    const element = document.getElementById("invoice-preview");

    if (!element) {
      alert("Invoice preview not found!");
      return;
    }

    try {
      // wait for render
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

        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          Download PDF
        </button>
      </div>

      <InvoicePreview invoice={invoice} />
    </div>
  );
};

export default ViewInvoice;
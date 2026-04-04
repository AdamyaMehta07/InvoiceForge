import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Invoice Preview</h1>

      <InvoicePreview invoice={invoice} />

    </div>
  );
};

export default ViewInvoice;
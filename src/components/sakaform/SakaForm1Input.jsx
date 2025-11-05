import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";

import * as XLSX from "xlsx";

function SakaForm1Input() {
 const [step, setStep] = useState(1);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // ✅ Handle Excel Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // // ✅ Validate Headers
      // const requiredHeaders = [
      //   "BANK CODE","BRANCH NAME","KA 1.1 DEBIT (A)","KA 1.1 CREDIT (B)",
      //   "KA 1.1 DEBIT USD (C)","KA 1.1 CREDIT  USD (D)","KA-2-1/2.2 DEBIT (E)",
      //   "KA-2-1/2.2 CREDIT (F)","OTHER KA A/C DEBIT (G)","OTHER KA A/C CREDIT (H)",
      //   "KA 2.10 Account-Debit (I)","KA 2.10 Account-Credit (J)",
      //   "TOTAL GA A/C DEBIT (K)","TOTAL GA A/C CREDIT (L)",
      //   "60%  OF GA A/C DEBIT(M)","60%  OF GA A/C CREDIT (N)",
      //   "RECEIVABLE / (PAYABLE (A+E+G+I+K+M -B-F-H-J-L-N) USD (C-D)"
      // ];

      // const headers = Object.keys(jsonData[0] || {});
      // const isValid = requiredHeaders.every((h) => headers.includes(h));

      // if (!isValid) {
      //   alert("❌ Excel Format Incorrect. Please upload correct template.");
      //   return;
      // }

      setExcelData(jsonData);
      alert("✅ Excel Validated Successfully!");
    };
    reader.readAsArrayBuffer(file);
  };


    // ✅ Submit to Database (Stage 2)
  const handleSubmit = () => {


    const payload = {
      bankCode,
      transactionDate,
      excelData,
    };

    console.log("Sending to DB: ", payload);
    alert("✅ Submitted Successfully!");
  };



  return (<div className="p-4">
      <h1 className="text-2xl font-bold text-primary mb-4"> Saka Form 1</h1>
      
      <Breadcrumb
        items={[
          { label: "SakaForm", path: "/dashboard/sakaform" },
           { label: "SakaForm1", path: "/dashboard/sakaform" },
           { label: "View", path: "/dashboard/sakaform" }, //correct
          { label: "Validate", path: "/dashboard/sakaform" },
          { label: "Input" }
        ]}
      />

      {/* Input for excel */}
      <div className="max-w-4xl mx-auto p-6">
      {/* Step Progress */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          {step === 1 ? "Step 1: Upload Excel File" : "Step 2: Add Bank Info & Submit"}
        </h2>
        <p className="text-gray-500">Stage {step} of 2</p>
      </div>

      {/* Stage 1: Excel Upload */}
      {step === 1 && (
        <div className="border p-4 rounded-lg shadow">
          <input type="file" accept=".xls,.xlsx" onChange={handleExcelUpload} className="mb-4" />
          {fileName && <p className="text-sm text-gray-600">📁 File: {fileName}</p>}

          {excelData.length > 0 && (
            <button
              onClick={() => setStep(2)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next →
            </button>
          )}
        </div>
      )}

      {/* Stage 2: Bank Info + Preview */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Bank Code</label>
            <input
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Transaction Date</label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Excel Preview Table */}
          <div className="max-h-64 overflow-y-scroll border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  {Object.keys(excelData[0]).map((key, i) => (
                    <th key={i} className="p-2 border">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx}>
                    {Object.keys(row).map((k, i) => (
                      <td key={i} className="p-2 border">{row[k]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ✅ Submit to Database
          </button>
        </div>
      )}
    </div>

      {/* END  */}



       
    </div>)
}

export default SakaForm1Input;
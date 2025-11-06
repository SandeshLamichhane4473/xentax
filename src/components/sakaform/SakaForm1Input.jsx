import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import * as XLSX from "xlsx";
import BankSelect from "../common/BankSelect";

function SakaForm1Input() {
  const [step, setStep] = useState(1);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // ✅ Excel File Upload
  const handleExcelUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setFileName(file.name);

  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    // ---------- Validation & Filtering ----------
    // 1. Find header row (contains 'NRB_Code')
    console.log(jsonData)

const headerIndex = jsonData.findIndex(row =>
  Object.values(row).some(val => 
    typeof val === "string" && val.trim().toLowerCase() === "nrb_code"
  )
);

if (headerIndex === -1) {
  alert("❌ Header row not found!");
  return;
}

// Now get actual header keys (the keys in jsonData[headerIndex])
const headerRow = jsonData[headerIndex];
const headerKeys = Object.keys(headerRow);
console.log("headerrows",headerRow)
// Optional: map original messy keys to clean names
const cleanHeaderMap = {};
headerKeys.forEach((key, index) => {
  const val = headerRow[key].toString().trim();
  cleanHeaderMap[key] = val || `COLUMN_${index}`; // fallback name
});

// Use this map to access the columns dynamically

    // 2. Find total row (optional)
    const totalRowIndex = jsonData.findIndex(
      row => row["NRB_Code"] && row["NRB_Code"].toString().toLowerCase() === "total"
    );

    // 3. Extract branch rows (numeric NRB_Code)
    const branchRows = jsonData.filter(row => !isNaN(row["NRB_Code"]));

    // 4. Keep only header + branch rows
    const processedData = [jsonData[headerIndex], ...branchRows];

    // 5. Optional: Validate totals if total row exists
    if (totalRowIndex > -1) {
      const totalRow = jsonData[totalRowIndex];
      const columnsToSum = Object.keys(branchRows[0]).filter(
        col => col !== "NRB_Code" && col !== "Branch Name"
      );

      const discrepancies = columnsToSum.filter(col => {
        const sum = branchRows.reduce(
          (acc, row) => acc + (parseFloat(row[col]) || 0),
          0
        );
        const total = parseFloat(totalRow[col]) || 0;
        return sum !== total;
      });

      if (discrepancies.length > 0) {
        alert(`⚠️ Discrepancies found in columns: ${discrepancies.join(", ")}`);
      } else {
        console.log("✅ Excel totals validated successfully!");
      }
    }

    // 6. Set processed data
    setExcelData(processedData);
    alert("✅ Excel Uploaded and Validated Successfully!");
  };

  reader.readAsArrayBuffer(file);
  };

  // ✅ Submit Stage
  const handleSubmit = () => {
    const payload = { bankCode, transactionDate, excelData };
    console.log("Sending to DB: ", payload);
    alert("✅ Submitted Successfully!");
  };

  // Get column names
const columns = Object.keys(excelData[0] || {});

// Calculate sums for each column
// Calculate sums only for Debit/Credit columns
const columnTotals = {};
columns.forEach((col) => {
  if (/Debit|Credit/i.test(col)) { // ✅ Check if column contains Debit or Credit
    columnTotals[col] = excelData.reduce((sum, row) => {
      const value = parseFloat(row[col]);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  } else {
    columnTotals[col] = ""; // Leave blank (or 0 if you prefer) for non-Debit/Credit columns
  }
});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-1xl font-bold text-blue-700 mb-4">📊 Saka Form 1</h1>

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "SakaForm", path: "/dashboard/sakaform" },
          // { label: "SakaForm1", path: "/dashboard/sakaform" },
          // { label: "View", path: "/dashboard/sakaform/sakaform1view" },
          // { label: "Validate", path: "/dashboard/sakaform/sakaform1validate" },
          { label: "SakaForm1" },
        ]}
      />

      {/* Progress Card */}
      <div className=" mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-1xl font-semibold text-gray-700 mb-2">
          {step === 1 ? "Step 1: Upload Excel File" : "Step 2: Bank Info & Submit"}
        </h2>
        <p className="text-gray-500 mb-4">Stage {step} of 2</p>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg hover:bg-gray-50 transition">
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleExcelUpload}
              className="block mx-auto mb-4"
            />
            {fileName && (
              <p className="text-sm text-gray-600">📁 Selected File: {fileName}</p>
            )}
            {excelData.length > 0 && (
              <button
                onClick={() => setStep(2)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                Next →
              </button>
            )}
          </div>
        )}

{step === 2 && (
  <div className="space-y-6 max-w-6xl mx-auto">
    {/* Top Row: Bank Select + Transaction Date */}
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Bank Select */}
      <div className="flex-1">
        <label className="block text-gray-700 font-medium mb-1">Bank Code</label>
        <BankSelect
          value={bankCode}
          onChange={(val) => setBankCode(val)}
        />
      </div>

      {/* Transaction Date */}
      <div className="flex-1">
        <label className="block text-gray-700 font-medium mb-1">Transaction Date</label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
        />
      </div>
    </div>

    {/* Excel Preview Table */}
    <div className="overflow-x-auto border rounded-lg shadow-md max-h-72">
      <table className="w-full text-sm border-collapse">
     
      <thead className="bg-blue-100 sticky top-0">
        <tr>
          {Object.keys(excelData[0] || {}).map((key, i) => {
            // Replace Debit/Credit and remove all spaces
            let displayKey = key
              .replace(/\bDebit\b/gi, "-Dr-")
              .replace(/\bCredit\b/gi, "-Cr-")
              .replace(/\bAccount\b/gi, "-Acc-")
              .replace(/\bOther\b/gi, "-Oth-")
              .replace(/\s+/g, ""); // remove all spaces

            return (
              <th
                key={i}
                className="p-2 border text-sm text-gray-700 font-medium text-left whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {displayKey}
              </th>
            );

           
         
          })}
    
            </tr>
      </thead>



        <tbody>
          {excelData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {Object.keys(row).map((k, i) => (
                <td
                  key={i}
                  className="p-2 border text-gray-600 text-left"
                >
                  {row[k]}
                </td>
              ))}
            </tr>
          ))}

          {/* Total Row  for the -(last two columns neglected here*/}
        <tr className="bg-gray-200 font-bold">
          {columns.map((col, i) => (
            <td key={i} className="p-2 border text-gray-700 text-left">
              {columnTotals[col]}
            </td>
          ))}
        </tr>
        </tbody>
      </table>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        onClick={handleSubmit}
        className="bg-primary hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
          Submit to Database
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default SakaForm1Input;

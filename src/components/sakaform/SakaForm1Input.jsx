 
import Breadcrumb from "../common/Breadcrumb";
import * as XLSX from "xlsx";
import BankSelect from "../common/BankSelect";
 
import { useMemo, useRef, useState } from "react";
 

function SakaForm1Input() {
const [step, setStep] = useState(1);
const [excelData, setExcelData] = useState([]);
const [fileName, setFileName] = useState("");
const [bankCode, setBankCode] = useState("");
const [transactionDate, setTransactionDate] = useState("");
const [successMessage, setSuccessMessage] = useState("");

const fileInputRef = useRef(null);
// ----------------------
// Excel Upload
// ----------------------
const handleExcelUpload = (e) => {
  setSuccessMessage("");

  const file = e.target.files[0];
  if (!file) return;

  setFileName(file.name);
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", blankrows: false });

    const normalize = (str) => {
      if (str == null) return "";
      return str.toString().replace(/[\r\n]/g, "").replace(/\s+/g, "").trim().toLowerCase();
    };

    const headerIdx = rawRows.findIndex((r) => r.some((c) => normalize(c) === "branchcode"));

    if (headerIdx === -1) {
      alert("Excel Header row not found!");
      return;
    }

    const headerRow = rawRows[headerIdx];

    const colMap = {};
    headerRow.forEach((cell, i) => {
      if (cell != null) colMap[i] = normalize(cell);
    });

    const cleanRows = [];
    for (let i = headerIdx + 1; i < rawRows.length; i++) {
      const src = rawRows[i];
      if (!src || src.every((c) => c === "")) continue;

      const obj = {};
      src.forEach((cell, idx) => {
        const header = colMap[idx] || "";
        obj[header] = cell ?? "";
      });

      if (/^\d+$/.test(obj["branchcode"]) || /^\d+$/.test(obj["nrbcode"])) {
        cleanRows.push(obj);
      }
    }

    if (cleanRows.length === 0) {
      alert("No clean branch rows found!");
      return;
    }

    setExcelData(cleanRows);
  };

  reader.readAsArrayBuffer(file);
};

// ----------------------
// Submit
// ----------------------
const handleSubmit = () => {
  const payload = { bankCode, transactionDate, excelData };
// ✅ Validate required fields
  if (!bankCode.trim() || !transactionDate.trim() || excelData.length === 0) {
    alert("Please fill Bank Code, Transaction Date, and upload Excel data before submitting.");
    return; // stop here
  }


  console.log("Sending to DB:", payload);

  clearInputFiles();
  setStep(1);
  setSuccessMessage("✅ Submitted Successfully!");
};

// ----------------------
// Clear inputs
// ----------------------
function clearInputFiles() {
  setSuccessMessage("");
  setExcelData([]);
  setFileName("");
  setBankCode("");
  setTransactionDate("");

  if (fileInputRef.current) {
    fileInputRef.current.value = null;
  }
}

// ----------------------
// Column Totals using useMemo
// ----------------------
const columns = Object.keys(excelData[0] || {});
const columnTotals = useMemo(() => {
  const totals = {};
  columns.forEach((col) => {
    if (/Debit|Credit|Receivable/i.test(col)) {
      totals[col] = excelData.reduce((sum, row) => {
        const value = parseFloat(row[col]);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
    } else {
      totals[col] = "";
    }
  });
  return totals;
}, [excelData]); // ✅ 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-1xl font-bold text-blue-700 mb-4">📊 Saka Form 1</h1>
      {successMessage && (
  <p className="text-green-600 font-medium mb-2">{successMessage}</p>
)}

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
    <ul>
 
</ul>
        <p className="text-gray-500 mb-4">Stage {step} of 2</p>

 {/* STEP 1 */}
{step === 1 && (
  <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg hover:bg-gray-50 transition">
    
    {/* File Input */}
        <div className="text-center mb-4">
          <label
            className="bg-primary hover:opacity-90 transition duration-200 text-white font-medium px-5 py-2 rounded-lg cursor-pointer inline-block"
          >
            📁 Upload Excel
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleExcelUpload}
              ref={fileInputRef}
              className="hidden" // hide the default file input
            />
          </label>

          {/* Show selected file name */}
          {fileName && (
            <p className="text-sm text-gray-600 mt-2">Selected File: {fileName}</p>
          )}
        </div>

            <div className="flex justify-center gap-4 mt-4">
      {/* Next Button */}
      {excelData.length > 0 && (
        <button
          onClick={
            // now later put logic if the rows are less than 10,
            () => setStep(2)}
          className="bg-primary hover:opacity-90 transition duration-200 text-white px-2 py-2 rounded-lg shadow-md transition"
        >
          Next →
        </button>
      )}

      {/* Clear File Button */}
      {excelData.length > 0 || fileName ? (
        <button
          onClick={() => {
            // Clear all relevant states
           clearInputFiles()
          }}
          className="bg-gray-400 hover:opacity-90 transition duration-200 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          Clear File
        </button>
      ) : null}
    </div>
  </div>
)}
{step === 2 && (
  <div className="space-y-6   mx-auto">
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
                {displayKey.toUpperCase()}
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

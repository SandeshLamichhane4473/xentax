import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";

const SakaForm1View = () => {
  // Dummy data
  const [tableData] = useState(
    Array.from({ length: 282 }, (_, i) => ({
      BANK_CODE: `1100${(i % 50).toString().padStart(4, "0")}`,
      TRANS_DATE: "2025-11-01",
      PHERIST_NO: `${(i % 100).toString().padStart(4, "0")}`,
      PHERIST_DATE: "2025-11-01",
      TRANS_REF: 0,
      TRANS_SEQ: 0,
      NIKASA_DR: Math.floor(Math.random() * 10000),
      NIKASA_CR: Math.floor(Math.random() * 10000),
      REVENUE_DR: Math.floor(Math.random() * 5000),
      REVENUE_CR: Math.floor(Math.random() * 5000),
      GOV_ACC_DR: Math.floor(Math.random() * 7000),
      GOV_ACC_CR: Math.floor(Math.random() * 7000),
      LOC_GOV_ACC_DR: Math.floor(Math.random() * 3000),
      LOC_GOV_ACC_CR: Math.floor(Math.random() * 3000),
      H_LOC_GOV_ACC_DR: Math.floor(Math.random() * 2000),
      H_LOC_GOV_ACC_CR: Math.floor(Math.random() * 2000),
      RECEIVABLE_AMT: 0.0,
      PAYABLE_AMT: 0.0,
      INPT_USER: "admin",
      CTRL_USER: "supervisor",
    }))
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Search Filters
  const [searchField, setSearchField] = useState("BANK_CODE");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Filtering Logic (Handles both text & date search)
  const filteredData = tableData.filter((row) => {
    const matchesText =
      searchTerm === "" ||
      row[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      searchDate === "" ||
      row[searchField] === searchDate ||
      row["PHERIST_DATE"] === searchDate ||
      row["TRANS_DATE"] === searchDate;

    return matchesText && matchesDate;
  });

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Pagination handlers
  const handleFirst = () => setCurrentPage(1);
  const handleLast = () => setCurrentPage(totalPages);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">SakaForm1 View Table</h2>
      <Breadcrumb
        items={[
          { label: "SakaForm", path: "/dashboard/sakaform" },
           { label: "SakaForm1", path: "/dashboard/sakaform" },
          { label: "Input", path: "/dashboard/sakaform/sakaform1input" },
          { label: "Validate", path: "/dashboard/sakaform/sakaform1validate" },
          { label: "View" }
        ]}
      />

      {/* Search Section */}
      <div className="flex flex-wrap items-center mb-4 space-x-2">
        {/* Select Search Field */}
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="BANK_CODE">Bank Code</option>
          <option value="PHERIST_NO">Pherist No</option>
          <option value="TRANS_DATE">Transaction Date</option>
          <option value="PHERIST_DATE">Pherist Date</option>
        </select>

        {/* Text Search */}
        <input
          type={searchField.includes("DATE") ? "date" : "text"}
          value={searchField.includes("DATE") ? searchDate : searchTerm}
          onChange={(e) =>
            searchField.includes("DATE")
              ? setSearchDate(e.target.value)
              : setSearchTerm(e.target.value)
          }
          placeholder={`Search by ${searchField}`}
          className="px-2 py-1 border rounded w-64"
        />

        <button
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 bg-primary text-white rounded hover:opacity-90"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1600px] border border-gray-300 text-[12px] whitespace-nowrap table-auto">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2 sticky left-0 bg-primary z-40">BANK CODE</th>
              <th className="p-2">TRANS DATE</th>
              <th className="p-2">PHERIST NO</th>
              <th className="p-2">PHERIST DATE</th>
              <th className="p-2">TRANS REF</th>
              <th className="p-2">TRANS SEQ</th>
              <th className="p-2">NIKASA DR</th>
              <th className="p-2">NIKASA CR</th>
              <th className="p-2">REVENUE DR</th>
              <th className="p-2">REVENUE CR</th>
              <th className="p-2">GOV ACC DR</th>
              <th className="p-2">GOV ACC CR</th>
              <th className="p-2">LOC GOV ACC DR</th>
              <th className="p-2">LOC GOV ACC CR</th>
              <th className="p-2">H LOC GOV ACC DR</th>
              <th className="p-2">H LOC GOV ACC CR</th>
              <th className="p-2">RECEIVABLE AMT</th>
              <th className="p-2">PAYABLE AMT</th>
              <th className="p-2">INPT USER</th>
              <th className="p-2">CTRL USER</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="p-2">{indexOfFirstRecord + index + 1}</td>
                <td className="p-2 sticky left-0 bg-white z-30">{row.BANK_CODE}</td>
                <td className="p-2">{row.TRANS_DATE}</td>
                <td className="p-2">{row.PHERIST_NO}</td>
                <td className="p-2">{row.PHERIST_DATE}</td>
                <td className="p-2">{row.TRANS_REF}</td>
                <td className="p-2">{row.TRANS_SEQ}</td>
                <td className="p-2">{row.NIKASA_DR.toFixed(2)}</td>
                <td className="p-2">{row.NIKASA_CR.toFixed(2)}</td>
                <td className="p-2">{row.REVENUE_DR.toFixed(2)}</td>
                <td className="p-2">{row.REVENUE_CR.toFixed(2)}</td>
                <td className="p-2">{row.GOV_ACC_DR.toFixed(2)}</td>
                <td className="p-2">{row.GOV_ACC_CR.toFixed(2)}</td>
                <td className="p-2">{row.LOC_GOV_ACC_DR.toFixed(2)}</td>
                <td className="p-2">{row.LOC_GOV_ACC_CR.toFixed(2)}</td>
                <td className="p-2">{row.H_LOC_GOV_ACC_DR.toFixed(2)}</td>
                <td className="p-2">{row.H_LOC_GOV_ACC_CR.toFixed(2)}</td>
                <td className="p-2">{row.RECEIVABLE_AMT.toFixed(2)}</td>
                <td className="p-2">{row.PAYABLE_AMT.toFixed(2)}</td>
                <td className="p-2">{row.INPT_USER}</td>
                <td className="p-2">{row.CTRL_USER}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <span>
          Records: {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, totalRecords)} of{" "}
          {totalRecords}
        </span>
        <div className="flex space-x-2">
          <button onClick={handleFirst} disabled={currentPage === 1} className="px-2 py-1 border rounded">
            &lt;&lt;
          </button>
          <button onClick={handlePrev} disabled={currentPage === 1} className="px-2 py-1 border rounded">
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="px-2 py-1 border rounded">
            &gt;
          </button>
          <button onClick={handleLast} disabled={currentPage === totalPages} className="px-2 py-1 border rounded">
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SakaForm1View;
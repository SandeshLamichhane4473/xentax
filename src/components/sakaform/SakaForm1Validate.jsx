import React, { useState } from "react";

const SakaForm1Validate = () => {
  // ✅ Dummy Data
  const [tableData] = useState([
    {
      BANK_CODE: "11002102",
      BRANCH_NAME: "RAMECHAP",
      KA11_DEBIT: 1000,
      KA11_CREDIT: 1200,
      KA12_TOTAL: 2200,
      REMARKS: "",
    },
    {
      BANK_CODE: "11002104",
      BRANCH_NAME: "DHULIKHEL",
      KA11_DEBIT: 900,
      KA11_CREDIT: 1100,
      KA12_TOTAL: 2000,
      REMARKS: "Check",
    },
    {
      BANK_CODE: "11002105",
      BRANCH_NAME: "GAJURI",
      KA11_DEBIT: 1500,
      KA11_CREDIT: 1300,
      KA12_TOTAL: 2800,
      REMARKS: "Verified",
    },
  ]);

  // ✅ Validate Button Action
  const handleValidateClick = (row) => {
    alert(`Validating data for BANK: ${row.BANK_CODE} at BRANCH: ${row.BRANCH_NAME}`);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">SakaForm1 Validation Table</h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-max table-auto border border-gray-300 text-[12px] whitespace-nowrap">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2 sticky left-0 bg-primary z-40">BANK CODE</th>
              <th className="p-2">BRANCH NAME</th>
              <th className="p-2">KA 1.1 DEBIT (A)</th>
              <th className="p-2">KA 1.1 CREDIT (B)</th>
              <th className="p-2">KA 1.2 TOTAL (C = A + B)</th>
              <th className="p-2">REMARKS</th>
              <th className="p-2">Validate</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 sticky left-0 bg-white z-30">
                  {row.BANK_CODE}
                </td>
                <td className="p-2">{row.BRANCH_NAME}</td>
                <td className="p-2">{row.KA11_DEBIT}</td>
                <td className="p-2">{row.KA11_CREDIT}</td>
                <td className="p-2">{row.KA12_TOTAL}</td>
                <td className="p-2">{row.REMARKS}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleValidateClick(row)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Validate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SakaForm1Validate;

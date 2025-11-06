// src/components/common/BankSelect.jsx
import { useState } from "react";

const BankSelect = ({ value, onChange }) => {
  const banks = [
    { id: 1, name: "Nepal Bank Limited" },
    { id: 2, name: "Rastriya Banijya Bank" },
    { id: 3, name: "Nabil Bank" },
    { id: 4, name: "SBI Bank" },
  ];

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Bank --</option>
        {banks.map((bank) => (
          <option key={bank.id} value={bank.name}>
            {bank.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BankSelect;

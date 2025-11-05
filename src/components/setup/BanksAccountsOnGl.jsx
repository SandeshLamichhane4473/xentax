import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import BankAccountForm from "./BanksAccountsOnGlForm";

const initialBanks = [
  {
    code: "11001",
    name: "NEPAL BANK LTD.",
    // individual fields (split from the long tableDescription)
    vostroAccount: "1205102041000524",
    ka82Kharcha: "1205102017902524",
    ka81Rajashwo: "1205102002902524",
    ka83Other: "1205102017000524",
    ga81Local: "1205102017001524",
    ga81Local50: "1205102017002524",
    ka84Other: "1205102018000524",
    ka81USD: "1205102002902840",
    vostroUSD: "1205102041000840",
    status: "Active",
  },
  {
    code: "11002",
    name: "RASTRIYA BANIJYA BANK",
    vostroAccount: "1205101041000524",
    ka82Kharcha: "1205101017901524",
    ka81Rajashwo: "1205101002901524",
    ka83Other: "1205101017000524",
    ga81Local: "1205101017001524",
    ga81Local50: "1205101017002524",
    ka84Other: "1205101018000524",
    ka81USD: "1205101002902840",
    vostroUSD: "1205101041000840",
    status: "Active",
  },
];

const BanksAccountsOnGl = () => {
  const [banks, setBanks] = useState(initialBanks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState(null);

  const handleAddClick = () => {
    setEditingBank(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (bank) => {
    setEditingBank(bank);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (code) => {
    if (window.confirm("Are you sure you want to delete this bank and its accounts?")) {
      setBanks(banks.filter((b) => b.code !== code));
    }
  };

  const handleSubmit = (data) => {
    if (editingBank) {
      setBanks(banks.map((b) => (b.code === data.code ? data : b)));
    } else {
      // prevent duplicate code
      if (banks.some((b) => b.code === data.code)) {
        alert("Bank code already exists.");
        return;
      }
      setBanks([...banks, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={[{ label: "Setup", path: "/dashboard/setup" }, { label: "Banks (GL Accounts)" }]} />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Banks — GL Accounts</h2>
        <button onClick={handleAddClick} className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm">
          + Add Bank Accounts
        </button>
      </div>

            <div className="overflow-x-auto w-full">
            <table className="min-w-[900px] border"> {/* use min-w if table is wide */}
                <thead className="bg-primary text-white">
                <tr>
                    <th className="border p-2">Code</th>
                    <th className="border p-2">Bank Name</th>
                    <th className="border p-2">Key Accounts (preview)</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {banks.map((bank) => (
                    <tr key={bank.code} className="hover:bg-gray-100 bg-white">
                    <td className="border p-2">{bank.code}</td>
                    <td className="border p-2 whitespace-nowrap">{bank.name}</td>

                    <td className="border p-2">
                        <div className="flex text-xs space-x-4">
                        <div><strong>Vostro NPR:</strong> {bank.vostroAccount || "-"}</div>
                        <div><strong>Ka 8.2 NPR:</strong> {bank.ka82Kharcha || "-"}</div>
                        <div><strong>Ka 8.1 NPR:</strong> {bank.ka81Rajashwo || "-"}</div>
                        <div><strong>Ka 8.3 NPR:</strong> {bank.ka83Other || "-"}</div>
                        <div><strong>Ga 8.1 NPR:</strong> {bank.ga81Local || "-"}</div>
                        <div><strong>Ga 8.1 NPR 50%:</strong> {bank.ga81Local50 || "-"}</div>
                        <div><strong>Ka 8.4 NPR:</strong> {bank.ka84Other || "-"}</div>
                        <div><strong>Ka 8.1 USD:</strong> {bank.ka81USD || "-"}</div>
                        <div><strong>Vostro USD:</strong> {bank.vostroUSD || "-"}</div>
                        </div>
                    </td>

                    <td className="border p-2">{bank.status}</td>
                    <td className="border p-2 space-x-2 whitespace-nowrap" >
                        <button onClick={() => handleEditClick(bank)} className="text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteClick(bank.code)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                    </tr>
                ))}
                {banks.length === 0 && (
                    <tr>
                    <td colSpan={5} className="border p-4 text-center text-gray-500">No banks found</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBank ? "Edit Bank Accounts" : "Add Bank & Accounts"}
        >
          <BankAccountForm initialData={editingBank} onSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default BanksAccountsOnGl;

import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import BankForm from "./BankForm";

const initialBankData = [
  { code: 10001, name: "NEPAL RASTRA BANK", description: "NRB", status: "A" },
  { code: 11001, name: "NEPAL BANK LTD.", description: "NBL1205102041000524", status: "A" },
  // ... more banks
];

const Banks = () => {
  const [banks, setBanks] = useState(initialBankData);
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
    if (window.confirm("Are you sure you want to delete this bank?")) {
      setBanks(banks.filter((b) => b.code !== code));
    }
  };

  const handleSubmit = (data) => {
    if (editingBank) {
        console.log("Ediding")
        console.log(data)
      // Update existing bank
      setBanks(banks.map((b) => (b.code === data.code ? data : b)));
    } else {
      // Add new bank
      console.log(data)
      setBanks([...banks, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Banks" }
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Banks</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Bank
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border p-2">Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Abbreviation</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr key={bank.code} className="hover:bg-gray-100 bg-white">
              <td className="border p-2">{bank.code}</td>
              <td className="border p-2">{bank.name}</td>
              <td className="border p-2">{bank.description}</td>
              <td className="border p-2">{bank.status === "A" ? "Active" : "Passive"}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditClick(bank)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(bank.code)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBank ? "Edit Bank" : "Add Bank"}
        >
          <BankForm
            initialData={editingBank}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Banks;

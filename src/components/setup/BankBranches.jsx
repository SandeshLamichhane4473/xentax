import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import BankBranchForm from "./BankBranchForm"; // similar to BankForm.jsx

const initialBranchData = [
  { bank: "000", branch: "158", name: "Amritgung (Simraungadh)", description: "ADBL", status: "A" },
  { bank: "00000", branch: "000", name: "", description: "", status: "A" },
  { bank: "10001", branch: "000", name: "NRB-CENTRAL OFFICE", description: "NRB", status: "A" },
  { bank: "10001", branch: "001", name: "NRB-BANKING OFFICE", description: "NRB", status: "A" },
  { bank: "10001", branch: "002", name: "NRB-BIRATNAGAR", description: "NRB", status: "A" },
  // ... more branches
];

const BankBranches = () => {
  const [branches, setBranches] = useState(initialBranchData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [banks] = useState([
  { code: '1001', name: 'Nepal Bank Ltd' },
  { code: '1002', name: 'Rastriya Banijya Bank' },
  { code: '1003', name: 'Nabil Bank' },
  { code: '1004', name: 'Siddhartha Bank' },
]);

  const handleAddClick = () => {
    setEditingBranch(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (branch) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (bank, branch) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter((b) => !(b.bank === bank && b.branch === branch)));
    }
  };

  const handleSubmit = (data) => {
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map((b) =>
        b.bank === data.bank && b.branch === data.branch ? data : b
      ));
    } else {
      // Add new branch
      setBranches([...branches, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Bank Branches" }
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Bank Branches</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Branch
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border p-2">Bank Code</th>
            <th className="border p-2">Branch Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Bank Symbol</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={`${branch.bank}-${branch.branch}`} className="hover:bg-gray-100 bg-white">
              <td className="border p-2">{branch.bank}</td>
              <td className="border p-2">{branch.branch}</td>
              <td className="border p-2">{branch.name}</td>
              <td className="border p-2">{branch.description}</td>
              <td className="border p-2">{branch.status === "A" ? "Active" : "Passive"}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditClick(branch)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(branch.bank, branch.branch)}
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
          title={editingBranch ? "Edit Branch" : "Add Branch"}
        >
          <BankBranchForm
            initialData={editingBranch}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
            banks={banks}  
          />
        </Modal>
      )}
    </div>
  );
};

export default BankBranches;

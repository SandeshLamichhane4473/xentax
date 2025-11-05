import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import LocalGvtGrantForm from "./LocalGvtGrantForm";

const initialLocalGvtGrants = [
  { code: "01", name: "LOCAL GOVERNMENT GRANT PERCENTAGE", tableDescription: "80", status: "Active" },
];

const LocalGvtGrant = () => {
  const [grants, setGrants] = useState(initialLocalGvtGrants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrant, setEditingGrant] = useState(null);

  const handleAddClick = () => {
    setEditingGrant(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (grant) => {
    setEditingGrant(grant);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (code) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setGrants(grants.filter((g) => g.code !== code));
    }
  };

  const handleSubmit = (data) => {
    if (editingGrant) {
      setGrants(grants.map((g) => (g.code === data.code ? data : g)));
    } else {
      setGrants([...grants, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Local Government Grant Percentage" },
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Local Government Grant Percentage</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Entry
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[500px] border">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Grant Percentage</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grants.map((grant) => (
              <tr key={grant.code} className="hover:bg-gray-100 bg-white">
                <td className="border p-2 whitespace-nowrap">{grant.code}</td>
                <td className="border p-2 whitespace-nowrap">{grant.name}</td>
                <td className="border p-2">{grant.tableDescription}</td>
                <td className="border p-2">{grant.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEditClick(grant)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(grant.code)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {grants.length === 0 && (
              <tr>
                <td colSpan={5} className="border p-4 text-center text-gray-500">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingGrant ? "Edit Entry" : "Add Entry"}
        >
          <LocalGvtGrantForm
            initialData={editingGrant}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default LocalGvtGrant;

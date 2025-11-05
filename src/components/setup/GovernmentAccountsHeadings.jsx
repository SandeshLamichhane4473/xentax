import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import GovernmentAccountsHeadingForm from "./GovernmentAccountsHeadingForm";

const initialGovtAccountsHeadings = [
  { code: "113", name: "Ka 2.1 Budget Expenditure A/c-Odd Year", tableDescription: "N", status: "Active" },
  { code: "114", name: "Ka 2.2 Budget Expenditure A/c-Even Year", tableDescription: "N", status: "Active" },
  { code: "115", name: "Ka 2.3 Dharauti", tableDescription: "N", status: "Active" },
  { code: "118", name: "Ka 2.4 Special A/c (Loan)", tableDescription: "N", status: "Active" },
];

const GovernmentAccountsHeadings = () => {
  const [headings, setHeadings] = useState(initialGovtAccountsHeadings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeading, setEditingHeading] = useState(null);

  const handleAddClick = () => {
    setEditingHeading(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (heading) => {
    setEditingHeading(heading);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (code) => {
    if (window.confirm("Are you sure you want to delete this heading?")) {
      setHeadings(headings.filter((h) => h.code !== code));
    }
  };

  const handleSubmit = (data) => {
    if (editingHeading) {
      setHeadings(headings.map((h) => (h.code === data.code ? data : h)));
    } else {
      setHeadings([...headings, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Government Accounts Headings" },
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Government Accounts Headings</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Government Account Heading
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-primary text-white">
          <tr>
            <th className="border p-2">Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Table Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {headings.map((heading) => (
            <tr key={heading.code} className="hover:bg-gray-100 bg-white">
              <td className="border p-2">{heading.code}</td>
              <td className="border p-2">{heading.name || "-"}</td>
              <td className="border p-2">{heading.tableDescription === "Y" ? "Yes" : "No"}</td>
              <td className="border p-2">{heading.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditClick(heading)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(heading.code)}
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
          title={editingHeading ? "Edit Government Account Heading" : "Add Government Account Heading"}
        >
          <GovernmentAccountsHeadingForm
            initialData={editingHeading}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default GovernmentAccountsHeadings;

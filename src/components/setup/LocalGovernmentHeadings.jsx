import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import LocalGovernmentHeadingForm from "./LocalGovernmentHeadingForm";

const initialLocalGovtHeadings = [
  { code: "3100", name: "Ga.1.Local Authority Income", tableDescription: "N", status: "Active" },
  { code: "3101", name: "Ga.1.1.HMG Grant(Current Expenditure)", tableDescription: "N", status: "Cancelled" },
  { code: "3102", name: "Ga.1.2.HMG Grant(Capital Expenditure)", tableDescription: "N", status: "Cancelled" },
  { code: "3103", name: "Ga.1.3.Local Authority Internal Source", tableDescription: "N", status: "Cancelled" },
  { code: "3104", name: "Ga.1.4.Income from Rev. Allocation", tableDescription: "N", status: "Cancelled" },
  { code: "3105", name: "Ga.1.5.Foreign Debt and Grant", tableDescription: "N", status: "Cancelled" },
  { code: "3106", name: "Ga.1.6.Internal Debt and Misc.", tableDescription: "N", status: "Cancelled" },
  { code: "3200", name: "Ga.2.Local Community Expenditure", tableDescription: "N", status: "Active" },
];

const LocalGovernmentHeadings = () => {
  const [headings, setHeadings] = useState(initialLocalGovtHeadings);
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
          { label: "Local Government Headings" },
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Local Government Headings</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Local Govt Heading
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
          title={editingHeading ? "Edit Local Govt Heading" : "Add Local Govt Heading"}
        >
          <LocalGovernmentHeadingForm
            initialData={editingHeading}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default LocalGovernmentHeadings;

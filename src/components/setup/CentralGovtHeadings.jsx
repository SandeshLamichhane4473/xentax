import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import CentralGovtHeadingForm from "./CentralGovtHeadingsForm";

const initialCentralGovtHeadings = [
  { code: "1062300", name: "Nikasa (Ka.4 Current)", tableDescription: "Y", status: "Active" },
  { code: "1062310", name: "Ka 4.1.H.M.G. Source", tableDescription: "N", status: "Active" },
  { code: "1062320", name: "Ka 4.2.Frgn.Asst.(Refundable Grant)", tableDescription: "N", status: "Active" },
  { code: "1062330", name: "Ka.4.3.Frgn.Asst.(Cash Grant)", tableDescription: "N", status: "Active" },
  { code: "1062340", name: "Ka.4.4.Frgn.Asst.(Refundable Debt)", tableDescription: "N", status: "Active" },
  { code: "1062350", name: "Ka.4.5.Frgn.Asst.(Cash Debt)", tableDescription: "N", status: "Active" },
  { code: "1062400", name: "Nikasa (Ka.5 Capital)", tableDescription: "Y", status: "Active" },
  { code: "1062410", name: "Ka 5.1.H.M.G. Source", tableDescription: "N", status: "Active" },
  { code: "1062420", name: "Ka 5.2.Frgn.Asst.(Refundable Grant)", tableDescription: "N", status: "Active" },
  { code: "1062430", name: "Ka.5.3.Frgn.Asst.(Cash Grant)", tableDescription: "N", status: "Active" },
  { code: "1062440", name: "Ka.5.4.Frgn.Asst.(Refundable Debt)", tableDescription: "N", status: "Active" },
  { code: "1062450", name: "Ka.5.5.Frgn.Asst.(Cash Debt)", tableDescription: "N", status: "Active" },
  { code: "1062500", name: "", tableDescription: "Y", status: "Active" },
  { code: "1062600", name: "", tableDescription: "Y", status: "Active" },
  { code: "1062700", name: "Nikasa (Ka.6.Principal Payment)", tableDescription: "Y", status: "Active" },
  { code: "1062710", name: "Ka.6.Principal Payment", tableDescription: "N", status: "Active" },
];

const CentralGovtHeadings = () => {
  const [headings, setHeadings] = useState(initialCentralGovtHeadings);
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
          { label: "Central Government Headings" },
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Central Government Headings</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Central Govt Heading
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
          title={editingHeading ? "Edit Central Govt Heading" : "Add Central Govt Heading"}
        >
          <CentralGovtHeadingForm
            initialData={editingHeading}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CentralGovtHeadings;
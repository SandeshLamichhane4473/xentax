import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Modal from "../Modal";
import RevenueHeadingForm from "./RevenueHeadingForm";

const initialRevenueHeadings = [
  { code: "11340", name: "Taxes on Financial and Capital Transactions", tableDescription: "Y", status: "Cancelled" },
  { code: "11341", name: "House and Land Registration", tableDescription: "N", status: "Cancelled" },
  { code: "11350", name: "Taxes on Financial and Capital Transactions", tableDescription: "N", status: "Active" },
  { code: "11351", name: "TAX ON FINANCIAL OR CAPITAL TRANSACTION", tableDescription: "Y", status: "Active" },
  { code: "11400", name: "Taxes on Goods and Services", tableDescription: "Y", status: "Active" },
  { code: "11410", name: "VAT", tableDescription: "Y", status: "Active" },
  { code: "11411", name: "badfad vae prapta hunay mu.aa.kar", tableDescription: "N", status: "Active" },
  { code: "11412", name: "Vat-from other sources except divisible", tableDescription: "N", status: "Active" },
  { code: "11413", name: "mu.aa.ka.-bastu bikri ra bitarad sankalan", tableDescription: "N", status: "Cancelled" },
  { code: "11414", name: "mu.aa.ka.-paramarsa tatha thekka sankalan", tableDescription: "N", status: "Active" },
];

const RevenueHeadings = () => {
  const [headings, setHeadings] = useState(initialRevenueHeadings);
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
      setHeadings(
        headings.map((h) => (h.code === data.code ? data : h))
      );
    } else {
        console.log(data)
      setHeadings([...headings, data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Setup", path: "/dashboard/setup" },
          { label: "Government Revenue Headings" },
        ]}
      />

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Government Revenue Headings</h2>
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          + Add Revenue Heading
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
              <td className="border p-2">{heading.name}</td>
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
          title={editingHeading ? "Edit Revenue Heading" : "Add Revenue Heading"}
        >
          <RevenueHeadingForm
            initialData={editingHeading}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default RevenueHeadings;

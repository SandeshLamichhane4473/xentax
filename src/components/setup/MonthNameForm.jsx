import React, { useState, useEffect } from "react";

const MonthNameForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "✏ Edit Month" : "➕ Add Month"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="border w-full px-2 py-1 mb-2"
            required
            disabled={!!initialData} // Disable code during edit
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full px-2 py-1 mb-2"
            required
          />

          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border w-full px-2 py-1 mb-4"
          >
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 px-3 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthNameForm;

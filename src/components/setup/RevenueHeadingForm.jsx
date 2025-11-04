import { useState, useEffect } from "react";

const RevenueHeadingForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    tableDescription: "N",
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
    if (!formData.code || !formData.name) {
      alert("Code and Name are required!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block mb-1 font-medium">Revenue Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={!!initialData} // Disable editing of code if updating
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Revenue Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Is Heading (Y/N)</label>
        <select
          name="tableDescription"
          value={formData.tableDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default RevenueHeadingForm;

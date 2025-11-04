import { useState } from "react";
const BankForm = ({ initialData, onSubmit, onClose }) => {
  // If initialData is null, fallback to empty object
  const safeInitialData = initialData || {};

  const [formData, setFormData] = useState({
    code: safeInitialData.code || "",
    name: safeInitialData.name || "",
    description: safeInitialData.description || "",
    status: safeInitialData.status || "A", // default Active
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block mb-1 font-medium">Bank Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={!!safeInitialData.code} // disable if editing
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Bank Name</label>
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
        <label className="block mb-1 font-medium">Abbreviation(Short)</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="A">Active</option>
          <option value="P">Passive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md font-semibold"
      >
        {safeInitialData.code ? "Update Bank" : "Add Bank"}
      </button>
    </form>
  );
};

export default BankForm;

import { useState, useEffect } from "react";

const BankBranchForm = ({ initialData, onSubmit, onClose, banks=[] }) => {
  const [formData, setFormData] = useState({
    bankCode: "",
    branch: "",
    name: "",
    description: "",
    status: "A", // default to Active
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    console.log(formData.bankCode + formData.branch  +formData.name)
    if (!formData.bankCode|| !formData.branch || !formData.name) {
      alert("Please fill in all required fields (Bank, Branch, Name).");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Bank Code Dropdown */}
      <div>
        <label className="block mb-1 font-medium">Bank Code</label>
            <select
            name="bankCode"
            value={formData.bankCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            >
            <option value="">-- Select Bank --</option>
            {banks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                {bank.code} - {bank.name}
                </option>
            ))}
            </select>
      </div>

      {/* Branch Code */}
      <div>
        <label className="block mb-1 font-medium">Branch Code</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={!!initialData}
        />
      </div>

      {/* Branch Name */}
      <div>
        <label className="block mb-1 font-medium">Branch Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Bank Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Status */}
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

      {/* Buttons */}
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

export default BankBranchForm;

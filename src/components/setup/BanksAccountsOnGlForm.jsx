import { useState, useEffect } from "react";

const emptyModel = {
  code: "",
  name: "",
  vostroAccount: "",
  ka82Kharcha: "",
  ka81Rajashwo: "",
  ka83Other: "",
  ga81Local: "",
  ga8150Local: "",
  ka84OtherInstitutions: "",
  ka81UsdRajashwo: "",
  usdVostro: "",
  status: "Active",
};

const BankAccountForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(emptyModel);

  useEffect(() => {
    if (initialData) setFormData({ ...emptyModel, ...initialData });
    else setFormData(emptyModel);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation: code, name required, and account numbers should be numeric-ish when present
    if (!formData.code?.toString().trim() || !formData.name?.trim()) {
      alert("Bank code and Bank name are required.");
      return;
    }

    // optional: validate GL account formats (simple numeric check)
    const accountFields = [
      "vostroAccount",
      "ka82Kharcha",
      "ka81Rajashwo",
      "ka83Other",
      "ga81Local",
      "ga8150Local",
      "ka84OtherInstitutions",
      "ka81UsdRajashwo",
      "usdVostro",
    ];
    for (const key of accountFields) {
      const val = formData[key];
      if (val && !/^[0-9]+$/.test(val)) {
        // allow empty but if present must be digits
        if (!window.confirm(`${key} looks non-numeric. Do you want to continue?`)) return;
        break;
      }
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {/* Bank code & name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Bank Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            disabled={!!initialData} // do not allow editing code for existing
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
      </div>

      {/* Accounts - grouped */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Vostro Account</label>
          <input name="vostroAccount" value={formData.vostroAccount} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="e.g. 1205102041000524" />
        </div>

        <div>
          <label className="block mb-1 font-medium">USD Vostro Account</label>
          <input name="usdVostro" value={formData.usdVostro} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="e.g. 1205102041000840" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ka 8.2 (Kharcha)</label>
          <input name="ka82Kharcha" value={formData.ka82Kharcha} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ka 8.2 account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ka 8.1 (Rajoswo)</label>
          <input name="ka81Rajashwo" value={formData.ka81Rajashwo} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ka 8.1 account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ka 8.3 (Other)</label>
          <input name="ka83Other" value={formData.ka83Other} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ka 8.3 account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ka 8.4 (Samiti/Parishad/Board)</label>
          <input name="ka84OtherInstitutions" value={formData.ka84OtherInstitutions} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ka 8.4 account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ga 8.1 (Local Govt — main)</label>
          <input name="ga81Local" value={formData.ga81Local} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ga 8.1 account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ga 8.1 (Local Govt — 50%)</label>
          <input name="ga8150Local" value={formData.ga8150Local} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ga 8.1 50% account" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ka 8.1 (USD Rajoswo)</label>
          <input name="ka81UsdRajashwo" value={formData.ka81UsdRajashwo} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" placeholder="Ka 8.1 USD account" />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90">
          {initialData ? "Update" : "Add Bank"}
        </button>
      </div>
    </form>
  );
};

export default BankAccountForm;

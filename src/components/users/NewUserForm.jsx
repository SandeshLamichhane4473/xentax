import { useState } from "react";

const NewUserForm = ({ onSubmit, initialData }) => {
  // fallback to empty object if null/undefined
  const initData = initialData || {};

  const [formData, setFormData] = useState({
    LOGINNAME: initData.LOGINNAME || "",
    USERNAME: initData.USERNAME || "",
    USERPASS: initData.USERPASS || "",
    USERTYPE: initData.USERTYPE || "",
    USERMAIL: initData.USERMAIL || "",
    BANK_CODE: initData.BANK_CODE || "",
    OLY_USERCODE: initData.OLY_USERCODE || "",
    USERPRIV: initData.USERPRIV || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // reset form if needed
    setFormData({
      LOGINNAME: "",
      USERNAME: "",
      USERPASS: "",
      USERTYPE: "",
      USERMAIL: "",
      BANK_CODE: "",
      OLY_USERCODE: "",
      USERPRIV: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md max-w-md mx-auto">
      
      <div>
        <label className="block mb-1 font-medium">Login Name</label>
        <input
          type="text"
          name="LOGINNAME"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter login name"
          value={formData.LOGINNAME}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="USERNAME"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter username"
          value={formData.USERNAME}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="USERPASS"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter password"
          value={formData.USERPASS}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">User Type</label>
        <input
          type="text"
          name="USERTYPE"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter user type"
          value={formData.USERTYPE}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="USERMAIL"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter email"
          value={formData.USERMAIL}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Bank Code</label>
        <input
          type="text"
          name="BANK_CODE"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter bank code"
          value={formData.BANK_CODE}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">OLY Usercode</label>
        <input
          type="text"
          name="OLY_USERCODE"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter OLY usercode"
          value={formData.OLY_USERCODE}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">User Privileges</label>
        <input
          type="text"
          name="USERPRIV"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter user privileges"
          value={formData.USERPRIV}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition"
      >
        {initialData ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default NewUserForm;

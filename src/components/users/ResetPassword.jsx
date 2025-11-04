import { useState } from "react";

const ResetPassword = ({ onSubmit, onClose, username }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSubmit({ username, newPassword: formData.newPassword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-md shadow-md max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold">Reset Password for {username}</h3>

      <div>
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter new password"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Confirm new password"
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";




function LoginForm() {

  const navigate = useNavigate();
 const { login } = useAuth(); // access login function from context
  const [formData, setFormData] = useState({ username: "", password: "" });


   

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Perform login check here (currently hardcoded)
    if (formData.username === "admin" && formData.password === "1234") {
      // Example user info
      const userInfo = {
        username: "admin",
        access_level: "U",
        token: "example-jwt-token",
      };

      login(userInfo);  // store in context + localStorage
      navigate("/dashboard/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username Field */}
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`/api/register`, formData);
      console.log(data);
      toast.success(data.data.email + "WELCOME", {
        icon: "🚀",
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        icon: false,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div>
        <div>
          <div>
            <h2>Welcome back,</h2>
            <form>
              <label>
                <span>Name</span>
                <input
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </form>
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={!formData.name || !formData.email || loading}
          >
            {loading ? "LOADING" : "SUBMIT"}
          </button>
        </div>
      </div>
    </>
  );
};

export default register;

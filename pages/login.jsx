import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";
import Link from "next/link";
const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`/api/login`, formData);
      console.log(data);
      dispatch({
        type: "LOGIN",
        payload: data.data.user,
      });
      toast.success(data.data.user.name + "WELCOME", {
        icon: "🚀",
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log("ERR", error.response);
      toast.error(error.response, {
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
            disabled={!formData.email || loading}
          >
            {loading ? "LOADING" : "LOGIN"}
          </button>
          <p>
            <Link href="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default login;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const Update = () => {
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    gender: "",
  });

  //   const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log("ID from URL:", id);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)

      .then((res) => {
        const user = res.data;
        console.log("Fetched user data:", user);
        setValues({
          id: user.id || "",
          FirstName: user.FirstName || "",
          LastName: user.LastName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/users/${id}`, values)
      .then(() => {
        navigate("/"); //
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="w-full max-w-lg bg-cyan-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update User Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              FirstName:
            </label>
            <input
              type="text"
              name="FirstName"
              value={values.FirstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter your FirstName"
              required
            />
          </div>

          {/* Last name */}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              LastName:
            </label>
            <input
              type="text"
              name="LastName"
              value={values.LastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter your LastName"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email (Gmail Only):
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your Gmail"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Gender Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Gender:
            </label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex flex-row spaces-between gap-8 py-5">
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="w-[500] text-white py-5 px-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Update
            </Button>
            <div>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;

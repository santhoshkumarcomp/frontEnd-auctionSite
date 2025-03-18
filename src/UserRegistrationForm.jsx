import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import { useNavigate } from "react-router";

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 const {user} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle successful registration here
      console.log("Registration successful:", formData);
      axios
        .post(`https://be-capstone-5rvf.onrender.com/auth/${user}/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // You can reset the form if needed
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      navigate("https://subtle-kleicha-aa8606.netlify.app/");
    }
  };

  return (
    <div class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label htmlFor="name" class="block text-sm font-medium text-gray-700">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.name && (
          <span class="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
  
      <div class="mb-4">
        <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.email && (
          <span class="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
  
      <div class="mb-4">
        <label htmlFor="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.password && (
          <span class="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>
  
      <div class="mb-4">
        <label htmlFor="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.confirmPassword && (
          <span class="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
      </div>
  
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Register
      </button>
    </form>
  </div>
  
  );
};

export default UserRegistrationForm;
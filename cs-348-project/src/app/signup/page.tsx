"use client"
import { useState } from 'react';
import { ICreateUser } from '@/app/lib/users/user';
import { v4 as uuidv4 } from 'uuid';
import createUser from '@/app/lib/users/createUser';

const SignupPage = () => {
  const [formData, setFormData] = useState<ICreateUser>({
    username: "",
    password: "",
    first_name: "", 
    last_name: "", 
    age: 0, 
    gender: "M", 
    strikes: 0,
    user_id: uuidv4()
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' || name === 'strikes' ? parseInt(value) : value,
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.first_name.trim()) tempErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) tempErrors.last_name = "Last name is required.";
    if (formData.age <= 0) tempErrors.age = "Age must be greater than 0.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      await createUser(formData);
      localStorage.setItem('userId', formData.user_id);
      localStorage.setItem('userName', formData.first_name);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-full max-w-lg flex-row">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="font-bold text-2xl text-black">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
        <div className="mb-2">
            <label className="block font-bold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
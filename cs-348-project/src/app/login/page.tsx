"use client"
import { useState } from 'react';
import tryLogin from '@/app/lib/users/login';
import { ILogin } from '../lib/users/user';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<ILogin>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.username.trim()) tempErrors.username = "Username is required.";
    if (!formData.password.trim()) tempErrors.password = "Password is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const res = await tryLogin(formData);
      if (res.length == 0) {
        setErrors({ password: "Invalid username or password." });      
    } else {
        localStorage.setItem('userId', res[0].user_id);
        localStorage.setItem('userName', res[0].first_name);
        router.push("/events")
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-full max-w-lg flex-row">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="font-bold text-2xl text-black">Login</h1>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 bg-gray-100"
              style={{ color: "black" }}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

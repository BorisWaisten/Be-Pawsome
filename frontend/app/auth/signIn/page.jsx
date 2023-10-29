"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      mail: mail.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-300 to-sky-600">
      <div className="w-96 p-7 bg-white rounded-md shadow-lg">
        <div className="mb-4">
          <label htmlFor="mail" className="block text-gray-700">Mail</label>
          <input
            type="email"
            id="mail"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => (mail.current = e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => (pass.current = e.target.value)}
          />
        </div>
        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

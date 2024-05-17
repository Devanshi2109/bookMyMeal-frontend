import React from "react";
import loginImg from "../assest/images/signup-image.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="hidden w-2/3 bg-center bg-cover md:block"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>
      <div className="flex items-center justify-center w-full p-4 md:w-1/2 overflow-y-auto">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;

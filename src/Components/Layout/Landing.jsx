import React, { useState } from "react";
import Button from "../common/Button";
import Login from "../auth/Login";
import Register from "../auth/Register";

function Landing() {
  const[showLogin,setShowLogin]=useState(false);
  const[showRegister,setShowRegister]=useState(false);
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-white py-2 border-b-2 border-gray-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-blue-gray-900 text-2xl font-bold py-3 px-6 rounded-lg">InfoCms</div>
          <div className="lg:flex items-center space-x-6">
            <Button className="bg-black text-white md:py-3 py-2 px-6 rounded-lg text-sm md:text-lg"
            onClick={()=>setShowLogin(true)}>Login</Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-white pt-16 px-5 md:px-0">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block text-xs lg:text-sm rounded-lg border border-blue-100 bg-white py-2 px-4 font-medium text-black mb-4">
            Powerful Solutions for Your Content Management
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-snug mb-6">
            Streamline your content with{" "}
            <span className="text-green-500">our advanced CMS</span>, built for{" "}
            <span className="text-green-500">creators</span> and{" "}
            <span className="text-green-500">marketers</span>.
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
            Organize, manage, and deliver your content efficiently with a system that evolves with your needs.
          </p>

          <div className="mt-4 ">
            <Button className="bg-black text-white py-3 px-6 rounded-lg text-lg" onClick={()=>setShowLogin(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-4 px-5 md:px-0">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">High Performance</h3>
              <p className="text-gray-600">
                Experience fast, reliable content management built for today’s demands.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Top Security</h3>
              <p className="text-gray-600">
                Safeguard your data with the latest security protocols and encryption.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Easy Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing tools and platforms for a smooth workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Login Modal Popup */}
        {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0">
          
            <Login  setShowLogin={ setShowLogin} setShowRegister={setShowRegister}/>
         
        </div>
      )}
      {/* Register Modal Popup */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0 ">
            <Register  setShowLogin={ setShowLogin} setShowRegister={setShowRegister}/>
         
        </div>
      )}
    </>
  );
}


export default Landing;

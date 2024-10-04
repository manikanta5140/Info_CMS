import React, { useState } from "react";
import Button from "../common/Button";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Modal from "./Model";
import { useAuth } from "../../Context/Auth/AuthContext";


function Landing({ themes, useTheme }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demo, setDemo] = useState("theme-light");

  /************************************Modal********************** */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const handleVerify = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     alert('You have been!');
  //     setIsLoading(false);
  //     closeModal();
  //   }, 2000); // Simulate a 2-second loading period
  // }

  const handleResend = () => {
    alert("Verification code resent!");
  };

  const handleThemeChange = (e) => {
    setDemo(e.target.value);
    useTheme(e.target.value);
  };

  return (
    <>
      {/* Navbar Section */}
      <div className="bg-gradient-to-b from-[var(--color-important)] to-white">

        <div
          className={`${
            demo === "theme-dark"
              ? "bg-[url(grid-dark.svg)]"
              : "bg-[url(grid-light.svg)]"
          } bg-[length:300px] bg-repeat`}
        >
          <div className=" py-2">
            <div className="container mx-auto flex items-center justify-between px-4">
              <div className="text-blue-gray-900 text-2xl font-bold py-3 px-6 rounded-lg">
                InfoCms
              </div>
              <div className="lg:flex items-center space-x-6">
                <div>
                  <select
                    onChange={handleThemeChange}
                    className="border border-gray-300 rounded p-2"
                  >
                    {themes.map((theme, index) => (
                      <option key={index} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  bgColor="bg-important"
                  className="text-primary md:py-3 py-2 px-6 rounded-lg text-sm font-medium md:text-lg transition-all hover:shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)]"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <header className=" pt-16 px-5 md:px-0">
            <div className="container mx-auto text-center max-w-4xl ">
              <div className="inline-block text-xs lg:text-sm rounded-lg border-2 border-[var(--color-primary)] bg-fill py-2 px-4 font-semibold text-primary mb-4">
                Powerful Solutions for Your Content Management
              </div>
              <h1 id="blur" className="drop-shadow-2xl text-3xl lg:text-5xl font-bold text-primary leading-snug mb-6">
                Streamline your content with{" "}
                <span className="text-important">our advanced CMS</span>, built
                for <span className="text-important">creators</span> and{" "}
                <span className="text-important">marketers</span>.
              </h1>
              <p id="blur" className="text-secondary text-lg font-medium lg:text-xl max-w-2xl mx-auto">
                Organize, manage, and deliver your content efficiently with a
                system that evolves with your needs.
              </p>

              <div className="my-6 ">
                <Button
                  bgColor="bg-important"
                  className="text-primary py-3 px-6 rounded-lg text-lg font-medium transition-all shadow-[0px_0px_10px_10px_rgba(8,_112,_184,_0.7)] hover:scale-105"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section className=" py-4 px-5 md:px-0">
            <div className="container mx-auto text-center px-1 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    High Performance
                  </h3>
                  <p className="text-secondary">
                    Experience fast, reliable content management built for
                    today’s demands.
                  </p>
                </div>
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Top Security</h3>
                  <p className="text-secondary">
                    Safeguard your data with the latest security protocols and
                    encryption.
                  </p>
                </div>
                <div className="p-6 bg-fill shadow-lg rounded-lg border border-[var(--color-important)]">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Easy Integration
                  </h3>
                  <p className="text-secondary">
                    Seamlessly integrate with your existing tools and platforms
                    for a smooth workflow.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Login Modal Popup */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0">
          <Login
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            openModal={openModal}
          />
        </div>
      )}
      {/* Register Modal Popup */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5 md:px-0 ">
          <Register
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            openModal={openModal}
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onResend={handleResend}
      />
    </>
  );
}

export default Landing;

import React from "react";
import "../assets/CSS/navbar/navbar.css";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container-fluid">
          <p className="navbar-brand">
            <a href="/">
              <motion.img
                src={logo}
                alt="Logo"
                initial={{
                  rotate: "0deg",
                }}
                whileHover={{
                  rotate: "360deg",
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
            </a>
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="navToggleButton"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbarList">
              <li className="nav-item">
                <a
                  className="nav-link active text"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text" href="#aboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text" href="#getStarted">
                  Get started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

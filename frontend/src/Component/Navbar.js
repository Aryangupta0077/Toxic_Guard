import "../assets/CSS/navbar/navbar.css";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar(props) {
  const navigate = useNavigate()
  const logOut = async ()=>{
    await axios.get("http://127.0.0.1:5000/auth/logout",{withCredentials:true})
    .then((res)=>{
      if (res.data.stat) {
        props.setBtnVal(res.data.user)
        window.location.href="/"
      }
    })
  }
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
              {!props.logBtn?<li className="nav-item">
                <a className="nav-link active text" href="#getStarted">
                  Get started
                </a>
              </li>:""}
              {(<li className="nav-item" title={`${props.logBtn?' View yourposts':'Please login, to view your posts'}`}>
                <a className={`nav-link ${props.logBtn?'active':'disabled'}`} href="/posts" aria-disabled="true" style={{color:`${props.logBtn?'white':'grey'}`}}>
                  My Posts
                </a>
              </li>)}
              {props.logBtn && (<li className="nav-item logout-btn">
                <button className="log-btn" onClick={logOut}>Logout</button>
              </li>)}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

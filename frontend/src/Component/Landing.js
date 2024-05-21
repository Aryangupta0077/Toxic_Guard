import "../assets/CSS/landing/landing.css";
import aryan from "../assets/images/aryan.jpeg";
import ankush from "../assets/images/Ankush.jpg";
import visharad from "../assets/images/visharad.jpeg";
import { motion } from "framer-motion";
import GoogleButton from 'react-google-button'


export default function Landing(props) {
  const handleLogin = () => {
    window.open("http://127.0.0.1:5000/auth/google","_self")
  };

  return (
    <>
      <div className="landingContent">
        <div className="bgImg"></div>
        <motion.div
          className="intro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1>ToxicGuard</h1>
          <p>
            ToxicGuard is an advanced web application designed to tackle the
            pervasive issue of cyberbullying by detecting and mitigating toxic
            comments on users' posts across various social media platforms. This
            innovative tool employs cutting-edge natural language processing
            (NLP) and machine learning algorithms to analyze and identify
            potentially harmful or offensive content in real-time.
          </p>
        </motion.div>
      </div>
      <div className="getStarted" id="getStarted">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="quoteAndBtn"
        >
          <div>
            <motion.h1>
              "Safeguarding Your Social Spaces Against Cyberbullying!"
            </motion.h1>
          </div>
          <div className="fbbtn">
           {
            <GoogleButton onClick={handleLogin} title="Checka and analyse comments on your youtube videos"/>
           }
          </div>
        </motion.div>
      </div>
      <div className="aboutUs" id="aboutUs">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <h1>About Us</h1>
          <div className="cards">
            <div className="card">
              <img src={ankush} className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ color: "white" }}>
                  Ankush Kumar
                </h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="https://www.linkedin.com/in/ankush-kumar-92b281281/" target="_blank" className="bttn">
                  contact
                </a>
              </div>
            </div>
            <div className="card">
              <img src={visharad} className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ color: "white" }}>
                  Visharad Sandal
                </h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="https://www.linkedin.com/in/visharad-sandal-a066b324b/" target="_blank" className="bttn">
                  contact
                </a>
              </div>
            </div>
            <div className="card">
              <img src={aryan} className="card-img-top" alt="..." />
              <div className="card-image-overlay">
                <h2 className="card-title" style={{ color: "white" }}>
                  Aryan Gupta
                </h2>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="https://www.linkedin.com/in/aryangupta0511/" target="_blank" className="bttn">
                  contact
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

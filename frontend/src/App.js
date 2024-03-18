import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './Component/Navbar'; 
import Landing from './Component/Landing';
import HomePage from './Component/HomePage';

function App() {
  return (
    <>
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/homePage" element={<HomePage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

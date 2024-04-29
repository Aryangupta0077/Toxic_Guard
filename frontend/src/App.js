import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Component/Landing';
import Posts from './Component/Posts'
import Protected from './Component/Protected';
import Navbar from './Component/Navbar';
import { useEffect, useState } from 'react';
import Comments from './Component/Comments';

function App() {
  const[logBtn, setBtnVal] = useState(null)
  const [tokenValue,setTokenValue] = useState(null);
  useEffect(()=>{

  },[logBtn])

  return (
    <>
    <Router>
      <Navbar setBtnVal = {setBtnVal} logBtn={logBtn}/>
      <Routes>
        <Route exact path="/" element={<Landing  setTokenValue={setTokenValue} tokenValue={tokenValue} />}/>
        <Route exact path="/comments" element={<Comments/>}/>
        <Route exact path="/posts" element={<Protected Component={Posts} setBtnVal = {setBtnVal} logBtn={logBtn}/>}/>
        
      </Routes>
    </Router>
    </>
  );
}

export default App;

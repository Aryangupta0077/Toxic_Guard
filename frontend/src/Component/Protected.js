import React, { useEffect, useState } from "react";
import Error from "./Error";
import axios from "axios";
export default function Protected(props) {
  const [status, setStatus] = useState(false);
  const [userData,setUserdata]=useState(null)
  const checkUser = async () => {
    await axios.get("http://localhost:5000/profile",{withCredentials:true}).then((res) => {
      if (res.data.logInStat) {
        setStatus(true)
        setUserdata(res.data.userData)
        props.setBtnVal(true)
      }else{
        setStatus(false);
        setUserdata(null)
        props.setBtnVal(false);
      }
    }).catch ((error)=> {
      console.error("Error checking user:", error);
    });
  };
  useEffect(() => {
    checkUser();
  },[]);
  return <>{status ? <props.Component userData={userData} /> : <Error />}</>;
}

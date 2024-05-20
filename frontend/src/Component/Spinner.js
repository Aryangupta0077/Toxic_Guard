import React from "react";

export default function Spinner() {
  return (
    <>
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden" style={{color:"green"}}>Loading...</span>
      </div>
    </div>
    </>
  );
}

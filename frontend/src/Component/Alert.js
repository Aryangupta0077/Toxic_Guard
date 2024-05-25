import React from "react";

function Alert(props) {
  return (
    <>
      { props.alertVal && (
        <div
          className={`alert alert-${props.alertVal.type}`}
          role="alert"
          style={{ position: "absolute", textAlign:"center", zIndex:"1",width:"50vw",opacity:"0.8"}}
        >
          {props.alertVal.message}
        </div>
      )}
    </>
  );
}

export default Alert;

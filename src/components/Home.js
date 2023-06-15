import React from "react";
import Notes from "./Notes";

export default function Home(props) {
  const {showAlert} = props
  const headingStyle = {
    fontFamily: "'Acme', sans-serif",
    background: 'linear-gradient(#3800e7, #8a15ff)',
  };
  return (
    <div style={headingStyle} className="container my-3">
      <Notes showAlert={showAlert} />
    </div>
  );
}

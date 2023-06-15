import React, { useContext, useEffect } from 'react';
import noteContext from "../context/notes/NoteContext";
import './About.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const About = () => {
  const constext = useContext(noteContext);
  const { getuser,userdata } = constext;
  let Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')){ 
       getuser();
    }
    else{
      Navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='Abouts'>
      <div className="main">
        <div className="main__text-wrapper">
          <h1 className="main__title">{userdata.name}</h1>
          <p>{userdata.email}</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="dotted-circle" width="352" height="352" overflow="visible">
            {/* Add the SVG code here */}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default About;

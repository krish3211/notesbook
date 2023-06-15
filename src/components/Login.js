import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [auth , setAuth] = useState({email:"", password:""});
    let Navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:auth.email,password:auth.password})
          });
          const json = await response.json();
          if (json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Successfully Login","success");
            Navigate('/')
          }
          else{
            props.showAlert(json.error,"danger");
          }
    }
    const onchange=(e)=>{
        setAuth({...auth,[e.target.name]:e.target.value})
      }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={auth.email} onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password"value={auth.password} onChange={onchange}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login

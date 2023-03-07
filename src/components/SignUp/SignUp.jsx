import React, { useState } from 'react';
import "./signUp.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorImg from "../../assets/doctor.jpg"
const SignUp = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    // navigate("/")
    e.preventDefault();
    // alert("submit")
    const reqBody = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value
    }
    console.log(reqBody);
    // const response = await axios.post("",e.target);
  }
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className='signUp'>
      <div className='signUp__boxShadow'>
       
        <form className='signUp__form'>
           <h2 className="signUp__header center">Sign Up</h2>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='username' type="text" name="username" id="username" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='email' type="email" name="email" id="email" />
          </div>
          <div className="signUp__item">
              <input className='signIn__input' required type="password" placeholder='password' name="password" id="password" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='first name' type="text" name="firstname" id="firstname" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='last name' type="text" name="lastname" id="lastname" />
          </div>
        
       
          <button type='submit' className="signUp__btn">
            Submit
          </button>
        </form>
       
      </div>
    </div>
  )
}

export default SignUp
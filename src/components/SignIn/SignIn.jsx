import React, { useState } from 'react';
import "./signIn.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorImg from "../../assets/doctor.jpg"
const SignIn = () => {
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
  const [imageLoaded,setImageLoaded] = useState(false);
  return (
    <div className='signIn'>
      <div className='signIn__boxShadow'>
        <div className='signIn__left'>
          <img className='signIn__img' onLoad={() => {setImageLoaded(true)}} src={DoctorImg} alt="" />
        </div>
        {imageLoaded? 
        <div className="signIn__right">
          <form onSubmit={onSubmitHandler} className='signIn__form'>
            <div className="signIn__item">
              <h2 className="signIn__header">Sign In</h2>
            </div>

            <div className="signIn__item">
              {/* <label className='signIn__label' htmlFor='username' >Username: </label> */}
              <input className='signIn__input' required placeholder='username' type="text" name="username" id="username" />
            </div>
            <div className="signIn__item">
              {/* <label className='signIn__label ' htmlFor='password' ></label> */}
              <input className='signIn__input' required type="password" placeholder='password' name="password" id="password" />
            </div>
            <button className='signIn__btn' type='submit'> Submit </button>
          </form>
          <div className='signIn__orOption'>
            <div>
            </div>
            <div>
              OR
            </div>
            <div>

            </div>
          </div>
          <div className='signIn__redirect' onClick={() => { navigate("/sign_up") }}>
            Don't have an account?  
            <span> Sign Up</span>
          </div>
        </div>:""
        }
      </div>   
    </div>
  )
}

export default SignIn
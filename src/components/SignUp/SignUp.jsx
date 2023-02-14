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
        <div className='signUp__left'>
          <img className='signUp__img' onLoad={() => { setImageLoaded(true) }} src={DoctorImg} alt="" />
        </div>
        {imageLoaded ?
          <div className="signUp__right">
            <form onSubmit={onSubmitHandler} className='signUp__form'>
              <div className="signUp__item">
                <h2 className="signUp__header">Sign Up</h2>
              </div>

              <div className="signUp__item">
                {/* <label className='signUp__label' htmlFor='username' >Username: </label> */}
                <input className='signUp__input' required placeholder='username' type="text" name="username" id="username" />
              </div>
              <div className="signUp__item">
                {/* <label className='signUp__label ' htmlFor='password' ></label> */}
                <input className='signUp__input' required type="password" placeholder='password' name="password" id="password" />
              </div>
              <button className='signUp__btn' type='submit'> Submit </button>
            </form>
          
            
          </div> : ""
        }
      </div>
    </div>
  )
}

export default SignUp
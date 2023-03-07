import React,{useState} from "react";
import "./heart.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProgressBar from "../MyProgressBar/MyProgressBar";
import data from "./data.js"

function Heart(){


    const [prediction,setPrediction] = useState(null);
    const [risk,setRisk] = useState(null);

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const elements = e.target.getElementsByClassName("heart__input");
        let obj = {};
        for(var i = 0; i<elements.length;i++){
            obj[elements[i].name] = Number(elements[i].value);
        }
        console.log(obj);
        try{
            const response = await axios.post("/api/heart",obj);
            console.log(response.data);
            setPrediction(response.data.prediction);
            setRisk(response.data.risk);
        }catch(err){
            toast.error("Some Error Occurred!");
            console.log(err);
        }
        
    }

    function SelectYesNo(props){
        return(
            <select required className="heart__input" name = {props.name} id = {props.id}>
                {/* <option value="" selected disabled hidden>Select YES or NO</option> */}
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
        );
    }

    function SelectInputWithLabel(props){
        return (
            <div className="heart__item">
                <label className='heart__label' htmlFor={props.id} >{props.text} </label>
                <select required className="heart__input" name = {props.id} id={props.id}>
                    <option value="" selected disabled hidden>Select YES or NO</option>
                    <option value = "1">Yes</option>
                    <option value="0">No</option>
                </select>  
            </div>
                    
        );
    }
    return (

        <div className="heart">

            <section className="heart__section  heart__section__one">
                <h2 className="heart__heading font-lg center">
                    PLEASE SELECT APPROPRIATE FOR GIVEN DETAILS
                </h2>
            </section>
            <section className="heart__section heart__section__two">
                <form onSubmit={onSubmitHandler} className="heart__form">
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='age' >Age </label>
                        <input required className='heart__input'  placeholder='e.g 21' type="number" min="1" max = "100"  name="age" id="age"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='trestbps' >blood pressure</label>
                        <input required className='heart__input'  placeholder='In mm Hg' type="number" min="0" max = "200"  name="trestbps" id="trestbps"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='chol' >Cholesterol level.</label>
                        <input required className='heart__input'  placeholder='In mg/dl' type="number" min="0" max = "1000"  name="chol" id="chol"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='thalch' >Max heart rate achieved.</label>
                        <input required className='heart__input'  placeholder='In beats/min' type="number" min="0" max = "1000"  name="thalch" id="thalch"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='oldpeak' > ST depression.</label>
                        <input required className='heart__input' step = "0.1" placeholder='e.g 0.5' type="number" min="0" max = "1000"  name="oldpeak" id="oldpeak"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='ca' >The number of major vessels.</label>
                        <input required className='heart__input'  placeholder='e.g (0 - 3)' type="number" min="0" max = "3"  name="ca" id="ca"/>
                    </div>
                    <div className="heart__item">
                        <label className='heart__label' htmlFor='sex' >Gender </label>
                        <select required className="heart__input" name = "sex" id="sex">
                            <option value="" selected disabled hidden>Select Gender</option>
                            <option value = "1">Male</option>
                            <option value="0">Female</option>
                        </select>  
                    </div>
                    {
                        data.map((ele)=>{
                            return (
                                <SelectInputWithLabel id = {ele.id} name = {ele.name} text={ele.text}/>
                            )
                        })
                    }
                 
                    <button className='heart__btn' type='submit'> Predict </button>
                </form>
               
            </section>
            {
                prediction? 
                 <section className = "diabetes__section diabetes__section__three">
                        <h3 className='center'>Prediction: {prediction}</h3>
                        {/* <h3 className='center'>Confidence Score: <MyProgressBar progress={(confidenceScore * 100).toFixed(2)} /></h3> */}
                </section>:<></>
              
            }
          
            <ToastContainer position='top-center' autoClose = {1000}/>

        </div>
    )
}

export default Heart;
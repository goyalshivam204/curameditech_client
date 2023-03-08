import React,{useState} from "react";
import "./diabetes.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProgressBar from "../MyProgressBar/MyProgressBar";

function Diabetes(){


    const [prediction,setPrediction] = useState(null);
    const [confidenceScore,setConfidenceScore] = useState(null);

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        // console.log(e.target.Age.value);
        // console.log(e.target.Gender.value);
        const elements = e.target.getElementsByClassName("diabetes__input");
        // console.log(elements.length);
        let obj = {};
        for(var i = 0; i<elements.length;i++){
            obj[elements[i].name] = Number(elements[i].value);
        }
        // console.log(obj);
        try{
            const response = await axios.post(process.env.REACT_APP_API_URL + "/api/diabetes",obj);
            console.log(response.data);
            setPrediction(response.data.prediction);
            setConfidenceScore(response.data.confidenceScore);
        }catch(err){
            toast.error("Some Error Occurred!");
            console.log(err);
        }
        
    }

    function SelectYesNo(props){
        return(
            <select required className="diabetes__input" name = {props.name} id = {props.id}>
                <option value="" selected disabled hidden>Select YES or NO</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
        );
    }
    return (

        <div className="diabetes">

            <section className="diabetes__section  diabetes__section__one">
                <h2 className="diabetes__heading font-lg center">
                    PLEASE SELECT APPROPRIATE FOR GIVEN SYMPTOMS
                </h2>
            </section>
            <section className="diabetes__section diabetes__section__two">
                <form onSubmit={onSubmitHandler} className="diabetes__form">
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Age' >Age </label>
                        <input required className='diabetes__input'  placeholder='e.g 21' type="number" min="1" max = "100"  name="Age" id="Age"/>
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Gender' >Gender </label>
                        <select required className="diabetes__input" name = "Gender" id="Gender">
                            <option value="" selected disabled hidden>Select Gender</option>
                            <option value = "1">Male</option>
                            <option value="0">Female</option>
                        </select>  
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Polyuria' >Frequent Urination </label>
                        <SelectYesNo name = "Polyuria" id = "Polyuria"/>
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Polydipsia' >Excessive thirst. </label>
                        <SelectYesNo name = "Polydipsia" id = "Polydipsia"/>
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='sudden_weight_loss' >Sudden Weight Loss </label>
                         <SelectYesNo name = "sudden_weight_loss" id = "sudden_weight_loss"/>
                        
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='weakness' >Weakness </label>
                        <SelectYesNo  name = "weakness" id = "weakness"/>
                        
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Polyphagia' >Excessive hunger</label>
                        <SelectYesNo  name = "Polyphagia" id = "Polyphagia"/>
                       
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Genital_thrush' >Irritation around Genitals</label>
                        <SelectYesNo  name = "Genital_thrush" id = "Genital_thrush"/>
                       
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='visual_blurring' >Visual Blurring</label>
                        <SelectYesNo  name = "visual_blurring" id = "visual_blurring"/>
                       
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Itching' >Itching</label>
                        <SelectYesNo  name = "Itching" id = "Itching"/>
                     
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Irritability' >Irritability</label>
                        <SelectYesNo  name = "Irritability" id = "Irritability"/>

                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='delayed_healing' >Delayed Healing</label>
                        <SelectYesNo  name = "delayed_healing" id = "delayed_healing"/>
                       
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='partial_paresis' >Partial Paresis</label>
                        <SelectYesNo name = "partial_paresis" id = "partial_paresis"/>
                        
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='muscle_stiffness' >Muscle Stiffness</label>
                        <SelectYesNo name = "muscle_stiffness" id = "muscle_stiffness"/>
                       
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Alopecia' >Hair Loss</label>
                        <SelectYesNo name = "Alopecia" id = "Alopecia" />
                      
                    </div>
                    <div className="diabetes__item">
                        <label className='diabetes__label' htmlFor='Obesity' >Obesity</label>
                        <SelectYesNo name = "Obesity" id = "Obesity"/>
                      
                    </div>
                    <button className='diabetes__btn' type='submit'> Predict </button>
                </form>
            </section>
            {
                prediction? 
                <section className = "diabetes__section diabetes__section__three">
                        <h3 className='center'>Prediction: {prediction}</h3>
                        <h3 className='center'>Confidence Score: <MyProgressBar progress={(confidenceScore * 100).toFixed(2)} /></h3>
                </section>:<></>
            }
          
            <ToastContainer position='top-center' autoClose = {1000}/>

        </div>
    )
}

export default Diabetes;
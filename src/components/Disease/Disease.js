import React, { useState } from 'react';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {obj} from './data.js';
import "./disease.css"
import MyProgressBar from './MyProgressBar.js';
import axios from 'axios';
import { padStart } from 'lodash';

// to allows headers and cookie on the server also.
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axios.defaults.withCredentials = true;

function Disease() {
    const [value,setValue] = useState("");
    const [suggestions,setSuggestions] = useState(Object.keys(obj));
    const [selected,setSelected] = useState([]);
    const [predictedDisease,setPredictedDisease] = useState(null);
    const [confidenceScore,setConfidenceScore] = useState(null); 


    const fwd_value = (str_value) =>{
        let str = str_value;
        str = str.toLowerCase();
        str = str.replaceAll(" ","_");
        return str;
    }
    const rev_value = (str_value) => {
        let str = str_value;
        str = str.replaceAll("_", " ");
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }
    
    const predictDisease = async (e)=>{

        if(selected.length < 5){
            toast.error("Please, Select at least 5 symptoms")
            return;
        }
        const postBody = {...obj}
      
        selected.forEach((field)=>{
            postBody[field] = 1;
        });

        console.log("keys: ")
        Object.keys(postBody).forEach((key)=>{
            if(postBody[key] === 1){
                console.log(key);
            }
        })
        // console.log(selected);
        const response = await axios.post("http://localhost:8000/predict",postBody)
        setPredictedDisease(response.data[1]);
        setConfidenceScore(response.data[0]);
    }

    const onChangeHandler = (e)=>{
        setValue(e.target.value);
    }   
    const onAddHandler = (e)=>{

        if(selected.includes(fwd_value(value))){
            toast.warning("You've Already Selected this Symptom!");
        } else if (!suggestions.includes(fwd_value(value))){
            toast.error("Please, Select Some valid Symptom!")
        }else{
            const selected_field = fwd_value(value);
            toast.success(`${selected_field} added to Selected Successfully!`, { position: "top-center" })

            setSuggestions((old) => {
                return old.filter((field) => {
                    return field !== selected_field;
                });
            })
            setSelected((old) => {
                return [...old, selected_field];
            });
            setValue("");
        }
    }

    const selectField = (e) =>{
        const selected_field = e.target.value;
        setSuggestions((old)=> {
            return old.filter((field) => {
                return field !==selected_field; 
            });
        })
        setSelected((old)=>{
            return [...old,selected_field];
        });
        toast.success(`${rev_value(selected_field)} added to Selected Successfully!`, { position: "top-center" })
        // setValue("");
    }
    const removeField= (e) =>{
        const deselected_field = e.target.value;
        setSelected((old) => {
            return old.filter((field)=>{
                return field !== deselected_field;
            });
        });
        setSuggestions((old) => {
            return [...old,deselected_field];
        })
        toast.success(`${rev_value(deselected_field)} removed from to Selected Successfully!`, { position: "top-center" })

    }
    // console.log(suggestions);
    return (
        <div className = "disease" >
            <section className='disease__section disease__section__one'>
                <h2 className='center font-lg'>IDENTIFY POSSIBLE CONDITION RELATED TO YOUR SYMPTOMS</h2>
                <div className='center'>
                    <input placeholder="Search any symptoms you've..." type="text" className='disease__input' value={value} onChange={onChangeHandler} />
                </div>
                <div className='center'>
                    <button className="disease__btn disease__btn__add font-md" onClick={onAddHandler}>Add Symptoms</button>
                </div>
            </section>
           
            <section className='disease__section disease__section__two'>
                <h2 className='center'>Suggestions</h2>
                <div className="suggestions">
                    {suggestions.map((field, id) => {
                        return field.includes(fwd_value(value)) ? <button className="disease__suggestions__btn disease__btn font-rg" key={id} onClick={selectField} value={field}>{rev_value(field)} </button> : "";
                    })}
                </div>
            </section>
           
            <section className='disease__section disease__section__three'>
                <h2 className='center'>Selected</h2>
                <div className="selected">
                    {selected.length === 0 ? <div className='center font-md'>Please, Select Any Symptoms ! </div>:""}
                    {selected.map((field, id) => {
                        return <button className="selected_button font-rg disease__btn" key={id} onClick={removeField} value={field}>{rev_value(field)}</button>;
                    })}
                </div>
                <div className='center'>
                    <button className='disease__btn disease__btn__predict  font-md' onClick={predictDisease}>Predict</button>
                </div>
            </section>
            <section className='disease__section disease__section__four'>
               

                <div className="predicted_disease">

                    {predictedDisease ? <h3 className='center'>Predicted disease: {predictedDisease}</h3> : ""}
                    {confidenceScore ? <h3 className='center'>Confidence Score: <MyProgressBar progress={(confidenceScore * 100).toFixed(2)} /></h3> : ""}
                </div>
            </section>
          

            <ToastContainer position='top-center' autoClose = {1000}/>
        </div>
    )
}

export default Disease
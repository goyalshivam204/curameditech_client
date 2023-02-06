import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ProgressBar } from 'react-bootstrap'.

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {obj} from './data.js';
import "./style.css"
import {LinearProgress} from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import MyProgressBar from './MyProgressBar.js';
import axios from 'axios';
// console.log(obj);


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

    const predictDisease = async (e)=>{

        if(selected.length < 5){
            toast.error("Please, Select at least 5 symptoms")
            return;
        }
        const postBody = obj;
        selected.forEach((field)=>{
            postBody[field] = 1;
        });

        const response = await axios.post("http://localhost:8000/predict",postBody)
        console.log(response.data);
        setPredictedDisease(response.data[1]);
        setConfidenceScore(response.data[0].toFixed(2));
    }

    const onChangeHandler = (e)=>{
        setValue(e.target.value);
    }   
    const onAddHandler = (e)=>{
        if(selected.includes(value)){
            toast.warning("You've Already Selected this Symptom!");
        }else if(!suggestions.includes(value)){
            toast.error("Please, Select Some valid Symptom!")
        }else{
            const selected_field = value;
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
        const selected_field = e.target.innerHTML;
        setSuggestions((old)=> {
            return old.filter((field) => {
                return field !==selected_field; 
            });
        })
        setSelected((old)=>{
            return [...old,selected_field];
        });
        toast.success(`${selected_field} added to Selected Successfully!`, { position: "top-center" })
        setValue("");
    }
    const removeField= (e) =>{
        const deselected_field = e.target.innerHTML;
        setSelected((old) => {
            return old.filter((field)=>{
                return field !== deselected_field;
            });
        });
        setSuggestions((old) => {
            return [...old,deselected_field];
        })
        toast.success(`${deselected_field} removed from to Selected Successfully!`, { position: "top-center" })

    }
    // console.log(suggestions);
    return (
        <div className = "disease" >
            <h2>Identify possible condition and treatment related to your symptoms</h2>
            <p>Pick At least 5 Symptoms...</p>
            <div>
                <button onClick={onAddHandler}>Add Symptom</button>
            </div>
            <div>
                <input type="text" value={value} onChange = {onChangeHandler}/>
            </div>
            
            <h2>Suggestions</h2>            
            <div className="suggestions">
                {suggestions.map((field,id) => {
                    return field.includes(value) ? <button className="suggestions_button" key={id} onClick={selectField}>{field}</button>:"";
                })}
            </div>

            <h2>Selected</h2>            
            <div className="selected">
                {selected.map((field,id) => {
                    return <button className="selected_button" key ={id} onClick={removeField}>{field}</button>;
                })}
            </div>
            <div>
                <button className='predict_button' onClick={predictDisease}>Predict</button>
            </div>

            <div className="predicted_disease">
                {predictedDisease?<p>Predicted disease: {predictedDisease}</p>:""}
                {confidenceScore?<p>Confidence Score: {confidenceScore}</p>:""}

                        
            </div>

            <ToastContainer position='top-center' autoClose = {1000}/>
        </div>
    )
}

export default Disease
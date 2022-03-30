import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

export default() => {
    const [pets, setPets] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState([]); 
    const [nameError, setNameError] = useState("Name is required.");
    const [typeError, setTypeError] = useState("Type is required.");
    const [desError, setDesError] = useState("Description is required.");

    const handleSubmit = (e) => {
        let history = useHistory();
        e.preventDefault();
        const newPet = {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        }
        console.log(newPet);
        
        // Add newly created pet
        axios.post("http://localhost:8000/api/pets", newPet)
        .then(res => {
            setPets([...pets, res.data])
            history.push('/');
        })
        .catch(err => {
            // Validation 
            console.log(err.response.data)
            const errorResponse = err.response.data.errors; 
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) { 
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        });
    }

    const handleName = (e) => {
        setName(e.target.value);
        if(e.target.value.length < 1) {
            setNameError("Name is required.");
        } else if(e.target.value.length < 3) {
            setNameError("Name must be at least 3 characters long.");
        } else {
            setNameError("");
        }
    }

    const handleType = (e) => {
        setType(e.target.value);
        if(e.target.value.length < 1) {
            setTypeError("Type is required.");
        } else if(e.target.value.length < 3) {
            setTypeError("Type must be at least 3 characters long.");
        } else {
            setTypeError("");
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        if(e.target.value.length < 1) {
            setDesError("Description is required.");
        } else if(e.target.value.length < 3) {
            setDesError("Description must be at least 3 characters long.");
        } else {
            setDesError("");
        }
    }

    return(
        <div>
            <Link to = "/">back to home</Link>
            <h2>Know a pet needing a home?</h2>
            <form onSubmit={handleSubmit}>
                <div className = "form" style ={{display:"flex", justifyContent:"space-around"}}>
                    <div className = "col-1">
                        {errors.map((err, index) => <p key={index}>{err}</p>)}
                        <div>
                            <label>Pet Name: </label>
                            <input onChange={handleName} type="text"/>
                            {
                                nameError ?
                                <p style={{color:'red'}}>{ nameError }</p> :
                                ''
                            }
                        </div>
                        <div>
                            <label>Pet Type: </label>
                            <input onChange={handleType} type="text"/>
                            {
                                typeError ?
                                <p style={{color:'red'}}>{ typeError }</p> :
                                ''
                            }
                        </div>
                        <div>
                            <label>Pet Description: </label>
                            <input onChange={handleDescription} type="text"/>
                            {
                                desError ?
                                <p style={{color:'red'}}>{ desError }</p> :
                                ''
                            }
                        </div>
                        <button>Add Pet</button>
                    </div>
                    <div className = "col-2">
                        <div>
                            <label>Skills (optional) <br></br> Skill 1: </label>
                            <input onChange={(e) => setSkill1(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label>Skill 2: </label>
                            <input onChange={(e) => setSkill2(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label>Skill 3: </label>
                            <input onChange={(e) => setSkill3(e.target.value)} type="text"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

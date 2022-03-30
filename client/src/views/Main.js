import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import PetList from '../components/PetList';

const Main = props => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets')
            .then(res=>{
                setPets(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);

    
    return (
        <div>
            <div className = "navbar">
                <Link to = "pets/new">add a pet to the shelter</Link>
                <h2>These pets are looking for a good home</h2>
            </div>
            {loaded && <PetList pets = {pets}/>}
        </div>
    )
}

export default Main;
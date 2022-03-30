import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useHistory } from "react-router-dom";
    
const Detail = props => {
    const { pets,  removeFromDom } = props;
    const [pet, setPet] = useState({})
    const { id } = useParams();
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then(res => setPet(res.data))
            .catch(err => console.error(err));
    }, []);
    

    const deletePet = (id) => {
        const history = useHistory();
        axios.delete('http://localhost:8000/api/pets/' + id)
            .then(
                res => {removeFromDom(id)},
                history.push('/')
            )
            .catch(err => console.error(err));
    }

    return (
        <div>
            <div className = "NavBar">
                <Link to = "/">back to home</Link>
                <h2>Details about: {pet.name}</h2>
                <button onClick={(e) => {deletePet(pet._id)}}>Adopt {pet.name}</button>
            </div>
            <div className = "contents">
                <p>Pet type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: {pet.skill1} {pet.skill2} {pet.skill3}</p>
            </div>
        </div>
    )
}
    
export default Detail;
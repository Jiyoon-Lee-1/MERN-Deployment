import React from 'react'
import { Link } from "react-router-dom";

const PetList = props => {
    const { pets } = props;

    return (
        <div className = "list"> 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) =>
                        <tr key = {i}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to = {`pets/${pet._id}`}>details</Link> | <Link to = {`pets/${pet._id}/edit`}>edit</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
    
export default PetList;
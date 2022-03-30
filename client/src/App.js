import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Main from './views/Main';
import Detail from './components/Detail';
import Form from './components/Form';
import Edit from './components/Edit';

function App() {
  const [pets, setPets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  const removeFromDom = petID => {
    setPets(pets.filter(pet => pet._id != petID));
  }

  useEffect(()=>{
      axios.get('http://localhost:8000/api/pets')
          .then(res=>{
              setPets(res.data);
              setLoaded(true);
          })
          .catch(err => console.error(err));
  },[]);

  return (
    <BrowserRouter>
      <h1>Pet Shelter</h1>
      <Switch>
        <Route exact path = "/">
          <Main/>
        </Route>
        <Route exact path="/pets/new">
          <Form/>
        </Route>
        <Route exact path = "/pets/:id">
          <Detail pets = {pets} removeFromDom = {removeFromDom}/>
        </Route>
        <Route exact path = "/pets/:id/edit">
          <Edit/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link, navigate } from '@reach/router';


const NewPetForm = props => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDesc] = useState("");
    const [skill_1, setSkill_1] = useState("");
    const [skill_2, setSkill_2] = useState("");
    const [skill_3, setSkill_3] = useState("");
    let is_submitted = false;

    const addPet = event => {
        // event.preventDefault();
        is_submitted = true;
        console.log( is_submitted , " " , props.path );
        const one_pet = { name , type , description , skill_1 , skill_2 , skill_3 };
        alert(JSON.stringify(one_pet));
        axios.post("http://localhost:8000/api/create_one", one_pet )
            .then( res => { 
                console.log( res );
                navigate("/");
            })
            .catch( error => console.log( error ));
    }


    return(
        <form onSubmit={ addPet }>
            <br />
            <Link to="/" className="link_back_to_home">back to home</Link>
            <br />
            <h4> Know a pet needing a home ?</h4>
            <input type="text" placeholder="Pet name" onChange={ e => setName(e.target.value)} ></input>&nbsp;
            <input type="text" placeholder="Pet type" onChange={ e => setType(e.target.value)} ></input>&nbsp;
            <input type="text" placeholder="Pet description" onChange={ e => setDesc(e.target.value)} ></input>
            <br /> <br />
            <input type="text" placeholder="skill 1" onChange={ e => setSkill_1(e.target.value)}></input>&nbsp;
            <input type="text" placeholder="skill 2" onChange={ e => setSkill_2(e.target.value)}></input>&nbsp;
            <input type="text" placeholder="skill 3" onChange={ e => setSkill_3(e.target.value)}></input>
            <br /> <br />
            <button type="submit" >Submit</button>
            &nbsp;
            <Link to="/" className="btn btn-danger">Cancel</Link>
            <br /><br /> <br />
        </form>
    );
}

export default NewPetForm;
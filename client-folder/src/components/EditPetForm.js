import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link , navigate} from '@reach/router';


const EditPetForm = props => {

    const [a_pet, setA_pet] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDesc] = useState("");
    const [skill_1, setSkill_1] = useState("");
    const [skill_2, setSkill_2] = useState("");
    const [skill_3, setSkill_3] = useState("");
    let is_submitted = false;

    
    useEffect( () => {
        console.log( props._id);
        const get_pet_by_id = `http://localhost:8000/api/read_one/${props._id}`;
        const nav_to = `/${props._id}`;
        console.log( get_pet_by_id );
        
        axios.get( get_pet_by_id )
        .then( res => {
            setA_pet( res.data );
            navigate( nav_to);
        })
            .catch( error => console.log( error) );
            
	}, []);


    const addPet = event => {
        event.preventDefault();
        is_submitted = true;
        console.log( is_submitted , props.path );
        const one_pet = { name , type , description , skill_1 , skill_2 , skill_3 };
        alert(JSON.stringify(one_pet));
        console.log( one_pet );
        console.log( props._id);
        const edit_pet_by_id = `http://localhost:8000/api/update_one_whole/${props._id}`;
        console.log( edit_pet_by_id );
        axios.post( edit_pet_by_id , one_pet )
            .then( res => {
                console.log( res );
                navigate("/");
            } )
        .catch( error => console.log( error ));
    }


    return(
        <form onSubmit={ addPet }>
            <br />
            <Link to="/" className="link_back_to_home">back to home</Link>
            <br />
            {
                a_pet.map( one_pet => 
                <div>
                    <h4> Edit  {one_pet.name}</h4>
                    <input type="text" placeholder={one_pet.name} onChange={ e => setName(e.target.value)} ></input>&nbsp;
                    <input type="text" placeholder={one_pet.type} onChange={ e => setType(e.target.value)} ></input>&nbsp;
                    <input type="text" placeholder={one_pet.description} onChange={ e => setDesc(e.target.value)} ></input>
                    <br /> <br />
                    <input type="text" placeholder={one_pet.skill_1} onChange={ e => setSkill_1(e.target.value)}></input>&nbsp;
                    <input type="text" placeholder={one_pet.skill_2} onChange={ e => setSkill_2(e.target.value)}></input>&nbsp;
                    <input type="text" placeholder={one_pet.skill_3} onChange={ e => setSkill_3(e.target.value)}></input>
                </div>
                )
            }
            <br /> <br />
            <button type="submit" >Submit</button>
            &nbsp;
            <Link to="/" className="btn btn-danger">Cancel</Link>
            <br /><br /> <br />
        </form>
    );
}

// {JSON.stringify(a_pet)}

export default EditPetForm;

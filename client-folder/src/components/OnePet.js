import React, {useState , useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link , navigate} from '@reach/router';


let a_pet = [];


const OnePet = props => {

// useState is a Hook function that will give back an array
// The array contains a primitive variable or an object
// depending how we initialize it
// and also will give back a function to update the state.
// (the primitive variable or an object).

const [petReceived, setPetReceived] = useState({});

  
	useEffect( () => {
		console.log( props._id);
		const get_pet_by_id = `http://localhost:8000/api/read_one/${props._id}`;
		const nav_to = `/${props._id}`;
		console.log( get_pet_by_id );
		axios.get( get_pet_by_id )
		.then( res => {
			console.log( res.data );
			a_pet = [...res.data];
			console.log( a_pet );
			setPetReceived( res.data );
			//navigate( nav_to);
		})
		.catch( error => console.log( error) );
	}, []);

 
	const pet_fun = event => {

		console.log(event);         	// Synthetic event
		console.log(event.target);
		console.log( props._id);
		axios.delete( `http://localhost:8000/api/delete/${props._id}` )
			.then( res => {
				console.log( res.data );
				navigate('/');
			})
			.catch( error => console.log( error));

		// event.target.style["backgroundColor"] =  props.backgroundColor ;
		// event.target.style.color = props.color;
		//event.target.style.color = "white";

		// *** Lifting State ***

		// *** The last props.infoToParent() call is the one that counts,
		// *** in other words is the one that is going to be in state
		// (added in the array in App.js)

		// props.infoToParent(props.species);
		// props.infoToParent( [ {animal:'dog'}, { animal: 'Rabbit'} ] );    
		// props.infoToParent("=> This is a string message from the pet!!!");

		// props.infoToParent(`* ${props.noise} -> The ${props.species} has been petted ${petsReceived} time(s)`);

	}


  return(
	  <>
    	  {/* <p> { JSON.stringify( petReceived[0] ) } </p> */}
	  {
		a_pet.map( obj => 
			<fieldset>
				<legend>Details about: { obj.name } 
					<button className="with_space" onClick={ pet_fun  }>Adopt -> { obj.name }</button>
					<Link to="/" className="link_back_to_home">->back to home</Link>
				</legend>
				<hr className="nice"/>
				<p>Pet type: {obj.type}</p>
				<p>Description: {obj.description}</p>
				<p>Skills: {obj.skill_1} / {obj.skill_2} / {obj.skill_3} </p>
			</fieldset>
		)
	  }
	</>

  
  );

} // OnePet functional component ***


export default OnePet;


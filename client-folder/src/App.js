import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link } from '@reach/router';
import OnePet from './components/OnePet';
import NewPetForm from './components/NewPetForm';
import EditPetForm from './components/EditPetForm';


function App() {


	const [pets, setPets] = useState([]);			// starts as an empty array
	const [one_pet, setOne_pet] = useState({});
	

	useEffect( () => {
		axios.get("http://localhost:8000/api/read_all")
			.then( res => setPets( res.data ))
			.catch( error => console.log( error) );
	}, []);
		

	const edit_fun = a_pet => {
		console.log( a_pet );
		setOne_pet( a_pet );
	}

	
	return (
		<div className="container">
			<h4>Pet Shelter </h4> 
			
			<Link className="link_add" to="/new">->add a pet to the shelter</Link>
			<br /><br />
			
			<Router>
				<NewPetForm path="/new" />
				<EditPetForm path=":_id" />
				<OnePet path="/details/:_id" />
      		</Router>
						  	
			<h6>These pets are looking for a good home</h6>
			{
				pets.map( a_pet => 
					<div className="card" key={a_pet._id}>
						<div className="card-body">
							<h5 className="title"> Name: { a_pet.name }</h5>
							<ul>
								<li>type: {a_pet.type} </li>
								{/* <li>_id:  {a_pet._id}  </li> */}
							</ul>

							<p>Actions:</p>

							{/* <OnePet the_pet={a_pet} />	 */}


							{/* setOne_pet(a_pet); */}
							
							{/* <button onClick={ event => edit_fun(a_pet)  }> edit { a_pet.name }</button> */}
							
							<nav>
								<Link to={`/details/${a_pet._id}`} >details</Link>&nbsp;
								{" | "}&nbsp;
								<Link to={a_pet._id} >edit</Link>&nbsp;
								{" | "}&nbsp;
								<a href="#2" className='a2'>Go to bottom End-Of-List</a>
							</nav>

						</div>
									
					</div>
									
				)
			}

			<h4>End Of List</h4>
		
			{/* <p>{JSON.stringify(pets)}</p> */}

			<div id="2"></div>
			
		</div>
  	);
}

export default App;

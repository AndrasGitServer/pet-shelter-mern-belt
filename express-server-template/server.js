const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const db_name = 'pet2_DB';
const port = 8000;

app.use( cors() );
app.use( express.json() );


const api_routes = {
    
    'server_message'                            : 'Message from Express server -> OK',
    '**************'                            : '*********************************',
    'GET    /                          '        : 'Home route to display CRUD API ROUTES',
    'GET    /api/read_all              '        : 'R - Read All objects in the Database',
    'GET    /api/read_one/:_id         '        : 'R1 - Read One object in the Database',
    'POST   /api/create_one            '        : 'C - Create One object in the Database',
    'DELETE /api/delete/:_id           '        : 'D - Delete One object in the Database',
    'POST   /api/update_one_whole/:_id '        : 'U - Update One Whole object in the Database',
    '********************************* '        : '*******************************************',
    'Note'                                      : 'If an Array is present in the Schema',
    'POST   /api/update/add_to_array/:_id'      : 'U - Update Array to add element in the array',
    'POST   /api/update/delete_from_array/:_id' : 'U - Update Array to delete element in the array'
};


//*** 1) MONGOOSE CONFIGURATION = CONNECTION TO THE MongoDB DATABASE

mongoose.connect( `mongodb://localhost/${db_name}` , 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log(`*** Successfully connected to MongoDB = ${db_name}`))
    .catch( err => console.log("*** Something went wrong", err));




//*** 2) Schema for Mongoose

const Schema_DB = new mongoose.Schema(
    {
        name:        { type: String , required: [true, "name is required"] ,        minlength: [3, "name must be 3 characters or longer"]        },
        type:        { type: String , required: [true, "type is required"] ,        minlength: [3, "type must be 3 characters or longer"]        },
        description: { type: String , required: [true, "description is required"] , minlength: [3, "description must be 3 characters or longer"] },
    	skill_1: 		String,
	    skill_2: 		String,
    	skill_3: 		String
    },
    { timestamps: true }
);



//*** 3) Model for Mongoose

const Model_DB = mongoose.model( 'Model_DB'  , Schema_DB );



//*** ROUTES *********************************************************


app.get('/' ,
    (req_from_client , res_to_client) => {
        console.log('*** / ***');
        res_to_client.json( api_routes );       // No use of Mongoose !
    }
);


app.get('/api/read_all' ,
    (req_from_client , res_to_client) => {
        console.log('*** /api/read_all ***');
        Model_DB.find().sort("name").exec()
            .then( list_all => res_to_client.json( list_all ) )
            .catch( error   => res_to_client.json( error    ) );
    }
);


app.get('/api/read_one/:_id' ,
    (req_from_client , res_to_client) => {
        const id_reference = req_from_client.params._id;
        console.log('*** /api/read_one/:id ***' , id_reference );
        Model_DB.find( { _id : req_from_client.params._id } )
            .then( oneObj => res_to_client.json( oneObj ) )
            .catch( error => res_to_client.json( error  ) );
    }
);


app.post('/api/create_one' ,
    (req_from_client , res_to_client) => {
        console.log('*** /api/create_one ***');
        const newOne = new Model_DB( req_from_client.body )
        console.log( newOne );
        newOne.save()
            .then( () => res_to_client.json( { server_message : 'one object saved' } ) )
            .catch( error => res_to_client.json( error ) );
    }
);


app.delete("/api/delete/:_id" , 
    (req_from_client , res_to_client) => {
        const id_reference = req_from_client.params._id;
        console.log('*** /api/delete/:_id ***' , id_reference );
        Model_DB.findOneAndDelete( { _id : req_from_client.params._id } )
            .then( () => res_to_client.json( { server_message : "one object deleted" } ) )
            .catch( error => res_to_client.json( error ) );
    }
);


 
//*** Update 1 object (add to the array)
// Note: when adding a Date to a key,      we posted the following data object example:
// { "date" : "2020-03-24" }

// Note: when adding a string to an array, beware of the name of the array and the name of the
// added element, example:  keywords    IS-NOT-EQUAL-TO     key
// we posted the following data object example:
// { "key" : "a new string in the array" }

mongoose.set('useFindAndModify', false);    // to avoid DeprecationWarning


app.post( '/api/update/add_to_array/:_id' ,
( req_from_client , res_to_client ) => {
    const id_reference = req_from_client.params._id;
    console.log('*** /api/update/add_to_array/:_id ***' , id_reference );
    Model_DB.findOneAndUpdate( { _id : req_from_client.params._id } , { $push: { keywords : req_from_client.body.key } } )
    .then( () => res_to_client.json( { server_message : "keywords added" } ) )
    .catch( error => res_to_client.json( error ) );
    }
);



// *** Update 1 object (delete from the array)

app.post( '/api/update/delete_from_array/:_id' ,
( req_from_client , res_to_client ) => {
    const id_reference = req_from_client.params._id;
    console.log('*** /api/update/delete_from_array/:_id ***' , id_reference );
    Model_DB.findOneAndUpdate( { _id : req_from_client.params._id } , { $pull: { keywords : req_from_client.body.key } } )
    .then( () => res_to_client.json( { server_message : "keywords added" } ) )
    .catch( error => res_to_client.json( error ) );
    }
);


//*** The above ROUTES are working ! *********************************


//*** Update any (exclude the array) Document unique _id remains the same ! 
// a) If a key is left out      ,       the result is:    key-> null          works ok
// b) If all keys are left out  ,       the result is:    all keys -> null    works ok
// c) If a strange key is added ,       the result is:    key is not added    works ok
// d) If a key has a empty string "",   the result is:    key -> ""           works ok
// e) Plan to improve with:
//    Search one
//    const new_obj = { ...retrieveOld , ...req.body }
//    .updateOne()

app.post('/api/update_one_whole/:_id' ,
    ( req_from_client , res_to_client ) => {
        const id_reference = req_from_client.params._id;
        console.log('*** /api/update_one_whole/:_id ***' , id_reference );
        console.log( req_from_client.body );
        Model_DB.updateOne( { _id : req_from_client.params._id } ,
            {
                name: req_from_client.body.name ,    
                type: req_from_client.body.type ,
                date: req_from_client.body.date
            } )
            .then( () => res_to_client.json( { server_message : "Whole object updated" } ) )
            .catch( error => res_to_client.json( error ) );
    }
);



//********************************************************************************
app.listen( port , () => console.log(`*** Listening on port *** ${port}`));


const mysql = require('mysql');

const connection = mysql.createConnection({
    "user": "sql12379991",
    "host": "sql12.freemysqlhosting.net",
    "database": "sql12379991",
    "password": "WXmakVjFeF",
    "port": 3306,
  });

  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

// USER AUTHENTICATION QUERIES
  //GET all users
  const getUsers = (request, response) => {
    console.log("This is the getUsers function call");
    const query = 'SELECT * FROM userdetails';
  
    connection.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send("Success");
    })
  }

  //Check whether user exists or not
  const checkUser = (request, response) => {
    // const id = parseInt(request.params.id)
    console.log('checking user!!')
    const { email, password } = request.body
    const query = "SELECT * FROM userdetails WHERE email = $1 AND password = $2";
    const values = [ email, password ];
  
    //promises
    connection.query(query, values)
    .then(res => {
      // console.log("checking the data====>",res.rows[0]);
      // console.log("checking values====>",values);
      if(res.rows[0] == undefined){
        response.send("Failed")
        console.log("Failed to log in")
      }
      else {
        response.send("Successful")
        console.log("Successfully Logged In")
      }
    })
    .catch(e => console.error(e.stack))

    //callback
    // connection.query(query, values, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   response.status(200).json(results.rows)
    //   // response.send("Logged In successfully!\")
    // })
  }

  //Create a new user. [POST a new user] 
  const createUser = (request, response) => {
    console.log("Creating a new user!");
    const { firstname, lastname, email, address, password, dob, company } = request.body
    const query = "INSERT INTO userdetails ( firstname, lastname, email, address, password, dob, company) VALUES ( $1, $2, $3, $4, $5, $6, $7 )"
    const values = [ firstname, lastname, email, address, password, dob, company ]
  
    connection.query(query, values)
    .then(res => {
      response.status(201).send("Successful")
    })
    .catch(e => console.error(e.stack))
    
  }

  //Update the user details. [PUT updated data in an existing user]
  const updateUser = (request, response) => {
    // const id = parseInt(request.params.id)
    const email = request.params.email
    console.log("Updating the user details!");
    const { firstname, lastname, email, address, password, dob, company } = request.body
    const query = 'UPDATE userdetails SET firstname = $1, lastname = $2, address = $3, password = $4, dob = $5, company = $6 WHERE email = $7'
    const values = [firstname, lastname, address, password, dob, company, email]
  
    connection.query( query, values, (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with email: ${email}`)
      }
    )
  }

  //DELETE a user
  const deleteUser = (request, response) => {
    const {email} = request.body
    console.log(`Deleting the user ${email}`)
    // const { firstname, lastname, email, password } = request.body
    const query = 'DELETE FROM userdetails WHERE email = $1'
    const values = [ email]

    connection.query(query, values)
    .then(results => {
      // console.log("Delete results==>", results)
      if(results.rowCount == 1){
        response.status(200).send(`User deleted with email: ${email}`)
      }
      else{
        response.status(404).send(`${email} user dose not exist`)
      }
      
    })
    .catch(e => {
      console.error(e.stack)
      response.send("Failed")
    })
  }


// EMPLOYEE DETAILS QUERIES

//GET all employees
const getEmpDetails = (request, response) => {
  console.log("This is the getUsers function call");
  const query = 'SELECT * FROM empdetails';

  connection.query(query, values)
  .then(res => {
    if(res.rows[0] == undefined){
      response.send("Failed to fetch")
      console.log("Failed to fetch data")
    }
    else {
      response.send(res.rows)
      console.log("Successfully fteched data")
    }
  })
  .catch(e => console.error(e.stack))
}

//Add Employee details (empdetails table)
const addEmpDetails = (request, response) => {
  console.log("Adding employee details");
  const { firstname, lastname, email, company, city, empdob, address, mobile  } = request.body
  const query = "INSERT INTO empdetails ( firstname, lastname, email, company, city, empdob, address, mobile ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )"
  const values = [ firstname, lastname, email, company, city, empdob, address, mobile ]

  connection.query(query, values)
  .then(res => {
    response.status(201).send("Successful")
  })
  .catch(e => {
    console.error(e.stack)
    response.send("Failed")
  })
  
}

//Update the employee details. [PUT updated data in an existing user]
const updateEmpDetails = (request, response) => {
  const id = request.params.id
  console.log("Updating the employee details!");
  // console.log("Checking the request body====>",request.body);
  // console.log("Checking the request params====>",id);
  const { firstname, lastname, email, company, city, empdob, address, mobile } = request.body
  const query = "UPDATE empdetails SET firstname = $1, lastname = $2, email = $3, company = $4, city = $5, empdob = $6, address = $7, mobile = $8 WHERE id = $10"
  const values = [ firstname, lastname, email, company, city, empdob, address, mobile, id ]

  connection.query( query, values)
  .then(res => {
    response.status(201).send(`Successfully updated ${id} details.`)
  })
  .catch(e => console.error(e.stack))
}

//Delete employee details
  const deleteEmpDetails = (request, response) => {
    // const id = parseInt(request.params.id)
    console.log("Deleting employee details");
    const { id } = request.body
    const query = "DELETE FROM empdetails WHERE id = $1"
    const values = [ id ]

    connection.query(query, values)
    .then(res => {
      response.status(201).send("Successful")
    })
    .catch(e => console.error(e.stack))
  }

  module.exports = {
    getUsers,
    checkUser,
    createUser,
    updateUser,
    deleteUser,
    getEmpDetails,
    addEmpDetails,
    deleteEmpDetails,
    updateEmpDetails
  }
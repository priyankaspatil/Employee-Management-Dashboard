const Pool = require('pg').Pool;
const pool = new Pool({
    "user": "postgres",
    "host": "35.192.221.231",
    "database": "test_dev",
    "password": "postgres",
    "port": 5432,
  });


// USER AUTHENTICATION QUERIES

  //GET all users
  const getUsers = (request, response) => {
    console.log("This is the getUsers function call");
    const query = 'SELECT * FROM register ORDER BY regid ASC';
  
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send("Success")
    })
  }

  //Check whether user exists or not
  const checkUser = (request, response) => {
    // const id = parseInt(request.params.id)
    console.log('checking user!!')
    const { username, password } = request.body
    const query = "SELECT * FROM register WHERE username = $1 AND password = $2";
    const values = [ username, password ];
  
    //promises
    pool.query(query, values)
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
    // pool.query(query, values, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   response.status(200).json(results.rows)
    //   // response.send("Logged In successfully! from database:)")
    // })

    // console.log("This is response====>",response.statusCode);

  }

  //Create a new user. [POST a new user] 
  const createUser = (request, response) => {
    console.log("Creating a new user!");
    const { firstname, lastname, email, username, password } = request.body
    const query = "INSERT INTO register ( firstname, lastname, email, username, password) VALUES ( $1, $2, $3, $4, $5 )"
    const values = [ firstname, lastname, email, username, password ]
  
    pool.query(query, values)
    .then(res => {
      response.status(201).send("Successful")
    })
    .catch(e => console.error(e.stack))
    
  }

  //Update the user details. [PUT updated data in an existing user]
  // const updateUser = (request, response) => {
  //   // const id = parseInt(request.params.id)
  //   console.log("Updating the user details!");
  //   const { firstname, lastname, email, username, password } = request.body
  //   const query = 'UPDATE register SET firstname = $1, lastname = $2, email = $3, username = $4, password = $5 WHERE email = $3'
  //   const values = [firstname, lastname, email, username, password]
  
  //   pool.query( query, values, (error, results) => {
  //       if (error) {
  //         throw error
  //       }
  //       response.status(200).send(`User modified with email: ${email}`)
  //     }
  //   )
  // }

  //DELETE a user
//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }


// EMPLOYEE DETAILS QUERIES

//Add Employee details 
const addEmpDetails = (request, response) => {
  console.log("Adding employee details");
  const { empName, empId, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead } = request.body
  const query = "INSERT INTO empdetails ( empName, empId, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )"
  const values = [ empName, empId, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead ]

  pool.query(query, values)
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
  const id = request.params.empId
  // console.log("Updating the user details!");
  // console.log("Checking the request body====>",request.body);
  // console.log("Checking the request params====>",id);
  const { empName, empId, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead } = request.body
  const query = "UPDATE empdetails SET empName = $1, empDeskNo = $2, empProject = $3, empCostCenter = $4, empUnit = $5, empBand = $6, empImmRepManager = $7, empRepManager = $8, empFunctionHead = $9 WHERE empId = $10"
  const values = [ empName, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead, id ]

  pool.query( query, values)
  .then(res => {
    response.status(201).send(`Successfully ${id} details updated`)
  })
  .catch(e => console.error(e.stack))
}

//Delete employee details
  const deleteEmpDetails = (request, response) => {
    // const id = parseInt(request.params.id)
  
    // pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   response.status(200).send(`User deleted with ID: ${id}`)
    // })

    console.log("Deleting employee details");
    const { empId } = request.body
    const query = "DELETE FROM empdetails WHERE empId = $1"
    const values = [ empId ]

    pool.query(query, values)
    .then(res => {
      response.status(201).send("Successful")
    })
    .catch(e => console.error(e.stack))
  }

  module.exports = {
    getUsers,
    checkUser,
    createUser,
    // updateUser,
    // deleteUser,
    addEmpDetails,
    deleteEmpDetails,
    updateEmpDetails
  }
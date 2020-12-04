# Project(Manager Login and List of employee details)

## Steps to run the application
Install node modules seperately in Frontend and Backend sub-projects. (npm i)
Run both sub-projects seperately, yet simultaneously. (npm start)

## Frontend Project
Frontend project serves you register and login (user = manager role), and list out all stored employee details.
User should first register and then will redirected to login tab on main screen (/ route path). (Validations applicable)
On successfull login user will be redirected to Home screen (/home route path), where stored employee details will be listed out in card formats.
Every page will display maximum of 5 records. Pagination in right bottom-corner of container Pagination will be displayed, which will display total number of records and navigation to change pages accordingly.
In top right a button is provided, where additional new employee will be added in modal popup on click of add employee button. (Validations applicable)


## Backend Project
Backend project serves you for SQL database connection and CRUD operations.
API's for manager login/registion and employee details.
GET, POST, PUT, DELETE applicable as per conditional requirements.

## Authors
- **Priyanka S Patil** - _Initial work_ - preepatil0896@gmail.com

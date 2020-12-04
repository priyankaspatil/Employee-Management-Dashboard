import React from "react";
// import { Redirect } from "react-router-dom";
import { Paper, Grid, Button } from "@material-ui/core";
import EmpCard from "../../Components/EmpCard/EmpCard";
import "./Home.css";
// import BasicDialog from "../../Components/BasicDialog/BasicDialog";
import UserDeatails from "../../Components/UserDetails/AddUserDetails";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";
// import moment from 'moment';
// import axios from "axios";

let EmployeeData = [
  {
    id: 1,
    firstname: "Max",
    lastname: "Bewtos",
    email: "maxb@gmail.com",
    company: "XYZ",
    city: "New York",
    empdob: "03/10/1990",
    address: "First High Street, Linkedin road",
    mobile: "891821001"
  },
  {
    id: 2,
    firstname: "Abrew",
    lastname: "Jhonas",
    email: "abrewj@gmail.com",
    company: "AAS",
    city: "New York",
    empdob: "13/11/1981",
    address: "18 High Street, Linkedin road",
    mobile: "892821441"
  },
  {
    id: 3,
    firstname: "John",
    lastname: "Max",
    email: "johnm@gmail.com",
    company: "UQN",
    city: "Canada",
    empdob: "12/08/1999",
    address: "First High Street, Linkedin road",
    mobile: "123821001"
  },
  {
    id: 4,
    firstname: "Sanket",
    lastname: "Kulkarni",
    email: "sanketk@gmail.com",
    company: "MIOP",
    city: "Pune",
    empdob: "03/10/1992",
    address: "Balewadi high street",
    mobile: "891821001"
  },
  {
    id: 5,
    firstname: "Leena",
    lastname: "More",
    email: "Leena@gmail.com",
    company: "MAXTON",
    city: "Pune",
    empdob: "03/10/1990",
    address: "Viman Nagar",
    mobile: "891828890"
  },
  {
    id: 6,
    firstname: "Mathew",
    lastname: "Brew",
    email: "mathewb@gmail.com",
    company: "HIAS",
    city: "London",
    empdob: "13/01/1990",
    address: "First High Street",
    mobile: "891234001"
  },
  {
    id: 7,
    firstname: "Palak",
    lastname: "Mohak",
    email: "palakm@gmail.com",
    company: "XYZ",
    city: "Mumbai",
    empdob: "03/07/1990",
    address: "Andheri",
    mobile: "770821001"
  },
  {
    id: 8,
    firstname: "Sam",
    lastname: "Bewtos",
    email: "samb@gmail.com",
    company: "HKAS",
    city: "California",
    empdob: "21/09/1993",
    address: "51 High Street road",
    mobile: "221821001"
  }
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empData: [],
      editData: [],
      isDialogOpen: false,
      rowsPerPage: 5,
      PAGEINDEX: 1,
      fromRecords: 1,
      isEdit: false
    };
  }

  async componentDidMount() {
    // let data = [];

    //api for fetching employee data
    // let res = await axios.get("http://localhost:3007/getempdetails");
    // data = res.data;
    // console.log("home check data", data);
    // if(data && data.length > 0) {
    //   this.setState({ empData: data });
    // }
    // else{
    this.setState({ empData: EmployeeData });
    // }
  }

  handleSaveAddedData = newEmpDetails => {
    let newDetails = [];
    newEmpDetails.id = Math.floor(Math.random() * 100);
    newDetails.push(...EmployeeData, newEmpDetails);

    this.setState({ empData: newDetails });
  };

  handleOpenDialog = e => {
    this.setState({ isDialogOpen: true });
  };

  handleCancel = e => {
    this.setState({ isDialogOpen: false });
  };

  handleDeleteEmpDetails = (id) => {
    let newData = this.state.empData;
    let index = newData.findIndex((x) => x.id === id);
    newData.splice(index, 1);
    
    this.setState({ empData: newData});
  }

  handleUpdateEmpDetails = (detailsArr) => {
    let newData = this.state.empData;
    let editArr = [];
    let index = newData.findIndex((x) => x.id === detailsArr.id);
    editArr = newData.splice(index, 1);
    
    if(detailsArr && detailsArr !== undefined && detailsArr !== null ) {
      this.setState({ editData: editArr, isEdit: true, isDialogOpen: true});
    }
  }

  changePagination = page => {
    let pageIndex = this.state.PAGEINDEX;
    if (parseInt(pageIndex) !== parseInt(page)) {
      let fromNumber = 1 + this.state.rowsPerPage * (page - 1);
      this.setState({
        PAGEINDEX: page,
        fromRecords: fromNumber
      });
    }
  };

  render() {
    const { isDialogOpen, empData, rowsPerPage, fromRecords, PAGEINDEX, editData, isEdit } = this.state;

    return (
      <Paper className="home-page_paper-wrapper">
        <Grid className="add__employee--grid">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOpenDialog}
            disabled={false}
            className="add__employee--btn"
          >
            Add Employee
          </Button>
        </Grid>
        <Grid className="home-page_grid-wrapper">
          {/* <h1 className="home-page_title">Hi we are on home page :)</h1> */}
          {empData && 
          <EmpCard 
            EmpCardDetails={empData.slice(fromRecords - 1, fromRecords + rowsPerPage - 1)} 
            handleDeleteEmpDetails={this.handleDeleteEmpDetails}
            handleOpenDialog={this.handleOpenDialog}
            handleUpdateEmpDetails={this.handleUpdateEmpDetails}
          />}
        </Grid>
        {isDialogOpen && (
          <UserDeatails
            isOpen={isDialogOpen}
            handleCancel={this.handleCancel}
            handleOpenDialog={this.handleOpenDialog}
            handleSaveAddedData={this.handleSaveAddedData}
            isEdit={isEdit}
            editData={editData}
          />
        )}
        <Grid className="home-page_pagination-wrapper">
          <CustomPagination
            TOTALRECORD={empData.length}
            PAGESIZE={rowsPerPage}
            PAGERCOUNT={5}
            PAGEINDEX={PAGEINDEX}
            onClick={this.changePagination.bind(this)}
          />
        </Grid>
      </Paper>
    );
  }
}

export default HomePage;

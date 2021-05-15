/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api, { API_TYPES } from "../../actions/api";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import ResponsiveDialog from "../../components/Modal/Modal";

function Modal(txt) {
  return <ResponsiveDialog text={txt}/>
}

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const DateTimePickerComponent = (props) => {
  return (
    <Container maxWidth="xl" className={props.classes.container}>
      <form className={props.classes.container} noValidate>
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          value={props.startDate}
          // defaultValue={new Date().toISOString()}
          name="startDate"
          className={props.classes.textField}
          onChange={props.onChange}
          InputLabelProps={{
            shrink: true,
            onChange: props.onChange,
          }}
        />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          value={props.endDate}
          // defaultValue={new Date().toISOString()}
          name="endDate"
          className={props.classes.textField}
          onChange={props.onChange}
          InputLabelProps={{
            shrink: true,
            onChange: props.onChange,
          }}
        />
      </form>
    </Container>
  );
};

export default function CarAvailable(props) {
  const columns = [
    { field: "manuf", headerName: "Manufacturer", flex: 0.3 },
    { field: "model", headerName: "Model", flex: 0.3 },
    { field: "color1", headerName: "Color", flex: 0.3 },
    { field: "yofProd1", headerName: "Year of Prod.", flex: 0.3 },
    { field: "priceDay1", headerName: "Price per day", flex: 0.3 },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  const [carList, setData] = useState([]);
  const [dateTimePicker, showDateTimePicker] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
  });

  const setCarList = (list)=>{
    const updatedJson = list.map(
      ({
        idCar: id,
        manufacturer: manuf,
        model,
        color: color1,
        yofProd: yofProd1,
        kilometers: kilometers1,
        priceDay,
        isAvailable: isAvailable1,
        insurance: insurance1,
        segment: segment1,
        regNumbers: regNumbers1,
        filePath: filePath1,
        techRev: techRev1,
      }) => ({
        id,
        manuf,
        model,
        color1,
        yofProd1,
        kilometers1,
        priceDay,
        isAvailable1,
        insurance1,
        segment1,
        regNumbers1,
        filePath1,
        techRev1,
      })
    );

    setData(updatedJson.filter((x) => x.isAvailable1 == 1));
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.request(API_TYPES.CAR).fetchAll();
      setCarList(request.data)
      
    };

    fetchData();
  }, [refresh]);

  const reserveCar = async () => {
    sendTransaction();

  };

  async function sendTransaction() {

    let car = carList.filter(x=>x.id == selectionModel);
    console.log(car)
      let newTransaction={
        Transaction: 0,
        User: props.match.params.id,
        Car: parseInt(selectionModel),
        Price: parseInt(car[0].priceDay),
        IsEnd:false,
        IsReturned:false,
        StartDate:new Date(state.startDate),
        EndDate:new Date(state.endDate),
      }
      console.log(newTransaction)
      await api.request(API_TYPES.TRANSACTIONS).create("",newTransaction).then( response=>{
        console.log(response)
        if(response.data == "OK"){
          
 setRefresh(!refresh)
          Modal(response.data);
        }
    })
  }

  const handleChange = (e) => {

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <GridContainer>
        {" "}
        <Container maxWidth="lg">
          <div style={{ height: 600, marginTop: 80 }}>
            <DataGrid
              rows={carList}
              columns={columns}
              pageSize={10}
              id="idCar"
              hideFooterPagination
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
              }}
              selectionModel={selectionModel}
            />
          </div>
        </Container>

      </GridContainer>
      <GridContainer>
        <Container maxWidth="lg">
          {selectionModel.map((val, key) => (
            val ? (
              <div>
                <DateTimePickerComponent
                  value={state}
                  classes={classes}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={reserveCar}>
                  Wynajmij Pojazd
          </Button>
              </div>

            ) : null


          ))}

        </Container>
      </GridContainer>
    </div>
  );
}

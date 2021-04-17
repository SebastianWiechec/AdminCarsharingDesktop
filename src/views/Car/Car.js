/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};



export default function CarProfile(props) {


  const [car, setCar] = useState({ idCar: 0 });



  const useStyles = makeStyles(styles);
  const classes = useStyles();
  console.log("tu")
  const handleChange = (event) => {
    console.log("tu")
    const name = event.target.id;
    setCar({
      ...car,
      [name]: event.target.value,
    });
  };


  async function SendData() {

    car.idCar = parseInt(car.idCar);
    car.yofProd = parseInt(car.yofProd);
    car.kilometers = parseInt(car.kilometers);
    car.priceDay = parseFloat(car.priceDay);
    car.isAvailable = parseInt(car.isAvailable);
    car.segment = parseInt(car.segment);
    car.insurance = new Date(car.insurance);
    car.techRev = new Date(car.techRev);

    await api.request(API_TYPES.CAR).create(car);

  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit/Add Car</h4>
              <p className={classes.cardCategoryWhite}>Complete Car Info</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Car Id"
                    id="idCar"
                    name="idCar"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange,
                      type: "number"
                    }}
                  />

                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Manufacturer"
                    id="manufacturer" 
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Model"
                    id="model"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Color"
                    id="color"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Year of production (yyyy)"
                    id="yofProd"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Kilometers"
                    id="kilometers"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Price per day"
                    id="priceDay"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Is available ? 0- no; 1- yes"
                    id="isAvailable"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>


                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Insurance valid from (yyyy-mm-dd)"
                    id="insurance"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Segment type 1 to 10"
                    id="segment"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Registration numbers"
                    id="regNumbers"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Path to photos"
                    id="filePath"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Technical review from (yyyy-mm-dd)"
                    id="techRev"
                    formControlProps={{
                      fullWidth: true
                    }}
                    required
                    inputProps={{
                      onChange: handleChange
                    }}
                  />
                </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={SendData}>Update Info</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
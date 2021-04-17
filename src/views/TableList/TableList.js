/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api, { API_TYPES } from "../../actions/api";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList(props) {

  const [spendings,setSpendings1] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        console.log(props.match.params.id);
        const request = await api.request(API_TYPES.SPENDINGS).fetchSpendings("/"+props.match.params.id);
        setSpendings1(request.data);
  
        console.log(request.data);
      };
  
      fetchData();
    }, []);

    let newSpendings = new Array();
    spendings.forEach(element => {
  
      let date;
      let carID;
      let costID;
      let price;

      for (let [key, value] of Object.entries(element)) {
    
        if (key == "date") {
          date = value.substring(0, value.indexOf("T"));
        }
        if (key == "carID") {
          carID = value;
        }
        if (key == "costID") {
          costID = value;
        }
        if (key == "price") {
          price = value;
        }
        
      }
  
      newSpendings.push({
        date: date,
        carID: carID,
        costID: costID,
        price:price

      })
    });
    console.log(newSpendings)

  const classes = useStyles();
  return (
    <GridContainer>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Transakcje</h4>
            <p className={classes.cardCategoryWhite}>
              Lista ostatnich transakcji
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Users", "Car", "Start Date", "End Date", "Price", "Is End", "Is Returned"]}
              tableData={[
                ["1", "dfgsdgf", "1", "2020-11-11", "2020-11-12", "500", "true", "true"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Wydatki
            </h4>
            <p className={classes.cardCategoryWhite}>
              Lista ostatnich wydatków
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Date", "CarID","CostID","Price"]}
              tableData={newSpendings}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

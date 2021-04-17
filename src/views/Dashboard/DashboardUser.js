/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api, { API_TYPES } from "../../actions/api";
import Cookies from "universal-cookie";
import { bugs, website, server } from "variables/general.js";
import Button from "components/CustomButtons/Button.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";



const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [carDesc, setData] = useState([{}]);
  const [spendings, setSpendings] = useState([]);

  let newCars = new Array();
  carDesc.forEach((element) => {
    let manufacturer;
    let model;
    let color;
    let yofProd;

    for (let [key, value] of Object.entries(element)) {
      if (key == "manufacturer") {
        manufacturer = value;
      }
      if (key == "model") {
        model = value;
      }
      if (key == "color") {
        color = value;
      }
      if (key == "yofProd") {
        yofProd = value;
      }
    }

    newCars.push({
      manufacturer: manufacturer,
      model: model,
      color: color,
      yofProd: yofProd,
    });
  });
  console.log(newCars);

  let newDatalabels = new Array();
  let newDataseries = new Array();

  var map = spendings.reduce(function (map, spending) {
    var date = spending.date;
    var price = +spending.price;
    map[date] = (map[date] || 0) + price;
    return map;
  }, {});

  // console.log(map)

  var array = Object.keys(map).map(function (date) {
    return {
      date: date.substring(0, date.indexOf("T")),
      price: map[date],
    };
  });

  const sumValues = array.reduce((total, obj) => obj.price + total, 0);

  array.forEach((element) => {
    for (let [key, value] of Object.entries(element)) {
      if (key == "date") {
        newDatalabels.push(value.toString());
      }
      if (key == "price") {
        newDataseries.push(value.toString());
      }
    }
  });

  // console.log(newDatalabels);
  // console.log(newDataseries);

  emailsSubscriptionChart.data.labels = newDatalabels;
  emailsSubscriptionChart.data.series = [newDataseries];

  // const cookies = new Cookies();
  let userId = props.match.params.id;
  //cookies.get("userId");
  // console.log(userId);

  async function SendData() {
    let email = {
      From: localStorage.getItem('user'),
      To: "adrianmastalerz01@gmail.com",
      Subject: `Wydatki użytkownika ${localStorage.getItem('user')}`,
      Html: "",
      IdUser: userId
    };
    console.log(email)
    await api.request(API_TYPES.SPENDINGS).sendEmail(email);
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await api
        .request(API_TYPES.SPENDINGS)
        .fetchUserCars("/" + userId);
      const userSpendings = await api
        .request(API_TYPES.SPENDINGS)
        .fetchSpendings("/" + userId);

      setData(request.data);
      setSpendings(userSpendings.data);
      console.log(userSpendings.data);
    };

    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>payments</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Wydatki User</p>
              <h3 className={classes.cardTitle}>{sumValues} PLN</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Twoje wydatki
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>emoji_transportation</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Auta w użyciu</p>
              <h3 className={classes.cardTitle}>{carDesc.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Twoje auta
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <GridContainer
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <GridItem xs={6} sm={6} md={6}>
                  <h4 className={classes.cardTitle}>Wszystkie wydatki</h4>
                  <p className={classes.cardCategory}>rozłożone w czasie</p>
                </GridItem>

                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    // className={classes.cardTitle}
                    color="primary"
                    onClick={SendData}
                  >
                    Wyślij Koszty mailem
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Zaktualizowano 2 minuty temu
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Samochody</h4>
              <p className={classes.cardCategoryWhite}>Twoje Samochody</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Producent", "Model", "Kolor", "Rok prod"]}
                tableData={newCars}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

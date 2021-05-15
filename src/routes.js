/* eslint-disable no-unused-vars */
/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
//import DashboardPage from "views/Dashboard/DashboardAdmin.js";
import { default as UserDashboard } from "views/Dashboard/DashboardUser.js";
import { default as AdminDashboard } from "views/Dashboard/DashboardAdmin.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import Car from "views/Car/CarList";
import SpendingNew from "views/Spending/Spending";
import CarProfile from "views/Car/Car";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import logList from "views/Logs/logs";
import SignInSide from "views/SignIn/SignIn";
import CarList from "views/Car/CarList";
import CarAvailable from "views/Car/CarAvialable";

// localStorage.setItem("role", "admin");


const dashboardRoutes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin",
    role: "Admin",
  },
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: UserDashboard,
    layout: "/admin",
    role: "User",
  },
  {
    path: "/CarList/:id",
    name: "Car List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component: CarList,
    layout: "/admin",
    role: "Admin",
  },
  {
    path: "/user/:id",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    role: "User",
  },
  {
    path: "/Spending/:id",
    name: "Add spending",
    rtlName: "ملف تعريفي للمستخدم",
    icon: MonetizationOnIcon,
    component: SpendingNew,
    layout: "/admin",
    role: "All",
  },
  {
    path: "/table/:id",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    role: "All",
  },
  {
    path: "/Car/:id",
    name: "Car",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component: CarProfile,
    layout: "/admin",
    role: "None",
  },
  {
    path: "/logs/:id",
    name: "Log List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: logList,
    layout: "/admin",
    role: "User",
  },
  {
    path: "/CarAvailable/:id",
    name: "Available cars",
    rtlName: "قائمة الجCarAvailableدول",
    icon: "content_paste",
    component: CarAvailable,
    layout: "/admin",
    role: "User",
  },
];

export default dashboardRoutes;

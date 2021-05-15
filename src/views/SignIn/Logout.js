import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

// function LogoutUser() {
//   let history = useHistory();
//   localStorage.removeItem("user");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("token");
//   history.push("/SignIn/");
//   // logout({ returnTo: window.location.origin })
// }

const LogoutButton = () => {
  // const { logout } = useAuth0();
  const classes = useStyles();
  let history = useHistory();
  function LogoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    history.push("/");

  }

  return (
    <MenuItem onClick={LogoutUser} className={classes.dropdownItem}>
      Logout
    </MenuItem>
  );
};

export default LogoutButton;

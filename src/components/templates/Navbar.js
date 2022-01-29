import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import { useState } from "react";


const Navbar = () => {
  const [money, setMoney] = useState(0);

  //buyer
  if (localStorage.getItem('log') === "1") {
    const email = localStorage.getItem('loggedEmail');

    axios
      .post("https://siddhfoodwebapp.herokuapp.com/user/profile", { "email": email })
      .then((response) => {
        setMoney(response.data.wallet);
      })
      .catch(function (error) {
        console.log(error);
      });

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => window.location.href = "/"}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" onClick={() => window.location.href = "/myorders"}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/order"}>
              Order Now
            </Button>
            <Typography id="navBarBalance">{money}</Typography>
            <AccountBalanceWalletIcon sx={{fontSize: 40}} onClick={() => {
              window.location.href = "/wallet"
            }} />
            <Button color="inherit" onClick={() => window.location.href = "/profile"}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => {
              localStorage.setItem('log', '3');
              localStorage.setItem('loggedEmail', "");
              window.location.href = "/";
            }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

  }
  //vendor
  else if (localStorage.getItem('log') === "2") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => window.location.href = "/"}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" onClick={() => window.location.href = "/stats"}>
              Statistics
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/orders"}>
              Orders
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/food"}>
              Food Items
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/profile"}>
              My Profile
            </Button>
            <Button color="inherit" onClick={() => {
              localStorage.setItem('log', '3');
              localStorage.setItem('loggedEmail', "");
              window.location.href = "/";
            }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

  }
  // to login or register
  else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => window.location.href = "/"}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => window.location.href = "/register"}>
              Register
            </Button>
            <Button color="inherit" onClick={() => window.location.href = "/login"}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

  }


};

export default Navbar;

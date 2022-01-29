import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Made by - Siddh Jain '}

    </Typography>
  );
}
const theme = createTheme();

const Register = (props) => {

  const [type, setType] = useState(1);
  // 1  for buyer 2 for vendor

  //for users
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact_number, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");

  // for vendors
  const [manager_name, setManagerName] = useState("");
  const [shop_name, setShopName] = useState("");
  const [opening_time, setOpeningTime] = useState("");
  const [closing_time, setClosingTime] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangeTYpe = (event) => {
    setType(event.target.value);
  };
  const onChangeManagerName = (event) => {
    setManagerName(event.target.value);
  };
  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };
  const onChangeOpeningTime = (event) => {
    setOpeningTime(event.target.value);
  };
  const onChangeClosingTime = (event) => {
    setClosingTime(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setAge("");
    setBatch("");
    setManagerName("");
    setShopName("");
    setOpeningTime("");
    setClosingTime("");
  };

  const onSubmitBuyer = (event) => {
    event.preventDefault();

    if (age > 0 && contact_number > 0) {
      const newUser = {
        name: name,
        email: email,
        password: password,
        contact_number: contact_number,
        age: age,
        batch: batch
      };

      axios
        .post("https://siddhfoodwebapp.herokuapp.com/user/register", newUser)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);
        });

      resetInputs();

    }
    else {
      alert("Put correct values!");
    }

  };

  const onSubmitVendor = (event) => {
    event.preventDefault();

    if (contact_number > 0) {
      const newVendor = {
        manager_name: manager_name,
        email: email,
        password: password,
        contact_number: contact_number,
        shop_name: shop_name,
        opening_time: opening_time,
        closing_time: closing_time
      };

      axios
        .post("https://siddhfoodwebapp.herokuapp.com/vendor/register", newVendor)
        .then((response) => {
          alert("Created\t" + response.data.manager_name);
          console.log(response.data);
        });

      resetInputs();

    }
    else {
      alert("Put correct values!");
    }


  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <ButtonGroup variant="outlined" size="large" aria-label="large button group">
            <Button value="1" onClick={onChangeTYpe}>Buyer</Button>
            <Button value="2" onClick={onChangeTYpe}>Vendor</Button>
          </ButtonGroup>
          {type === "1" ?
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                label="User Name"
                name="email"
                autoFocus
                value={name}
                onChange={onChangeUsername}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={onChangeEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={onChangePassword}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact Number"
                name="contact_nuumber"
                autoFocus
                value={contact_number}
                onChange={onChangeContact}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                label="Age"
                name="age"
                autoFocus
                value={age}
                onChange={onChangeAge}
              />
              {/* 

              <TextField
                margin="normal"
                required
                fullWidth
                label="Batch"
                name="batch"
                autoFocus
                value={batch}
                onChange={onChangeBatch}
              /> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={batch}
                    label="Age"
                    onChange={onChangeBatch}
                  >
                    <MenuItem value={"UG-1"}>UG-1</MenuItem>
                    <MenuItem value={"UG-2"}>UG-2</MenuItem>
                    <MenuItem value={"UG-3"}>UG-3</MenuItem>
                    <MenuItem value={"UG-4"}>UG-4</MenuItem>
                  </Select>
                </FormControl>
              </Box>


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitBuyer}
              >
                Register
              </Button>
            </>
            :
            <div>
            </div>
          }
          {type === "2" ?
            <>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Manager Name"
                name="manager_name"
                autoFocus
                value={manager_name}
                onChange={onChangeManagerName}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={onChangeEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={onChangePassword}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact Number"
                name="contact_nuumber"
                autoFocus
                value={contact_number}
                onChange={onChangeContact}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                label="Shop Name"
                name="shop_name"
                autoFocus
                value={shop_name}
                onChange={onChangeShopName}
              />


              <TextField
                margin="normal"
                required
                fullWidth
                label="Opening Time"
                name="opening_time"
                autoFocus
                value={opening_time}
                onChange={onChangeOpeningTime}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Closing Time"
                name="closing_ time"
                autoFocus
                value={closing_time}
                onChange={onChangeClosingTime}
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitVendor}
              >
                Register
              </Button>
            </>

            :
            <div></div>
          }
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;



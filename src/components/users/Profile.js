import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const Profile = (props) => {
  const email = localStorage.getItem('loggedEmail');

  // for users
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact_number, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");

  //for vendors
  const [manager_name, setManagerName] = useState("");
  const [shop_name, setShopName] = useState("");
  const [opening_time, setOpeningTime] = useState("");
  const [closing_time, setClosingTime] = useState("");

  const [edit_profile, setEditProfile] = useState('0');




  useEffect(() => {

    if (localStorage.getItem('log') === "1") {
      axios
        .post("https://siddhfoodwebapp.herokuapp.com/user/profile", { "email": email })
        .then((response) => {
          //console.log(response.data);
          setName(response.data.name);
          setPassword(response.data.password);
          setContact(response.data.contact_number);
          setAge(response.data.age);
          setBatch(response.data.batch);
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    if (localStorage.getItem('log') === "2") {

      axios
        .post("https://siddhfoodwebapp.herokuapp.com/vendor/profile", { "email": email })
        .then((response) => {
          //console.log(response.data);
          setManagerName(response.data.manager_name);
          setPassword(response.data.password);
          setContact(response.data.contact_number);
          setShopName(response.data.shop_name);
          setOpeningTime(response.data.opening_time);
          setClosingTime(response.data.closing_time);
        })
        .catch(function (error) {
          console.log(error);
        });

    }


  }, [email]);

  // for buyers
  if (localStorage.getItem('log') === "1") {

    const onChangeUsername = (event) => {
      if (edit_profile === '1') {
        setName(event.target.value);
      }
    };
    const onChangePassword = (event) => {
      if (edit_profile === '1') {
        setPassword(event.target.value);
      }
    };
    const onChangeContact = (event) => {
      if (edit_profile === '1') {
        setContact(event.target.value);
      }
    };
    const onChangeAge = (event) => {
      if (edit_profile === '1') {
        setAge(event.target.value);
      }
    };
    const onChangeBatch = (event) => {
      if (edit_profile === '1') {
        setBatch(event.target.value);
      }
    };


    const editProfile = (event) => {
      setEditProfile(event.target.value);
    };

    const onSubmitChanges = (event) => {
      event.preventDefault();
      setEditProfile('0');


      const editUser = {
        name: name,
        email: email,
        password: password,
        contact_number: contact_number,
        age: age,
        batch: batch
      };

      axios
        .post("https://siddhfoodwebapp.herokuapp.com/user/profileSave", editUser)
        .then((response) => {
          alert("Saved sucessfully");
        });

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

            <TextField
              margin="normal"
              fullWidth
              required
              label="User Name"
              name="email"
              autoFocus
              value={name}
              onChange={onChangeUsername}
            />

            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              disabled
              autoFocus
              value={email}
            //onChange={onChangeEmail}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={onChangePassword}
            />


            <TextField
              margin="normal"
              fullWidth
              label="Contact Number"
              name="contact_nuumber"
              autoFocus
              value={contact_number}
              onChange={onChangeContact}
            />


            <TextField
              margin="normal"
              fullWidth
              label="Age"
              name="age"
              autoFocus
              value={age}
              onChange={onChangeAge}
            />


            <TextField
              margin="normal"
              fullWidth
              label="Batch"
              name="batch"
              autoFocus
              value={batch}
              onChange={onChangeBatch}
            />

            {
              edit_profile === '0' ?
                <>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    value="1"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </Button>
                </> : <div></div>
            }
            {
              edit_profile === '1' ?
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onSubmitChanges}
                    color="success"
                  >
                    Save Changes
                  </Button>
                </> : <div></div>
            }

          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // for vendors
  else if (localStorage.getItem('log') === "2") {


    const onChangeManagerName = (event) => {
      if (edit_profile === '1')
        setManagerName(event.target.value);
    };
    const onChangeShopName = (event) => {
      if (edit_profile === '1')
        setShopName(event.target.value);
    };
    const onChangeOpeningTime = (event) => {
      if (edit_profile === '1')
        setOpeningTime(event.target.value);
    };
    const onChangeClosingTime = (event) => {
      if (edit_profile === '1')
        setClosingTime(event.target.value);
    };


    const onChangePassword = (event) => {
      if (edit_profile === '1') {
        setPassword(event.target.value);
      }
    };
    const onChangeContact = (event) => {
      if (edit_profile === '1') {
        setContact(event.target.value);
      }
    };

    const editProfile = (event) => {
      setEditProfile(event.target.value);
    }

    const onSubmitChanges = (event) => {
      event.preventDefault();
      setEditProfile('0');


      const editVendor = {


        manager_name: manager_name,
        email: email,
        password: password,
        contact_number: contact_number,
        shop_name: shop_name,
        opening_time: opening_time,
        closing_time: closing_time

      };

      axios
        .post("https://siddhfoodwebapp.herokuapp.com/vendor/profileSave", editVendor)
        .then((response) => {
          alert("Saved sucessfully");
        });

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
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              disabled
              autoFocus
              value={email}
            //onChange={onChangeEmail}
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



            {
              edit_profile === '0' ?
                <>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    value="1"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </Button>
                </> : <div></div>
            }
            {
              edit_profile === '1' ?
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onSubmitChanges}
                    color="success"
                  >
                    Save Changes
                  </Button>
                </> : <div></div>
            }

          </Box>
        </Container>
      </ThemeProvider>
    );

  }

};

export default Profile;

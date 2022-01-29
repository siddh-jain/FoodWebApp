import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Made by - Siddh Jain '}

        </Typography>
    );
}
const theme = createTheme();

const Register = (props) => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const Values = {
            email: email,
            password: password
        };


        axios
            .post("https://siddhfoodwebapp.herokuapp.com/user/login", Values)
            .then((response) => {
                //console.log(response.data);
                if (response.data.stat === "Login Successful") {
                    alert("Welcome");
                    localStorage.setItem('log', '1');
                    localStorage.setItem('loggedEmail',email);
                    window.location.href = '/';
                }
                else {
                    axios
                        .post("https://siddhfoodwebapp.herokuapp.com/vendor/login", Values)
                        .then((response) => {
                            //console.log(response.data);
                            if (response.data.stat === "Login Successful") {
                                alert("Welcome");
                                localStorage.setItem('log', '2');
                                localStorage.setItem('loggedEmail',email);
                                window.location.href = '/';
                            }
                            else {
                                alert("wrong credentials");
                                localStorage.setItem('log', '3');
                                localStorage.setItem('loggedEmail',"");
                            }
                        })
                }
            })
            .catch((error) => {
                console.log("error");
            });
        resetInputs();
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
                        Login
                    </Typography>

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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                    >
                        Login
                    </Button>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default Register;



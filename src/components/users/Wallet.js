import axios from "axios";
import { useState } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Wallet = (props) => {
    const email = localStorage.getItem('loggedEmail');
    const [wallet, setWallet] = useState(0);
    const [money, setMoney] = useState(0);

    axios
        .post("https://siddhfoodwebapp.herokuapp.com/user/profile", { "email": email })
        .then((response) => {
            setWallet(response.data.wallet);
        })
        .catch(function (error) {
            console.log(error);
        });

    const onChangeMoney = (event) => {
        setMoney(event.target.value);
    };

    const onSubmitMoney = (event) => {
        event.preventDefault();

        if (Math.floor(money) > 0) {
            const final_wallet = wallet + Math.floor(money);

            const UpdatingWallet = {
                email: email,
                wallet: final_wallet
            };

            axios
                .post("https://siddhfoodwebapp.herokuapp.com/user/updateWallet", UpdatingWallet)
                .then((response) => {
                    alert("Updated sucessfully");
                });

            window.location.reload();

        }



    };

    return (<div style={{ textAlign: "center" }}>
        <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 300 }} />
        <h1>Balance :{wallet}</h1>

        <h1>Add money to wallet!</h1>

        <TextField
            margin="normal"
            autoFocus
            value={money}
            onChange={onChangeMoney}
        />

        <br />
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmitMoney}
        >
            Add to wallet
        </Button>


    </div>

    );



};

export default Wallet;

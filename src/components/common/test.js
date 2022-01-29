import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const Order = (props) => {
    const [orders, setOrders] = useState([]);
    const email = localStorage.getItem('loggedEmail');

    useEffect(() => {

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/findForVendor", { email: email })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [email]);

    const NextStage = (event, curr_stage, shopname, buyer) => {
        event.preventDefault();
        console.log(curr_stage,shopname,buyer);

        //console.log(curr_stage);
        var no_of_orders = orders.length;
        //console.log(no_of_orders);

        var current_orders = 0;

        for (var i = 0; i < no_of_orders; i++) {
            if (orders[i].stage === 2 || orders[i].stage === 3) {
                current_orders++;
            }
        }

        //console.log(current_orders);
        if (current_orders >= 10 && curr_stage === 1) {
            alert("orders full");
            console.log(current_orders);
        }
        else {
            axios
                .post("https://siddhfoodwebapp.herokuapp.com/order/nextStage", { _id: event.target.value })
                .then((response) => {
                    console.log("here");
                    //window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    console.log("here");
                    window.location.reload();

                })
            //window.location.reload();
        }


    };

    const RejectOrder = (event, shop_name, buyer) => {
        event.preventDefault();

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/reject", { _id: event.target.value })
            .then((response) => {
                console.log("eh");
                //window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                window.location.reload();
            })



        //window.location.reload();
    }

    return (
        <div>
            <Grid container>
                <Grid xs={12} md={12} lg={12} item={true}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Food Name</TableCell>
                                    <TableCell>Buyer</TableCell>
                                    <TableCell>Placed Time</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Add-Ons</TableCell>
                                    <TableCell>Stage</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.food_item_name}</TableCell>
                                        <TableCell>{row.buyer_email}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.food_price}</TableCell>
                                        <TableCell>{row.add_on.map((a, i) => (
                                            <table key={i}>
                                                <tbody>
                                                    <tr>
                                                        <td>{a.addOn_name}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ))}
                                        </TableCell>
                                        <TableCell>
                                            {row.stage === 1 ? <>
                                                <p>Placed</p></> : <div></div>}
                                            {row.stage === 2 ? <>
                                                <p>Accepted</p></> : <div></div>}
                                            {row.stage === 3 ? <>
                                                <p>Cooking</p></> : <div></div>}
                                            {row.stage === 4 ? <>
                                                <p>Ready for Pickup</p></> : <div></div>}
                                            {row.stage === 5 ? <>
                                                <p>Completed</p></> : <div></div>}
                                            {row.stage === -1 ? <>
                                                <p>Rejected</p></> : <div></div>}
                                        </TableCell>

                                        <TableCell>

                                            {row.stage > 0 && row.stage < 4 ? <>
                                                <Button
                                                    value={row._id}
                                                    onClick={(e) => {
                                                        NextStage(e, row.stage, row.shop_name, row.buyer_email);
                                                    }}
                                                    color="secondary"
                                                    variant="outlined"
                                                    startIcon={<ArrowCircleRightIcon />}>
                                                    Move to Next Stage
                                                </Button>
                                            </> : <div></div>}

                                            {row.stage === 1 ? <>
                                                <Button
                                                    value={row._id}
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={(e) => {
                                                        RejectOrder(e, row.shop_name, row.buyer_email);
                                                    }}
                                                    startIcon={<CancelIcon />}>
                                                    Reject
                                                </Button></> : <div></div>}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                </Grid>
            </Grid>


        </div>
    );
};

export default Order;
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';


const MyOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const email = localStorage.getItem('loggedEmail');

    useEffect(() => {

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/findForBuyer", { email: email })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [email]);

    const PickedUp = (event) => {
        event.preventDefault();

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/pickedUp", { _id: event.target.value })
            .then((response) => {
                console.log("here");

            })
            .catch((error) => {
                console.log(error);

            })

        window.location.reload();

    };

    const saveRatings = (event, ide,food_name) => {
        event.preventDefault();



        var rating = (Number)(event.target.value);

        const rat = {
            "rating": rating,
            "_id": ide,
            "food_item_name":food_name
        };
        //console.log(rat);

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/updateRating", rat)
            .then((response) => {
                console.log("done");

            })
            .catch((err) => {
                console.log(err);

            })

        window.location.reload();
    };

    return (
        <div>
            <Grid container>
                <Grid xs={12} md={12} lg={12} item={true}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Food Name</TableCell>
                                    <TableCell>Vendor</TableCell>
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
                                        <TableCell>{row.vendor_email}</TableCell>
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

                                            {row.stage === 4 ? <>
                                                <Button
                                                    value={row._id}
                                                    onClick={PickedUp}
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                                    Pick Up Food
                                                </Button>
                                            </> : <div></div>}

                                            {row.stage === 5 ? <>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><p>Rate:</p></td>
                                                            <td><Rating
                                                                name="simple-controlled"
                                                                value={row.rating}
                                                                onChange={(e) => {
                                                                    saveRatings(e, row._id,row.food_item_name);
                                                                }}
                                                            /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </> : <div></div>}
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


export default MyOrders;
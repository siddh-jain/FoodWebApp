import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Order = (props) => {
    const email = localStorage.getItem('loggedEmail');
    const [foodItems, setFoodItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [Add_ons, setAddOns] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [addonTosend, setAddonTosend] = useState([]);
    const [shopName, setSN] = useState("");
    const [itemName, setItemName] = useState("");
    const [v_email, setVmail] = useState("");
    const [sortPrice, setSortPrice] = useState(true);
    const [sortRating, setSortRating] = useState(true);
    const [checked, setChecked] = useState([true, false]);
    const [min_price, setMinPrice] = useState(0);
    const [max_price, setMaxPrice] = useState(1000);

    useEffect(() => {

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/agg")
            .then((response) => {
                setFoodItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setFinalPrice(0)

    }, []);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Veg"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Non-Veg"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
        </Box>
    );

    const sortChangePrice = () => {
        let foodItemsTemp = foodItems;
        const flag1 = sortPrice;
        foodItemsTemp.sort((a, b) => {
            if (a.price !== undefined && b.price !== undefined) {
                return (1 - flag1 * 2) * (a.price - b.price);
            }
            else {
                return 1;
            }

        })
        setFoodItems(foodItemsTemp);
        setSortPrice(!sortPrice);
    };
    const sortChangeRating = () => {
        let foodItemsTemp1 = foodItems;
        const flag2 = sortRating;

        foodItemsTemp1.sort((a, b) => {
            if (a.rating !== undefined && b.rating !== undefined) {
                return (1 - flag2 * 2) * (a.rating - b.rating);
            }
            else {
                return 1;
            }
        })
        setFoodItems(foodItemsTemp1);
        setSortRating(!sortRating);
    }


    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const onChangeMinPrice = (event) => {
        setMinPrice(event.target.value);
    };

    const onChangeMaxPrice = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const proceedToOrder = (event) => {
        event.preventDefault();
        const _id = event.target.value;
        //console.log("yaha");
        //console.log(_id);

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/findByID", { "_id": _id })
            .then((response) => {
                //console.log(response.data);
                setAddOns(response.data.add_on);
                setFinalPrice(response.data.price);
                setSN(response.data.shop_name);
                setItemName(response.data.item_name);

                //console.log(response.data.shop_name);
                axios
                    .post("https://siddhfoodwebapp.herokuapp.com/vendor/findbyshop", { "shop_name": response.data.shop_name })
                    .then((response) => {
                        setVmail(response.data.email);
                        //console.log(response.data.email);
                    })
                    .catch((err) => {
                        console.log(err);
                    }).finally(() => { handleClickOpen(); })
            });

    };



    const handleChecked = (event) => {
        var selected = event.target.checked;
        var index = event.target.value;

        if (selected) {
            setFinalPrice(finalPrice + Add_ons[index].price);
            addonTosend.push({ "addOn_name": Add_ons[index].addOn_name, "price": Add_ons[index].price });
        }
        else {
            setFinalPrice(finalPrice - Add_ons[index].price);
            addonTosend.splice(index, 1);
        }
    };

    const OrderFood = (e) => {
        e.preventDefault();

        if (quantity > 0) {


            var quan = Math.floor(quantity);
            console.log(quan);
            var fp = finalPrice * quan;
            console.log(fp);
            var bal = document.getElementById('navBarBalance').innerHTML;
            //console.log(bal);
            if (bal < fp) {
                alert("insufficient balance");
                handleClose();

            }
            else {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                const Order = {

                    food_item_name: itemName,
                    quantity: quan,
                    time: time,
                    buyer_email: email,
                    vendor_email: v_email,
                    food_price: fp,
                    add_on: addonTosend,
                    balance: bal
                };

                console.log(Order);
                handleClose();
                axios
                    .post("https://siddhfoodwebapp.herokuapp.com/order/add", Order)
                    .then((response) => {
                        alert("order placed successfully!");

                    })

                window.location.reload();
            }
        }
        else {
            alert("select correct quantity");
        }
    };

    const isShopOpen = (index) => {
        //console.log(shop)
        var close_time = foodItems[index].vendor_data[0].closing_time;
        var open_time = foodItems[index].vendor_data[0].opening_time;
        //console.log(open_time);
        // console.log(close_time);

        var closing_time = close_time.split(':');
        var opening_time = open_time.split(':');

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        var now_time = time.split(':');
        for (var i = 0; i < 2; i++) {
            if (closing_time[i].length === 1) {
                closing_time[i] = "0" + closing_time[i];
            }
            if (opening_time[i].length === 1) {
                opening_time[i] = "0" + opening_time[i];
            }
            if (now_time[i].length === 1) {
                now_time[i] = "0" + now_time[i];
            }
        }
        var tc = closing_time[0] + ":" + closing_time[1];
        var to = opening_time[0] + ":" + opening_time[1];
        var t = now_time[0] + ":" + now_time[1];
        //console.log(t,tc,to);

        if (t >= to && t <= tc) {
            return true;
        }
        else {
            return false;
        }
    };

    const checkVegStatus = (veg_stat) => {
        if (veg_stat === true && checked[0] === true) {
            return true;
        }
        else if (veg_stat === false && checked[1] === true) {
            return true;
        }
        else {
            return false;
        }
    };

    const checkPriceFilters = (price) => {
        if (Math.floor(price) <= Math.floor(max_price) && Math.floor(price) >= Math.floor(min_price)) {
            return true;
        }
        else     {
            return false;
        }
    };

    return (
        <div>
            {/* SEARCH BAR */}
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h1>Filters</h1>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField
                            id="standard-basic"
                            label="Search"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </List>
                </Grid>
            </Grid>
            {/* REST OF PAGE */}
            <Grid container>
                <Grid xs={12} md={3} lg={3} item={true}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    price
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Enter Min"
                                        fullWidth={true}
                                        value={min_price}
                                        onChange={onChangeMinPrice}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Enter Max"
                                        fullWidth={true}
                                        value={max_price}
                                        onChange={onChangeMaxPrice}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                            {/* <Autocomplete
                                id="combo-box-demo"
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Names"
                                        variant="outlined"
                                    />
                                )}
                            /> */}
                        </ListItem>
                        <div>
                            <FormControlLabel
                                label="Veg/Non-Veg"
                                control={
                                    <Checkbox
                                        checked={checked[0] && checked[1]}
                                        indeterminate={checked[0] !== checked[1]}
                                        onChange={handleChange1}
                                    />
                                }
                            />
                            {children}
                        </div>
                    </List>
                </Grid>
                <Grid xs={12} md={9} lg={9} item={true}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>
                                        {" "}
                                        <Button onClick={sortChangePrice}>
                                            {sortPrice ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                        Price
                                    </TableCell>
                                    <TableCell>Vendor name</TableCell>
                                    <TableCell>Veg/Non-Veg</TableCell>
                                    <TableCell>Add-Ons</TableCell>
                                    <TableCell>
                                        {" "}
                                        <Button onClick={sortChangeRating}>
                                            {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                        Rating
                                    </TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {foodItems.map((row, index) => (

                                    isShopOpen(index) && checkVegStatus(row.veg_status) && checkPriceFilters(row.price) ?
                                        (<TableRow key={index}>
                                            <TableCell>{row.item_name}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.shop_name}</TableCell>
                                            <TableCell>{row.veg_status === true ?
                                                <>
                                                    <p>Veg</p>
                                                </> : <div></div>}
                                                {row.veg_status === false ?
                                                    <>
                                                        <p>Non-Veg</p>
                                                    </> : <div></div>}
                                            </TableCell>
                                            <TableCell>{row.add_on.map((a, i) => (
                                                <table key={i}>
                                                    <tbody>
                                                        <tr>
                                                            <td>{a.addOn_name}:</td>
                                                            <td>{a.price}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            ))}
                                            </TableCell>
                                            <TableCell>{(row.rating).toFixed(2)}</TableCell>
                                            <TableCell> {row.tags.map(k =>
                                                <li key={k}>{k}</li>)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={proceedToOrder}
                                                    value={row._id}
                                                >
                                                    Proceed to Order
                                                </Button>
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle>Order Food</DialogTitle>
                                                    <DialogContent>
                                                        <p>Select Add Ons</p>
                                                        {Add_ons.map((a, i) => (
                                                            <table key={i} >
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{a.addOn_name}:</td>
                                                                        <td>{a.price}</td>
                                                                        <td>
                                                                            <Switch
                                                                                defaultValue={false}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                onChange={handleChecked}

                                                                                value={i}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        ))}
                                                        <br />

                                                        <TextField
                                                            label="Quantity"
                                                            value={quantity}

                                                            type={"number"}
                                                            onChange={onChangeQuantity}
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={OrderFood}>Order</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>)
                                        :
                                        null
                                ))}
                                {foodItems.map((row, index) => (

                                    !isShopOpen(index) && checkVegStatus(row.veg_status) ?

                                        (<TableRow key={index} >
                                            <TableCell>{row.item_name}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.shop_name}</TableCell>
                                            <TableCell>{row.veg_status === true ?
                                                <>
                                                    <p>Veg</p>
                                                </> : <div></div>}
                                                {row.veg_status === false ?
                                                    <>
                                                        <p>Non-Veg</p>
                                                    </> : <div></div>}
                                            </TableCell>
                                            <TableCell>{row.add_on.map((a, i) => (
                                                <table key={i}>
                                                    <tbody>
                                                        <tr>
                                                            <td>{a.addOn_name}:</td>
                                                            <td>{a.price}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            ))}
                                            </TableCell>
                                            <TableCell>{(row.rating).toFixed(2)}</TableCell>
                                            <TableCell> {row.tags.map(k =>
                                                <li key={k}>{k}</li>)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={proceedToOrder}
                                                    value={row._id}
                                                    disabled
                                                >
                                                    Proceed to order

                                                </Button>
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle>Order Food</DialogTitle>
                                                    <DialogContent>
                                                        <p>Select Add Ons</p>
                                                        {Add_ons.map((a, i) => (
                                                            <table key={i} >
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{a.addOn_name}:</td>
                                                                        <td>{a.price}</td>
                                                                        <td>
                                                                            <Switch
                                                                                defaultValue={false}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                onChange={handleChecked}

                                                                                value={i}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        ))}
                                                        <br />

                                                        <TextField
                                                            label="Quantity"
                                                            value={quantity}

                                                            type={"number"}
                                                            onChange={onChangeQuantity}
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={OrderFood}>Order</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>)
                                        :
                                        null
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
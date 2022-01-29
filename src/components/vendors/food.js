import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';



const Food = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const [shop_name, setShopName] = useState("");
    const email = localStorage.getItem('loggedEmail');


    useEffect(() => {


        axios
            .post("https://siddhfoodwebapp.herokuapp.com/vendor/profile", { "email": email })
            .then((response) => {
                //console.log(response.data);
                setShopName(response.data.shop_name);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/findForVendor", { "email": email })
            .then((response) => {
                setFoodItems(response.data);
                //console.log("yaha pe");
            })
            .catch((error) => {
                console.log(error);
                //console.log(email);
            });


    }, [email]);

    const DeleteFoodItem = (event) => {
        event.preventDefault();
        let a = event.target.value;
        console.log(a);
        const deleteFood = {
            item_name: a
        };

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/delete", deleteFood)
            .then((response) => {
                //alert("deleted sucessfully");
                window.location.reload();
            });
    };
    ///////////////////////  ADD  ///////////////////////////////

    const [open_add, setOpenAdd] = useState(false);
    const [item_name, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [veg_status, setVegStatus] = useState(true);
    const [add_on, setAddOns] = useState("");
    const [tags, setTags] = useState("");


    const onChangeItemName = (event) => {
        setItemName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeVegStatus = (event, val) => {
        setVegStatus(val);
        //console.log(val);
    };
    const onChangeAddOns = (event) => {
        setAddOns(event.target.value);
    };
    const onChangeTags = (event) => {
        setTags(event.target.value);
    };
    //
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
        clearFields();
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const clearFields = () => {
        setItemName("");
        setPrice("");
        setVegStatus(true);
        setAddOns("");
        setTags("");
    };

    const SaveFoodItem = (event) => {
        event.preventDefault();

        ///
        const final_tags = tags.split(",");
        const AO = add_on.split(",");
        const final_add_on = [];
        for (let i = 0, len = AO.length; i < len; i = i + 2) {
            final_add_on.push({ "addOn_name": AO[i], "price": AO[i + 1] });
        }

        ///
        const FI = {
            item_name: item_name,
            price: price,
            veg_status: veg_status,
            add_on: final_add_on,
            tags: final_tags,
            shop_name: shop_name
        };
        handleCloseAdd();

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/add", FI)
            .then((response) => {
                alert("Added successfully");
                window.location.reload();
            });

    };


    ///////////////////////////   EDIT   ////////////////////////////////

    const [open_edit, setOpenEdit] = useState(false);


    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const setEditFields = (event) => {
        const item_name = event.target.value;
        // console.log(item_name);

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/find", { "item_name": item_name })
            .then((response) => {
                console.log(response.data);
                setItemName(response.data.item_name);
                setPrice(response.data.price);
                setVegStatus(response.data.veg_status);
                //changeToStrings(response.data.add_on, response.data.tags);
                const AO = response.data.add_on;
                const tg = response.data.tags;
                const str = tg.join(',');
                setTags(str);
                var ao = "";
                for (let i = 0; i < AO.length; i++) {
                    ao += AO[i].addOn_name + "," + AO[i].price + ",";
                }
                ao = ao.slice(0, -1);
                setAddOns(ao);

            }).finally(() => {
                handleClickOpenEdit();
            });



    };

    const EditFoodItem = (event) => {
        event.preventDefault();

        const final_tags = tags.split(",");
        const AO = add_on.split(",");
        const final_add_on = [];
        for (let i = 0, len = AO.length; i < len; i = i + 2) {
            final_add_on.push({ "addOn_name": AO[i], "price": AO[i + 1] });
        }

        ///
        const FI = {
            item_name: item_name,
            price: price,
            veg_status: veg_status,
            add_on: final_add_on,
            tags: final_tags,
            shop_name: shop_name
        };
        handleCloseEdit();

        console.log(FI);

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/foodItem/edit", FI)
            .then((response) => {

                alert("Edited Successfully");
                window.location.reload();
            });
        alert("Edited Successfully");
        window.location.reload();
    };
    //////////////////////////////////////////////
    return (
        <div>
            <Grid container>
                <Grid xs={12} md={12} lg={12} item={true}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Veg/Non-Veg</TableCell>
                                    <TableCell>Add Ons</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={handleClickOpenAdd}
                                            startIcon={<AddIcon />}>Add
                                        </Button>
                                        <Dialog open={open_add} onClose={handleCloseAdd}>
                                            <DialogTitle>Add Food Item</DialogTitle>
                                            <DialogContent>
                                                {/* saara content hehe */}
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    label="Item Name"
                                                    fullWidth
                                                    variant="standard"
                                                    value={item_name}
                                                    onChange={onChangeItemName}
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    label="Price"
                                                    fullWidth
                                                    variant="standard"
                                                    value={price}
                                                    onChange={onChangePrice}
                                                />

                                                <FormControlLabel control={<Switch
                                                    onChange={onChangeVegStatus}
                                                    defaultChecked
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />} label="Veg" />

                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    label="Add ons"
                                                    fullWidth
                                                    variant="standard"
                                                    value={add_on}
                                                    onChange={onChangeAddOns}
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    label="Tags"
                                                    fullWidth
                                                    variant="standard"
                                                    value={tags}
                                                    onChange={onChangeTags}
                                                />

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseAdd}>Cancel</Button>
                                                <Button onClick={SaveFoodItem}>Add</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {foodItems.map((food, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{food.item_name}</TableCell>
                                        <TableCell>{food.price}</TableCell>
                                        <TableCell>{food.rating}</TableCell>
                                        <TableCell>{food.veg_status === true ?
                                            <>
                                                <p>Veg</p>
                                            </> : <div></div>}
                                            {food.veg_status === false ?
                                                <>
                                                    <p>Non-Veg</p>
                                                </> : <div></div>}
                                        </TableCell>
                                        <TableCell>{food.add_on.map((a, i) => (
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
                                        <TableCell> {food.tags.map(k =>
                                            <li key={k}>{k}</li>)}
                                        </TableCell>
                                        <TableCell>

                                            <Button
                                                value={food.item_name}
                                                onClick={setEditFields}
                                                color="secondary"
                                                startIcon={<EditIcon />}>Edit
                                            </Button>
                                            <Dialog open={open_edit} onClose={handleCloseEdit}>
                                                <DialogTitle>Edit Food Item</DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        label="Item Name"
                                                        fullWidth
                                                        disabled
                                                        variant="standard"
                                                        value={item_name}
                                                        onChange={onChangeItemName}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        label="Price"
                                                        fullWidth
                                                        variant="standard"
                                                        value={price}
                                                        onChange={onChangePrice}
                                                    />

                                                    <FormControlLabel control={<Switch
                                                        onChange={onChangeVegStatus}
                                                        defaultChecked
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />} label="Veg" />

                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        label="Add ons"
                                                        fullWidth
                                                        variant="standard"
                                                        value={add_on}
                                                        onChange={onChangeAddOns}
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        label="Tags"
                                                        fullWidth
                                                        variant="standard"
                                                        value={tags}
                                                        onChange={onChangeTags}
                                                    />

                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseEdit}>Cancel</Button>
                                                    <Button onClick={EditFoodItem}>Edit</Button>
                                                </DialogActions>
                                            </Dialog>

                                            <Button
                                                value={food.item_name}
                                                onClick={DeleteFoodItem}
                                                sx={{ color: pink[500] }}
                                                startIcon={<DeleteIcon />}>delete
                                            </Button>

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

export default Food;
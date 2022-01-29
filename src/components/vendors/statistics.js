import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";


const Statistics = (props) => {
    const email = localStorage.getItem('loggedEmail');
    const [placed, setPlaced] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [top5, setTop5] = useState([]);

    useEffect(() => {

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/agr", { email: email })
            .then((response) => {
                setTop5(response.data);
                console.log(response.data);
            })

        axios
            .post("https://siddhfoodwebapp.herokuapp.com/order/findForVendor", { email: email })
            .then((response) => {
                var orders = response.data;
                //console.log(orders);
                var pl = 0;
                var pe = 0;
                var co = 0;
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].stage === 1) {
                        pl++;
                    }
                    if (orders[i].stage === 2 || orders[i].stage === 3 || orders[i].stage === 4 || orders[i].stage === 1) {
                        pe++;
                    }
                    if (orders[i].stage === 5) {
                        co++;
                    }

                }
                setPending(pe);
                setPlaced(orders.length);
                setCompleted(co);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally((res) => {
                //console.log("yes");
                //console.log(arrFood);
            })



    }, [email]);


    return (
        <div>
            <Grid container justifyContent="center"> 
                <Box
                    justify="center"
                    sx={{
                        width: 230,
                        height: 300,
                        backgroundColor: '#BDBDBD',
                        borderTop: 20,
                        borderLeft: 70,
                        borderRight: 0,
                        borderBottom: 0,
                        borderColor: '#BDBDBD'



                    }}>
                    <h1>Orders-</h1>
                    <h2>placed : {placed}</h2>
                    <br></br>
                    <h2>pending : {pending}</h2>
                    <br></br>
                    <h2>completed: {completed}</h2>
                </Box>

            </Grid>


            <h1>Top Food Items-</h1>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Food Name</TableCell>
                        <TableCell>Orders placed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {top5.map((row, index) =>
                        <TableRow key={index}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </TableRow>)}
                </TableBody>


            </Table>





        </div>
    );

};

export default Statistics;
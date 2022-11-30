import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GenericApiFetch from "./GenericApiFetch";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
}));

function GenericReportsInput() {
    const [sourceApp, setsourceApp] = React.useState("");
    const [accountNumber, setaccountNumber] = React.useState("");
    const [limit, setlimit] = React.useState("");

    const handleChange = (event) => {
        setsourceApp(event.target.value);
    };

    const handleChangeAccNo = (event) => {
        setaccountNumber(event.target.value);
    };

    const handleChangeLimit = (event) => {
        setlimit(parseInt(event.target.value));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>
                        <TextField
                            id="outlined-basic"
                            label="Account Number"
                            variant="outlined"
                            value={accountNumber}
                            onChange={handleChangeAccNo}
                        />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Source App</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sourceApp}
                                label="Source App"
                                onChange={handleChange}
                            >
                                <MenuItem value={"/fxl"}>/fxl</MenuItem>
                                <MenuItem value={"/journal"}>/journal</MenuItem>
                                <MenuItem value={"/ascendis/accounttransfer"}>/ascendis/accounttransfer</MenuItem>
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <TextField
                            id="outlined-basic"
                            label="Limit"
                            variant="outlined"
                            value={limit}
                            onChange={handleChangeLimit}
                        />
                    </Item>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <GenericApiFetch sourceApp={sourceApp} accountNumber={accountNumber} limit={limit} />
            </Grid>
        </Box>
    );
}

export default GenericReportsInput;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import { DataGridPro, gridColumnsTotalWidthSelector } from '@mui/x-data-grid-pro';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
}));

function GenericApiFetch(props) {
    const [response, setResponse] = React.useState([]);
    const URL = "http://abpm.us-west-2.dev.bpsusabpm-d2.npd.bfsaws.net/abpm-000/abpm-application-common-internal-message-consumer/report/generic-query/v2";
    const [columns, setColumns] = React.useState([]);
    const [count, setCount] = React.useState(0);
    // const columns = [
    //     { field: 'id', headerName: 'Id', width: 70 },
    //     { field: 'applicationName', headerName: 'Application Name', width: 140 },
    //     { field: 'requestStatus', headerName: 'Request Status', width: 140 },
    //     { field: 'businessKey', headerName: 'Business Key', width: 140 },
    //     { field: 'amount', headerName: 'Amount', width: 90 },
    //     { field: 'eventType', headerName: 'Event Type', width: 200},
    // ];

    async function prepareData(isCountCall) {
        console.log(isCountCall);
        const data = {
            "conditions": [
                {
                    "column": "accountNumber",
                    "value": props.accountNumber
                },
                {
                    "column": "sourceApp",
                    "value": props.sourceApp
                }
            ],
        }
        if (isCountCall) {
            data["columnsWithAlias"] = [
                {
                    "name": "count(1)",
                    "alias": "count"
                }
            ];
        } else {
            data["limit"] = props.limit;
            data["orderBy"] = ["createTime DESC","businessKey ASC"];
            console.log("limit")
        }
        console.log(data);
        await axios.post(URL, data, {
            headers: {
                "clientId": "003",
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (isCountCall) {
                setCount(res.data[0]['count']);
                console.log(count);
                // prepareData(false);
                return;
            }

            console.log("res" + res.data);
            setResponse(res.data);
            if (res.data && res.data.length > 0) {
                setColumns(Object.keys(res.data[0]).map(key => {
                    let keyNameChanged = key.replace(/([A-Z])/g, ' $1');
                    keyNameChanged = keyNameChanged.charAt(0).toUpperCase() + keyNameChanged.slice(1);
                    return { field: key, headerName: keyNameChanged, width: 200, resizable: true};
                }));
            }
        }).catch(e => console.log(e));
        console.log("response " + response);
    }

    return (
        <div>
            <Item>
                <Button
                    variant="contained"
                    style={{ height: 55 }}
                    onClick={() => prepareData(false)}>
                    Search</Button>
            </Item>
            <p>Total records: {count}</p>
            <div style={{ height: 700, width: '100%' }}>
                <DataGridPro
                    rows={response}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    )
}

export default GenericApiFetch;

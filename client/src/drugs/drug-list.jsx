import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ConfigDataContext from '../context/config-data-context';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { green } from '@material-ui/core/colors';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from '@material-ui/lab/Pagination';
import { Divider, Box } from "@material-ui/core";

import './drug-list.component.css'

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
      },
}));

function DrugList() {
    const classes = useStyles();
    const configDataContext = useContext(ConfigDataContext);
    const [hasError, setErrors] = useState(false);
    const [drugs, setDrugs] = useState([]);
    const itemsPerPage = 30;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState();
    let query = useQuery();
    
    async function fetchData() {
        const res = await fetch(configDataContext.baseUrl + `/api/drug-list?searchedText=${query.get("searchedText")}&cat1=${query.get("cat1")}&cat2=${query.get("cat2")}`);
        res.json()
            .then(res => {
                res = res.map((item, index) => {
                    item.index = index;
                    return item;
                })
                setDrugs(res);
                setPage(1);
                setNoOfPages(Math.ceil(res.length / itemsPerPage))
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className='drug-list-container'>
            <h1>Drug List - {drugs.length}</h1>
            {/* <span>Error: {JSON.stringify(hasError)}</span> */}

            <List className={classes.root}>
                {
                    drugs.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((drug, index) => (
                        <div className='list-item'>
                            <ListGroup.Item key={index} action href={`/drug-detail/${drug.id}`}>
                                <div className="item-details">
                                    <ListItemAvatar>
                                        <Avatar className={classes.green}>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={drug.name} secondary={drug.description} />
                                    {drug.index + 1}
                                </div>
                            </ListGroup.Item>
                        </div>
                    ))
                }
            </List>
            <Divider />
            <Box component="span">
                <Pagination
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
                />
            </Box>
        </div>
    );
}

export default DrugList;
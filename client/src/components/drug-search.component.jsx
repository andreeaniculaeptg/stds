import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import './drug-search.component.css'


function DrugSearch() {
    let history = useHistory();
    const [cat1, setCat1] = useState();
    const [cat2, setCat2] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    function handleSubmit(event) {
        const cat2List = [];
        if(cat2.checkedA) cat2List.push('hiv');
        if(cat2.checkedB) cat2List.push('breastfeeding');
        if(cat2.checkedC) cat2List.push('liver');
        const searchedText = event.target.drugName.value;
        event.preventDefault();

        searchedText && history.push(`/drug-list?cat1=${cat1}&cat2=${cat2List.toString()}&searchedText=${searchedText}`);
    }

    const handleChange = (event) => {
        setCat2({ ...cat2, [event.target.name]: event.target.checked });
    };

    return (
        <div className='search-container'>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="searchByDrugName">
                <Form.Label style={{display : 'flex'}}>Filter by 
                    <RadioGroup style={{marginLeft: '5%'}} aria-label="gender" name="gender1" value={cat1} onChange={(event) => {setCat1(event.target.value)}}
                        defaultValue="name" 
                    >
                        <FormControlLabel value="name" control={<Radio />} label="By Name" />
                        <FormControlLabel value="category" control={<Radio />} label="By Category" />
                    </RadioGroup>
                </Form.Label>
                <Form.Control
                autoComplete="off"
                name="drugName"
                type="text"
                placeholder="Enter part of drug name / category"
                />

            <FormControlLabel
                control={
                <Checkbox
                    checked={cat2.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    color="primary"
                />
                }
                label="HIV"
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={cat2.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                }
                label="Breastfeeding"
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={cat2.checkedC}
                    onChange={handleChange}
                    name="checkedC"
                    color="primary"
                />
                }
                label="Liver"
            />
            </Form.Group>


                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default DrugSearch
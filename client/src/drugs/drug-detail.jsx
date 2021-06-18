import React, { useState, useEffect, useContext } from "react";
import {useParams} from "react-router-dom";
import ConfigDataContext from '../context/config-data-context';
import Link from '@material-ui/core/Link';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import './drug-detail.component.css'


function DrugDetail() {
    const configDataContext = useContext(ConfigDataContext);
    const [hasError, setErrors] = useState(false);
    const [drugDetails, setDrugDetails] = useState([]);
    const { drugId } = useParams();

    // drugDetails.url = 'https://material-ui.com/components/links/'

    async function fetchData() {
        const res = await fetch(configDataContext.baseUrl + "/api/drug-detail?drugId=" + drugId);
        res.json()
            .then(res => setDrugDetails(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, [drugId]);
    

    return (
        <>   
          <form className='drug-details'>  
            <h1>{drugDetails.name}</h1>
            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>Why:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={3} value={drugDetails.why} placeholder="Why is this medication prescribed?" />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>How:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={3} value={drugDetails.how} placeholder="How should this medicine be used?" />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link:</InputLabel>
              <Link href={drugDetails.url} target="_blank">
                 {drugDetails.url}
              </Link>
            </div>

            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>HIV:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={2} value={drugDetails.hiv} placeholder="There is no recorded relation of this drug with HIV." />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link - HIV:</InputLabel>
              <Link href={drugDetails.hivurl} target="_blank">
                 {drugDetails.hivurl}
              </Link>
            </div>

            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>Breastfeeding:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={2} value={drugDetails.lactation} placeholder="There is no recorded relation of this drug with lactation." />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link - Breastfeeding impact:</InputLabel>
              <Link href={drugDetails.lactationurl} target="_blank">
                 {drugDetails.lactationurl}
              </Link>
            </div>

            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>Liver:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={1} value={drugDetails.liver} placeholder="There is no recorded impact of this drug on the liver." />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link - impact on the Liver:</InputLabel>
              <Link href={drugDetails.liverurl} target="_blank">
                 {drugDetails.liverurl}
              </Link>
            </div>

            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>Labels/Packager:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={1} value={drugDetails.packager} placeholder="No records found!" />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link - Labels/Packagers:</InputLabel>
              <Link href={drugDetails.packagerurl} target="_blank">
                 {drugDetails.packagerurl}
              </Link>
            </div>

            <div style={{ display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>Category:</InputLabel>
              <TextareaAutosize aria-label="minimum height" rowsMin={1} value={drugDetails.category} placeholder="No records found!" />
              <TextareaAutosize aria-label="minimum height" rowsMin={2} value={drugDetails.categorydrugdesc} placeholder="No records found!" />
            </div>
            <div style={{display: 'grid'}}>
              <InputLabel style={{margin: '3%'}}>External link - Category:</InputLabel>
              <Link href={drugDetails.categorydrugurl} target="_blank">
                 {drugDetails.categorydrugurl}
              </Link>
            </div>

            
            <InputLabel style={{margin: '3%'}}>Clinical Studies:
            <Link href={drugDetails.clinicalstudiesurl} target="_blank">
                <span> Click for additional information</span>
            </Link>
            </InputLabel>
          </form>
        </>
    );
}

export default DrugDetail;
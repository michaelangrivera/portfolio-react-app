
//REDUX
import {RETRIEVE_S3_DATA, RETRIEVE_S3_DATA_FAILURE} from './constants';
// import { backupState as s3DataBACKUP} from "../reducers/backupState";

//PARSING

import parseData from '../components/api/parseData';

//API
import {API} from 'aws-amplify';
import awsconfig from '../aws-exports';



API.configure(awsconfig)

function getData() { 
    const apiName = 'marwebapp';
    const path = '/items';
    const myInit = { 
      headers: {}, 
    };
  
    return API.get(apiName, path, myInit);
  }
  

export const loadS3Data = () => async (dispatch) => {
    try {

    const apiData = await getData();

    console.log(apiData)
   

    for ( var key of Object.keys(apiData)) {
            console.log(key);
            parseData(apiData[key]);

    }
    


                const location = [];
                apiData.locationquery.forEach(function (e){
                    try {
                      const cordsETL = [];
                   
                      cordsETL[0] = parseFloat(e.lng);
                      cordsETL[1] = parseFloat(e.lat);
                      const cordsETLObj = {coordinates : cordsETL};
                      location.push(cordsETLObj)

                    }
                    catch (err) {
                       
                     console.log("ETL ERROR")
                    }
                }
                )
            apiData.locationqueryETL = location;
            

    dispatch({
        type: RETRIEVE_S3_DATA,
        payload: apiData
    });
} catch (err) { 
    console.log(err);

    
    return {
        type: RETRIEVE_S3_DATA_FAILURE,
        payload: err
    }
}
}
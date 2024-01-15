import axios from 'axios'
import * as err_type from './errorLog'
const API_URL = process.env.REACT_APP_API_EXCEL
// https://opensheet.elk.sh/spreadsheet_id/tab_name
const API_SCRIPT = process.env.REACT_APP_API_SCRIPT_EXCEL

export const handleGetPost = () => {
    try {
        return new Promise((resolve, reject) => {
            const data = axios.get(API_URL)
                .then((response) => {
                    if (response) {
                        // console.log('promise get api', response.data);
                        return resolve(response)
                    } else {
                        reject(err_type.errLog[404])
                    }
                })
            return data;
        })
    } catch (error) {
        console.log('error', err_type.errLog[404]);
    }
}

export const handlePost = (req, res) => {
    try {
        return new Promise((resolve, reject) => {
            const data = axios.post(API_SCRIPT, req)
                .then((response) => {
                    if (response) {
                        // console.log('promise call api', response);
                        return resolve(response)
                    } else {
                        reject(err_type.errLog[408])
                    }
                })
            return data;
        })
    } catch (error) {
        console.log('error', err_type.errLog[404]);
    }
}
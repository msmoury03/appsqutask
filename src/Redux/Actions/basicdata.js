import axios from 'axios'
import { toast } from 'react-toastify';


export const fethbasic = (search)=>{
    return async function(dispatch){

        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ce8717de310d6ad77693de309eee1bc9`).then((ree=>dispatch(setBasic([ree.data])))).catch((e)=> toast.warning(e?.response?.data?.message))

      

        
       
    }
}






export const setBasic = (data = null) => {
    if (data) {
        return {
            type: 'SET_BASIC',
            payload: data,
        };
    }

    return {
        type: 'SET_BASIC',
        payload: [],
    };
};



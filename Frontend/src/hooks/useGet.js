import { useEffect, useState } from "react";
import axios from 'axios';

function useGet(url){
    const [data, setData] = useState()
    const token = localStorage.getItem("token");
    
    useEffect(()=>{
        async function getData(){
            const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setData(response.data)
        }
        getData()
    }, [url, token])

    return data;
}

export default useGet;
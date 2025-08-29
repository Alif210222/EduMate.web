import axios from 'axios';
import React, { useMemo } from 'react';

 export const axiosSecure = axios.create({                   
                            baseURL:`http://localhost:3000`
 });




const useAxiosSecure = () => {
      
    // const axiosSecure = useMemo(()=>{
    //     const instance = axios.create({
    //         baseURL: "http://localhost:3000",
    //     })
    // })


    return axiosSecure
};

export default useAxiosSecure;
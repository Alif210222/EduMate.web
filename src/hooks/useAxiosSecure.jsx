import axios from 'axios';
import React, { useMemo } from 'react';

 export const axiosSecure = axios.create({                   
                            baseURL:`https://edu-mate-server-eight.vercel.app`
 });




const useAxiosSecure = () => {
      
    // const axiosSecure = useMemo(()=>{
    //     const instance = axios.create({
    //         baseURL: "https://edu-mate-server-eight.vercel.app",
    //     })
    // })


    return axiosSecure
};

export default useAxiosSecure;
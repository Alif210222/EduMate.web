import React from 'react';


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root';
import HomePage from './Pages/HomePage/HomePage';


 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
       {
       index:true,
       Component:HomePage,
    },
    ]
  },
]);




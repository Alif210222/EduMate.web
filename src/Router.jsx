import React from 'react';


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root';
import HomePage from './Pages/HomePage/HomePage';
import SchedulePage from './Pages/Schedule/Schedule';
import BudgetTracker from './Pages/BudgetTraker/BudgetTracker';
import NotePage from './Pages/Note/Note';
import Dictionary from './Pages/Dictionary/Dictionary';
import DictionaryPage from './Pages/Dictionary/Dictionary';
import Signup from './Pages/Signup/Signup';




 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
       {
       index:true,
       Component:HomePage,
    },
    {
       path:"/schedule",
       Component:SchedulePage
    },
    {
        path:"/budget",
        element:<BudgetTracker></BudgetTracker>

    },
    {
      path:"/notes",
      Component:NotePage
    },
    {
      path:"/dictionary",
      Component:DictionaryPage
    },
    {
      path:"/signup",
      Component:Signup
    }
    ]
  },
]);




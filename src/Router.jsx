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
import AboutPage from './Pages/About/About';
import StudyPlanner from './Pages/StudyPlaner/StudyPlaner';
import PrivetRouter from './PrivetRouter/PrivetRouter';
import ErrorPage from './Components/ErrorComponent';





 export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    Component: Root,
    children:[
       {
       index:true,
       Component:HomePage,
    },
    {
       path:"/schedule",
       element:<PrivetRouter><SchedulePage></SchedulePage> </PrivetRouter>
    },
    {
        path:"/budget",
        element:<PrivetRouter><BudgetTracker></BudgetTracker></PrivetRouter> 

    },
    {
      path:"/notes",
      element:<PrivetRouter><NotePage></NotePage></PrivetRouter>
    },
    {
      path:"/studyPlaner",
     element:<PrivetRouter><StudyPlanner></StudyPlanner> </PrivetRouter>
    },
    {
      path:"/dictionary",
      Component:DictionaryPage
    },
    {
      path:"/about",
      Component:AboutPage
    },
    {
      path:"/signup",
      Component:Signup
    }
    ]
  },
]);




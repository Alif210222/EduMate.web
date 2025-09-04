import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { AuthContext } from "../context/AuthProvider"; // adjust path if needed
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Authcontext";
import { toast } from "react-toastify";

const BudgetTracker = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  // useForm for income
const { register: registerIncome, handleSubmit: handleIncomeSubmit, reset: resetIncome } = useForm();

// useForm for cost
const { register: registerCost, handleSubmit: handleCostSubmit, reset: resetCost } = useForm();

  const [costs, setCosts] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0);
  const [savings,setSavings] = useState(0)
  const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

 
  // savings count 
  useEffect(()=>{
     setSavings(totalIncome - monthlyTotal)
  },[totalIncome,monthlyTotal])

  // get cost data from  data base 
useEffect(()=>{
     axiosSecure.get(`/cost?email=${user?.email}`)
     .then(res =>{
        // console.log(res.data)
          setCosts(res.data);

          setMonthlyTotal(res.data.reduce((sum, c) => sum + c.amount, 0));

           const todayCosts = res.data.filter((c) => c.date === todayDate);
           setTodayTotal(todayCosts.reduce((sum, c) => sum + c.amount, 0));
     })
},[user?.email])


// get income data from data base 
 useEffect(()=>{
       axiosSecure.get(`/income?email=${user?.email}`)
      .then(res => {
           setTotalIncome(res.data.reduce((sum,c) => sum + Number(c.amount), 0))
            // setTotalIncome(res.data.amount)
      })
     
 },[])


// add income in database 
   const onIncomeSubmit= async(data)=>{
          const addIncome = {
            title: data.title,
            amount:parseFloat(data.amount),
            email:user?.email
          }
          
       try{
        const res = await axiosSecure.post("/income",addIncome)
             
        if(res.data.insertedId){
          
          toast("your incomeAdded successfully")
           setTotalIncome((prev) => prev + addIncome.amount);
           
           resetIncome()
        }
       }   catch (error) {
      console.error("Error saving cost:", error);
    } 
  
 }


  // ✅ Add new cost (POST to backend)
  const onCostSubmit = async (data) => {
    const newCost = {
      title: data.title,
      amount: parseFloat(data.amount),
      date: data.date,
      email: user?.email,
    };

    // console.log(newCost)

    try {
      const res = await axiosSecure.post("/cost", newCost);
      
      if (res.data.insertedId) {
        const updatedCosts = [...costs, newCost];
        setCosts(updatedCosts);
        toast("your Cost list added successfully")

        setMonthlyTotal(monthlyTotal + newCost.amount);

        if (newCost.date === todayDate) {
          setTodayTotal(todayTotal + newCost.amount);
        }

        resetCost();
      }
    } catch (error) {
      console.error("Error saving cost:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 mt-12 min-h-screen">
      {/* 🔹 Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-4"
      >
        <Calendar size={26} /> Budget Tracker
      </motion.h1>
      <p className="text-center mb-18">“Easily monitor your income, expenses, and savings in one place to take full control of your financial journey.”</p>

      {/* 🔹 Overview Section */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Current Date</h2>
          <p className="text-lg">{todayDate}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Total Income</h2>
          <p className="text-lg font-bold text-green-600">${totalIncome}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
           <h2 className="font-semibold">Total Savings</h2>
           <p className="text-lg font-bold text-purple-600">${savings}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Monthly Total Cost</h2>
          <p className="text-lg font-bold text-green-600">${monthlyTotal}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Today’s Total Cost</h2>
          <p className="text-lg font-bold text-yellow-600">${todayTotal}</p>
        </div>
      </div>
      {/* Add income */}
      <form onSubmit={handleIncomeSubmit(onIncomeSubmit)} className="bg-blue-50 p-4 rounded-xl shadow space-y-4">
        <p className="font-bold text-xl">Add Income</p>
        
        <input type="text" placeholder="Income Title" {...registerIncome("title")} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Amount" {...registerIncome("amount")} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Add Income
        </button>
      </form>

      {/* Add Cost Form */}
      <form onSubmit={handleCostSubmit(onCostSubmit)} className="bg-white p-4 rounded-xl shadow space-y-4">
        <p className="font-bold text-xl">Add Cost</p>
        <input type="date" {...registerCost("date")} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Cost Title" {...registerCost("title")} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Amount" {...registerCost("amount", {min: 0,max: 1000000})} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
          Add Cost
        </button>
      </form>

      {/* Cost List */}
      <div className="bg-base-200 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-3">Your Costs</h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {costs.map((cost,index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>
                {cost.title} — {cost.date}
              </span>
              <span className="font-medium">${cost.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetTracker;

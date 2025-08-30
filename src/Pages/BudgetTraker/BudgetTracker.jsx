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
  const { register, handleSubmit, reset } = useForm();
  const [costs, setCosts] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);

  const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // ✅ Fetch user’s costs from backend
  // useEffect(() => {
  //   if (user?.email) {
  //   const res=   axiosSecure.get(`/costs?email=${user?.email}`)
        
  //         setCosts(res.data);

  //         // monthly total
  //         setMonthlyTotal(res.data.reduce((sum, c) => sum + c.amount, 0));

  //         // today’s total
  //         const todayCosts = res.data.filter((c) => c.date === todayDate);
  //         setTodayTotal(todayCosts.reduce((sum, c) => sum + c.amount, 0));
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [user]);

useEffect(()=>{
     axiosSecure.get(`/cost?email=${user?.email}`)
     .then(res =>{
        console.log(res.data)
          setCosts(res.data);

          setMonthlyTotal(res.data.reduce((sum, c) => sum + c.amount, 0));

           const todayCosts = res.data.filter((c) => c.date === todayDate);
           setTodayTotal(todayCosts.reduce((sum, c) => sum + c.amount, 0));
     })
},[])




  // ✅ Add new cost (POST to backend)
  const onSubmit = async (data) => {
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

        reset();
      }
    } catch (error) {
      console.error("Error saving cost:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 mt-16 min-h-screen">
      {/* 🔹 Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-14"
      >
        <Calendar size={26} /> Budget Tracker
      </motion.h1>

      {/* 🔹 Overview Section */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Current Date</h2>
          <p className="text-lg">{todayDate}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Monthly Total</h2>
          <p className="text-lg font-bold text-green-600">${monthlyTotal}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold">Today’s Total</h2>
          <p className="text-lg font-bold text-yellow-600">${todayTotal}</p>
        </div>
      </div>

      {/* Add Cost Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl shadow space-y-4">
        <input type="date" {...register("date")} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Cost Title" {...register("title")} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Amount" {...register("amount")} className="w-full border p-2 rounded" required />
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

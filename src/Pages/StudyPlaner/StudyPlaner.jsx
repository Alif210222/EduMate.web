import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Flag, Clock,Trash2 } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../Context/Authcontext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudyPlanner = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch Study Plans
  const { data: plans = [], refetch } = useQuery({
    queryKey: ["studyplans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/studyplan?email=${user?.email}`);
      return res.data;
    },
  });

  // ✅ Add Study Plan
  const mutation = useMutation({
    mutationFn: (newPlan) => axiosSecure.post("/studyplan", newPlan),
    onSuccess: () => {
      toast("Your  daily Plan add successful")
      refetch();
      reset();
    },
  });

  //delete plan
  const deletePlan =async (id) =>{
        const res = await axiosSecure.delete(`/deleteTask/${id}`)
        toast("Plan delete successful")
        refetch();
  }

  const onSubmit = (data) => {
    const newPlan = {
      ...data,
      email: user?.email,
      createdAt: new Date(),
    };
    mutation.mutate(newPlan);
  };

  return (
    <div className="p-8 mb-28">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold text-gray-800">
          📚 Everyday Study Planner 
        </h1>
        <p className="text-gray-500">
          Break down your big study goals into small, achievable tasks
        </p>
      </div>
      <p className="mb-10">Add your daily task with small part to easier your life.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Plan Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <h2 className="text-lg font-semibold mb-4">➕ Add today's Study Plan</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("subject")}
              placeholder="Subject / Topic"
              className="w-full border rounded p-2"
              required
            />
            <select
              {...register("priority")}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Priority Level</option>
              <option value="High">🔥 High</option>
              <option value="Medium">⚡ Medium</option>
              <option value="Low">🌱 Low</option>
            </select>
            <input
              type="date"
              {...register("deadline")}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="time"
              {...register("timeSlot")}
              
              className="w-full border rounded p-2"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
            >
              Add Plan
            </button>
          </form>
        </motion.div>

        {/* Plans List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border h-[500px] overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">📖 Your today's Plans</h2>
          {plans.length > 0 ? (
            <div className="space-y-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      {plan.subject}
                    </h3>
                    <span
                      className={`text-sm font-semibold ${
                        plan.priority === "High"
                          ? "text-red-500"
                          : plan.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {plan.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4" /> Deadline:{" "}
                    {new Date(plan.deadline).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between">
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" /> Time: {plan.timeSlot}      
                  </p>
                  <button onClick={()=>deletePlan(plan._id)}>
                    <Trash2 className="text-black-600 cursor-pointer" />
                  </button>
                  </div>
                  
                  

                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No study plans yet. Add your first plan!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudyPlanner;

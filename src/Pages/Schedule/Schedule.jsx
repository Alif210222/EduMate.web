import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PlusCircle, CheckCircle2, Clock, Trash2, Edit2, Save } from "lucide-react";
import { useForm } from "react-hook-form";

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  // API Functions (placeholders)
  const fetchTasks = async () => {
    // const res = await fetch("/api/tasks");
    // const data = await res.json();
    // setTasks(data);
  };

  const addTask = async (taskData) => {
    const newTask = {
    //   id: Date.now(),
      ...taskData,
      status: "pending",
    };
    console.log(newTask)
    setTasks((prev) => [...prev, newTask]);

    // await fetch("/api/tasks", { method: "POST", body: JSON.stringify(newTask) });
    // reset();
  };



  const updateTask = async (id, updatedTask) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));

    // await fetch(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(updatedTask) });
    setEditingTaskId(null);
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    // await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Weekly progress (mock until backend integration)
  const weeklyData = [
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 2 },
    { day: "Wed", tasks: 4 },
    { day: "Thu", tasks: 1 },
    { day: "Fri", tasks: 5 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 3 },
  ];

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 md:mt-16 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 mt-6 text-center">
        <h1 className="text-4xl font-bold text-orange-600">📅 My Schedule</h1>
        <p className="text-gray-600 mt-2">Plan your day, stay productive, and never miss a deadline.</p>
      </motion.div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today’s Overview */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-orange-50 border border-orange-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Today’s Overview</h2>
          <p className="text-gray-600">Date: <span className="font-medium">{date.toDateString()}</span></p>
          <p className="mt-2 text-gray-600">Tasks: <span className="font-medium">{tasks.length}</span></p>
          <p className="mt-1 text-green-600">Completed: {tasks.filter(t => t.status === "done").length}</p>
        </motion.div>



        {/* Calendar */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white border p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <Calendar value={date} onChange={setDate} />
        </motion.div>



        {/* Upcoming Deadlines */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          {tasks
            .filter((t) => t.deadline)
            .slice(0, 3)
            .map((task,index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <Clock className="text-orange-600" /> {task.title} – {task.deadline}
              </div>
            ))}
        </motion.div>
      </div>



      {/* Daily Task List & Add Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 ">
        {/* Task List */}
       <motion.div whileHover={{ scale: 1.01 }} className="bg-white border p-6 rounded-2xl shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Today’s Tasks</h2>

  {/* Scrollable container */}
  <div className="max-h-80 overflow-y-auto pr-2">
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`flex justify-between items-center p-3 rounded-lg border ${
            task.status === "done"
              ? "bg-green-50 border-green-200"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          {editingTaskId === task.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTask(task.id, {
                  title: e.target.title.value,
                  deadline: e.target.deadline.value,
                });
              }}
              className="flex w-full gap-2"
            >
              <input
                name="title"
                defaultValue={task.title}
                className="border px-2 py-1 rounded w-1/2"
              />
              <input
                type="date"
                name="deadline"
                defaultValue={task.deadline}
                className="border px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                <Save size={16} />
              </button>
            </form>
          ) : (
            <>
              <span>
                {task.title} —{" "}
                <span className="text-gray-500">
                  {task.deadline || "No deadline"}
                </span>
              </span>
              <div className="flex gap-2 items-center">
                <button onClick={() => setEditingTaskId(task.id)}>
                  <Edit2 size={18} className="text-blue-600" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <Trash2 size={18} className="text-red-600" />
                </button>
                {task.status === "done" ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <>
                    <Clock className="text-orange-600" />
                    <button
                      onClick={() =>
                        setTasks(
                          tasks.map((t) =>
                            t.id === task.id ? { ...t, status: "done" } : t
                          )
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Done
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
</motion.div>




        {/* Add Task Form */}
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white border p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit(addTask)} className="space-y-2">
            <input {...register("title", { required: true })} type="text" placeholder="Task Title" className="w-full border rounded-lg px-4 py-2" />
             <p className="text-sm text-gray-500">Start-Date</p>
            <input {...register("startDate")} type="date" className="w-full border rounded-lg px-4 py-2" />
             <p className="text-sm text-gray-500">End-Date</p>
            <input {...register("deadline")} type="date" className="w-full border rounded-lg px-4 py-2" />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <PlusCircle size={18} /> Add Task
            </button>
          </form>
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <motion.div whileHover={{ scale: 1.01 }} className="bg-white border p-6 rounded-2xl shadow-sm mt-10">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default SchedulePage;

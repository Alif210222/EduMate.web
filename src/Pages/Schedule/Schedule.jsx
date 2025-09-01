import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../Context/Authcontext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
// import { format } from "date-fns";

const subjectsColors = {
  Math: "bg-blue-100 border-blue-400",
  English: "bg-yellow-100 border-yellow-400",
  Science: "bg-green-100 border-green-400",
  History: "bg-red-100 border-red-400",
  Default: "bg-gray-100 border-gray-400",
};

const SchedulePage = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
 const [selectedTask, setSelectedTask] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const todaysDate = new Date().toISOString().split("T")[0];

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (!user?.email) return;
    const res = await axiosSecure.get(`/schedules?email=${user?.email}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Add task
  const addTask = async (data) => {
    if (!user?.email) return;

    const today = new Date(data.date);
    const localDate = today.toISOString().split("T")[0]; // YYYY-MM-DD only
    const newTask = { ...data, date: localDate, email: user?.email };

    const res = await axiosSecure.post("/schedules", newTask);
    if (res.data.insertedId) {
      fetchTasks();
      toast("New Schedule added");
     reset();
    }
  };


  // fetch update task data 
   const updateTaskData = async (id) => {
  try {
    const res = await axiosSecure.get(`/singleTask/${id}`);
    setSelectedTask(res.data); // save task to state
  } catch (err) {
    console.error("Error fetching task:", err);
  }
};


  // Update task
  const updateTask = async (e) => {
        e.preventDefault()
          const form = e.target;
          const data = {
          subject: form.subject.value,
          date :form.date.value,
          time :form.time.value,
          instructor : form?.instructor.value
          }
          // console.log(data)
           
      try {
          const res =  await axiosSecure.put(`/schedules/${selectedTask._id}`, data);
          // console.log(res.data)
          if(res.data.modifiedCount>0){
                  toast.success("Schedule updated ✅");
                  fetchTasks(); // reload updated tasks
                  document.getElementById("my_modal_5").close(); // close modal
          }
         
        } catch (err) {
          console.error("Update error:", err);
          toast.error("Failed to update task ❌");
        }

  };

  // Delete task
  const deleteTask = async (id) => {
    await axiosSecure.delete(`/schedules/${id}`);
    fetchTasks();
    toast("Schedule deleted");
  };

  // Filter tasks for selected date
 // today date local
const today = new Date();
const todayDate = today.toISOString().split("T")[0];

// filter tasks
const todayTasks = tasks.filter(task => task.date === todayDate);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">📚 Study & Task Planner</h1>
        <p className="text-gray-600 mt-2">Plan your classes/task, allocate time, and manage your study efficiently.</p>
      </motion.div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <Calendar value={date} onChange={setDate} />
        </motion.div>

        {/* Today’s Schedule */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
           <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Today’s Schedule{" "}
                    <span className="text-sm font-normal text-red-600">
                      (Becareful about task date and time . Because it's have some timezone issue.)
                    </span>
                  </h2>
                  {/* Current Date (local) */}
                  <span className="text-sm font-medium text-red-500 bg-gray-100 px-3 py-1 rounded-lg">
                   Current date :  {todaysDate}
                  </span>
          </div>
          {todayTasks.length === 0 && <p className="text-gray-500">No classes scheduled for today.</p>}
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {todayTasks.map((task) => (
              <li key={task._id} className={`flex justify-between items-center p-3 rounded-lg border ${subjectsColors[task.subject] || subjectsColors.Default}`}>
                <div>
                  <p className="font-semibold">{task.subject}</p>
                  <p className="text-sm">{task.date} – {task.time} – {task.instructor}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteTask(task._id)}>
                    <Trash2 className="text-red-600 cursor-pointer" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Schedule Form */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlusCircle /> Add New Class
          </h2>
          <form onSubmit={handleSubmit(addTask)} className="space-y-3">
            <input {...register("subject", { required: true })} placeholder="Subject / Task" className="w-full border px-3 py-2 rounded" />
            
            <input {...register("date", { required: true })} type="date" className="w-full border px-3 py-2 rounded" />
            
            <input {...register("time", { required: true })} placeholder="Time (e.g. 10:00 AM)" className="w-full border px-3 py-2 rounded" />
            <input {...register("instructor")} placeholder="Instructor" className="w-full border px-3 py-2 rounded" />
            
            <button type="submit" className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 rounded flex items-center justify-center gap-2">
              <PlusCircle /> Add Task
            </button>
          </form>
        </motion.div>




        {/* All Schedule List */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">All Classes</h2>
          {tasks.length === 0 && <p className="text-gray-500">No classes scheduled yet.</p>}
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) =>
              
                <li key={task._id} className={`flex justify-between items-center p-3 rounded-lg border ${subjectsColors[task.subject] || subjectsColors.Default}`}>
                  <div>
                    <p className="font-semibold">{task.subject}</p>
                    <p className="text-sm">{task.date} – {task.time} – {task.instructor}</p>
                  </div>
                  <div className="flex gap-2">

              <button  className="btn" onClick={()=> {
                                                     updateTaskData(task._id)
                                                     document.getElementById('my_modal_5').showModal() }}>
                <Edit2  className="text-blue-600 cursor-pointer" ></Edit2></button>
                 <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                   <div className="modal-box">
                    
                  <form onSubmit={updateTask} className="space-y-3">
                       <input name="subject" defaultValue={selectedTask?.subject} placeholder="Subject / Task" className="w-full border px-3 py-2 rounded" />                       
                       <input name="date" defaultValue={selectedTask?.date} type="date" className="w-full border px-3 py-2 rounded" />                       
                       <input name="time" defaultValue={selectedTask?.time} placeholder="Time (e.g. 10:00 AM)" className="w-full border px-3 py-2 rounded" />
                       <input name="instructor" defaultValue={selectedTask?.instructor} placeholder="Instructor" className="w-full border px-3 py-2 rounded" />
                       
                         <div className="modal-action">
                       
                         {/* if there is a button in form, it will close the modal */}
                          <button  type="submit" className="btn border border-blue-600">Update Task</button>
                       
                        </div>
                  
                  </form>

                   
                   </div>
                 </dialog>
                 

                    <button onClick={() => deleteTask(task._id)}><Trash2 className="text-red-600 cursor-pointer" /></button>
                  </div>
                </li>
              
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SchedulePage;






                // <li key={task._id} className="flex gap-2">
                //   <input defaultValue={task.subject} className="border px-2 py-1 rounded w-1/4" />
                //   <input defaultValue={task.date} type="date" className="border px-2 py-1 rounded w-1/4" />
                //   <input defaultValue={task.time} className="border px-2 py-1 rounded w-1/4" />
                //   <input defaultValue={task.instructor} className="border px-2 py-1 rounded w-1/4" />
                //   <button onClick={() => updateTask(task._id, task)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                // </li>
            

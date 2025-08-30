import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { PlusCircle, NotebookPen } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const NotePage = ({ user }) => {
  
  const [notes, setNotes] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure()

  // Fetch Notes by user email
//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/notes?email=${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setNotes(data))
//         .catch((err) => console.error(err));
//     }
//   }, [user?.email]);

useEffect(()=>{
          axiosSecure.get("/note")
          .then(res=>{
            // console.log(res.data)
            setNotes(res.data)
          })
},[])




 // Handle New Note Submission
const onSubmit = async (data) => {
  const newNote = { ...data, email: user?.email };

  try {
    const res = await axiosSecure.post("/note", newNote);

    if (res.data) {
      setNotes((prev) => [...prev, res.data]); // instantly show
      reset();
    }
  } catch (error) {
    console.error("Error saving note:", error);
  }
};



  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mb-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-16 mt-10"
      >
        <NotebookPen size={30} /> My Notes
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Add Note Form */}
        <div className="md:col-span-1 h-fit bg-white shadow rounded-xl p-6 border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PlusCircle size={20} /> Add New Note
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Subject</label>
              <input
                {...register("subject", { required: true })}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Mathematics"
              />
            </div>
            <div>
              <label className="block font-medium">Note Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Algebra Basics"
              />
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                {...register("date", { required: true })}
                type="date"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Write your note here..."
              ></textarea>
            </div>
            <button type="submit" className="btn bg-orange-500 text-white w-full">
              Save Note
            </button>
          </form>
        </div>

        {/* Notes List */}
       {/* Notes List */}
<div className="md:col-span-2">
  <div className="bg-white shadow rounded-xl p-6 border h-[600px] overflow-y-auto">
    <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {note.subject}
            </h3>
            <p className="text-sm text-gray-500">{note.title}</p>
            <p className="text-gray-700 mt-2">{note.description}</p>
            <p className="text-xs text-right text-gray-400 mt-2">
              {note.date}
            </p>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-2">
          No notes yet. Add your first note!
        </p>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default NotePage;

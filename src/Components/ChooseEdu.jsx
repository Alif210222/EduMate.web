import React from "react";
import { motion } from "framer-motion";
import { Users, Zap, Award, ShieldCheck } from "lucide-react";
import image1 from "../assets/useEduimg1.jpg"

const benefits = [
  {
    title: "All-in-One Toolkit",
    desc: "Manage your classes, assignments, and notes in one place — like keeping your entire semester organized in your pocket.",
    icon: <Users className="w-12 h-12 text-orange-500" />,
  },
  {
    title: "Boost Productivity",
    desc: "Use Pomodoro and task management to complete projects faster — like finishing your term paper on time without stress.",
    icon: <Zap className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Track Your Success",
    desc: "GPA calculator & progress tracker shows exactly where you stand — perfect for planning your next big project or scholarship application.",
    icon: <Award className="w-12 h-12 text-orange-500" />,
  },
  {
    title: "Safe & Reliable",
    desc: "All your notes, translations, and budgets are securely saved — so you never lose a file or assignment.",
    icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
  },
];

const WhyChooseEdumate = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-800">
          Why Choose <span className="text-orange-500">EduMate</span>?
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          EduMate is designed to make your student life simpler, smarter, and more productive.  
          See how students use it to manage real-life projects and daily studies!
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 border border-green-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start bg-gradient-to-br from-white to-gray-50"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Real-life Example Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-gray-800">See EduMate in Action</h3>
          <p className="text-gray-600">
            Meet Sarah, a university student juggling multiple courses. Using EduMate:  
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>They organizes all their class notes digitally and accesses them anytime.</li>
            <li>Plans her study schedule using the integrated calendar & Pomodoro timer.</li>
            <li>Calculates her GPA after each semester to track progress.</li>
            <li>Manages her monthly budget for books, meals, and tuition easily.</li>
          </ul>
          <p className="text-gray-600 font-semibold">
            EduMate helps students like Sarah turn chaos into productivity!
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={image1}
            alt="Student using EduMate"
            className="w-[90%] md:w-full rounded-xl shadow-lg"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseEdumate;

import React from "react";
import { motion } from "framer-motion";
import { User, ClipboardCheck, Rocket, ArrowBigRight } from "lucide-react";

const steps = [
  {
    title: "Sign Up / Log In",
    desc: "Create your account in seconds and get access to all student tools.",
    icon: <User className="w-12 h-12 text-orange-500" />,
  },
  {
    title: "Choose Your Tool",
    desc: "Pick from Notes, Schedule, Budget Tracker, Translator, Pomodoro, and GPA Calculator.",
    icon: <ClipboardCheck className="w-12 h-12 text-green-600" />,
  },
  {
    title: "Stay Productive",
    desc: "Organize, track, and manage all your tasks efficiently to boost your productivity.",
    icon: <Rocket className="w-12 h-12 text-orange-500" />,
  },
];



const HowItWorks = () => {
  return (
    <section className="py-16 md:mt-14 px-6 md:px-16 bg-gray-50">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-800">
          How <span className="text-orange-500">EduMate</span> Works
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Follow these simple steps to start organizing your student life and boost productivity.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Illustration / Decorative Section */}
       <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="mt-16 flex justify-center"
    >
      <div className="w-full md:w-[80%] bg-white rounded-xl shadow-lg shadow-green-200 border border-green-200 p-3">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 flex-wrap">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <span className="bg-amber-200 text-gray-800 rounded-full px-4 py-2 font-semibold">
              1
            </span>
            <p className="font-medium text-lg">Sign Up / Login</p>
          </div>

          <ArrowBigRight className="text-orange-600 w-6 h-6 md:block hidden" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <span className="bg-amber-200 text-gray-800 rounded-full px-4 py-2 font-semibold">
              2
            </span>
            <p className="font-medium text-lg">Choose Tools</p>
          </div>

          <ArrowBigRight className="text-orange-600 w-6 h-6 md:block hidden" />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <span className="bg-amber-200 text-gray-800 rounded-full px-4 py-2 font-semibold">
              3
            </span>
            <p className="font-medium text-lg">Browse & Stay Productive</p>
          </div>
        </div>
      </div>
    </motion.div>
    </section>
  );
};

export default HowItWorks;

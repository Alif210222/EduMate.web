import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Notebook,
  Languages,
  Wallet,
  Timer,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Schedule Manager",
    desc: "Plan classes, exams, and deadlines with ease.",
    icon: <Calendar className="w-10 h-10 text-orange-500" />,
    link: "/schedule",
  },
  {
    title: "Notes Organizer",
    desc: "Write, edit, and organize study notes anytime.",
    icon: <Notebook className="w-10 h-10 text-green-600" />,
    link: "/notes",
  },
  {
    title: "Translator",
    desc: "Translate words and phrases instantly.",
    icon: <Languages className="w-10 h-10 text-orange-500" />,
    link: "/translator",
  },
  {
    title: "Budget Tracker",
    desc: "Track expenses and manage student budgets.",
    icon: <Wallet className="w-10 h-10 text-green-600" />,
    link: "/budget",
  },
  {
    title: "Pomodoro Timer",
    desc: "Stay focused with 25/5 productivity sessions.",
    icon: <Timer className="w-10 h-10 text-orange-500" />,
    link: "/pomodoro",
  },
  {
    title: "GPA Calculator",
    desc: "Easily calculate GPA and track performance.",
    icon: <BarChart3 className="w-10 h-10 text-green-600" />,
    link: "/gpa",
  },
];

const CoreFeatures = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-800">
          Core <span className="text-orange-500">Features</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Everything you need to stay organized, productive, and successful —
          all in one place.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.a
            key={index}
            href={feature.link}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-xl 
                       transition-all duration-300 group flex flex-col items-start"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-500">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CoreFeatures;

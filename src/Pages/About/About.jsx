import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, Lightbulb, Users, Rocket } from "lucide-react";
import authorImg from "../../assets/alifprofile.jpg"; // replace with your actual image path

const AboutPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      title: "All-in-One Toolkit",
      desc: "Notes, word meanings, and study resources in one place to save time and boost productivity.",
    },
    {
      icon: <Target className="w-10 h-10 text-green-600" />,
      title: "Focused Learning",
      desc: "Organize subjects and track your own learning progress effortlessly.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
      title: "Smart Assistance",
      desc: "Get quick access to translations, FAQs, and important student tools.",
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: "Community Support",
      desc: "Collaborate and share resources with fellow students to grow together.",
    },
    {
      icon: <Rocket className="w-10 h-10 text-pink-600" />,
      title: "Boost Success",
      desc: "Designed to empower students with the right tools to achieve academic excellence.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-6 md:px-20 relative">
      {/* Header Section with Title/SubTitle and Made By */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">EduMate</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            EduMate is built for students who want a{" "}
            <strong>smarter, simpler, and more productive learning journey</strong>
            . We bring essential study tools together in one platform to help you
            focus, organize, and succeed.
          </p>
        </motion.div>

        {/* Made By Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600 max-w-sm w-full md:w-auto"
        >
             <h2 className="text-right font-bold text-blue-500">Made by </h2>
          <div className="flex items-center gap-4">
           
            <img
              src={authorImg}
              alt="Author"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Alif Sarker Rony
              </h3>
              <p className="text-sm text-gray-500">MERN Stack Developer</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600 italic">
            "I built this platform with the goal of helping students stay
            organized, motivated, and empowered throughout their learning
            journey."
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-t-4 border-blue-500"
          >
            <div className="flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-10 shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          How EduMate Helps You
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Organize</h3>
            <p className="text-blue-100">
              Collect notes, track subjects, and manage study resources.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">2. Learn</h3>
            <p className="text-blue-100">
              Access translations, word meanings, and helpful tools instantly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">3. Succeed</h3>
            <p className="text-blue-100">
              Stay focused, motivated, and ahead in your academic journey.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;

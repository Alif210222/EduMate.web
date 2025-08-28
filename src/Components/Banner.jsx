import React from "react";
import { motion } from "framer-motion";
 // if you use shadcn/ui
import { BookOpen, Clock, PenTool } from "lucide-react";
import Typewriter from "typewriter-effect";
import banner from "../assets/toolkit banner.jpg"

const Banner = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:mt-20 md:px-16 flex flex-col md:flex-row items-center justify-between">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-center md:text-left">
          Welcome to <span className="text-orange-500">EduMate</span>
        </h1>

        <div className="text-2xl md:text-3xl font-semibold text-green-600">
          <Typewriter
            options={{
              strings: [
                "Your Smart Student Toolkit 📚",
                "Stay Organized, Stay Ahead 🕒",
                "Notes • Tasks • GPA • Flashcards ✨",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        <p className="text-lg text-gray-600 max-w-xl">
          Boost your productivity with tools designed to make studying
          easier, smarter, and fun. Everything you need, in one place!
        </p>

        <div className="flex gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-2xl shadow-md">
            Get Started
          </button>
          <button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-6 py-3 rounded-2xl"
          >
            Explore Features
          </button>
        </div>

        {/* Key highlights */}
        <div className="flex gap-6 mt-8">
          <div className="flex items-center gap-2 text-gray-700">
            <BookOpen className="text-orange-500" />
            <span>Notes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="text-green-600" />
            <span>Pomodoro</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <PenTool className="text-orange-500" />
            <span>Flashcards</span>
          </div>
        </div>
      </motion.div>

      {/* Right Content (Illustration / Image) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 mt-12 md:mt-0 flex justify-center"
      >
        <img
          src={banner}
          alt="Student Illustration"
          className="w-[90%] md:w-[70%]  rounded-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Banner;

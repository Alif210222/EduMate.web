import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Top 5 Study Hacks for Students",
    desc: "Boost your productivity with these simple and effective study hacks every student should know.",
    link: "#",
    tag: "Productivity",
  },
  {
    title: "Scholarship Opportunities 2025",
    desc: "Explore upcoming scholarships for students in 2025. Don’t miss the chance to apply!",
    link: "#",
    tag: "Scholarship",
  },
  {
    title: "Mastering Time Management",
    desc: "Learn how to manage your study and personal time effectively with proven techniques.",
    link: "#",
    tag: "Time Management",
  },
  {
    title: "Budgeting Tips for Students",
    desc: "Track expenses, save money, and make the most of your budget with EduMate.",
    link: "#",
    tag: "Finance",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-gray-50 py-16  px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-black flex items-center justify-center mt-8 gap-2">
          <BookOpen className="w-8 h-8 text-orange-500 " />
          Resources & Blog
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover study tips, scholarships, and productivity hacks curated
          specially for students. Stay updated and ahead in your learning
          journey.
        </p>
      </motion.div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between border-l-4 border-orange-400"
          >
            <div>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                {res.tag}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 hover:text-blue-600 transition">
                {res.title}
              </h3>
              <p className="text-gray-600 text-sm">{res.desc}</p>
            </div>
            {/* <a
              href={res.link}
              className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            >
              Read More <ArrowRight size={18} />
            </a> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;

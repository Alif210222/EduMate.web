import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is EduMate free?",
    answer:
      "Yes! EduMate is completely free for students. You can use study planner, budget tracker, and other tools without any charges.",
  },
  {
    question: "Can I access EduMate on mobile devices?",
    answer:
      "Absolutely! EduMate is fully responsive and works smoothly on mobile, tablet, and desktop.",
  },
  {
    question: "Do I need an internet connection to use EduMate?",
    answer:
      "Yes, EduMate requires internet to sync your schedules, budget data, and notes securely with the database.",
  },
  {
    question: "Can I plan my study schedule for multiple subjects?",
    answer:
      "Definitely! You can add tasks for multiple subjects, assign priorities, and set deadlines easily.",
  },
  {
    question: "How does the budget tracker help students?",
    answer:
      "The budget tracker helps you manage your income and expenses, calculate monthly savings, and develop good financial habits.",
  },
  {
    question: "Who created EduMate?",
    answer:
      "EduMate was created by Alif Sarker Rony, a MERN Stack Developer, to make student life more productive and organized.",
  },
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-10">
          Here are some quick answers to the most common questions about EduMate.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl shadow-sm bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-5 text-left"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

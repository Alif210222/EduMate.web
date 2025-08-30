import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DictionaryPage = () => {
    const axiosSecure=useAxiosSecure()
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [banglaMeaning, setBanglaMeaning] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setBanglaMeaning("");

    if (!word) return;

     try {
      // Fetch English meaning
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!res.ok) {
        setError("Word not found. Try another one.");
        return;
      }
      const data = await res.json();
      setResult(data[0]);

      // Fetch Bangla translation
      const bnRes = await fetch(
        `https://api.mymemory.translated.net/get?q=${word}&langpair=en|bn`
      );
      const bnData = await bnRes.json();
      setBanglaMeaning(bnData.responseData.translatedText);
    } catch (err) {
      setError("Error fetching word details.");
    }
  };


  
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-indigo-600 mb-10"
      >
        📖 Student Dictionary
      </motion.h1>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 mb-8 bg-white shadow rounded-lg px-4 py-2"
      >
        <Search className="text-gray-400" size={22} />
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="flex-1 outline-none p-2 text-lg"
          placeholder="Search a word (e.g. knowledge)"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Search
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {/* Word Details */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 shadow rounded-xl p-6"
        >
          {/* Word + Pronunciation */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{result.word}</h2>
            {result.phonetics?.[0]?.audio && (
              <audio controls src={result.phonetics[0].audio}>
                Your browser does not support audio.
              </audio>
            )}
          </div>
          <p className="text-gray-500 italic mb-4">
            {result.phonetic || "No phonetic available"}
          </p>

          {/* Bangla Meaning */}
          {banglaMeaning && (
            <p className="mb-4 text-lg font-medium text-green-700">
              বাংলা অর্থ: {banglaMeaning}
            </p>
          )}

          {/* Meanings */}
          {result.meanings.map((meaning, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg mb-4 shadow-sm border-l-4 border-indigo-400"
            >
              <h3 className="font-semibold text-lg text-indigo-600">
                {meaning.partOfSpeech}
              </h3>
              {meaning.definitions.map((def, j) => (
                <p key={j} className="mt-2 text-gray-700">
                  • {def.definition}
                  {def.example && (
                    <span className="block text-sm text-gray-500 italic">
                      “{def.example}”
                    </span>
                  )}
                </p>
              ))}

              {/* Synonyms */}
              {meaning.synonyms?.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  Synonyms: {meaning.synonyms.slice(0, 5).join(", ")}
                </p>
              )}
              {/* Antonyms */}
              {meaning.antonyms?.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  Antonyms: {meaning.antonyms.slice(0, 5).join(", ")}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      )}
      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 bg-yellow-50 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">
          💡 How to Learn English Words & Speak Regularly
        </h2>
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" defaultChecked />
  <div className="collapse-title font-semibold">➤ Learn 5–10 new words every day and write them in a notebook with Bengali meanings.</div>
  <div className="collapse-content text-sm"> ==> প্রতিদিন ৫–১০টা নতুন শব্দ শিখো এবং বাংলা অর্থসহ নোটবুকে লেখো।</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">➤  Revise old words daily using Spaced Repetition.</div>
  <div className="collapse-content text-sm">প্রতিদিন পুরানো শব্দগুলো রিভিশন করো (Spaced Repetition)।</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">➤  Listen to the pronunciation using Google Translate or a dictionary app.</div>
  <div className="collapse-content text-sm"> গুগল ট্রান্সলেট বা ডিকশনারি অ্যাপ ব্যবহার করে উচ্চারণ শোনো।</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold"> ➤ Make short sentences with new words and practice speaking.</div>
  <div className="collapse-content text-sm">  নতুন শব্দ দিয়ে ছোট ছোট বাক্য বানিয়ে স্পিকিং প্র‍্যাকটিস করো।</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold"> ➤ Try to speak English with a friend or study partner.</div>
  <div className="collapse-content text-sm">  একজন বন্ধু বা স্টাডি পার্টনারের সাথে ইংরেজিতে কথা বলার চেষ্টা করো।</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold"> ➤ Watch English news/videos and note down new words for practice.</div>
  <div className="collapse-content text-sm">  ইংরেজি নিউজ/ভিডিও দেখে নতুন শব্দ নোট করে প্র‍্যাকটিস করো।</div>
</div>
      </motion.div>
    </div>
  );
};

export default DictionaryPage;

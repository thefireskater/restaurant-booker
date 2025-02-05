"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center">
      <motion.div
        className="relative z-10 text-center space-y-6 px-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Restaurant Reservation Assistant
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Let AI handle your restaurant reservations. Simply provide the
          details, and our AI assistant will make the call for you.
        </p>
      </motion.div>
    </div>
  );
}

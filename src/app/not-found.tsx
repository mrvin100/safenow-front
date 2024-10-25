"use client";
import { motion } from "framer-motion";
import { RabbitIcon } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RabbitIcon className="size-40 text-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-foreground/50 mb-8"
        >404</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/50 mb-8"
        >This ressouce d&apos;ont exit.</motion.p>
      </main>
    </>
  );
}

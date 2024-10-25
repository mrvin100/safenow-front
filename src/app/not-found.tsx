"use client";
import { Header } from "@src/components/global";
import { motion } from "framer-motion";
import { RabbitIcon } from "lucide-react";

export default function NotFound() {
  return (
    <>
    <Header />
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
          className="text-lg text-foreground/50 mb-8 font-semibold"
        >404</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/50 mb-8"
        >This ressource d&apos;ont exit.</motion.p>
      </main>
    </>
  );
}

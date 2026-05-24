"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
};

export function SectionWrapper({ id, className, children, fullHeight = true }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "relative w-full px-6 md:px-12 py-20 overflow-hidden",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

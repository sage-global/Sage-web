import React from 'react';
import CountUpLib from 'react-countup';
import { motion } from 'framer-motion';

export interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = '', duration = 2.5 }: CountUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <CountUpLib
        end={end}
        suffix={suffix}
        duration={duration}
        enableScrollSpy
        scrollSpyOnce
        useEasing
      />
    </motion.div>
  );
}

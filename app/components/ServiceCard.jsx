// components/ServiceCard.jsx
"use client";

import { motion } from "framer-motion";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  className,
  delay,
  color = "currentColor",
}) => {
  const heptagonPath =
    "M 50 0 L 90 20 L 100 63 L 75 100 L 25 100 L 0 63 L 10 20 Z";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`group relative ${className}`}
      style={{ aspectRatio: "1" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-[12deg]">
          <path d={heptagonPath} fill={`${color}1a`} filter="url(#glow)" />
          <path
            d={heptagonPath}
            fill="none"
            stroke={color}
            className="opacity-50"
            strokeWidth="0.5"
            strokeDasharray="280"
            strokeDashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="280"
              to="-280"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[85%] h-[85%] rotate-[12deg]">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <defs>
              <linearGradient id="cardGradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={heptagonPath}
              fill={color}
              className="opacity-10 transition-opacity duration-300 group-hover:opacity-20"
            />
          </svg>

          <div className="absolute inset-0 -rotate-[12deg] flex flex-col justify-center items-center p-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 }}
              className="relative mb-6"
            >
              <div
                className="absolute -inset-2 blur-sm rounded-full"
                style={{ backgroundColor: `${color}1a` }}
              />
              <Icon
                className="w-8 h-8 md:w-10 md:h-10 relative z-10"
                style={{ color }}
              />
            </motion.div>

            <div className="space-y-2 text-center">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 }}
                className="text-lg md:text-xl font-semibold"
                style={{ color }}
              >
                {title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.4 }}
                className="text-xs md:text-sm opacity-80"
                style={{ color }}
              >
                {description}
              </motion.p>
            </div>

            <div
              className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 opacity-30"
              style={{ borderColor: color }}
            />
            <div
              className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 opacity-30"
              style={{ borderColor: color }}
            />
            <div
              className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 opacity-30"
              style={{ borderColor: color }}
            />
            <div
              className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 opacity-30"
              style={{ borderColor: color }}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}33, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

export default ServiceCard;

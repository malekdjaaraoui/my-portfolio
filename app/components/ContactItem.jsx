// components/ContactItem.jsx
"use client";

import { motion } from "framer-motion";

const ContactItem = ({ contact, index }) => {
  return (
    <motion.a
      href={contact.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center p-4 md:p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
      />

      {/* Colored accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 h-1 w-full rounded-t-2xl origin-left"
        style={{ backgroundColor: contact.color }}
      />

      {/* Left colored border */}
      <div
        className="absolute left-0 top-0 w-1 h-full rounded-l-2xl"
        style={{ backgroundColor: contact.color }}
      />

      {/* Pulse effect on hover */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: contact.color }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${contact.color}20` }}
        >
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full"
            style={{ backgroundColor: contact.color }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          className="text-white font-medium text-sm md:text-base group-hover:text-white transition-colors duration-300"
        >
          {contact.name}
        </motion.p>

        {/* Subtle shine effect */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        />
      </div>

      {/* Corner decoration */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  );
};

export default ContactItem;

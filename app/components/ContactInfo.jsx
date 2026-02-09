// components/ContactInfo.jsx
"use client";

import { motion } from "framer-motion";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 md:mt-20 text-center relative"
    >
      {/* Decorative line */}
      <div className="relative mb-12 md:mb-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-[#030D27] px-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="group flex items-center space-x-3 md:space-x-4 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-blue-400/20 rounded-full"
          >
            <FiPhone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          </motion.div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Phone
            </p>
            <span className="text-white text-sm md:text-base font-medium">
              +213 784 46 38 83
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="group flex items-center space-x-3 md:space-x-4 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-red-400/20 rounded-full"
          >
            <AiOutlineMail className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
          </motion.div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Email
            </p>
            <span className="text-white text-sm md:text-base font-medium">
              malekkdjr@gmail.com
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 md:mt-12 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl blur-sm" />
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-400/20 to-red-400/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          </motion.div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {"Welcome for everyone, I'm here to help you in your business"}
          </p>
        </div>
      </motion.div> */}
    </motion.div>
  );
};

export default ContactInfo;

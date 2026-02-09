// components/SkillItem.jsx
"use client";

import { motion } from "framer-motion";
import Progress from "./progress";

const SkillItem = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D0F601]/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#103BAC]/10"
    >
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#D0F601] rounded-full group-hover:scale-125 transition-transform duration-300" />
          <span className="font-medium text-lg group-hover:text-[#D0F601] transition-colors duration-300">
            {skill.name}
          </span>
        </div>
        <motion.span
          className="text-[#D0F601] font-semibold text-lg"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
        >
          {skill.value}%
        </motion.span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
        className="origin-left"
      >
        <Progress
          value={skill.value}
          className="h-3 bg-white/20 shadow-inner"
          animate={true}
          barColor="bg-gradient-to-r from-[#D0F601] to-[#103BAC]"
        />
      </motion.div>

      {/* Skill level indicator */}
      {/* <div className="flex justify-between text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
        <span>Expert</span>
      </div> */}
    </motion.div>
  );
};

export default SkillItem;

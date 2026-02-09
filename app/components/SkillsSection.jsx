// components/SkillsSection.jsx
"use client";

import { motion } from "framer-motion";
import Section from "./section";
import SkillItem from "./SkillItem";

const SkillsSection = ({ skills }) => {
  const sortedSkills = skills.sort(
    (a, b) => parseInt(b.value) - parseInt(a.value)
  );

  return (
    <Section>
      <div id="skills" className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D0F601]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white relative">
              Skills
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D0F601]" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            My technical expertise and proficiency levels
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-6 md:gap-8"
          >
            {sortedSkills.map((skill, index) => (
              <SkillItem key={index} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Skills summary */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-[#D0F601]">
                  {sortedSkills.length}
                </div>
                <div className="text-gray-400 text-sm">Total Skills</div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-[#D0F601]">
                  {Math.round(
                    sortedSkills.reduce(
                      (acc, skill) => acc + parseInt(skill.value),
                      0
                    ) / sortedSkills.length
                  )}
                  %
                </div>
                <div className="text-gray-400 text-sm">Average Proficiency</div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-[#D0F601]">
                  {
                    sortedSkills.filter((skill) => parseInt(skill.value) >= 80)
                      .length
                  }
                </div>
                <div className="text-gray-400 text-sm">Expert Level</div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;

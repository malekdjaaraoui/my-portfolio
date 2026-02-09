// components/WorksSection.jsx
"use client";

import { motion } from "framer-motion";
import Section from "./section";
import CategorySection from "./CategorySection";

const WorksSection = ({ categories, onProjectClick, onViewAllClick }) => {
  return (
    <Section>
      <div id="works" className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D0F601]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white relative">
              Works
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
            A showcase of my projects and creative endeavors
          </motion.p>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <CategorySection
                category={category}
                onProjectClick={onProjectClick}
                onViewAllClick={onViewAllClick}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WorksSection;

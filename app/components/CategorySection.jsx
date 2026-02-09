// components/CategorySection.jsx
"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useMemo } from "react";

const CategorySection = ({ category, onProjectClick, onViewAllClick }) => {
  const visibleProjects = useMemo(
    () =>
      category.projects
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((project) => project.show_in_home === true)
        .slice(0, 3) || [],
    [category.projects]
  );

  return (
    <div className="mb-12 md:mb-16">
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
        {category.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onProjectClick}
          />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 md:mt-8 mx-auto block py-2 px-6 bg-white/10 text-white rounded-full hover:bg-white/20"
        onClick={() => onViewAllClick(category.id)}
      >
        View All {category.title}
      </motion.button>
    </div>
  );
};

export default CategorySection;

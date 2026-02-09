// components/ProjectCard.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onClick(project)}
    >
      {project.images?.length > 0 && (
        <Image
          src={project.images[0]}
          alt={project.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 md:p-6">
        <h4 className="text-lg md:text-xl font-semibold text-white mb-2">
          {project.title}
        </h4>
        <p className="text-gray-300 text-sm md:text-base">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

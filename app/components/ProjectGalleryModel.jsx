import { AnimatePresence, motion } from "framer-motion";
import { X, Eye, ArrowRight } from "lucide-react";
import React, { useState, useCallback } from "react";
import ProjectModal from "./ProjectModel";

const ProjectGalleryModal = ({ isOpen, onClose, projects, category }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.3,
          }}
          className="fixed inset-4 md:inset-8 bg-[#030D27] border border-white/20 rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
        >
          <div className="relative p-6 bg-gradient-to-r from-[#030D27] to-[#103BAC]/20 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-gradient-to-b from-[#D0F601]  rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-3 hover:bg-white/10 rounded-full transition-all duration-200 group z-50"
              >
                <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </motion.button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D0F601]/5 to-[#103BAC]/5 rounded-t-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 overflow-y-auto p-6 custom-scrollbar"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D0F601]/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#103BAC]/20"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      loading="lazy"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6 space-y-3">
                      <h3 className="text-xl font-semibold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#D0F601] text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={handleClose}
              isNested={true}
            />
          )}
        </AnimatePresence>
      </>
    </AnimatePresence>
  );
};

export default ProjectGalleryModal;

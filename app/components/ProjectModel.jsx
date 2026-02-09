"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";

const ProjectModal = ({ project, onClose, isNested }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    },
    [project.images.length]
  );

  const handlePrev = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + project.images.length) % project.images.length
      );
    },
    [project.images.length]
  );

  const imageVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 50 : -50,
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed inset-0 flex items-center justify-center ${
          isNested ? "z-[60]" : "z-50"
        }`}
        onClick={!isNested ? onClose : undefined}
      >
        {!isNested && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
        )}

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            duration: 0.3,
          }}
          className="bg-[#05102c] p-8 rounded-2xl max-w-2xl w-full mx-4 relative border-2 border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 z-50"
          >
            <X className="w-6 h-6 text-white/80 hover:text-white" />
          </button>

          <div className="relative flex items-center justify-center group">
            <AnimatePresence custom={1} mode="wait">
              <motion.img
                key={currentImageIndex}
                custom={1}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                src={project.images[currentImageIndex]}
                alt={project.title}
                className="w-96 h-96 object-contain rounded-xl mb-6 shadow-2xl"
                loading="eager"
              />
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 max-lg:left-0 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-8 h-8 max-lg:h-4 max-lg:w-4 text-white stroke-[2.5]" />
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="absolute right-4 max-lg:right-0 top-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next image"
                >
                  <ArrowRight className="w-8 h-8 max-lg:h-4 max-lg:w-4 text-white stroke-[2.5]" />
                </motion.button>

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-4 h-4 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white/90">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed max-lg:text-sm">
            {project.description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

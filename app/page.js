"use client";

import React, { useState, lazy, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WorksSection from "./components/WorkSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import LoadingSpinner from "./components/LoadingSpinner";
import { usePortfolioData } from "./hooks/usePortfolioData";

// Correct lazy loading syntax
const ProjectModal = lazy(() => import("./components/ProjectModel"));
const ProjectGalleryModal = lazy(() =>
  import("./components/ProjectGalleryModel")
);

export default function Home() {
  const { data, loading, error } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState(null);
  const [categoryModals, setCategoryModals] = useState({});

  // Initialize category modals when categories are loaded
  useMemo(() => {
    if (data.categories?.length > 0) {
      const initialModals = {};
      data.categories.forEach((cat) => {
        initialModals[cat.id] = false;
      });
      setCategoryModals(initialModals);
    }
  }, [data.categories]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleViewAllClick = (categoryId) => {
    setCategoryModals((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleCloseModal = (categoryId) => {
    if (categoryId) {
      setCategoryModals((prev) => ({ ...prev, [categoryId]: false }));
    } else {
      setSelectedProject(null);
    }
  };

  // Show loading until hero data is available
  if (loading || !data.hero) {
    return (
      <div className="min-h-screen bg-[#030D27] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030D27] flex flex-col items-center justify-center text-red-400 p-4">
        <h2 className="text-2xl font-bold mb-2">Error Loading Portfolio</h2>
        <p className="text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030D27]">
      <Header />

      <HeroSection hero={data.hero} />

      <ServicesSection services={data.services} />

      <WorksSection
        categories={data.categories}
        onProjectClick={handleProjectClick}
        onViewAllClick={handleViewAllClick}
      />

      <SkillsSection skills={data.skills} />

      <ContactSection contacts={data.contacts} />

      {/* Modal rendering */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => handleCloseModal(null)}
            />
          )}

          {data.categories?.map(
            (category) =>
              categoryModals[category.id] && (
                <ProjectGalleryModal
                  key={category.id}
                  isOpen={categoryModals[category.id]}
                  onClose={() => handleCloseModal(category.id)}
                  projects={category.projects || []}
                  category={category}
                  onProjectClick={handleProjectClick}
                />
              )
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

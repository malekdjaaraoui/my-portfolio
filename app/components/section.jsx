// Simplified Section.jsx
import React from "react";

const Section = ({ children, className = "" }) => {
  return (
    <section
      className={`relative min-h-[100vh] p-2 overflow-hidden ${className}`}
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030D27] to-[#103BAC]/20 opacity-20" />

      {/* Main content */}
      <div className="relative z-20">{children}</div>
    </section>
  );
};

export default Section;

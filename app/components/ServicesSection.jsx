// components/ServicesSection.jsx
"use client";

import Section from "./section";
import ServiceCard from "./ServiceCard";
import {
  Brush,
  Camera,
  LayoutGrid,
  Film,
  GitGraph,
  Palette,
  Code,
  PenTool,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  Brush,
  Camera,
  LayoutGrid,
  Film,
  GitGraph,
  Palette,
  Code,
  PenTool,
};

const ServicesSection = ({ services }) => {
  const colors = ["#7C3AED", "#3B82F6", "#EC4899", "#06B6D4", "#2AC25F"];
  const delays = [0, 0.1, 0.2, 0.3, 0.4];

  return (
    <Section>
      <div id="services" className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D0F601]" />
          <h2 className="text-3xl md:text-4xl font-bold text-white relative">
            Services
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D0F601]" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-12"
        >
          Comprehensive solutions tailored to your digital needs
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <ServiceCard
                key={service.id}
                icon={Icon}
                title={service.title}
                description={service.description}
                color={colors[index % colors.length]}
                delay={delays[index % delays.length]}
                className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default ServicesSection;

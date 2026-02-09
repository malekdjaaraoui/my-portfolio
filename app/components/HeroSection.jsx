// components/HeroSection.jsx
"use client";

import Image from "next/image";
import Section from "./section";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = ({ hero }) => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#030D27] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-2 h-2 bg-[#D0F601]/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-40 right-32 w-1 h-1 bg-white/10 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-[#D0F601]/10 rounded-full"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-60 left-40 w-1.5 h-1.5 bg-white/15 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -120, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-[#D0F601]/15 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 90, 0],
            rotate: [0, -270, -540],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-80 right-1/4 w-1 h-1 bg-white/20 rounded-full"
        />

        {/* Geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-40 w-4 h-4 border border-[#D0F601]/20 rotate-45"
        />
        <motion.div
          animate={{
            rotate: [0, -360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-40 left-32 w-3 h-3 border border-white/10 rounded-full"
        />

        {/* Pulsing elements */}
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-10 w-2 h-2 bg-[#D0F601]/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-white/20 rounded-full"
        />

        {/* Floating lines */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/3 w-8 h-px bg-gradient-to-r from-transparent via-[#D0F601]/30 to-transparent"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            rotate: [0, -90, -180],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-1/3 w-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Subtle grid pattern */}
        <motion.div
          animate={{
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Orbiting elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-[#D0F601]/30 rounded-full -translate-x-1/2" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute bottom-0 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full translate-x-1/2" />
        </motion.div>
      </div>

      <Section>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col-reverse md:flex-row  md:justify-center gap-8 md:gap-14 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Main headline */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 max-md:space-y-3 max-md:hidden "
              >
                <motion.h1
                  className="text-2xl max-md:text-center md:text-5xl font-bold  text-white md:leading-normal"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {hero?.headline || "Creative Digital Solutions"}
                </motion.h1>
                <motion.div
                  className="w-20 h-1 max-md:text-center max-md:mx-auto bg-[#D0F601]"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl max-sm:hidden text-gray-300 leading-relaxed max-w-lg"
                whileHover={{ color: "#ffffff" }}
                transition={{ duration: 0.3 }}
              >
                Delivering exceptional digital experiences through innovative
                design and cutting-edge technology solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/Abdelmalek Djaaraoui.pdf"
                  download
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#D0F601] text-[#030D27] font-semibold rounded-lg hover:bg-[#D0F601]/90 transition-all duration-300 hover:shadow-lg"
                  variants={buttonVariants}
                  // whileTap="tap"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>

                <motion.a
                  href="https://drive.google.com/drive/folders/1BwAIHMrNv4CHeseKekbNr0VLkAYSeWLy
"
                  target="_blank"
                  // onClick={scrollToServices}
                  className="inline-flex cursor-pointer items-center gap-3 px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  My Video Projects
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>

              {/* Professional stats or highlights */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 md:pt-8 border-t border-white/10"
              >
                {[
                  { value: "3+", label: "Years of Experience" },
                  { value: "200+", label: "Projects Completed" },
                  { value: "98%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statsVariants}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-white"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(208, 246, 1, 0)",
                          "0 0 20px rgba(208, 246, 1, 0.3)",
                          "0 0 10px rgba(208, 246, 1, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Main image container */}
                <div className="relative w-[400px] h-[400px] md:w-[36rem]  md:h-[36rem]">
                  {/* Animated background accent */}
                  <motion.div
                    className="absolute max-md:hidden -top-4 -left-4 w-full h-full border-2 border-[#D0F601]/30 rounded-2xl"
                    animate={{
                      borderColor: [
                        "rgba(208, 246, 1, 0.3)",
                        "rgba(208, 246, 1, 0.6)",
                        "rgba(208, 246, 1, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Image */}
                  <motion.div
                    className="relative w-full h-full rounded-2xl overflow-hidden md:border-4 border-white/10 bg-white/5"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(208, 246, 1, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {hero?.imageUrl ? (
                      <Image
                        src={hero.imageUrl}
                        alt="Professional Profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    ) : (
                      <motion.div
                        className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center rounded-xl"
                        animate={{
                          background: [
                            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                            "linear-gradient(135deg, rgba(208,246,1,0.1), rgba(255,255,255,0.05))",
                            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.span
                          className="text-white/60 text-lg"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Profile Image
                        </motion.span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={scrollToServices}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* <motion.div
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.3)",
                    "rgba(208,246,1,0.5)",
                    "rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                  animate={{
                    backgroundColor: [
                      "rgba(255,255,255,0.6)",
                      "rgba(208,246,1,0.8)",
                      "rgba(255,255,255,0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default HeroSection;

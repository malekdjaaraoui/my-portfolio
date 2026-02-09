// components/ContactSection.jsx
"use client";

import { motion } from "framer-motion";
import Section from "./section";
import ContactItem from "./ContactItem";
import ContactInfo from "./ContactInfo";

const ContactSection = ({ contacts }) => {
  return (
    <Section>
      <div id="contact" className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D0F601]" />
          <h2 className="text-3xl md:text-4xl font-bold text-white relative">
            Contact
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
          {`Let's connect and build something amazing together`}
        </motion.p>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 md:grid-cols-3  gap-4 md:gap-6 mx-auto "
          >
            {contacts.map((contact, index) => (
              <ContactItem key={contact.name} contact={contact} index={index} />
            ))}
          </motion.div>

          <ContactInfo />
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;

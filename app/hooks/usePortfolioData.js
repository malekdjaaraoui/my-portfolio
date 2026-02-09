// hooks/usePortfolioData.js
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const usePortfolioData = () => {
  const [data, setData] = useState({
    categories: [],
    services: [],
    hero: null, // Changed to null for explicit check
    skills: [],
    contacts: [],
    siteInfo: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch hero data alone
        const heroSnap = await getDoc(doc(db, "content", "hero"));
        if (!heroSnap.exists()) {
          throw new Error("Hero content not found");
        }

        // Then fetch remaining data in parallel
        const [
          servicesSnap,
          skillsSnap,
          contactsSnap,
          siteSnap,
          categoriesSnap,
        ] = await Promise.all([
          getDocs(collection(db, "services")),
          getDocs(collection(db, "skills")),
          getDocs(collection(db, "contacts")),
          getDoc(doc(db, "content", "site_info")),
          getDocs(collection(db, "categories")),
        ]);

        const categoriesData = categoriesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData({
          hero: heroSnap.data(),
          services: servicesSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => a.order - b.order),
          skills: skillsSnap.docs.map((doc) => doc.data()),
          contacts: contactsSnap.docs.map((doc) => doc.data()),
          siteInfo: siteSnap.data() || {},
          categories: categoriesData,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

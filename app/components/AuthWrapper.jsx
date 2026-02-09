"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) router.push('/login');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, [router]);

  if (loading) return <LoadingSpinner />;
  return isAuthenticated ? children : null;
};
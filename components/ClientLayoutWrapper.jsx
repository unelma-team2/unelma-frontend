"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/context/AuthContext";

export default function ClientLayoutWrapper({ children }) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
}
"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayoutWrapper({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
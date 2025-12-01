"use client";

import HeroSection from "@/components/home/HeroSection";
import InquiryAndMetrics from "@/components/home/InquiryAndMetrics";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import OrderingProcess from "@/components/home/OrderingProcess";
import RecentWork from "@/components/home/RecentWork";
import ClientFeedback from "@/components/home/ClientFeedback";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import BackToTopButton from "@/components/BackToTopButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {

  const [heroSection, setHeroSection] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [orderProcess, setOrderProcess] = useState([]);
  const [products, setProducts] = useState([]);
  const [projectInquiry, setProjectInquiry] = useState([]);
  const [categories, setCategories] = useState([]);
  const [works, setWorks] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[HeroSection][populate]=*&populate[Metrics][populate]=*&populate[OrderingProcess][populate]=*&populate[Products][populate]=*&populate[ProjectInquiry][populate]=*&populate[Category][populate]=*&populate[RecentWorks][populate]=*&populate[Services][populate]=*`)
      .then((res) => {
        const data = res.data.data;
        setHeroSection(data?.HeroSection || []);
        setMetrics(data?.Metrics || []);
        setOrderProcess(data?.OrderingProcess || []);
        setProducts(data?.Products || []);
        setProjectInquiry(data?.ProjectInquiry || []);
        setCategories(data?.Category || []);
        setWorks(data?.RecentWorks || []);
        setServices(data?.Services || []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!heroSection) return <p>No hero section found.</p>;

  return (
    <>
      <HeroSection heroSection={heroSection} />
      <InquiryAndMetrics metrics={metrics} projectInquiry={projectInquiry} />
      <Services services={services} />
      <Products products={products} />
      <OrderingProcess orderProcess={orderProcess} />
      <RecentWork works={works} categories={categories} />
      <ClientFeedback />
      <RecentBlogPosts />
      <BackToTopButton />
    </>
  );
}
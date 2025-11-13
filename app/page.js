import HeroSection from "@/components/home/HeroSection";
import ProjectInquiry from "@/components/home/ProjectInquiry";
import MetricsSection from "@/components/home/MetricsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import OrderingProcess from "@/components/home/OrderingProcess";
import RecentWork from "@/components/home/RecentWork";
import ClientFeedback from "@/components/home/ClientFeedback";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectInquiry />
      <MetricsSection />
      <ServicesSection />
      <ProductsSection />
      <OrderingProcess />
      <RecentWork />
      <ClientFeedback />
      <RecentBlogPosts />
    </>
  );
}
